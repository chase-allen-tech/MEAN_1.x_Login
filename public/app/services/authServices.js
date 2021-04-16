angular.module('authServices', [])
.factory('Auth', [ '$http' ,function($http){
    authFactory = {};

    authFactory.login = function(loginData){
        return $http.post('/api/authenticate', loginData)
    };

    return authFactory;
}]);