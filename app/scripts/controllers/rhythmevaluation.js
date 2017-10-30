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
  .controller('RhythmevaluationCtrl', function ($scope) {
    this.awesomeThings = [
  'HTML5 Boilerplate',
  'AngularJS',
  'Karma'
];
    $scope.sortType     = 'name2'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchName   = '';     // set the default search/filter term

    // create the list of students
    $scope.students = [
    { name1: 'Smudge', name2: 'Felis', score: Math.ceil(Math.random()*100) },
    { name1: 'Tibbs', name2: 'Canis', score: Math.ceil(Math.random()*100) },
    { name1: 'Lola', name2: 'Lupus', score: Math.ceil(Math.random()*100) },
    { name1: 'Trey', name2: 'Catus', score: Math.ceil(Math.random()*100) },
    ];
  });
