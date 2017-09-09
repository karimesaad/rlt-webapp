'use strict';

/**
 * @ngdoc overview
 * @name testappApp
 * @description
 * # testappApp
 *
 * Main module of the application.
 */
angular
  .module('testappApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/lessons', {
        templateUrl: 'views/lessons.html',
        controller: 'LessonsCtrl',
        controllerAs: 'lessons'
      })
      .when('/presentation', {
        templateUrl: 'views/presentation.html',
        controller: 'PresentationCtrl',
        controllerAs: 'presentation'
      })
      .when('/students', {
        templateUrl: 'views/students.html',
        controller: 'StudentsCtrl',
        controllerAs: 'students'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
