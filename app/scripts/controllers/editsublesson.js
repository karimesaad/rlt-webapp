'use strict';

/**
 * @ngdoc function
 * @name testappApp.controller:EditsublessonCtrl
 * @description
 * # EditsublessonCtrl
 * Controller of the testappApp
 */
angular.module('testappApp')
  .controller('EditsublessonCtrl', function ($rootScope, $location, dataService, $scope, firebaseFactory, $firebaseArray, $firebase, $firebaseObject) {
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

    var newSequencer1 = [];
    var newSequencer2 = [];
    var newSequencer3 = [];
    var newSequencer4 = [];

    var seqNumStart;
    var seqNumEnd;

    $scope.sequencers = ['1', '2', '3', '4'];
    $scope.currSequencer = $scope.sequencers[0];

    $scope.closeDropDown = function() {
      $scope.isopen = false;
    };

    $scope.quarterDisabled = false;
    $scope.halfDisabled = false;
    $scope.wholeDisabled = false;
    var btnColumn;


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
      console.log(sequencer);
      $scope.colorGrid(1);
      newSequencer1 = sequencerRef1;
      newSequencer2 = sequencerRef2;
      newSequencer3 = sequencerRef3;
      newSequencer4 = sequencerRef4;
      console.log(newSequencer1['btn'+1]);


    })
    .catch(function(err) {
      console.error(err);
    });
  //**************************************************//


    $scope.colorGrid = function(seqNum){
      if(typeof seqNum === 'undefined'){
        seqNum = $scope.currSequencer;
        console.log(seqNum);
      }
      console.log($scope.currSequencer);
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

    $scope.buttonSelected = function(currBtn){
      $scope.quarterDisabled = false;
      $scope.halfDisabled = false;
      $scope.wholeDisabled = false;
      btnColumn = currBtn%4;  // button columns: [1] [2] [3] [0]
      if(btnColumn != 1){
        $scope.wholeDisabled = true;
        if(btnColumn == 0){
          $scope.halfDisabled = true;
        }
      }
      console.log("******");

      console.log($scope.currSequencer);
      switch($scope.currSequencer){
        case 1:
          console.log("here1");
          switch(btnColumn){
            case 1:
              if(newSequencer1['btn'+btn+1] == 0){
                console.log(newSequencer1['btn'+btn+1]);
                $scope.halfDisabled = false;
              }
              if(newSequencer1['btn'+btn+2] == 0 && newSequencer1['btn'+btn+3] == 0){
                $scope.wholeDisabled = false;
              }
            break;
            case 2:
              //check if previous is a half, if yes then disable everything
              // $scope.quarterDisabled = true;
              // $scope.halfDisabled = true;
              //       else if next one is a quarter or half, then only allow quarter
              //          $scope.quarterDisabled = false;
              //            else if it is a rest, then also allow halfs
              //                $scope.halfDisabled = false;
              if(newSequencer1['btn'+btn-1] == 2){
                $scope.quarterDisabled = true;
                $scope.halfDisabled = true;
              } else {
                if(newSequencer1['btn'+btn+1] == 1 || newSequencer1['btn'+btn+1] == 2){
                  $scope.quarterDisabled = false;
                } else {
                  if(newSequencer1['btn'+btn+1] == 0)
                  $scope.halfDisabled = false;
                }
              }
            break;
            case 3:
              //check if previous is a half, if yes then disable everything
              //        $scope.quarterDisabled = true;
              //        $scope.halfDisabled = true;
              //      else if next one is a quarter, then only allow quarter
              //        $scope.quarterDisabled = false;
              //            else if it is a rest, then also allow halfs
              //        $scope.halfDisabled = false;
              if(newSequencer1['btn'+btn-1] == 2){
                 $scope.quarterDisabled = true;
                 $scope.halfDisabled = true;
              } else {
                if(newSequencer1['btn'+btn+1] == 1){
                  $scope.quarterDisabled = false;
                } else {
                  if(newSequencer1['btn'+btn+1] == 0){
                  $scope.halfDisabled = false;
                  }
                }
              }
            break;
            case 0:
            //check if previous is a half, if yes then disable everything
            //        $scope.quarterDisabled = true;
            //       else allow quarters and rests
            //        $scope.quarterDisabled = false;
              if(newSequencer1['btn'+btn-1] == 2){
                $scope.quarterDisabled = true;
              } else {
                $scope.quarterDisabled = false;
              }
            break;
          }
        break;
        case 2:
        console.log("here2");
          switch(btnColumn){
            case 1:
              //check if the next one is a rest, if yes allow halfs
              //$scope.halfDisabled = false;
              //  if the next two are also rests, allow whole
              //$scope.wholeDisabled = false;
              if(newSequencer2['btn'+btn+1] == 0){
                $scope.halfDisabled = false;
              }
              if(newSequencer2['btn'+btn+2] == 0 && newSequencer2['btn'+btn+3] == 0){
                $scope.wholeDisabled = false;
              }
            break;
            case 2:
              //check if previous is a half, if yes then disable everything
              // $scope.quarterDisabled = true;
              // $scope.halfDisabled = true;
              //       else if next one is a quarter or half, then only allow quarter
              //          $scope.quarterDisabled = false;
              //            else if it is a rest, then also allow halfs
              //                $scope.halfDisabled = false;
              if(newSequencer2['btn'+btn-1] == 2){
                $scope.quarterDisabled = true;
                $scope.halfDisabled = true;
              } else {
                if(newSequencer2['btn'+btn+1] == 1 || newSequencer2['btn'+btn+1] == 2){
                  $scope.quarterDisabled = false;
                } else {
                  if(newSequencer2['btn'+btn+1] == 0)
                  $scope.halfDisabled = false;
                }
              }

            break;
            case 3:
              //check if previous is a half, if yes then disable everything
              //        $scope.quarterDisabled = true;
              //        $scope.halfDisabled = true;
              //      else if next one is a quarter, then only allow quarter
              //        $scope.quarterDisabled = false;
              //            else if it is a rest, then also allow halfs
              //        $scope.halfDisabled = false;
              if(newSequencer2['btn'+btn-1] == 2){
                 $scope.quarterDisabled = true;
                 $scope.halfDisabled = true;
              } else {
                if(newSequencer2['btn'+btn+1] == 1){
                  $scope.quarterDisabled = false;
                } else {
                  if(newSequencer2['btn'+btn+1] == 0){
                  $scope.halfDisabled = false;
                  }
                }
              }

            break;
            case 0:
              //check if previous is a half, if yes then disable everything
              //        $scope.quarterDisabled = true;
              //       else allow quarters and rests
              //        $scope.quarterDisabled = false;
              if(newSequencer2['btn'+btn-1] == 2){
                $scope.quarterDisabled = true;
              } else {
                $scope.quarterDisabled = false;
              }
            break;
          }
        break;
        case 3:
        console.log("here3");
          switch(btnColumn){
            case 1:
              //check if the next one is a rest, if yes allow halfs
              //$scope.halfDisabled = false;
              //  if the next two are also rests, allow whole
              //$scope.wholeDisabled = false;
              if(newSequencer3['btn'+btn+1] == 0){
                $scope.halfDisabled = false;
              }
              if(newSequencer3['btn'+btn+2] == 0 && newSequencer3['btn'+btn+3] == 0){
                $scope.wholeDisabled = false;
              }
            break;
            case 2:
              //check if previous is a half, if yes then disable everything
              // $scope.quarterDisabled = true;
              // $scope.halfDisabled = true;
              //       else if next one is a quarter or half, then only allow quarter
              //          $scope.quarterDisabled = false;
              //            else if it is a rest, then also allow halfs
              //                $scope.halfDisabled = false;
              if(newSequencer3['btn'+btn-1] == 2){
                $scope.quarterDisabled = true;
                $scope.halfDisabled = true;
              } else {
                if(newSequencer3['btn'+btn+1] == 1 || newSequencer3['btn'+btn+1] == 2){
                  $scope.quarterDisabled = false;
                } else {
                  if(newSequencer3['btn'+btn+1] == 0)
                  $scope.halfDisabled = false;
                }
              }

            break;
            case 3:
              //check if previous is a half, if yes then disable everything
              //        $scope.quarterDisabled = true;
              //        $scope.halfDisabled = true;
              //      else if next one is a quarter, then only allow quarter
              //        $scope.quarterDisabled = false;
              //            else if it is a rest, then also allow halfs
              //        $scope.halfDisabled = false;
              if(newSequencer3['btn'+btn-1] == 2){
                 $scope.quarterDisabled = true;
                 $scope.halfDisabled = true;
              } else {
                if(newSequencer3['btn'+btn+1] == 1){
                  $scope.quarterDisabled = false;
                } else {
                  if(newSequencer3['btn'+btn+1] == 0){
                  $scope.halfDisabled = false;
                  }
                }
              }

            break;
            case 0:
              //check if previous is a half, if yes then disable everything
              //        $scope.quarterDisabled = true;
              //       else allow quarters and rests
              //        $scope.quarterDisabled = false;
              if(newSequencer3['btn'+btn-1] == 2){
                $scope.quarterDisabled = true;
              } else {
                $scope.quarterDisabled = false;
              }
            break;
          }
        break;
        case 4:
        console.log("here4");
          switch(btnColumn){
            case 1:
            //check if the next one is a rest, if yes allow halfs
            //$scope.halfDisabled = false;
            //  if the next two are also rests, allow whole
            //$scope.wholeDisabled = false;
            if(newSequencer4['btn'+btn+1] == 0){
              $scope.halfDisabled = false;
            }
            if(newSequencer4['btn'+btn+2] == 0 && newSequencer4['btn'+btn+3] == 0){
              $scope.wholeDisabled = false;
            }

            break;
            case 2:
              //check if previous is a half, if yes then disable everything
              // $scope.quarterDisabled = true;
              // $scope.halfDisabled = true;
              //       else if next one is a quarter or half, then only allow quarter
              //          $scope.quarterDisabled = false;
              //            else if it is a rest, then also allow halfs
              //                $scope.halfDisabled = false;
              if(newSequencer4['btn'+btn-1] == 2){
                $scope.quarterDisabled = true;
                $scope.halfDisabled = true;
              } else {
                if(newSequencer4['btn'+btn+1] == 1 || newSequencer4['btn'+btn+1] == 2){
                  $scope.quarterDisabled = false;
                } else {
                  if(newSequencer4['btn'+btn+1] == 0)
                  $scope.halfDisabled = false;
                }
              }

            break;
            case 3:
              //check if previous is a half, if yes then disable everything
              //        $scope.quarterDisabled = true;
              //        $scope.halfDisabled = true;
              //      else if next one is a quarter, then only allow quarter
              //        $scope.quarterDisabled = false;
              //            else if it is a rest, then also allow halfs
              //        $scope.halfDisabled = false;
              if(newSequencer4['btn'+btn-1] == 2){
                 $scope.quarterDisabled = true;
                 $scope.halfDisabled = true;
              } else {
                if(newSequencer4['btn'+btn+1] == 1){
                  $scope.quarterDisabled = false;
                } else {
                  if(newSequencer4['btn'+btn+1] == 0){
                  $scope.halfDisabled = false;
                  }
                }
              }
            break;
            case 0:
              //check if previous is a half, if yes then disable everything
              //        $scope.quarterDisabled = true;
              //       else allow quarters and rests
              //        $scope.quarterDisabled = false;
              if(newSequencer4['btn'+btn-1] == 2){
                $scope.quarterDisabled = true;
              } else {
                $scope.quarterDisabled = false;
              }
            break;
          }
        break;
      }
    }



    $scope.editLesson = function(){
      console.log("inside edit lesson function");
      $scope.editing = true;
    }

    $scope.saveLesson = function(){
      console.log("inside save lesson function");
      $scope.editing = false;
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

//
  });
