'use strict';

/**
 * @ngdoc function
 * @name testappApp.controller:StudentperformanceCtrl
 * @description
 * # StudentperformanceCtrl
 * Controller of the testappApp
 */
angular.module('testappApp')
  .controller('StudentperformanceCtrl', function (dataService, firebaseFactory, $scope, $location, $mdDialog, $firebaseArray, $firebase, $firebaseObject) {
    var ref = firebase.database().ref();
    var studentRef = "Arthur Dent";
    var studentCnt;
    var studentAdded;
    $scope.data = $firebaseObject(ref);
    $scope.students = [
      // { name:'Ronaldo' },
      // { name: 'Messi' }
  ];


  $scope.data.$loaded()
    .then(function() {
      studentRef = $scope.data.Students;
      studentCnt = studentRef.numStudents;
      for(var i = 1; i <= studentCnt; i++){
        console.log("hello");
        var nameRef = firebase.database().ref('/Students/Student' + i);
        nameRef.on('value', function(snapshot) {
          $scope.students.push({'name': snapshot.val(), 'num': i});
        });
      }
    } )
    .catch(function(err) {
      console.error(err);
    });

    $scope.addNewStudent = function(ev){
      var studRef = firebase.database().ref('/lessons/lesson' + studentCnt);
      studRef.on('value', function(snapshot) {
        studentAdded = snapshot.val() + 1;
      });
      var studentCnt = studentRef.numStudents;
      var confirm = $mdDialog.prompt()
      .title('Please enter student name')
      //.textContent('Bowser is a common name.')
      .placeholder('Student name')
      .ariaLabel('Student name')
      //.initialValue('Buddy')
      .targetEvent(ev)
      .required(true)
      .ok('Create')
      .cancel('Cancel');

      $mdDialog.show(confirm).then(function(result) {
        var updateNumStudents = {};
        $scope.tmp = studentCnt + 1;
        updateNumStudents['/Students/Student' + $scope.tmp] = result;
        updateNumStudents['/Students/numStudents'] = $scope.tmp;
        firebase.database().ref().update(updateNumStudents);
        window.location.reload();
      });
    };
  });
