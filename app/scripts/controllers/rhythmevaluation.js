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

  });
