(function () {
    'use strict';

    angular
        .module('app')
        .factory('valuesService', valuesService);

    function valuesService($http, $q, ngAppSettings) {
        var service = {};
        var _value = '';
        var _getValue = function (id) {
            var deferred = $q.defer();
            var getValueUrl = ngAppSettings.baseUri + 'api/values/' + id;
             
            $http.get(getValueUrl)
                .success(function (response) {
                    _value = response;
                    console.log(_value);
                    deferred.resolve(response);
                }).error(function (err, status) {
                    console.log(err);
                    console.log(status);
                    deferred.reject(err);
                });
            return deferred.promise;
        };
        service.getValue = _getValue;
        return service;

         
    }
})();