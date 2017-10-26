'use strict';

/**
 * @ngdoc function
 * @name testappApp.controller:LessonslistCtrl
 * @description
 * # LessonslistCtrl
 * Controller of the testappApp
 */
angular.module('testappApp')
  .controller('LessonslistCtrl', function($scope, $location, $mdDialog, firebaseFactory, $firebaseArray, $firebase, $firebaseObject){
    var ref = firebase.database().ref();
    var lessonRef = 42;
    $scope.data = $firebaseObject(ref);
    $scope.lessons = [];
    var lessonCnt;

    $scope.data.$loaded()
      .then(function() {
        lessonRef = $scope.data.lessons;
        lessonCnt = lessonRef.numLessons;

        for(var i = 1; i <= lessonCnt; i++){
          console.log("hello");
          var nameRef = firebase.database().ref('/lessons/lesson' + i + '/name');
          nameRef.on('value', function(snapshot) {
            $scope.lessons.push({'name': snapshot.val()});
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

    // $scope.lessons.push({ 'name':$scope.name});
    // $scope.name = '';
    //console.log($scope.lessons);
  }, function() {
    console.log('Cancelled');
  });
};

// $scope.addRow = function(){
//   var lessonCnt = lessonRef.numLessons;
//
//     lessonCnt = lessonCnt + 1;
//     $scope.lessons.push({ 'name':$scope.name})
//
//     //console.log(lessonCnt);
//     firebase.database().ref('/lessons/lesson' + lessonCnt + '/').set({
//       name: $scope.name,
//       numRP: 0,
//       timesignature: 4
//     });
//     var updateNumLesson = {};
//     updateNumLesson['/lessons/numLessons/'] = lessonCnt;
//     return firebase.database().ref().update(updateNumLesson);
//    };


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
