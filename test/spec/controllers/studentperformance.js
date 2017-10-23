'use strict';

describe('Controller: StudentperformanceCtrl', function () {

  // load the controller's module
  beforeEach(module('testappApp'));

  var StudentperformanceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StudentperformanceCtrl = $controller('StudentperformanceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StudentperformanceCtrl.awesomeThings.length).toBe(3);
  });
});
