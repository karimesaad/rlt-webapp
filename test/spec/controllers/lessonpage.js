'use strict';

describe('Controller: LessonpageCtrl', function () {

  // load the controller's module
  beforeEach(module('testappApp'));

  var LessonpageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LessonpageCtrl = $controller('LessonpageCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LessonpageCtrl.awesomeThings.length).toBe(3);
  });
});
