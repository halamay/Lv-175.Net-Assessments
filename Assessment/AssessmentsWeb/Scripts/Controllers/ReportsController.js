var ReportsController = function ($scope, $http, OldHttpFactory, API_URLS, ExcelService, ServerURL) {

    document.getElementById('ASSESSMENTS').style.color = 'white';
    document.getElementById('ANALYTICS').style.color = '#11B8D5';
    document.getElementById('ADMINISTRATION').style.color = 'white';
    document.getElementById('Reports').className = "leftItemsChosen";
    document.getElementById('TopWeakAreas').className = "leftItems";

    $scope.finishdate = new Date();
    $scope.QReport = [];

    $scope.getFinishDate = function () {
        return $scope.finishdate.getFullYear() + '-' + ($scope.finishdate.getMonth() + 1) + '-' + $scope.finishdate.getDate();
    }

    $scope.filterChange = function () {
        if ($scope.finishdate == null) {
            alert('Please, set the Finish Date!');
            $scope.QReport = [];
        }
        else {
            OldHttpFactory.getAsync(API_URLS.QuaterlyReport + $scope.getFinishDate()).then(function (response) {
                $scope.QReport = response;
            });
        }
    }

    $scope.exportData = function () {
        ExcelService.export($scope.QReport, ServerURL + '/api/excel/postquaterly/');
    };

    OldHttpFactory.getAsync(API_URLS.QuaterlyReport + $scope.getFinishDate()).then(function (response) {
        $scope.QReport = response;
    });
}

ReportsController.$inject = ['$scope', '$http', 'OldHttpFactory', 'API_URLS', 'ExcelService', 'ServerURL'];
app.controller('ReportsController', ReportsController);