'use strict';

/**
 * @ngdoc function
 * @name testappApp.controller:EditsublessonCtrl
 * @description
 * # EditsublessonCtrl
 * Controller of the testappApp
 */
angular.module('testappApp')
  .controller('EditsublessonCtrl', function ($scope, firebaseFactory, $firebaseArray, $firebase, $firebaseObject) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var editSequencer = new Nexus.Sequencer('#sequencer',{
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
    startButton.on('change', function(v){
      pushSequencer();
    });
    function pushSequencer() {
      var values = [];


      for (var i = 0; i < 4; i++){
        for (var j = 0; j < 4; j++){

           values.push(editSequencer.matrix.pattern[i][j]);

        }
      }
      var arrayPtr = 0;
      for (var i = 1; i < 17; i++){

  firebase.database().ref('/lessons/lesson1/sublesson1/stepsequencer1/btn' + i).set({
    hit: values[arrayPtr]
  });
  arrayPtr++;
}
console.log(values);
}
  });
