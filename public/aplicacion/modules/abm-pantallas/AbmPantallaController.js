

var AbmPantallaModule =  angular.module('AbmPantallaModule');

AbmPantallaModule.controller('AbmPantallaController', AbmPantallaController);

AbmPantallaModule.directive('dinamico',AbmPantallaDirective );




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

    $scope.currentNavItem = 'page1';
    $scope.listView = [];


    $scope.listView.push(new View(1,html,"aplicacion/modules/abm-pantallas/views/html/viewHtml.html"));
    $scope.listView.push(new View(2,controller,"aplicacion/modules/abm-pantallas/views/controller/viewController.html"));
    $scope.listView.push(new View(3,vista,"aplicacion/modules/abm-pantallas/views/vista/viewVista.html"));
  };
