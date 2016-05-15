var WeakAreasController = function ($scope, $stateParams, AreasService, AssessmentService, RecommendationsService) {
    
    document.getElementById('Form').className = "assessPanel";
    document.getElementById('WeakAreas').className = "assessPanelChosen";
    document.getElementById('StrongAreas').className = "assessPanel";
    document.getElementById('FillAssessment').className = "assessPanel";
    document.getElementById('Attachments').className = "assessPanel";
    document.getElementById('ActionItems').className = "assessPanel";

    $scope.Areas = [];
    $scope.currentId = $stateParams.Id;

    AreasService.getWeakAreasById($scope.currentId).then(function (response) {
        $scope.Areas = response;
    });

    $scope.Assessment = 'Weak Areas of ';
    AssessmentService.getAssessmentById($scope.currentId).then(function (response) {
        $scope.Assessment += response.Name;
    });
    $scope.Params;
    RecommendationsService.getAllCriteriaByAssessmentId($scope.currentId).then(function (response) {
        $scope.Params = {
            Criteria: response,
            AssessmentId: $scope.currentId
        };
    });

};

WeakAreasController.$inject = ['$scope', '$stateParams', 'AreasService', 'AssessmentService', 'RecommendationsService'];
app.controller('WeakAreasController', WeakAreasController);