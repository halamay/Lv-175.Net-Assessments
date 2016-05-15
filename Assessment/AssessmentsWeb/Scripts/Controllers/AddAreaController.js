var AddAreaController = function ($scope, ngDialog, AreasService) {


    $scope.Area = {
        Name: null,
        Description: null,
        AssesmentTypeId: null,
        Order: null
    };


    // Posting JSON
    $scope.postJson = function () {
        $scope.Area.AssesmentTypeId = $scope.ID;
        $scope.Area.Order = $scope.Order;
        AreasService.postArea($scope.Area);
        AreasService.getAreaByTypeId($scope.currentId).then(function (response) {
            $scope.Areas = response;
        });
    };
}

AddAreaController.$inject = ['$scope','ngDialog', 'AreasService'];
app.controller('AddAreaController', AddAreaController);
