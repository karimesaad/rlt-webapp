'use strict';

/**
 * @ngdoc function
 * @name testappApp.controller:LessonslistCtrl
 * @description
 * # LessonslistCtrl
 * Controller of the testappApp
 */
angular.module('testappApp')
  .controller('LessonslistCtrl', function(dataService, firebaseFactory, $scope, $location, $mdDialog, $firebaseArray, $firebase, $firebaseObject){

    var ref = firebase.database().ref();
    var lessonRef = 42;
    $scope.data = $firebaseObject(ref);
    $scope.lessons = [];
    $scope.RPs = [];
    var lessonCnt;
    var RPCnt;
    var RPadded = 0;
    $scope.currLessons = 1;


    $scope.data.$loaded()
      .then(function() {
        lessonRef = $scope.data.lessons;
        lessonCnt = lessonRef.numLessons;

        for(var i = 1; i <= lessonCnt; i++){
          var nameRef = firebase.database().ref('/lessons/lesson' + i + '/name');
          nameRef.on('value', function(snapshot) {
            $scope.lessons.push({'name': snapshot.val(), 'num': i});
          });
        }
      } )
      .catch(function(err) {
        console.error(err);
      });


    $scope.addNewLesson = function(ev){
    var lessonCnt = lessonRef.numLessons;
    var confirm = $mdDialog.prompt()
    .title('What would you like to name this new lesson?')
    //.textContent('Bowser is a common name.')
    .placeholder('Lesson name')
    .ariaLabel('Lesson name')
    //.initialValue('Buddy')
    .targetEvent(ev)
    .required(true)
    .ok('Create')
    .cancel('Cancel');

  $mdDialog.show(confirm).then(function(result) {
    lessonCnt = lessonCnt + 1;
    //console.log(lessonCnt);
    firebase.database().ref('/lessons/lesson' + lessonCnt + '/').set({
      name: result,
      numRP: 0,
      timesignature: 4
    });
    var updateNumLesson = {};
    updateNumLesson['/lessons/numLessons/'] = lessonCnt;
    firebase.database().ref().update(updateNumLesson);
    console.log(result);
    window.location.reload();
    console.log("refresh check");
  }, function() {
    console.log('Cancelled');
  });
};

$scope.addNewRP = function(){
  console.log("rp test");
  var RPRef = firebase.database().ref('/lessons/lesson' + $scope.currLessons + '/numRP');
  RPRef.on('value', function(snapshot) {
    RPadded = snapshot.val() + 1;
  });
  firebase.database().ref('/lessons/lesson' + $scope.currLessons + '/rhythmicpattern' + RPadded ).set({
    bpm: 60,
    sequencer1: {
      btn1: 0,
      btn2: 0,
      btn3: 0,
      btn4: 0,
      btn5: 0,
      btn6: 0,
      btn7: 0,
      btn8: 0,
      btn9: 0,
      btn10: 0,
      btn11: 0,
      btn12: 0,
      btn13: 0,
      btn14: 0,
      btn15: 0,
      btn16: 0
    },
    sequencer2: {
      btn1: 0,
      btn2: 0,
      btn3: 0,
      btn4: 0,
      btn5: 0,
      btn6: 0,
      btn7: 0,
      btn8: 0,
      btn9: 0,
      btn10: 0,
      btn11: 0,
      btn12: 0,
      btn13: 0,
      btn14: 0,
      btn15: 0,
      btn16: 0
    },
    sequencer3: {
      btn1: 0,
      btn2: 0,
      btn3: 0,
      btn4: 0,
      btn5: 0,
      btn6: 0,
      btn7: 0,
      btn8: 0,
      btn9: 0,
      btn10: 0,
      btn11: 0,
      btn12: 0,
      btn13: 0,
      btn14: 0,
      btn15: 0,
      btn16: 0
    },
    sequencer4: {
      btn1: 0,
      btn2: 0,
      btn3: 0,
      btn4: 0,
      btn5: 0,
      btn6: 0,
      btn7: 0,
      btn8: 0,
      btn9: 0,
      btn10: 0,
      btn11: 0,
      btn12: 0,
      btn13: 0,
      btn14: 0,
      btn15: 0,
      btn16: 0
    }
  });
  var updateNumRP = {};
  updateNumRP['/lessons/lesson' + $scope.currLessons + '/numRP/'] = RPadded;
  firebase.database().ref().update(updateNumRP);
window.location.reload();
}

    $scope.lessonSelected = function(lessonNum){
      $scope.RPs.length = 0;
      dataService.sendLesson(lessonNum);
      console.log("lesson chosen is: "+lessonNum);
      $scope.currLessons = dataService.getLesson();
      var nameRef = firebase.database().ref('/lessons/lesson' + $scope.currLessons + '/numRP');
      nameRef.on('value', function(snapshot) {
        RPCnt = snapshot.val();
      });
      for(var i = 1; i <= RPCnt; i++){
        var RPRef = firebase.database().ref('/lessons/lesson' + $scope.currLessons + '/rhythmicpattern' + i);
        RPRef.on('value', function(snapshot) {
          $scope.RPs.push({'name': 'Rhythmic Pattern ' + i, 'num': i});
        });
      }
      //window.location.reload();
    }

    $scope.goToPlay = function(rhy){
      console.log(rhy);
      var updateCurrents = {};
      updateCurrents['/lessons/lessonchosen'] = $scope.currLessons;
      updateCurrents['/lessons/rhythmicpatternchosen'] = rhy;
      updateCurrents['/lessons/Flags/Software/LoadLesson'] = 1;
      dataService.sendRhythmicPattern(rhy);
      firebase.database().ref().update(updateCurrents);
        $location.url("/PlaySublesson");
    }

    $scope.goToEdit = function(rhy){
      var updateCurrents = {};
      updateCurrents['/lessons/lessonchosen'] = $scope.currLessons;
      updateCurrents['/lessons/rhythmicpatternchosen'] = rhy;
      firebase.database().ref().update(updateCurrents);
      dataService.sendRhythmicPattern(rhy);
      console.log(rhy);
          $location.url("/EditSublesson");
    }

    $scope.goToGrade = function(rhy){
      var updateCurrents = {};
      updateCurrents['/lessons/lessonchosen'] = $scope.currLessons;
      updateCurrents['/lessons/rhythmicpatternchosen'] = rhy;
      firebase.database().ref().update(updateCurrents);
      dataService.sendRhythmicPattern(rhy);
          $location.url("/RhythmEvaluation");
    }

  });
