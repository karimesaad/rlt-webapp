'use strict';

/**
 * @ngdoc service
 * @name testappApp.firebaseFactory
 * @description
 * # firebaseFactory
 * Factory in the testappApp.
 */
angular.module('testappApp')
  .factory('firebaseFactory', function ($http, $firebaseArray, $firebaseObject) {
    var config = {
      apiKey: "AIzaSyDN7epcpKLj7J5FrJzC46tZW-h88kKJvlU",
      authDomain: "rhythmic-learning-tool.firebaseapp.com",
      databaseURL: "https://rhythmic-learning-tool.firebaseio.com",
    };
    firebase.initializeApp(config);

    var rootRef = firebase.database().ref();

    return {
        ref: $firebaseArray(rootRef)
    };
  });
