'use strict';

/**
 * @ngdoc function
 * @name testappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the testappApp
 */
angular.module('testappApp')
  .controller('AboutCtrl', function ($scope, firebaseFactory, $firebaseArray, $firebase) {

    // function getData(){
      // var lessonData = firebaseFactory.ref;
    //   // console.log(lessonData.child);
    //   var newPostKey = lessonData.child('posts').push().key;
    //
    //   var postData = {
    //     20: {
    //       pressed: "true",
    //       time: 20
    //     }
    //   };
    //
    //   var updates = {};
    //   updates['/posts/' + newPostKey] = postData;
    //   lessonData.update(updates);
    // }
    function readData(){
      firebase.database().ref('-KuNQNRPHne-GfY4ZBEG/lessonName1/2/pressed').once('value').then(function(snapshot) {
        console.log(snapshot.val());
      });
    }


    function writeLessonData() {
      firebase.database().ref('lessons/').set({
      	"lesson1" : {
          "name": "lesson1-name",
          "sublesson1" : {
            "name": "sublesson1-name",
            "stepsequencer1": {
              "btn1": {
                "pressed": "true",
                "time": 1
              },
              "btn2": {
                "pressed": "true",
                "time": 2
              },
              "btn3": {
                "pressed": "true",
                "time": 3
              },
              "btn4": {
                "pressed": "true",
                "time": 4
              },
              "btn5": {
                "pressed": "true",
                "time": 5
              },
              "btn6": {
                "pressed": "true",
                "time": 6
              },
              "btn7": {
                "pressed": "true",
                "time": 7
              },
              "btn8": {
                "pressed": "true",
                "time": 8
              },
              "btn9": {
                "pressed": "true",
                "time": 9
              },
              "btn10": {
                "pressed": "true",
                "time": 10
              },
              "btn11": {
                "pressed": "true",
                "time": 11
              },
              "btn12": {
                "pressed": "true",
                "time": 12
              },
              "btn13": {
                "pressed": "true",
                "time": 13
              },
              "btn14": {
                "pressed": "true",
                "time": 14
              },
              "btn15": {
                "pressed": "true",
                "time": 15
              },
              "btn16": {
                "pressed": "true",
                "time": 16
              }
            }
          }
        }
      });
    }



    // vm.lessonData.$loaded().then(function(lessonData){
    //   vm.buttons = getButtons(lessonData);
    // });
    //   vm.buttons = getButtons(lessonData);
    // // var firebase = firebaseFactory.ref;
    //
    // function getButtons(lessonData){
    //   var buttons = [];
    //   angular.forEach(lessonData, function(item){
    //     angular.forEach(item.lessonName1, function(button){
    //       buttons.push(button);
    //     });
    //   });
    //   return buttons;
    // };
    // console.log(vm.buttons);



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
      // console.log(sequencer.matrix.pattern);
      // console.log("buttons 1 - 4: ");
      // console.log(sequencer.matrix.pattern[0]);
      // console.log("is button 8 pressed? ");
      // console.log(sequencer.matrix.pattern[1][3]);
      writeLessonData();
      readData();
    });
    stopButton.on('change', function(v){
      sequencer.stop();
      console.log(sequencer.matrix.pattern);

    });
    var displayBPM = function(){
      //console.log($scope.bpm1);
    };

  });
