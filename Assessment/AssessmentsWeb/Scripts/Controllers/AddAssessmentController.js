var AddAssessmentController = function ($scope, $http, $q, $state, ngDialog, API_URLS, HttpFactory, AssessmentService, UsersService, AssessmentTypesService) {
    
    $scope.postingResult = "Waiting for data...";
    $scope.assessmentTypeObj = [];

    $scope.usersObj = [];

    $scope.assessment = {
        assessmentTypeId: null,
        name: "",
        projectManagerId: null,
        coordinatorId: null
    };

    // Starting form with specific template
    $scope.startForm = function () {
        ngDialog.open({
            templateUrl: '/Home/AddAssessment'
        });
    };

    $scope.init = function () {
        // Getting all assessment types
        AssessmentTypesService.getAllTypes().then(function (response) {
            $scope.assessmentTypeObj = response;
        });

        UsersService.getAllUsers().then(function (response) {
            $scope.usersObj = response;
        });
    };
   

    // Posting JSON
    $scope.postJson = function () {
        var win = document.getElementById("AddDialog");

        AssessmentService.postAssessment($scope.assessment).then(function (response) {
            $scope.postingResult = 'Assessment was successfully added!';
            $scope.closeThisDialog(0);
            $state.go("Form", { Id: response.Id });
            $scope.init();
        }, function (error) {
            $scope.postingResult = 'Error:' + error.Message;
        });
    };

    $scope.init();
};

AddAssessmentController.$inject = ['$scope', '$http', '$q', '$state', 'ngDialog', 'API_URLS', 'HttpFactory', 'AssessmentService', 'UsersService', 'AssessmentTypesService'];
app.controller('AddAssessmentController', AddAssessmentController);