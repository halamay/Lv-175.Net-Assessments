var HttpInterceptor = function ( $q, $injector, $rootScope) {

    function goToErrorState(errorCodeParam, errorTextParam, errorMessageParam) {
        $injector.get('$state').go('Error', { errorCode: errorCodeParam, errorText: errorTextParam, errorMessage: errorMessageParam });
    };

    return {
        request: function(config)
        {
            console.log(config);
            return config || $q.when(config);
        },
        requestError: function(error)
        {
            console.log(error);
            goToErrorState(error.status, error.statusText, 'Something wrong with this request.');
            return $q.reject(error);
        },
        response: function (response) {
            console.log(response);
            return response || $q.when(response);
        },
        responseError: function (error) {
            console.log(error);
            goToErrorState(error.status, error.statusText, error.data);
            return $q.reject(error);
        }
    };
};

HttpInterceptor.$inject = ['$q', '$injector', '$rootScope'];
app.factory('HttpInterceptor', HttpInterceptor);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
});
