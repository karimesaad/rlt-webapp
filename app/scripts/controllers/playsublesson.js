'use strict';

/**
 * @ngdoc function
 * @name testappApp.controller:PlaysublessonCtrl
 * @description
 * # PlaysublessonCtrl
 * Controller of the testappApp
 */
angular.module('testappApp')
  .controller('PlaysublessonCtrl', function ($scope, firebaseFactory, $firebaseArray, $firebase, $firebaseObject) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

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
          console.log($scope.data.lessons);
          btnRef = $scope.data.lessons.lesson1.sublesson1.stepsequencer1;


        // angular.forEach(btnRef, function(button){
        //   // button = buttons.push(btnRef.child("lessons/lesson1/sublesson1"));
        //     button = buttons.push(btnRef.lesson1.sublesson1.stepsequencer1.btn1);
        //     button = buttons.push(btnRef.lesson1.sublesson1.stepsequencer1.btn1);
        //
        // });
        // angular.forEach(btnRef, function(){
        //   // button = buttons.push(btnRef.child("lessons/lesson1/sublesson1"));
        //     buttons.push(btnRef[button]);
        // });

        for(var btn = 0; btn < 16; btn ++){
          // buttons.push(btnRef['btn' + button].hit);
          button = 'btn' + btn;

          buttons.push(btnRef[button]);
        }
        console.log(buttons);
        for(var i=1; i<buttons.length; i++){
          console.log(buttons[i]);
          console.log(buttons[i].hit);

        }
        // console.log(buttons[1]);
        // console.log(buttons[1].hit);
      })
        .catch(function(err) {
          console.error(err);
        });
        // angular.forEach(btnRef, function(button){
        //   button = buttons.push(btnRef.lesson1.sublesson1.stepsequencer1.btn1);
        // })
        // .catch(functon(err){
        //     console.error(err);
        // });
      });

/*
    //////Another try
    console.log("buttons: ");
    console.log(buttons);
    var ref = firebase.database().ref();
    ref = ref.child("lessons");
      // create a synchronized array
      // click on `index.html` above to see it used in the DOM!
      $scope.lessons = $firebaseArray(ref);
      console.log($scope.lessons);

////////
*/

// $scope.buttons = [];
// const key = $scope.finalItem.$id;
// const rootRef = firebase.database().ref();
// const lessonsRef = rootRef.child('lessons');
//
// function getLessonsContent(key, cb) {
//    relatedRef.child(key).on('child_added', snap => {
//        let businesRef = lessonsRef.child(snap.key);
//        lessonsRef.once('value', cb);
//    });
// }
//
// getRelatedContent(key, snap => {
//     var snapVal = snap.val();
//         $scope.buttons.push(snapVal);
// });
//
//
//
  //
  //
  // });
