
//ACA SE CARGAN TODOS LOS CONTROLLERS
angular.module("CombineModule", ["HomeModule", "IncidenteModule"]);


var app = angular.module('HomeModule',['ngAnimate','ngMaterial', 'ngMessages', 'material.svgAssetsCache']);

  app.filter('keyboardShortcut', function($window) {
    return function(str) {
      if (!str) return;
      var keys = str.split('-');
      var isOSX = /Mac OS X/.test($window.navigator.userAgent);

      var seperator = (!isOSX || keys.length > 2) ? '+' : '';

      var abbreviations = {
        M: isOSX ? '⌘' : 'Ctrl',
        A: isOSX ? 'Option' : 'Alt',
        S: 'Shift'
      };

      return keys.map(function(key, index) {
        var last = index == keys.length - 1;
        return last ? key : abbreviations[key];
      }).join(seperator);
    };
  });

app.controller('AppCtrl',['$scope', '$timeout', '$mdSidenav', '$log',AppCtrl]);

  function AppCtrl($scope, $timeout, $mdSidenav, $log){
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    /*$scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };*/

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
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
  };

  app.controller('LeftCtrl',['$scope', '$timeout', '$mdSidenav', '$log','$filter',LeftCtrl])
  .config(function($mdThemingProvider) {
      // Configure a dark theme with primary foreground yellow
      $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('blue')
        .dark();

    });

  function LeftCtrl($scope, $timeout, $mdSidenav, $log,$filter, $templateRequest, $sce, $compile){
    $scope.listView = [];
    $scope.selectedView;

    $scope.listView.push(new View(0,"ABM Incidentes","templates/views/viewABMIncidentes.html"));
    $scope.listView.push(new View(1,"Casos abiertos","templates/views/viewABMIncidentes.html"));
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



/**
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/
