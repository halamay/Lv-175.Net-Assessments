var StrongAreasController = function ($scope, $stateParams, AreasService, AssessmentService) {
    
    document.getElementById('Form').className = "assessPanel";
    document.getElementById('WeakAreas').className = "assessPanel";
    document.getElementById('StrongAreas').className = "assessPanelChosen";
    document.getElementById('FillAssessment').className = "assessPanel";
    document.getElementById('Attachments').className = "assessPanel";
    document.getElementById('ActionItems').className = "assessPanel";

    $scope.Areas = [];
    $scope.currentId = $stateParams.Id;

    AreasService.getStrongAreasById($scope.currentId).then(function (response) {
        $scope.Areas = response;
    });
    
    $scope.Assessment = 'Strong Areas of ';
    AssessmentService.getAssessmentById($scope.currentId).then(function (response) {
        $scope.Assessment += response.Name;
    });
};

StrongAreasController.$inject = ['$scope', '$stateParams', 'AreasService', 'AssessmentService'];
app.controller('StrongAreasController', StrongAreasController);