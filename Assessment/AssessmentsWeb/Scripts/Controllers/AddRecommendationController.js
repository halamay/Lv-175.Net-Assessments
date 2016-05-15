var AddRecommendationController = function ($scope, ngDialog, RecommendationsService) {
    $scope.Criteria;
    $scope.AssessmentId;
    $scope.CriterionId;
    $scope.Text;
    $scope.Benefit;
    
    // Starting form with specific template
    $scope.startForm = function (criterionId, params) {
        Criteria = params.Criteria;
        AssessmentId = params.AssessmentId;
        CriterionId = criterionId;
        ngDialog.open({
            templateUrl: '/Home/AddRecommendation'
        });
    };

    // Posting JSON
    $scope.Recommendation;

    $scope.save = function () {
        $scope.Recommendation = {
            Text: $scope.Text,
            Benefits: $scope.Benefits,
            CriterionId: CriterionId,
            Order: 0
        };
        RecommendationsService.postRecommendation($scope.Recommendation);
    }
};

AddRecommendationController.$inject = ['$scope', 'ngDialog', 'RecommendationsService'];
app.controller('AddRecommendationController', AddRecommendationController);
