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
    var numSeq = 1;
    function addSeq(){
      if (numSeq < 16){
        numSeq++;
      var newSequencer = new Nexus.Sequencer('#sequencer' + numSeq,{
        'size': [100,100],
        'mode': 'toggle',
        'rows': 4,
        'columns': 4
      });
    }
    }
    var newSequencer1 = new Nexus.Sequencer('#sequencer1',{
      'size': [100,100],
      'mode': 'toggle',
      'rows': 4,
      'columns': 4
    });
    var editButton = new Nexus.Button('#edit-button',{
      'id': 'circle-svg',
      'size': [60,60],
      'mode': 'toggle',
      'state': false
    });
    var newButton = new Nexus.Button('#new-button',{
      'id': 'circle-svg',
      'size': [60,60],
      'mode': 'toggle',
      'state': false
    });

    editButton.on('change', function(v){
      pushSequencer();
    });
    newButton.on('change', function(v){
      addSeq();
    });
    function pushSequencer() {
      var values = [];


      for (var i = 0; i < 4; i++){
        for (var j = 0; j < 4; j++){

           values.push(newSequencer1.matrix.pattern[i][j]);

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
