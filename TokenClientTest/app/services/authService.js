(function () {
    'use strict';

    angular
        .module('app')
        .factory('authService', authService);

    function authService($http, $q, $location, localStorageService, ngAppSettings) {
        var service = {};

        var _authentication = {
            isAuth: false,
            userName: "",
            useRefreshTokens: false,
            accessToken: ""
        };


        var _login = function (loginData) {
            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            if (loginData.useRefreshTokens) {
                data = data + "&client_id=" + ngAppSettings.clientId;
            }

            var deferred = $q.defer();
            var tokenUrl = ngAppSettings.baseUri + 'token';
            $http.post(tokenUrl, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    _authentication.isAuth = true;
                    _authentication.userName = loginData.userName;
                    _authentication.accessToken = response.access_token;
                    localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false });
                deferred.resolve(response);
            }).error(function (err, status) {
                console.log(err);
                console.log(status);
                deferred.reject(err);
            });
            return deferred.promise;
        };

        var _logOut = function () {

            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.userName = "";
            _authentication.useRefreshTokens = false;

        };

        var _validateAuth = function () {
            var dummyUrl = ngAppSettings.baseUri + 'api/dummy/' + Date.now().toString();
            var deferred = $q.defer();
            $http.get(dummyUrl) .success(function() {
                var authData = localStorageService.get('authorizationData');
                if (authData) {
                    _authentication.isAuth = true;
                    _authentication.userName = authData.userName;
                    _authentication.useRefreshTokens = authData.useRefreshTokens;
                }
                console.log(_authentication.isAuth);
            }).error(function (err, status) {
                console.log(err);
                console.log(status);
                deferred.reject(err);
                _logOut();

                $location.path('/login');
            });
        };

        service.login = _login;
        service.logOut = _logOut;
        service.validateAuth = _validateAuth;
        service.authentication = _authentication;
        return service;
    }
})();