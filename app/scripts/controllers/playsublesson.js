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
  var seqArray = [];
  var seqMatrix = [];
  var numSequencers = 0;
  var btnLength = 0;

  $scope.sound = ngAudio.load("audio/loop/clap-room-01.wav");
  // this waits for the data to load and then logs the output. Therefore,
  // data from the server will now appear in the logged output. Use this with care!
  $scope.data.$loaded()
  .then(function() {
    btnRef = $scope.data.lessons.lesson1.sublesson1.stepsequencer1;
    for(var btn = 0; btn < 16; btn ++){
      // buttons.push(btnRef['btn' + button].hit);
      button = 'btn' + btn;
      buttons.push(btnRef[button]);
    }

    //Populate new array with value of buttons: true if button pressed, false if button not pressed
    for(var i=1; i<buttons.length; i++){
      seqMatrix[i] = buttons[i].hit;
    }
    btnLength = (buttons.length)/4;
    console.log("btnLength: " + btnLength);
    console.log("seqMatrix");
    console.log(seqMatrix);
    numSequencers = Math.ceil(btnLength);

  })
  .catch(function(err) {
    console.error(err);
  });

//   console.log("numSequencers: " + numSequencers);
//
//   var sequencer = new Nexus.Sequencer('#sequencer',{
//     'size': [500,500],
//     'mode': 'toggle',
//     'rows': 4,
//     'columns': 4
//   });
//
//   for (var i = 0; i < numSequencers ; i++) {
//     seqArray.push((new Nexus.Sequencer('#sequencer',{
//         'size': [200,500],
//         'mode': 'toggle',
//         'rows': 1,
//         'columns': 4
//       })
//     ))
//   }
//
// var btn = -1;
//   for(var currSeq=0; currSeq<numSequencers ; currSeq++){
//     for(var currSeqBtn=0; currSeqBtn < 4; currSeqBtn++){
//       btn = buttons[(currSeq*4) + currSeqBtn];
//       seqArray[currSeq].matrix.set.cell(1,currSeqBtn,btn);
//     }
//   }
//   console.log(seqArray);

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

  // var counter = new Nexus.Counter(0,15);
  // var seqCounter = 0;

  var currBtn;
  var currRow;
  var currCol;

  $scope.bpm = 800;
  // sequencer.matrix.set.all([
  //   [0,1,0,1],
  //   [0,1,0,1],
  //   [0,1,0,1],
  //   [0,1,0,1],
  // ])

  startButton.on('change', function(v){
    if(startBtnFlag == 0){
      interval.ms($scope.bpm); // Change the interval time
      sequencer.start($scope.bpm);
      interval.start(); // Start the pulse
      startBtnFlag = 1;
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

    if(sequencer.matrix.pattern[currRow][currCol]){
      $scope.sound.play();
    }
  }


//*************** NEW CODE ************************

  $scope.buttonClicked = function(bar, btn){
        // console.log("btn **************");
        // console.log(btn);
        // console.log("bar **************");
        // console.log(bar);

      }
  $scope.boxVisible = true; // show box initially

  var barArray = {
    "btn1": {
      "duration": 1,
    },
    "btn2": {
      "duration": 1,
    },
    "btn3": {
      "duration": 1,
    },
    "btn4": {
      "duration": 1,
    },
    "btn5": {
      "duration": 2,
    },
    "btn6": {
      "duration": 1,
    },
    "btn7": {
      "duration": 1,
    },
    "btn8": {
      "duration": 0,
    },
    "btn9": {
      "duration": 2,
    },
    "btn10": {
      "duration": 2,
    },
    "btn11": {
      "duration": 0,
    },
    "btn12": {
      "duration": 0,
    },
    "btn13": {
      "duration": 4,
    },
    "btn14": {
      "duration": 0,
    },
    "btn15": {
      "duration": 0,
    },
    "btn16": {
      "duration": 0,
    }
  }

  // $scope.barSet = [];
  // $scope.bar = [];
  //
  // for(var i = 0; i< stepSeq; i ++){
  //   for(var j=0; j < 4; j++){
  //     $scope.bar[j] = [new Bounce(), new Bounce(), new Bounce(), new Bounce()];
  //   }
  //   $scope.barSet[i] = $scope.bar;
  // }

  var tmpBtn;
  var btnCounter = 1;

  for(var i=0; i<16; i++){
    tmpBtn = barArray["btn"+btnCounter];
    if(tmpBtn.duration == 0){
      console.log(tmpBtn.duration);
      var elem = document.getElementById("animation-target"+btnCounter);
      elem.style.backgroundColor = "#e0e0e0";
    }
    if(tmpBtn.duration == 2){
      console.log(tmpBtn.duration);
      var elem = document.getElementById("animation-target"+btnCounter);
      elem.style.backgroundColor = "#7ee493";
    }
    if(tmpBtn.duration == 4){
      console.log(tmpBtn.duration);
      var elem = document.getElementById("animation-target"+btnCounter);
      elem.style.backgroundColor = "#9a48c9";
    }
    btnCounter ++;
  }

  var playLesson = function(){
    //include timer/interval from NexusUS
    //everytime it fires, get next value in array, check duration, and bounce accordingly
  }

  $scope.showIt = function() {
    $scope.boxVisible = true; // show it, then apply anim
    var bounce = new Bounce();
    bounce.scale({
      from: {
        x: .5,
        y: 1
      },
      to: {
        x: 1,
        y: 1
      },
      easing: "bounce",
      duration: 4000,
      delay: 0,
      bounces: 4,
      stiffness: 1
    }).scale({
      from: {
        x: 1,
        y: .5
      },
      to: {
        x: 1,
        y: 1
      },
      easing: "bounce",
      duration: 4000,
      delay: 0,
      bounces: 6,
      stiffness: 1
    });
    bounce.applyTo(document.querySelectorAll(".animation-target"));
  }

  $scope.hideIt = function() {
    var bounce = new Bounce();
    bounce.scale({
      from: {
        x: 1,
        y: 1
      },
      to: {
        x: 0.1,
        y: 1
      },
      easing: "bounce",
      duration: 500,
      delay: 0,
      bounces: 4,
      stiffness: 3
    }).scale({
      from: {
        x: 1,
        y: 1
      },
      to: {
        x: 1,
        y: 0.1
      },
      easing: "bounce",
      duration: 250,
      delay: 250,
      bounces: 4,
      stiffness: 1
    });
    bounce.applyTo(document.querySelectorAll(".animation-target")).then(function() {
      // need to get the scope of the element, then
      // set visibility to false to completely hide it
      var scope = angular.element($(".blackbox")).scope();
      scope.$apply(function() {
        scope.boxVisible = false;
      });
    });

  }

  $scope.spinIt = function() {
    $scope.boxVisible = true;
    var bounce = new Bounce();
    bounce.rotate({
      from: 0,
      to: 90,
      bounces: 4,
      duration: 1000,
      delay: 0,
      stiffness: 3
    }).skew({
      from: {
        x: 0,
        y: 0
      },
      to: {
        x: 20,
        y: 20
      },
      easing: "sway",
      duration: 1000,
      delay: 0,
      bounces: 4,
      stiffness: 3
    });
    bounce.applyTo(document.querySelectorAll(".animation-target"));
  }


});
