'use strict';

/**
 * @ngdoc service
 * @name testappApp.dataService
 * @description
 * # dataService
 * Factory in the testappApp.
 */
angular.module('testappApp')
  .factory('dataService', function ($rootScope) {
    var service = {};
    service.lesson = 1;
    service.rhythmicPattern = 1;

    service.sendLesson = function(lesson){
      this.lesson = lesson;
      console.log("current global lesson variable: " + lesson);
      $rootScope.$broadcast('lesson_shared');
    };
    service.sendRhythmicPattern = function(rhythmicPattern){
      this.lesson = lesson;
      this.rhythmicPattern = rhythmicPattern;
      $rootScope.$broadcast('rp_shared');
    };
    service.sendData = function(lesson, rhythmicPattern){
      this.lesson = lesson;
      this.rhythmicPattern = rhythmicPattern;
      $rootScope.$broadcast('data_shared');
    };
    service.sendLesson = function(lesson){
      this.lesson = lesson;
      $rootScope.$broadcast('lesson_shared');
    };
    service.getLesson = function(){
      return this.lesson;
    };
    service.getRhythmicPattern = function(){
      return this.rhythmicPattern;
    };
    return service;
  });
