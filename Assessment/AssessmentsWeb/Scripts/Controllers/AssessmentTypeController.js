var AssessmentTypeController = function ($scope, AssessmentTypesService,ngDialog) {
    
    document.getElementById('Users').className = "leftItems";
    document.getElementById('AssessmentTypes').className = "leftItemsChosen";

    $scope.types = [];
    AssessmentTypesService.getAllTypes().then(function (response) {
        $scope.types = response;
    });
    $scope.startForm = function () {
        ngDialog.open({
            templateUrl: '/Home/AddAssessmentType',
            scope: $scope,
            preCloseCallBack: function () {
                AssessmentTypesService.getAllTypes().then(function (response) {
                    $scope.types = response;
                });
            }

        });
    };
    $scope.Update = function (type) {
        AssessmentTypesService.putType(type);
    }
}
AssessmentTypeController.$inject = ['$scope', 'AssessmentTypesService','ngDialog'];
app.controller('AssessmentTypeController', AssessmentTypeController);