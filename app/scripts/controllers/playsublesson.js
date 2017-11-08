'use strict';

/**
* @ngdoc function
* @name testappApp.controller:PlaysublessonCtrl
* @description
* # PlaysublessonCtrl
* Controller of the testappApp
*/
angular.module('testappApp')
.controller('PlaysublessonCtrl', function (firebaseFactory, dataService, ngAudio, $location, $scope, $firebaseArray, $firebase, $firebaseObject) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  var sequencerRef1;
  var sequencerRef2;
  var sequencerRef3;
  var sequencerRef4;
  var button;
  var buttonSeq;
  var tmpBtn;
  var btnCounter = 1;
  var btnGrid = 1;
  var startBtnFlag = 0;
  $scope.lastFlag = true;

  var sequencer = {
    "btn1": 1,
    "btn2": 2,
    "btn3": 4,
    "btn4": 1,
    "btn5": 0,
    "btn6": 0,
    "btn7": 0,
    "btn8": 0,
    "btn9": 0,
    "btn10": 0,
    "btn11": 0,
    "btn12": 0,
    "btn13": 0,
    "btn14": 0,
    "btn15": 0,
    "btn16": 0,
    "btn17": 1,
    "btn18": 2,
    "btn19": 4,
    "btn20": 1,
    "btn21": 0,
    "btn22": 0,
    "btn23": 0,
    "btn24": 0,
    "btn25": 0,
    "btn26": 0,
    "btn27": 0,
    "btn28": 0,
    "btn29": 0,
    "btn30": 0,
    "btn31": 0,
    "btn32": 0,
    "btn33": 1,
    "btn34": 2,
    "btn35": 4,
    "btn36": 1,
    "btn37": 0,
    "btn38": 0,
    "btn39": 0,
    "btn40": 0,
    "btn41": 0,
    "btn42": 0,
    "btn43": 0,
    "btn44": 0,
    "btn45": 0,
    "btn46": 0,
    "btn47": 0,
    "btn48": 1,
    "btn49": 2,
    "btn50": 4,
    "btn51": 1,
    "btn52": 0,
    "btn53": 0,
    "btn54": 0,
    "btn55": 0,
    "btn56": 0,
    "btn57": 0,
    "btn58": 0,
    "btn59": 0,
    "btn60": 0,
    "btn61": 0,
    "btn62": 0,
    "btn63": 0,
    "btn64": 0,
  }

  $scope.sound = ngAudio.load("audio/loop/Click1.wav");

  /*********** GET DATA PASSED FROM PREVIOUS PAGE ***********/
  $scope.lesson = dataService.getLesson();
  $scope.rhythmicPattern = dataService.getRhythmicPattern();


  /***************** FIREBASE: READ *******************/
  // Get all data in one object ($scope.data) and then access each single object/value inside
  //
  var ref = firebase.database().ref();
  $scope.data = $firebaseObject(ref);


  // this waits for the data to load and then logs the output. Therefore,
  // data from the server will now appear in the logged output. Use this with care!
  $scope.data.$loaded()
  .then(function() {
    // sequencerRef1 = $scope.data.lessons.lesson1.rhythmicpattern1.sequencer1;

    sequencerRef1 = $scope.data.lessons['lesson'+$scope.lesson]['rhythmicpattern'+$scope.rhythmicPattern].sequencer1;

    for(var btn = 1; btn <= 16; btn ++){
      button = 'btn' + btn;
      sequencer[button] = sequencerRef1[button];
    }
    colorGrid(1);
    sequencerRef2 = $scope.data.lessons['lesson'+$scope.lesson]['rhythmicpattern'+$scope.rhythmicPattern].sequencer2;
    for(var btn = 17; btn <= 32; btn ++){
      button = 'btn' + btn;
      buttonSeq = 'btn' + (btn-16);
      sequencer[button] = sequencerRef2[buttonSeq];
    }
    sequencerRef3 = $scope.data.lessons['lesson'+$scope.lesson]['rhythmicpattern'+$scope.rhythmicPattern].sequencer3;
    for(var btn = 33; btn <= 48; btn ++){
      button = 'btn' + btn;
      buttonSeq = 'btn' + (btn-32);
      sequencer[button] = sequencerRef3[buttonSeq];
    }
    sequencerRef4 = $scope.data.lessons['lesson'+$scope.lesson]['rhythmicpattern'+$scope.rhythmicPattern].sequencer4;
    for(var btn = 49; btn <= 64; btn ++){
      button = 'btn' + btn;
      buttonSeq = 'btn' + (btn-48);
      sequencer[button] = sequencerRef4[buttonSeq];
    }
    console.log(sequencer);

  })
  .catch(function(err) {
    console.error(err);
  });
//**************************************************//

var loadedRef = firebase.database().ref('lessons/Flags/Hardware/LessonIsLoaded');
loadedRef.on('value', function(snapshot) {
  if(snapshot.val() == 1){
    $scope.loadedFlag = false;
  }
  else{
    $scope.loadedFlag = true;
  }
});

var gradedRef = firebase.database().ref('lessons/Flags/Graded/GradedFlag');
gradedRef.on('value', function(snapshot) {
  if(snapshot.val() == 1){
      console.log(snapshot.val());
      $location.url("/RhythmEvaluation");
  }
  else{
  }
});

  var seqNumStart;
  var seqNumEnd;


  var colorGrid = function(seqNum){
    seqNumStart = (seqNum*16)-15;   // if seqNum == 1, then seqNumStart=(1*16)-15= 1. if seqNum == 2, then seqNumStart=(2*16)-15= 17, etc
    seqNumEnd = seqNum * 16;
    for(var i = seqNumStart; i<=seqNumEnd; i++){
      tmpBtn = sequencer["btn"+btnCounter];
      var elem = document.getElementById("animation-target"+btnGrid);
      switch(tmpBtn){
        case 0:
          elem.style.backgroundColor = "#e0e0e0";
        break;
        case 1:
          elem.style.backgroundColor = "#3fc9ee";
        break;
        case 2:
          elem.style.backgroundColor = "#7ee493";
        break;
        case 4:
          elem.style.backgroundColor = "#9a48c9";
        break;
      }
      if(btnGrid == 16){
        btnGrid = 0;
      }
      if(btnCounter == 64){
        btnCounter = 0;
      }
      btnGrid ++;
      btnCounter++;

    }
  }

  //************************************************//
  var less = dataService.getLesson();
  var rp = dataService.getRhythmicPattern();
  var nameRef = firebase.database().ref('/lessons/lesson' + less + '/rhythmicpattern' + rp +'/bpm/');
  nameRef.on('value', function(snapshot){
    $scope.bpm = snapshot.val();
  });
  // $scope.bpm = 120;
  var currBtn = 1;
  var currSeq = 1;
  var currSeqBtn = 1;
  var interval;
  var bounceDuration;
  var bpmConstant = 60000;

  $scope.startInterval = function(){
    interval = setInterval(function(){ $scope.intervalHandler(); }, bpmConstant/($scope.bpm));
  }

  $scope.stopInterval = function(){
    clearInterval(interval);
  }

  $scope.playLesson = function(){
    if(startBtnFlag == 0){
      firebase.database().ref('lessons/Flags/Play/').set({
        PlayLesson: 1
      });
      firebase.database().ref('lessons/Flags/Hardware/').set({
        LessonIsLoaded: 0
      });
      currBtn = 1;
      currSeq = 1;
      currSeqBtn = 1;
      startBtnFlag = 1;
      $scope.startInterval();
    }
  }

  $scope.stopLesson = function(){
    startBtnFlag = 0;
    $scope.stopInterval();
    currBtn = 1;
    currSeq = 1;
    currSeqBtn = 1;
    btnCounter = 1;
    colorGrid(1);
//     firebase.database().ref('lessons/Flags/Hardware/').set({
//   LessonIsLoaded: 1
// });
  }

    $scope.intervalHandler = function(){
    bounceDuration = ((bpmConstant/($scope.bpm))*(sequencer["btn"+currBtn]));
    console.log()
    var bounce = new Bounce();
    bounce.scale({
      from: {
        x: .2,
        y: 1
      },
      to: {
        x: 1,
        y: 1
      },
      easing: "bounce",
      duration: bounceDuration*2,
      delay: 0,
      bounces: 4,
      stiffness: 1
    });

      $scope.sound.play();

    bounce.applyTo(document.getElementById("animation-target"+currSeqBtn));

    currBtn++;
    currSeqBtn++;

    if(currSeqBtn == 17){
      currSeqBtn = 1;
      if(currSeq <4){
        currSeq ++;
        colorGrid(currSeq);
        if (currSeq == 4){
          $scope.lastFlag = false;
        }
      } else {
        // interval.stop();
        $scope.stopInterval();
        colorGrid(1);
        $scope.lastFlag = true;
      }
    }
  }

});
