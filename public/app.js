'use strict';
//declare modules of LOGIN
angular.module('AuthenticationModule', []);
angular.module('HttpAuthModule', ['AuthenticationModule','HomeModule','ngRoute','ngCookies'])
// declare modules of APLICACION
angular.module('HomeModule', ['ngAnimate','ngMaterial', 'ngMessages', 'material.svgAssetsCache']);
angular.module('IncidenteModule',['HomeModule']);


//BasicHttpAuthExample
//angular.module('BasicHttpAuthExample', ['AuthenticationModule','HomeModule','ngRoute','ngCookies'])
angular.module('HttpAuthModule')
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'AuthenticationController',
            templateUrl: 'login/modules/authentication/views/login.html',
            hideMenus: true
        })

        .when('/', {
            controller: 'HomeController',
            templateUrl: 'aplicacion/modules/home/views/home.html'
        })

        .otherwise({ redirectTo: '/login' });
}])

.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);
