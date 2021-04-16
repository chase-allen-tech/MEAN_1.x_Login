angular.module('userControllers', ['userServices'])
.controller('regCtrl',['$http', '$location', '$timeout', 'User',
function($http, $location, $timeout, User){

    var app = this;

    this.regUser = function(regData){
        app.loading = true;
        app.errorMessage = null;
        

        User.create(app.regData).then(function(data){
            app.loading = false;

            if(data.data.success){
                //create msg
                app.successMessage = data.data.message + '...redirecting';
                //redirect home
                $timeout(function(){
                    $location.path('/');
                }, 3000,);
            } else {
                //create error
                app.errorMessage = data.data.message;
            }
        });
    };

}]);
