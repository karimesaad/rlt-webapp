'use strict';

/**
 * @ngdoc function
 * @name testappApp.controller:LessonslistCtrl
 * @description
 * # LessonslistCtrl
 * Controller of the testappApp
 */
angular.module('testappApp')
  .controller('LessonslistCtrl', function($scope, $location, firebaseFactory, $firebaseArray, $firebase, $firebaseObject){
    var ref = firebase.database().ref();
    var lessonRef = 42;
    $scope.data = $firebaseObject(ref);

    $scope.data.$loaded()
      .then(function() {
        lessonRef = $scope.data.lessons;
      } )
      .catch(function(err) {
        console.error(err);
      });

    $scope.showPageContent = function(lesson){
      switch(lesson) {
        case 1:
          $scope.lesson = lessonRef.lesson1.name;
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
