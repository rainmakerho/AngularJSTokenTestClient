
(function () {
    'use strict';

    var app = angular.module('app', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar']);

    app.config(function($routeProvider) {
        $routeProvider.when('/home', {
            controller: 'homeController',
            templateUrl: '/app/views/home.html'
        });

        $routeProvider.when('/login', {
            controller: 'loginController',
            templateUrl: '/app/views/login.html'
        });

        $routeProvider.otherwise({ redirectTo: '/home' });
    }); 

     
    var baseUri = 'http://localhost:51528/';
    app.constant('ngAppSettings', {
        baseUri: baseUri,
        clientId:'tokenTestApp'
    });

    //設定$http時，會在header裡加入token
    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });

    app.run(['authService', function (authService) {
        //程式啟動時，檢查是否已有token存在。沒有就導到登入畫面
        authService.validateAuth();
    }]);

})();