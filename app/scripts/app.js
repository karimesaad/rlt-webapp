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
    'ngMaterial',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'firebase',
    'ngMaterial',
    'ngAudio'
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
      .when('/LessonsList', {
        templateUrl: 'views/lessonslist.html',
        controller: 'LessonslistCtrl',
        controllerAs: 'LessonsList'
      })
      .when('/LessonPage', {
        templateUrl: 'views/lessonpage.html',
        controller: 'LessonpageCtrl',
        controllerAs: 'LessonPage'
      })
      .when('/PlaySublesson', {
        templateUrl: 'views/playsublesson.html',
        controller: 'PlaysublessonCtrl',
        controllerAs: 'PlaySublesson'
      })
      .when('/EditSublesson', {
        templateUrl: 'views/editsublesson.html',
        controller: 'EditsublessonCtrl',
        controllerAs: 'EditSublesson'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
