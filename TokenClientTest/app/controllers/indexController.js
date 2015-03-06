(function () {
    'use strict';
    angular
        .module('app')
        .controller('indexController', indexController);

    function indexController($scope,$location, authService) {
        $scope.logOut = function () {
            authService.logOut();
            $location.path('/login');
        }

        $scope.authentication = authService.authentication;
    }
})();
