'use strict';

/**
 * @ngdoc function
 * @name testappApp.controller:RhythmevaluationCtrl
 * @description
 * # RhythmevaluationCtrl
 * Controller of the testappApp
 */

 // app.js

angular.module('testappApp')
  .controller('RhythmevaluationCtrl', function (firebaseFactory, dataService, ngAudio, $scope, $firebaseArray, $firebase, $firebaseObject) {

    var ref = firebase.database().ref();
    var studentRef = "Arthur Dent";
    var studentCnt;
    var studentAdded;
    var lesson;
    var rhy;
    // var lessonRef = 42;
    $scope.data = $firebaseObject(ref);
    // $scope.lessons = [];
    // $scope.RPs = [];
    // var lessonCnt;
    // var RPCnt;
    // var RPadded = 0;
    // $scope.currLessons = 1;

    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchName   = '';     // set the default search/filter term
    /*********** GET DATA PASSED FROM PREVIOUS PAGE ***********/
    $scope.lesson = dataService.getLesson();
    $scope.rhythmicPattern = dataService.getRhythmicPattern();
    // create the list of students
    $scope.students = [
    // { name1: 'Smudge', name2: 'Felis', score: Math.ceil(Math.random()*100) },
    // { name1: 'Tibbs', name2: 'Canis', score: Math.ceil(Math.random()*100) },
    // { name1: 'Lola', name2: 'Lupus', score: Math.ceil(Math.random()*100) },
    // { name1: 'Trey', name2: 'Catus', score: Math.ceil(Math.random()*100) },
    ];

    $scope.data.$loaded()
      .then(function() {
        $scope.students.length = 0;
        studentRef = $scope.data.Students;
        studentCnt = studentRef.numStudents;
        var feedbackNameRef = firebase.database().ref('/lessons/currUser');
        firebase.database().ref('lessons/Flags/Graded/').set({
          GradedFlag: 0
        });
        feedbackNameRef.on('value', function(snapshot) {
          $scope.username = snapshot.val();
          console.log("current user is" + $scope.username);
        });
        var scoreRef = firebase.database().ref('/Feedback/lesson' + $scope.lesson + '/RhythmicPattern/' + $scope.rhythmicPattern + '/Grade/' + $scope.username + '/Percentage/');
        scoreRef.on('value', function(snapshot) {
          $scope.percentage = snapshot.val();
          console.log("% is " + snapshot.val());
        });
        var updateScore = {};
        updateScore['/Students/Lesson' + $scope.lesson + '/RP' + $scope.rhythmicPattern +'/' + $scope.username + '/'] = $scope.percentage;
        firebase.database().ref().update(updateScore);
        for(var i = 1; i <= studentCnt; i++){
          console.log("hello");
          var nameRef = firebase.database().ref('/Students/Student' + i);
          nameRef.on('value', function(snapshot) {
            $scope.tempName = snapshot.val();
          });
          var scoreRef = firebase.database().ref('/Students/Lesson' + $scope.lesson + '/RP' + $scope.rhythmicPattern +'/' + $scope.tempName);
          scoreRef.on('value', function(snapshot) {
            if (snapshot.val() == null){
              $scope.tempScore = 0;
            }
            else{
            $scope.tempScore = snapshot.val();
          }
          });

          $scope.students.push({'name': $scope.tempName, 'score': $scope.tempScore});
        }
      } )
      .catch(function(err) {
        console.error(err);
      });

  });
