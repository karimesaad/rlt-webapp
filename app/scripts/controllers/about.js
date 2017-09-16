'use strict';

/**
 * @ngdoc function
 * @name testappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the testappApp
 */
angular.module('testappApp')
  .controller('AboutCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var sequencer = new Nexus.Sequencer('#sequencer',{
      'size': [500,500],
      'mode': 'toggle',
      'rows': 4,
      'columns': 4
    });

    var startButton = new Nexus.Button('#start-button',{
      'id': 'circle-svg',
      'size': [60,60],
      'mode': 'toggle',
      'state': false
    });
    var stopButton = new Nexus.Button('#stop-button',{
      'id': 'circle-svg',
      'size': [60,60],
      'mode': 'toggle',
      'state': false
    });

    $scope.bpm1 = 200;

    startButton.on('change', function(v){
      sequencer.start($scope.bpm1);
      console.log(sequencer.matrix.pattern);
      console.log("buttons 1 - 4: ");
      console.log(sequencer.matrix.pattern[0]);
      console.log("is button 8 pressed? ");
      console.log(sequencer.matrix.pattern[1][3]);
    });
    stopButton.on('change', function(v){
      sequencer.stop();
      console.log(sequencer.matrix.pattern);

    });
    var displayBPM = function(){
      //console.log($scope.bpm1);
    };

  });
