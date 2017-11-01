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
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var ref = firebase.database().ref();
    var lessonRef = 42;
    $scope.data = $firebaseObject(ref);
    $scope.lessons = [];
    $scope.RPs = [];
    var lessonCnt;
    var RPadded = 0;
    $scope.currLessons = 1;


    $scope.data.$loaded()
      .then(function() {
        lessonRef = $scope.data.lessons;
        lessonCnt = lessonRef.numLessons;

        for(var i = 1; i <= lessonCnt; i++){
          console.log("hello");
          var nameRef = firebase.database().ref('/lessons/lesson' + i + '/name');
          nameRef.on('value', function(snapshot) {
            $scope.lessons.push({'name': snapshot.val(), 'num': i});
          });
        }
      } )
      .catch(function(err) {
        console.error(err);
      });

    $scope.showPageContent = function(lessonInt){
      switch(lessonInt) {
        case 1:
          $scope.lesson = 1;
          console.log("lesson 1");
          break;
        case 2:
          $scope.lesson =2;
          console.log("lesson 2");
          break;
        default:
          console.log("lesson 0");
          break;
      }
    }

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
      btn12: 0,
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
      btn12: 0,
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
      btn12: 0,
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
      btn12: 0,
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
      dataService.sendLesson(lessonNum);
      console.log("lesson chosen is: "+lessonNum);
      $scope.currLessons = dataService.getLesson();
      
    }

    $scope.goToPlay = function(){
        var param = {
            lesson: $scope.lesson
        }
        console.log("inside play function");
        $location.url("/PlaySublesson").search(param);
    }

    $scope.goToEdit = function(){
        var param = {
            lesson: $scope.lesson
        }
        console.log("inside edit function");
        $location.url("/EditSublesson").search(param);
    }


  });
