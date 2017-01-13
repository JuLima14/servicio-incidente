
//var app = angular.module('HomeModule',['ngAnimate','ngMaterial', 'ngMessages', 'material.svgAssetsCache']);
var app = angular.module('HomeModule');

app.controller('HomeController',['$scope', '$timeout', '$mdSidenav', '$log','$filter',HomeController])
.config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('blue')
      .dark();

  });

  function HomeController($scope, $timeout, $mdSidenav, $log,$filter, $templateRequest, $sce, $compile){
    //$scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleLeft = buildToggler('left');
    //$scope.toggleRight = buildToggler('right');

    $scope.listView = [];
    $scope.selectedView;

    $scope.listView.push(new View(0,"ABM Incidentes","aplicacion/modules/abm-incidentes/views/viewABMIncidentes.html"));
    $scope.listView.push(new View(1,"Casos abiertos","aplicacion/modules/abm-incidentes/views/viewABMIncidentes.html"));
    $scope.listView.push(new View(2,"ABM Pantallas","aplicacion/modules/abm-pantallas/AbmPantallaController.js"));

    $scope.selectedView = $scope.listView[0];


    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
        $scope.go = function(id){
              $scope.selectedView = $scope.listView[id];
        };

        $scope.close = function() {
          // Component lookup should always be available since we are not using `ng-if`
          $mdSidenav('left').close()
            .then(function () {
              $log.debug("close LEFT is done");
            });

        };


  };
/*
  app.controller('LeftCtrl',['$scope', '$timeout', '$mdSidenav', '$log','$filter',LeftCtrl])


  function LeftCtrl($scope, $timeout, $mdSidenav, $log,$filter, $templateRequest, $sce, $compile){
    $scope.listView = [];
    $scope.selectedView;

    $scope.listView.push(new View(0,"ABM Incidentes","modules/abm-incidentes/views/viewABMIncidentes.html"));
    $scope.listView.push(new View(1,"Casos abiertos","modules/abm-incidentes/views/viewABMIncidentes.html"));
    $scope.listView.push(new View(2,"Carga de horas","file.html"));

    $scope.selectedView = $scope.listView[0];




    $scope.go = function(id){
          $scope.selectedView = $scope.listView[id];

    };
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  };

*/

/**
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/
