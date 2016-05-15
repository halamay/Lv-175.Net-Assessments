var ReportsService = function ($q, HttpFactory, API_URLS) {

    this.getAllReports = function () {
        var deferred = $q.defer();
        HttpFactory.getAsync(API_URLS.Reports, deferred);
        return deferred.promise;
    };

    this.getQuaterlyReports = function () {
        var deferred = $q.defer();
        HttpFactory.getAsync(API_URLS.QuaterlyReports, deferred);
        return deferred.promise;
    };
};


ReportsService.$inject = ['$q', 'HttpFactory', 'API_URLS'];
app.service('ReportsService', ReportsService);