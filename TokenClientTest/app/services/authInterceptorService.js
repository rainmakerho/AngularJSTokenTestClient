﻿(function () {
    'use strict';
    angular
        .module('app')
        .factory('authInterceptorService', authInterceptorService);

    function authInterceptorService($location, $q, $injector, localStorageService) {
        var service = {};
        var _request = function (config) {

            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }
            return config;
        }

        var _responseError = function (rejection) {
            if (rejection.status === 401) {
                var authService = $injector.get('authService');
                authService.logOut();
                $location.path('/login');
            }
            return $q.reject(rejection);
        }
        service.request = _request;
        service.responseError = _responseError;
        return service;
        
    }
})();