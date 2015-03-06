(function () {
    'use strict';
    angular
        .module('app')
        .controller('loginController', loginController);

    function loginController($scope, $location, authService) {
        $scope.loginData = {
            userName: "",
            password: "",
            useRefreshTokens: false
        };

        $scope.message = "";
        $scope.login = function () {
            authService.login($scope.loginData).then(function (response) {
                $scope.message = authService.authentication.accessToken;
                $location.path('/home');
            },
             function (err) {
                 $scope.message = err.error_description;
             });
        };
         
    }
})();
