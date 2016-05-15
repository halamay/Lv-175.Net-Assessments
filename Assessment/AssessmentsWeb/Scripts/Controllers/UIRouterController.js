var UIRouterController = function ($rootScope, $scope, $state, CurrAssessmentService) {
    $scope.currentId = 0;
    $scope.message = 'Waiting for assessments...';
    $scope.loadingFailed = null;

    $scope.getCurrentId = function () {
        return CurrAssessmentService.getCurrentId()
    }

    $rootScope.$on('Assessments was loaded', function () {
        $scope.currentId = $scope.getCurrentId();
        $state.go('Form', { "Id": $scope.currentId });
    });

    $rootScope.$on('Default was Changed', function (error) {
        if (error == null) {
            $scope.loadingFailed = "There is no assessments for you!";
        }
        else {
            $scope.loadingFailed = "Loading failed because" + error;
        }
       
    });
}

UIRouterController.$inject = ['$rootScope', '$scope', '$state', 'CurrAssessmentService'];
app.controller('UIRouterController', UIRouterController);
