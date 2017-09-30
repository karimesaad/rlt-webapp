'use strict';

describe('Controller: EditsublessonCtrl', function () {

  // load the controller's module
  beforeEach(module('testappApp'));

  var EditsublessonCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditsublessonCtrl = $controller('EditsublessonCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditsublessonCtrl.awesomeThings.length).toBe(3);
  });
});
