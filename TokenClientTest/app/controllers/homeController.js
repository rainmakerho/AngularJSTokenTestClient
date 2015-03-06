(function () {
    'use strict';
    angular
        .module('app')
        .controller('homeController', homeController);

    function homeController($scope, valuesService) {
        $scope.message = '';
        $scope.id = '';
        $scope.getValue = function () {
            valuesService.getValue($scope.id).then(function (response) {
                $scope.message = response;
            },
             function (err) {
                 $scope.message = err.error_description;
             });
            
        };
    }
})();
