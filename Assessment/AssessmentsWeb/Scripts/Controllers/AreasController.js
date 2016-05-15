var AreasController = function ($scope, $stateParams, AreasService, AssessmentTypesService, ngDialog) {
    $scope.Areas = [];
    $scope.currentId = $stateParams.Id;

    AreasService.getAreaByTypeId($stateParams.Id).then(function (response) {
        $scope.Areas = response;
    });
    AssessmentTypesService.getTypeById($stateParams.Id).then(function (response) {
        $scope.ass = response;
    });
    $scope.Update = function (area) {
        AreasService.putArea(area);
    }
    $scope.startForm2 = function (Id, order) {
        $scope.ID = Id;
        $scope.Order = order + 1;

        ngDialog.open({
            templateUrl: '/Home/AddArea',
            scope: $scope,
            preCloseCallback: function () {
                AreasService.getAreaByTypeId($stateParams.Id).then(function (response) {
                    $scope.Areas = response;
                });
            }
        });
    };
    $scope.startForm = function (Id) {
        $scope.AreaToDelete = Id;
        ngDialog.open({
            templateUrl: '/Home/DeleteConfirm',
            scope: $scope
        });
    };
    $scope.Delete = function () {
        for (var i = 0; i < $scope.Areas.length; i++) {
            if ($scope.Areas[i].Order > $scope.AreaToDelete.Order)
                {
                $scope.Areas[i].Order--;
            AreasService.putArea($scope.Areas[i]);
                }
        }
        AreasService.deleteArea($scope.AreaToDelete.Id).then(function () {
            AreasService.getAreaByTypeId($stateParams.Id).then(function (response) {
                $scope.Areas = response;
            });

        });
    }
    $scope.Down = function (area) {
        if (area.Order != $scope.Areas.length) {
            var area2;
            var firstRow = document.getElementById("tb").rows[area.Order - 1];
            var secondRow = document.getElementById("tb").rows[area.Order];
            for (var i = 0; i < $scope.Areas.length; i++) {
                if ($scope.Areas[i].Order == area.Order + 1)
                    area2 = $scope.Areas[i];
            }
            area.Order++;
            area2.Order--;
            AreasService.putArea(area);
            AreasService.putArea(area2);
            firstRow.parentNode.insertBefore(secondRow, firstRow);
        }
    }
    $scope.Up = function (area) {
        if (area.Order != 1) {
            var area2;
            var firstRow = document.getElementById("tb").rows[area.Order - 1];
            var secondRow = document.getElementById("tb").rows[area.Order - 2];
            for (var i = 0; i < $scope.Areas.length; i++) {
                if ($scope.Areas[i].Order == area.Order - 1)
                    area2 = $scope.Areas[i];
            }
            area.Order--;
            area2.Order++;
            AreasService.putArea(area);
            AreasService.putArea(area2);
            firstRow.parentNode.insertBefore(firstRow, secondRow);
        }
    }
};

AreasController.$inject = ['$scope', '$stateParams', 'AreasService', 'AssessmentTypesService', 'ngDialog'];
app.controller('AreasController', AreasController);