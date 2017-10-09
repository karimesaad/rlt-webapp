'use strict';

/**
 * @ngdoc function
 * @name testappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the testappApp
 */
angular.module('testappApp')
  .controller('AboutCtrl', function ($scope, firebaseFactory, $firebaseArray, $firebase, $firebaseObject) {

    // var firebase = firebaseFactory.ref;

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

/************ FIREBASE READ ***********/

    function readData(){
      firebase.database().ref('-KuNQNRPHne-GfY4ZBEG/lessonName1/2/pressed').once('value').then(function(snapshot) {
    //    console.log(snapshot.val());
      });
    }

    // var buttons = [];
    // var buttonsRef = firebase.ref('-Kv2vFpjvAStbe8xMtEH');
    // buttonsRef.$loaded().then(function(buttonsRef){
    //   buttons = getButtons(buttonsRef);
    // });
    //
    // function getButtons(buttonsRef){
    //   angular.forEach(buttonsRef, function(item){
    //     angular.forEach(item.sublesson4, function(step){
    //       angular.forEach(step.stepsequencer4, function(button){
    //         buttons.push(button);
    //       })
    //     });
    //   });
    // };
    // console.log(buttons);


//
// {
//     "artists": {
//         "Atif":{
//             "name":"atif",
//             "rating":8
//         },
//         "Himesh":{
//             "name":"himesh",
//             "rating":5
//         }
//     }
// }

  // // download the data into a local object
  // $scope.data = $firebaseObject(firebase);
  //
  // // putting a console.log here won't work, see below
  //   firebase.on("value", function(snapshot)
  //   {
  //     console.log(snapshot.val());
  //   }, function (errorObject)
  //   {
  //     console.log("The read failed: " + errorObject.code);
  //   });
  //  var lessons=new Firebase("https://gigstart.firebaseio.com//artists");

  // var lessons = firebase.child("lessons");
  // $scope.lessons = new $firebaseArray(lessons);
  // console.log($scope.lessons);
  //

  //
  // var sectionsRef = firebase.database().ref;
  // sectionsRef
  // .orderByChild('name')
  // .equalTo('lesson3-name');
  // $scope.sections = $firebaseArray(sectionsRef);
  // console.log($scope.sections);
  //

/****** FIREBASE: READ ****/
// Get all data in one object ($scope.data) and then access each single object/value inside
//
  var ref = firebase.database().ref();
  $scope.data = $firebaseObject(ref);
  var buttons = [];
  var button;
  var btnRef;
  // this waits for the data to load and then logs the output. Therefore,
  // data from the server will now appear in the logged output. Use this with care!
  $scope.data.$loaded()
    .then(function() {
      console.log($scope.data.lessons.lesson1.sublesson1.stepseq1.btn1);
      btnRef = $scope.data.lessons.lesson1.sublesson1.stepseq1;

    angular.forEach(btnRef, function(button){
      button = buttons.push(btnRef.child());
    })
    .catch(function(err) {
      console.error(err);
    });
});
//////Another try

var ref = firebase.database().ref().child("lessons");
  // create a synchronized array
  // click on `index.html` above to see it used in the DOM!
  $scope.lessons = $firebaseArray(ref);
  console.log($scope.lessons);

/********* FIREBASE WRITE ***************/
/* Two ways of posting data to firebase:
    1. using firebaseFactory.ref.$add(xyz);
    2. firebaseFactory.ref('/xyz').set({ data });

    Differences between Add and Set:
    - $add(): Creates new data and Firebase creates new random key
    - set(): Overwrites data that is already in Firebase
/***********************************/

var data = {
    "lesson3" : {
      "name": "lesson3-name",
      "sublesson4" : {
        "name": "sublesson4-name",
        "stepsequencer4": {
          "btn1": {
            "pressed": "false",
            "time": 1
          },
          "btn2": {
            "pressed": "false",
            "time": 2
          },
          "btn3": {
            "pressed": "false",
            "time": 3
          },
          "btn4": {
            "pressed": "false",
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
            "pressed": "false",
            "time": 9
          },
          "btn10": {
            "pressed": "true",
            "time": 10
          },
          "btn11": {
            "pressed": "false",
            "time": 11
          },
          "btn12": {
            "pressed": "true",
            "time": 12
          },
          "btn13": {
            "pressed": "false",
            "time": 13
          },
          "btn14": {
            "pressed": "true",
            "time": 14
          },
          "btn15": {
            "pressed": "false",
            "time": 15
          },
          "btn16": {
            "pressed": "true",
            "time": 16
          }
        }
      }
    }
  }

// angular.forEach(data, function(item){
// //  firebase.$add(item);
// });

/*function writeLessonData() {
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
*/

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
