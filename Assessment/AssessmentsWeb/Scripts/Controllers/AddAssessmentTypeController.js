var AddAssessmentTypeController = function ($scope, ngDialog, AssessmentTypesService) {


    $scope.assessmentType = {
        Name: null,
        Description: null,
        URL: null
    };
   
    // Starting form with specific template
    
    // Posting JSON
    $scope.postJson = function () {
        AssessmentTypesService.postType($scope.assessmentType);
        AssessmentTypesService.getAllTypes().then(function (response) {
            $scope.types = response;
        });
    }
};

AddAssessmentTypeController.$inject = ['$scope','ngDialog', 'AssessmentTypesService'];
app.controller('AddAssessmentTypeController', AddAssessmentTypeController);
