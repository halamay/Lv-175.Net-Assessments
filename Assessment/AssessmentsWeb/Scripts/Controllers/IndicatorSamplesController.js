var IndicatorSamplesController = function ($scope, $stateParams, IndicatorSamplesService, CriteriaSamplesService, ngDialog) {
    $scope.Indicators = [];
    $scope.currentId = $stateParams.Id;
  
    CriteriaSamplesService.getCriteriaById($stateParams.Id).then(function (response) {
        $scope.Criteria = response;
    });
    IndicatorSamplesService.getIndicatorByCriteriaId($stateParams.Id).then(function (response) {
        $scope.Indicators = response;
    });
    $scope.startForm2 = function (Id, order) {
        $scope.ID = Id;
        $scope.Order = order + 1;
       
        ngDialog.open({
            templateUrl: '/Home/AddIndicatorSamples',
            scope: $scope,
            preCloseCallback: function () {
                IndicatorSamplesService.getIndicatorByCriteriaId($stateParams.Id).then(function (response) {
                    $scope.Indicators = response;
                });
            }
        });
    };
    $scope.startForm = function (indicator) {
        $scope.IndicatorToDelete = indicator;
        ngDialog.open({
            templateUrl: '/Home/DeleteConfirm',
            scope: $scope
        });
    };
    $scope.Delete = function () {
        for (var i = 0; i < $scope.Indicators.length; i++) {
            if($scope.Indicators[i].Order>$scope.IndicatorToDelete.Order)
            {
                $scope.Indicators[i].Order--;
                IndicatorSamplesService.putIndicator($scope.Indicators[i]);
            }
        }
        IndicatorSamplesService.delete($scope.IndicatorToDelete.Id).then(function () {
            IndicatorSamplesService.getIndicatorByCriteriaId($stateParams.Id).then(function (response) {
                $scope.Indicators = response;
            });
            
        });
    }
    $scope.Update = function (indicator) {
        IndicatorSamplesService.putIndicator(indicator);
    }
    $scope.Down = function (indicator) {
        if (indicator.Order != $scope.Indicators.length) {
            var indicator2;
            var firstRow = document.getElementById("tb").rows[indicator.Order - 1];
            var secondRow = document.getElementById("tb").rows[indicator.Order];
            for (var i = 0; i < $scope.Indicators.length; i++) {
                if ($scope.Indicators[i].Order == indicator.Order+1)
                    indicator2 = $scope.Indicators[i];
            }
            indicator.Order++;
            indicator2.Order--;
            IndicatorSamplesService.putIndicator(indicator);
            IndicatorSamplesService.putIndicator(indicator2);
            firstRow.parentNode.insertBefore(secondRow, firstRow);
        }
    }
    $scope.Up = function (indicator) {
        if (indicator.Order != 1) {
            var indicator2;
            var firstRow = document.getElementById("tb").rows[indicator.Order - 1];
            var secondRow = document.getElementById("tb").rows[indicator.Order - 2];
            for (var i = 0; i < $scope.Indicators.length; i++) {
                if ($scope.Indicators[i].Order == indicator.Order - 1)
                    indicator2 = $scope.Indicators[i];
            }
            indicator.Order--;
            indicator2.Order++;
            IndicatorSamplesService.putIndicator(indicator);
            IndicatorSamplesService.putIndicator(indicator2);
            firstRow.parentNode.insertBefore(firstRow, secondRow);
        }
    }


};

IndicatorSamplesController.$inject = ['$scope', '$stateParams', 'IndicatorSamplesService', 'CriteriaSamplesService', 'ngDialog'];
app.controller('IndicatorSamplesController', IndicatorSamplesController);