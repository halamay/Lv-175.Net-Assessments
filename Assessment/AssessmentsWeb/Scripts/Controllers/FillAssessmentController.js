var FillAssessmentController = function ($scope, $http, $stateParams, API_URLS, FillAssessmentService, ExcelService, ServerURL) {

    document.getElementById('Form').className = "assessPanel";
    document.getElementById('WeakAreas').className = "assessPanel";
    document.getElementById('StrongAreas').className = "assessPanel";
    document.getElementById('FillAssessment').className = "assessPanelChosen";
    document.getElementById('Attachments').className = "assessPanel";
    document.getElementById('ActionItems').className = "assessPanel";

    $scope.Assessment = [];
    $scope.Areas = [];
    $scope.Criteria = [];
    $scope.Indicators = [];
    $scope.IndicatorScores = [];
    $scope.currentId = $stateParams.Id;
    $scope.Indicatorscore = { Id: '-1', Name: 'Not Defined', Weight: '0' };
    $scope.indicatorsvisiblity = false;
    $scope.criteriaid = 0;
    $scope.CriterionName = '';
    $scope.scoreLeft = -1;

    FillAssessmentService.GetAssessmentsByID($scope.currentId).then(function (response) {
        $scope.Assessment = response;
    });

    FillAssessmentService.GetAllCriteriaOfAssessment($scope.currentId).then(function (response) {
        $scope.Criteria = response;

        for (var i = 0; i < $scope.Criteria.length; i++) {
            $scope.Criteria[i].FirstNotDone = 0;
            $scope.Criteria[i].Choosen = 0;
        }

        for (var i = 0; i < $scope.Criteria.length; i++) {
            if ($scope.Criteria[i].ScoreLeft > 0) {
                $scope.criteriaid = $scope.Criteria[i].CriteriaId;
                $scope.CriterionName = $scope.Criteria[i].CriteriaName;
                $scope.Criteria[i].FirstNotDone = 1;
                $scope.Criteria[i].Choosen = 1;
                $scope.getIndicators($scope.criteriaid, $scope.CriterionName);
                break;
            }
        }
    });

    FillAssessmentService.GetIndicatorScores().then(function (response) {
        $scope.IndicatorScores = response;
    });

    $scope.getIndicators = function (CriteriaId, name, scoreLeft) {
        if ($scope.scoreLeft != -1) {
            if ($scope.criteriaid != 0) {
                if ($scope.scoreLeft == 0) {
                    document.getElementById($scope.criteriaid).className = "criteriaDone";
                }
                else {
                    document.getElementById($scope.criteriaid).className = "criteriaNotDone";
                }
            }
        }

        for (var i = 0; i < $scope.Criteria.length; i++) {
            if ($scope.Criteria[i].CriteriaId == CriteriaId) {
                $scope.Criteria[i].Choosen = 1;
                break;
            }
        }

        $scope.indicatorsvisiblity = true;
        $scope.criteriaid = CriteriaId;
        $scope.scoreLeft = scoreLeft;
        $scope.CriterionName = name;

        FillAssessmentService.GetFullIndicatorsByCriteriaId(CriteriaId).then(function (response) {
            $scope.Indicators = response;
        });

        var el= document.getElementById(CriteriaId);
        if (el != null) {
            el.className = "chosenCriteria";
        }
    };

    $scope.UpdateScore = function (score, indicator) {
        for (var i = 0; i < $scope.IndicatorScores.length; i++) {
            if ($scope.IndicatorScores[i].Weight == score) {
                $scope.Indicatorscore = $scope.IndicatorScores[i];
            }
        }

        FillAssessmentService.putIndicatorScore(indicator.IndicatorId, $scope.Indicatorscore);

        for (var i = 0; i < $scope.Indicators.length; i++) {
            if ($scope.Indicators[i].IndicatorId == indicator.IndicatorId) {
                $scope.Indicators[i].IndicatorScoreId = $scope.Indicatorscore.Id;
                indicator.IndicatorScoreId = $scope.Indicatorscore.Id;
                break;
            }
        }

        for (var i = 0; i < $scope.Criteria.length; i++) {
            if ($scope.Criteria[i].CriteriaId == $scope.criteriaid) {
                if ($scope.Criteria[i].ScoreLeft > 0) {
                    $scope.Criteria[i].ScoreLeft = $scope.Criteria[i].ScoreLeft - 1;
                    $scope.scoreLeft = $scope.scoreLeft - 1;
                }
                break;
            }
        }
    }

    $scope.UpdateComment = function (ind) {
        for (var i = 0; i < $scope.Indicators.length; i++) {
            if ($scope.Indicators[i].IndicatorId == ind.IndicatorId) {
                $scope.Indicators[i].IndicatorComment = ind.IndicatorComment;
                FillAssessmentService.putIndicatorComment(ind.IndicatorId, $scope.Indicators[i]);
                //FillAssessmentService.putIndicatorComment(-10, $scope.Indicators[i]);
                break;
            }
        }
    }

    FillAssessmentService.GetAllAreaOfAssessment($scope.currentId).then(function (response) {
        $scope.Areas = response;
    });

};

FillAssessmentController.$inject = ['$scope', '$http', '$stateParams', 'API_URLS', 'FillAssessmentService', 'ExcelService', 'ServerURL'];
app.controller('FillAssessmentController', FillAssessmentController);