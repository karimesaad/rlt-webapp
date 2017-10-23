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
    service.lesson = 0;
    service.rhythmicPattern = 0;

    service.sendData = function(lesson, rhythmicPattern){
      this.lesson = lesson;
      this.rhythmicPattern = rhythmicPattern;
      $rootScope.$broadcast('data_shared');
    };
    service.getLesson = function(){
      return this.lesson;
    };
    service.getRhythmicPattern = function(){
      return this.rhythmicPattern;
    };
    return service;
  });
