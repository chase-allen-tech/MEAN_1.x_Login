angular.module('mainController', ['authServices'])
.controller('mainCtrl',['$location', '$timeout', 'Auth',
function($location, $timeout, Auth){

    var app = this;
    
     this.doLogin = function(loginData){

        app.loading = true;
        app.errorMessage = null;


        Auth.login(app.loginData).then(function(data){
            app.loading = false;

            if(data.data.success){
                //create msg
                app.successMessage = data.data.message + '...redirecting';
                //redirect home
                $timeout(function(){
                    $location.path('/about');
                }, 3000,);
            } else {
                //create error
                app.errorMessage = data.data.message;
            }
        });
     };

}]);