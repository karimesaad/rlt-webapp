'use strict';

describe('Controller: LessonsCtrl', function () {

  // load the controller's module
  beforeEach(module('testappApp'));

  var LessonsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LessonsCtrl = $controller('LessonsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LessonsCtrl.awesomeThings.length).toBe(3);
  });
});
