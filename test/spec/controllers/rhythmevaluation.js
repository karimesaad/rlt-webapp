'use strict';

describe('Controller: RhythmevaluationCtrl', function () {

  // load the controller's module
  beforeEach(module('testappApp'));

  var RhythmevaluationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RhythmevaluationCtrl = $controller('RhythmevaluationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RhythmevaluationCtrl.awesomeThings.length).toBe(3);
  });
});
