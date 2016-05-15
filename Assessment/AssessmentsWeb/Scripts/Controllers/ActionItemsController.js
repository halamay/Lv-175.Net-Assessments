var ActionItemsController = function ($scope, $stateParams, AreasService, AssessmentService) {

    document.getElementById('Form').className = "assessPanel";
    document.getElementById('WeakAreas').className = "assessPanel";
    document.getElementById('StrongAreas').className = "assessPanel";
    document.getElementById('FillAssessment').className = "assessPanel";
    document.getElementById('Attachments').className = "assessPanel";
    document.getElementById('ActionItems').className = "assessPanelChosen";


    $scope.Areas = [];
    $scope.currentId = $stateParams.Id;

    AreasService.getActionItemsById($scope.currentId).then(function (response) {
        $scope.Areas = response;
    });

    $scope.Assessment = 'Action Items of ';
    AssessmentService.getAssessmentById($scope.currentId).then(function (response) {
        $scope.Assessment += response.Name;
    });
};

ActionItemsController.$inject = ['$scope', '$stateParams', 'AreasService', 'AssessmentService'];
app.controller('ActionItemsController', ActionItemsController);