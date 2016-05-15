var RecommendationsController = function ($scope, $stateParams, RecommendationsService, AssessmentService) {

    $scope.Recommendations = [];
    $scope.currentId = $stateParams.Id;

    $scope.Assessment = 'Recommendations of ';
    AssessmentService.getAssessmentById($scope.currentId).then(function (response) {
        $scope.Assessment += response.Name;
    });

    RecommendationsService.GetAllRecommendations($scope.currentId).then(function (response) {
        $scope.Recommendations = response;
    });
};

RecommendationsController.$inject = ['$scope', '$stateParams', 'RecommendationsService', 'AssessmentService'];
app.controller('RecommendationsController', RecommendationsController);

