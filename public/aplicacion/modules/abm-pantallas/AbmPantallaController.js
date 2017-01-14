

var AbmPantallaModule =  angular.module('AbmPantallaModule');

AbmPantallaModule.controller('AbmPantallaController', ['$scope',AbmPantallaController]);

AbmPantallaModule.directive('dinamico',['$compile',AbmPantallaDirective]);




function AbmPantallaDirective($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, element, attrs) {
            scope.$watch(attrs.dinamico, function(html) {
                element[0].innerHTML = html;
                $compile(element.contents())(scope);
            });
        }
    };
};

function AbmPantallaController($scope) {


    $scope.selectedView = {};
    $scope.listView = [];


    $scope.listView.push(new View(0,'html',"aplicacion/modules/abm-pantallas/views/html/viewHtml.html"));
    $scope.listView.push(new View(1,'controller',"aplicacion/modules/abm-pantallas/views/controller/viewController.html"));
    $scope.listView.push(new View(2,'vista',"aplicacion/modules/abm-pantallas/views/vista/viewVista.html"));

    $scope.selectedView = $scope.listView[1];

    $scope.module="hola";
    $scope.nameController="nada";
    $scope.listView[1].text="function(newScope) {"
                            +"newScope.name = 'DeathCarrot'"
                            +"});"
      $scope.go = function(id){
          $scope.selectedView = $scope.listView[id];
      };


$scope.compile = function(){
  var newScope = $scope.$new();
        // Make module Foo
        angular.module($scope.module,['libraries']).controller($scope.nameController,$scope.listView[1].text.val);
          // Load an element that uses controller Ctrl
          // Bootstrap with Foo
          $scope.listView[0].text.val;
          angular.bootstrap($scope.listView[0].text.val, [$scope.module]);
  };
};
