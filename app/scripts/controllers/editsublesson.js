'use strict';

/**
 * @ngdoc function
 * @name testappApp.controller:EditsublessonCtrl
 * @description
 * # EditsublessonCtrl
 * Controller of the testappApp
 */
angular.module('testappApp')
  .controller('EditsublessonCtrl', function ($mdDialog, $rootScope, $location, dataService, $scope, firebaseFactory, $firebaseArray, $firebase, $firebaseObject) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /************** global variables ************/
    $scope.editing = false;
    var sequencerRef1;
    var sequencerRef2;
    var sequencerRef3;
    var sequencerRef4;
    var button;
    var buttonSeq;
    var tmpBtn;
    var btnCounter = 1;
    var btnGrid = 1;

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
      "btn64": 0
    }

    var newSequencers = [];

    var seqNumStart;
    var seqNumEnd;

    $scope.sequencers = ['1', '2', '3', '4'];
    $scope.currSequencer = $scope.sequencers[0];
    $scope.timeSignatures = ['3/4', '4/4'];
    $scope.currTimeSignature = $scope.timeSignatures[1];

    $scope.quarterDisabled = false;
    $scope.halfDisabled = false;
    $scope.wholeDisabled = false;

    $scope.quarter = false;
    $scope.half = false;
    $scope.whole = false;
    $scope.rest = false;

    var btnColumn;

    var toggleQuarter = false;
    var toggleHalf = false;
    var toggleWhole = false;
    var toggleRest = false;

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
        // buttons.push(btnRef['btn' + button].hit);
        button = 'btn' + btn;
        // buttons.push(btnRef[button]);
        sequencer[button] = sequencerRef1[button];
      }
      // sequencerRef2 = $scope.data.lessons.lesson1.rhythmicpattern1.sequencer2;
      sequencerRef2 = $scope.data.lessons['lesson'+$scope.lesson]['rhythmicpattern'+$scope.rhythmicPattern].sequencer2;
      for(var btn = 17; btn <= 32; btn ++){
        button = 'btn' + btn;
        buttonSeq = 'btn' + (btn-16);
        sequencer[button] = sequencerRef2[buttonSeq];
      }
      // sequencerRef3 = $scope.data.lessons.lesson1.rhythmicpattern1.sequencer3;
      sequencerRef3 = $scope.data.lessons['lesson'+$scope.lesson]['rhythmicpattern'+$scope.rhythmicPattern].sequencer3;
      for(var btn = 33; btn <= 48; btn ++){
        button = 'btn' + btn;
        buttonSeq = 'btn' + (btn-32);
        sequencer[button] = sequencerRef3[buttonSeq];
      }
      // sequencerRef4 = $scope.data.lessons.lesson1.rhythmicpattern1.sequencer4;
      sequencerRef4 = $scope.data.lessons['lesson'+$scope.lesson]['rhythmicpattern'+$scope.rhythmicPattern].sequencer4;
      for(var btn = 49; btn <= 64; btn ++){
        button = 'btn' + btn;
        buttonSeq = 'btn' + (btn-48);
        sequencer[button] = sequencerRef4[buttonSeq];
      }

      newSequencers[1] = sequencerRef1;
      newSequencers[2] = sequencerRef2;
      newSequencers[3] = sequencerRef3;
      newSequencers[4] = sequencerRef4;

      $scope.colorGrid(1);
    })
    .catch(function(err) {
      console.error(err);
    });
  //**************************************************//


    $scope.colorGrid = function(seqNum){
      if(typeof seqNum === 'undefined'){
        seqNum = $scope.currSequencer;
      }
      console.log(seqNum);
      seqNumStart = (seqNum*16)-15;   // if seqNum == 1, then seqNumStart=(1*16)-15= 1. if seqNum == 2, then seqNumStart=(2*16)-15= 17, etc
      seqNumEnd = seqNum * 16;

      btnCounter = seqNumStart;

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
        // console.log(btnGrid);
        // console.log(btnCounter);
        btnGrid ++;
        btnCounter++;
      }
    }


    var tmpBtn1;
    var tmpBtn2;

    $scope.buttonSelected = function(currBtn){

      $scope.selectedBtn = currBtn;

      //console.log($scope.rowCount(currBtn));
      console.log(newSequencers[$scope.currSequencer]);

      updateCheckbox(currBtn);
      updateNewCheckbox(currBtn);

      btnColumn = currBtn%4;  // button columns: [1] [2] [3] [0]
      if(btnColumn != 1){  //middle columns
        $scope.wholeDisabled = true;
        if(btnColumn == 0){  //last column
          $scope.halfDisabled = true;
        }
      }
      switch(btnColumn){
        case 1:
          tmpBtn1 = currBtn+1;
          if(newSequencers[$scope.currSequencer]['btn'+tmpBtn1] == 0){
            $scope.halfDisabled = false;
            tmpBtn1 = currBtn+2;
            tmpBtn2 = currBtn+3;
            if(newSequencers[$scope.currSequencer]['btn'+tmpBtn1] == 0 && newSequencers[$scope.currSequencer]['btn'+tmpBtn2] == 0){
              $scope.wholeDisabled = false;
            } else {
              $scope.wholeDisabled = true;
            }
          } else {
            $scope.halfDisabled = true;
          }
          $scope.quarterDisabled = false;
          $scope.$apply();

          break;
        case 2:
          tmpBtn1 = currBtn-1;
          if(newSequencers[$scope.currSequencer]['btn'+tmpBtn1] == 2 || newSequencers[$scope.currSequencer]['btn'+tmpBtn1] == 4){
            $scope.quarterDisabled = true;
            $scope.halfDisabled = true;
            $scope.$apply();

            console.log("meow");
          }
          tmpBtn1 = currBtn+1;
          if(newSequencers[$scope.currSequencer]['btn'+tmpBtn1] == 1 || newSequencers[$scope.currSequencer]['btn'+tmpBtn1] == 2){
            $scope.quarterDisabled = false;
            $scope.halfDisabled = true;
            $scope.$apply();

          }
          if(newSequencers[$scope.currSequencer]['btn'+tmpBtn1] == 0){
            $scope.halfDisabled = false;
            $scope.quarterDisabled = false;
            $scope.$apply();

          }
          break;
        case 3:
          tmpBtn1 = currBtn-1;
          tmpBtn2 = currBtn-2;

          if(newSequencers[$scope.currSequencer]['btn'+tmpBtn1] == 2 || newSequencers[$scope.currSequencer]['btn'+tmpBtn2] == 4){
             $scope.quarterDisabled = true;
             $scope.halfDisabled = true;
             $scope.$apply();
          }
          tmpBtn1 = currBtn+1;
          if(newSequencers[$scope.currSequencer]['btn'+tmpBtn1] == 1){
            $scope.quarterDisabled = false;
            $scope.halfDisabled = true;
            $scope.$apply();

          }
          if(newSequencers[$scope.currSequencer]['btn'+tmpBtn1] == 0){
            $scope.halfDisabled = false;
            $scope.quarterDisabled = false;
            $scope.$apply();

          }

          break;
        case 0:
          tmpBtn1 = currBtn-1;
          tmpBtn2 = currBtn-3;
          if(newSequencers[$scope.currSequencer]['btn'+tmpBtn1] == 2 || newSequencers[$scope.currSequencer]['btn'+tmpBtn2] == 4){
            $scope.quarterDisabled = true;
          } else {
            $scope.quarterDisabled = false;
          }
          $scope.$apply();

          break;
      }

      if($scope.rowCount(currBtn)>=4){
        if(newSequencers[$scope.currSequencer]['btn'+currBtn] == 1){
          $scope.halfDisabled = true;
          $scope.wholeDisabled = true;
        }
        if(newSequencers[$scope.currSequencer]['btn'+currBtn] == 2){
          $scope.wholeDisabled = true;
        }
      }
      //console.log(sequencer);
    }

    var updateCheckbox = function(btn){
      switch(newSequencers[$scope.currSequencer]['btn'+btn]){
        case 1:
          $scope.quarter = true;
          $scope.half = false;
          $scope.whole = false;
          $scope.rest = false;
          break;
        case 2:
        $scope.quarter = false;
        $scope.half = true;
        $scope.whole = false;
        $scope.rest = false;
          break;
        case 4:
          $scope.whole = true;
          $scope.quarter = false;
          $scope.half = false;
          $scope.rest = false;
          break;
        case 0:
          $scope.quarter = false;
          $scope.half = false;
          $scope.whole = false;
          $scope.rest = true;
          break;
      }
    }

    var updateNewCheckbox = function(btn){
      switch(newSequencers[$scope.currSequencer]['btn'+btn]){
        case 1:
          $scope.newQuarter = true;
          $scope.newHalf = false;
          $scope.newWhole = false;
          $scope.newRest = false;
          break;
        case 2:
        $scope.newQuarter = false;
        $scope.newHalf = true;
        $scope.newWhole = false;
        $scope.newRest = false;
          break;
        case 4:
          $scope.newWhole = true;
          $scope.newQuarter = false;
          $scope.newHalf = false;
          $scope.newRest = false;
          break;
        case 0:
          $scope.newQuarter = false;
          $scope.newHalf = false;
          $scope.newWhole = false;
          $scope.newRest = true;
          break;
      }
    }

    var resetNewCheckbox = function(){
      $scope.newQuarter = false;
      $scope.newHalf = false;
      $scope.newWhole = false;
      $scope.newRest = false;
    }

    var count;
    var start;
    var end;
    $scope.rowCount = function(currBtn){
      count = 0;
      start = Math.floor(currBtn/4)*4 + 1;    //currBtn = 11   currBtn/4= 2   start tiene que ser=9  end=12        currBtn = 9  currBtn/2 = 2     if currBtn/4 = 1, (currBtn/4)*4 + 1
      end = start + 3;
      for(var i = start; i<=end; i++){
        count += newSequencers[$scope.currSequencer]['btn'+i];
      }
      return count;
    }

    $scope.checked = function(note){

      switch(note){
        case 1:
          if(toggleQuarter == false){
            toggleQuarter = true;
          }  else {
            toggleQuarter = false;
          }
          console.log('ng-change quarterSelected');
          console.log($scope.newQuarter);
          console.log("selectedBtn: "+$scope.selectedBtn);
          console.log("toggleQuarter: "+$scope.toggleQuarter);

          $scope.newHalf = false;
          $scope.newWhole = false;
          $scope.newRest = false;

          if(toggleQuarter){
            newSequencers[$scope.currSequencer]['btn'+$scope.selectedBtn] = 1;
            colorButton(1);

          } else {
            newSequencers[$scope.currSequencer]['btn'+$scope.selectedBtn] = 0;
            $scope.newRest = true;
            colorButton(0);
          }
          break;
        case 2:
          if(toggleHalf == false){
            toggleHalf = true;
          }  else {
            toggleHalf = false;
          }
          console.log('ng-change halfSelected');
          console.log($scope.newHalf);
          console.log("selectedBtn: "+$scope.selectedBtn);
          console.log("toggleHalf: "+$scope.toggleHalf);

          $scope.newQuarter = false;
          $scope.newWhole = false;
          $scope.newRest = false;

          if(toggleHalf){
            newSequencers[$scope.currSequencer]['btn'+$scope.selectedBtn] = 2;
            colorButton(2);
          }
          else {
            newSequencers[$scope.currSequencer]['btn'+$scope.selectedBtn] = 0;
            $scope.newRest = true;
            colorButton(0);
          }
          break;
        case 4:
          if(toggleWhole == false){
            toggleWhole = true;
          }  else {
            toggleWhole = false;
          }
          console.log('ng-change wholeSelected');
          console.log($scope.newWhole);
          console.log("selectedBtn: "+$scope.selectedBtn);
          console.log("toggleWhole: "+$scope.toggleWhole);

          $scope.newQuarter = false;
          $scope.newHalf = false;
          $scope.newRest = false;

          if(toggleWhole){
            newSequencers[$scope.currSequencer]['btn'+$scope.selectedBtn] = 4;
            colorButton(4);
          }
          else {
            newSequencers[$scope.currSequencer]['btn'+$scope.selectedBtn] = 0;
            $scope.newRest = true;
            colorButton(0);
          }
          break;
        case 0:
          if(toggleRest == false){
            toggleRest = true;
          }  else {
            toggleRest = false;
          }
          console.log('ng-change restSelected');
          console.log($scope.newRest);
          console.log("selectedBtn: "+$scope.selectedBtn);
          console.log("toggleRest: "+$scope.toggleRest);

          $scope.newQuarter = false;
          $scope.newHalf = false;
          $scope.newWhole = false;

          if(toggleRest){
            newSequencers[$scope.currSequencer]['btn'+$scope.selectedBtn] = 0;
            colorButton(0);
          }
          break;
        default:
          newSequencers[$scope.currSequencer]['btn'+$scope.selectedBtn] = 0;
          colorButton(0);
      }
      console.log(newSequencers[$scope.currSequencer]);
    }

    var colorButton = function(noteDuration){
      console.log("selectedBtn: "+$scope.selectedBtn+"  noteDuration: "+noteDuration);
      console.log(newSequencers[$scope.currSequencer]);
      var elem = document.getElementById("animation-target"+$scope.selectedBtn);
      switch(noteDuration){
        case 1:
          elem.style.backgroundColor = "#3fc9ee";
          break;
        case 2:
          elem.style.backgroundColor = "#7ee493";
          break;
        case 4:
          elem.style.backgroundColor = "#9a48c9";
          break;
        case 0:
          elem.style.backgroundColor = "#e0e0e0";
          break;
      }
    }

    $scope.showConfirm = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to change the time signature?')
        // .textContent('This will erase any modifications made to the last column.')
        .ariaLabel('Time signature')
        .targetEvent(ev)
        .ok('Yes')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        $scope.status = 'Time signature changed.';
        if($scope.currTimeSignature == $scope.timeSignatures[0]){
          disableLastColumn();
        } else {
          enableLastColumn();
        }
      }, function() {
        $scope.status = 'Time signature was not changed.';
      });
    };

    var disableLastColumn = function(){
      $scope.hideLastCol = true;
    }

    var enableLastColumn = function(){
      $scope.hideLastCol = false;
    }

    $scope.bpmValidation = function(){
      if(!($scope.bpm >= 40 && $scope.bpm <= 200)){
        $scope.bpm = "";
      }
    }
    $scope.editLesson = function(){
      $scope.editing = true;
    }

    $scope.saveLesson = function(){
      console.log(sequencer);
      console.log("inside save lesson function");

      console.log("newSequencers: ");
      console.log(newSequencers);

      $scope.editing = false;


      for(var btn = 1; btn <= 16; btn ++){
        button = 'btn' + btn;
        sequencer[button] = newSequencers[1][button];
      }
      for(var btn = 17; btn <= 32; btn ++){
        button = 'btn' + btn;
        buttonSeq = 'btn' + (btn-16);
        sequencer[button] = newSequencers[2][buttonSeq];
      }
      // sequencerRef3 = $scope.data.lessons.lesson1.rhythmicpattern1.sequencer3;
      sequencerRef3 = $scope.data.lessons['lesson'+$scope.lesson]['rhythmicpattern'+$scope.rhythmicPattern].sequencer3;
      for(var btn = 33; btn <= 48; btn ++){
        button = 'btn' + btn;
        buttonSeq = 'btn' + (btn-32);
        sequencer[button] = newSequencers[3][buttonSeq];
      }
      // sequencerRef4 = $scope.data.lessons.lesson1.rhythmicpattern1.sequencer4;
      sequencerRef4 = $scope.data.lessons['lesson'+$scope.lesson]['rhythmicpattern'+$scope.rhythmicPattern].sequencer4;
      for(var btn = 49; btn <= 64; btn ++){
        button = 'btn' + btn;
        buttonSeq = 'btn' + (btn-48);
        sequencer[button] = newSequencers[4][buttonSeq];
      }
      if($scope.currTimeSignature == $scope.timeSignatures[0]){
        for(var i =4; i<=64; i=i+4){
          sequencer['btn'+i] = 0;
        }
      }
      console.log(sequencer);
    }

    //   firebase.database().ref('/lessons/lesson1/sublesson1/stepsequencer1/btn' + i).set({
    //     hit: values[arrayPtr]
    //   });
    //   arrayPtr++;
    // }
    // console.log(values);
    // }

    $scope.$on('data_shared',function(){
        var data = dataService.getLesson();
        console.log(data);
    });

  });
