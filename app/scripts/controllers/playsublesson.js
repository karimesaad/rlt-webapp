'use strict';

/**
* @ngdoc function
* @name testappApp.controller:PlaysublessonCtrl
* @description
* # PlaysublessonCtrl
* Controller of the testappApp
*/
angular.module('testappApp')
.controller('PlaysublessonCtrl', function (ngAudio, $scope, firebaseFactory, $firebaseArray, $firebase, $firebaseObject) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  /****** FIREBASE: READ ****/
  // Get all data in one object ($scope.data) and then access each single object/value inside
  //
  var ref = firebase.database().ref();
  $scope.data = $firebaseObject(ref);
  var buttons = [];
  var button;
  var btnRef;
  var startBtnFlag = 0;

  $scope.sound = ngAudio.load("audio/loop/clap-room-01.wav");
  // this waits for the data to load and then logs the output. Therefore,
  // data from the server will now appear in the logged output. Use this with care!
  $scope.data.$loaded()
  .then(function() {
//    console.log($scope.data.lessons);
    btnRef = $scope.data.lessons.lesson1.sublesson1.stepsequencer1;

    for(var btn = 0; btn < 16; btn ++){
      // buttons.push(btnRef['btn' + button].hit);
      button = 'btn' + btn;

      buttons.push(btnRef[button]);
    }
//    console.log(buttons);
    for(var i=1; i<buttons.length; i++){
//      console.log(buttons[i]);
//      console.log(buttons[i].hit);
    }
    // console.log(buttons[1]);
    // console.log(buttons[1].hit);
  })
  .catch(function(err) {
    console.error(err);
  });

  var sequencer = new Nexus.Sequencer('#sequencer',{
    'size': [500,500],
    'mode': 'toggle',
    'rows': 4,
    'columns': 4
  });

  var startButton = new Nexus.Button('#start-button',{
    'id': 'circle-svg',
    'size': [60,60],
    'mode': 'toggle',
    'state': false
  });
  var stopButton = new Nexus.Button('#stop-button',{
    'id': 'circle-svg',
    'size': [60,60],
    'mode': 'toggle',
    'state': false
  });

  // Create a pulse of 2 second
  var interval = new Nexus.Interval(200, function() {
    console.log('beep: ' + $scope.bpm);
  })

  // var sequence = new Nexus.Sequence([0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1]);
  var sequence = new Nexus.Sequence([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
  var counter = new Nexus.Counter(0,15);

  var currBtn;
  var currRow;
  var currCol;
  var seqCounter = 0;

  $scope.bpm = 800;
  sequencer.matrix.set.all([
    [0,1,0,1],
    [0,1,0,1],
    [0,1,0,1],
    [0,1,0,1],
  ])

  startButton.on('change', function(v){
    if(startBtnFlag == 0){
      // Change the interval time
      interval.ms($scope.bpm);

      sequencer.start($scope.bpm);

      // Start the pulse
      interval.start();
      startBtnFlag = 1;
      // console.log(sequencer.matrix.pattern);
      // console.log("buttons 1 - 4: ");
      // console.log(sequencer.matrix.pattern[0]);
      // console.log("is button 8 pressed? ");
      // console.log(sequencer.matrix.pattern[1][3]);
    }
  });
  stopButton.on('change', function(v){
    startBtnFlag = 0;
    sequencer.matrix.set.all([
      [0,1,0,1],
      [0,1,0,1],
      [0,1,0,1],
      [0,1,0,1],
    ])
    // Stop the pulse
    interval.stop();
    sequencer.stop();

    console.log(sequencer.matrix.pattern);
  });

  // Change the function that is called at each pulse
  interval.event = function() {
  //  playSequencer();
    seqCounter = counter.next();
    console.log("seqCounter: ");
    console.log(seqCounter);
    currRow = (seqCounter/4);
    currRow = Math.floor(currRow);
    currCol = (seqCounter%4);
    console.log("currRow: ");
    console.log(currRow);
    console.log("currCol: ");
    console.log(currCol);



    console.log("bloop");
    if(sequencer.matrix.pattern[currRow][currCol]){
      $scope.sound.play();
    }
  }
  // var playSequencer = function(){
  //   // sequencer.stepper.next();
  //   currBtn = sequence.next();
  //   currRow = currBtn/4;
  //   currCol = currBtn%4;
  //   sequencer.matrix.toggle.cell(currRow, currCol);
  //
  // }
});
