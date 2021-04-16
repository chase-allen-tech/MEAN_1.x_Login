

angular.module('userServices', [])
.factory('User', [ '$http' ,function($http){
    userFactory = {};

    userFactory.create = function(regData){
        return $http.post('/api/users', regData)
    };

    return userFactory;
}]);


//$http.post('/api/users', this.regData).then(function(data){
