var CriteriaSamplesController = function ($scope, $stateParams, CriteriaSamplesService, ConstraintImpactService, AreasService, AssessmentTypesService,ngDialog) {
    $scope.Criteria = [];
    $scope.currentId = $stateParams.Id;

    
    CriteriaSamplesService.getCriteriaByAreaId($stateParams.Id).then(function (response) {
        $scope.Criteria = response;
       
    });
    AreasService.getAreaById($stateParams.Id).then(function (response) {
        $scope.Area = response;
    });
    ConstraintImpactService.getAllImpacts().then(function (response) {
        $scope.Impacts = response;
    });
    $scope.Update = function (criteria) {
        CriteriaSamplesService.putCriteria(criteria);
    }
    $scope.startForm2 = function (Id, order) {
        $scope.ID = Id;
        $scope.Order = order + 1;

        ngDialog.open({
            templateUrl: '/Home/AddCriteriaSamples',
            scope: $scope,
            preCloseCallback: function () {
                CriteriaSamplesService.getCriteriaByAreaId($stateParams.Id).then(function (response) {
                    $scope.Criteria = response;
                });
            }
        });
    };
    $scope.startForm = function (crit) {
        $scope.CriteriaToDelete = crit;
        ngDialog.open({
            templateUrl: '/Home/DeleteConfirm',
            scope: $scope
        });
    };
    $scope.Delete = function () {
        for (var i = 0; i < $scope.Criteria.length; i++) {
            if ($scope.Criteria[i].Order > $scope.CriteriaToDelete.Order) {
                $scope.Criteria[i].Order--;
                CriteriaSamplesService.putCriteria($scope.Criteria[i]);
            }
   
        }
        CriteriaSamplesService.deleteCriteria($scope.CriteriaToDelete.Id).then(function () {
            CriteriaSamplesService.getCriteriaByAreaId($stateParams.Id).then(function (response) {
                $scope.Criteria = response;
            });

        });
    }
    $scope.Down = function (criteria) {
        if (criteria.Order != $scope.Criteria.length) {
            var criteria2;
            var firstRow = document.getElementById("tb").rows[criteria.Order - 1];
            var secondRow = document.getElementById("tb").rows[criteria.Order];
            for (var i = 0; i < $scope.Criteria.length; i++) {
                if ($scope.Criteria[i].Order == criteria.Order + 1)
                    criteria2 = $scope.Criteria[i];
            }
            criteria.Order++;
            criteria2.Order--;
            CriteriaSamplesService.putCriteria(criteria);
            CriteriaSamplesService.putCriteria(criteria2);
            firstRow.parentNode.insertBefore(secondRow, firstRow);
        }
    }
    $scope.Up = function (criteria) {
        if (criteria.Order != 1) {
            var criteria2;
            var firstRow = document.getElementById("tb").rows[criteria.Order - 1];
            var secondRow = document.getElementById("tb").rows[criteria.Order - 2];
            for (var i = 0; i < $scope.Criteria.length; i++) {
                if ($scope.Criteria[i].Order == criteria.Order - 1)
                   criteria2 = $scope.Criteria[i];
            }
            criteria.Order--;
            criteria2.Order++;
            CriteriaSamplesService.putCriteria(criteria);
            CriteriaSamplesService.putCriteria(criteria2);
            firstRow.parentNode.insertBefore(firstRow, secondRow);
        }
    }
   
};

CriteriaSamplesController.$inject = ['$scope', '$stateParams', 'CriteriaSamplesService', 'ConstraintImpactService', 'AreasService', 'AssessmentTypesService','ngDialog'];
app.controller('CriteriaSamplesController', CriteriaSamplesController);