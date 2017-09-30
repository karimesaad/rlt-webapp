'use strict';

describe('Controller: PlaysublessonCtrl', function () {

  // load the controller's module
  beforeEach(module('testappApp'));

  var PlaysublessonCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlaysublessonCtrl = $controller('PlaysublessonCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PlaysublessonCtrl.awesomeThings.length).toBe(3);
  });
});
