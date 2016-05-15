var AssessmentFormInfoController = function ($scope, $http, $stateParams, API_URLS, HttpFactory, AssessmentService, HubFactory, ServerURL) {


    document.getElementById('ASSESSMENTS').style.color = '#11B8D5';
    document.getElementById('ANALYTICS').style.color = '#white';
    document.getElementById('ADMINISTRATION').style.color = 'white';
    document.getElementById('Form').className = "assessPanelChosen";
    document.getElementById('WeakAreas').className = "assessPanel";
    document.getElementById('StrongAreas').className = "assessPanel";
    document.getElementById('FillAssessment').className = "assessPanel";
    document.getElementById('Attachments').className = "assessPanel";
    document.getElementById('ActionItems').className = "assessPanel";

    $scope.assessmentFormData = [];
    $scope.CurrentUserInfo = [];
    $scope.AllUsers = [];
    $scope.currentId = $stateParams.Id;
    
    $http.get(API_URLS.GetAssessmentsByID + $scope.currentId).then(function (response) {
        $scope.assessmentFormData = response.data;

        if ($scope.assessmentFormData.StartDate != null) {
            $scope.assessmentFormData.StartDate = new Date($scope.assessmentFormData.StartDate);
        };
        if ($scope.assessmentFormData.FinishDate != null) {
            $scope.assessmentFormData.FinishDate = new Date($scope.assessmentFormData.FinishDate);
        };
    });

    $http.get(API_URLS.GetCurrentUser).then(function (response) {
        $scope.CurrentUserInfo = response.data;
    });

    $http.get(API_URLS.Users).then(function (response) {
        $scope.AllUsers = response.data;       
    });

    $scope.setCurrentId = function (Id) {
        AssessmentFactory.setCurrentId(Id);
    }

    $scope.blocked = function () {

        if ($scope.assessmentFormData.CoordinatorId != $scope.CurrentUserInfo.Id && $scope.CurrentUserInfo.IsCompetenceManager != true)
        {
            return true;
        }
    };

    $scope.Update = function () {
        var performanceDataHub = HubFactory(ServerURL, 'AssessmentHub');

        performanceDataHub.on('onUpdate', function () {
            $http.get(API_URLS.GetAssessmentsByID + $scope.currentId).then(function (response) {
                $scope.assessmentFormData = response.data;
                if ($scope.assessmentFormData.FinishDate != null) {
                    $scope.assessmentFormData.StartDate = new Date($scope.assessmentFormData.StartDate);
                };
                if ($scope.assessmentFormData.FinishDate != null) {
                    $scope.assessmentFormData.FinishDate = new Date($scope.assessmentFormData.FinishDate);
                };
            });
        });
            
        $http.put(API_URLS.EditAssessment, $scope.assessmentFormData).then(function (response) {
        });
    };

    $scope.Update();
};

AssessmentFormInfoController.$inject = ['$scope', '$http', '$stateParams', 'API_URLS', 'HttpFactory', 'AssessmentService', 'HubFactory', 'ServerURL'];
app.controller('AssessmentFormInfoController', AssessmentFormInfoController);