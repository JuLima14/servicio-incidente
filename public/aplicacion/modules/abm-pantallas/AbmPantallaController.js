

var AbmPantallaModule =  angular.module('AbmPantallaModule');

AbmPantallaModule.controller('AbmPantallaController', ['$scope','$http',AbmPantallaController]);

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

function AbmPantallaController($scope,$http) {

    $scope.selectedView = {};
    $scope.listView = [];


    $scope.listView.push(new View(0,'html',"aplicacion/modules/abm-pantallas/views/html/viewHtml.html"));
    $scope.listView.push(new View(1,'controller',"aplicacion/modules/abm-pantallas/views/controller/viewController.html"));
    $scope.listView.push(new View(2,'vista',"aplicacion/modules/abm-pantallas/views/vista/viewVista.html"));

    $scope.selectedView = $scope.listView[0];


    $scope.folder;
    $scope.nameHtml;
    $scope.nameScript;
    $scope.nameView;

$scope.go = function(id){
      $scope.selectedView = $scope.listView[id];
  };


$scope.save = function(){


var archivo =  {
      "html":{
        "text":$scope.listView[0].text,
        "folder":$scope.folder+"/views",
        "name":$scope.nameHtml
      },
      "controller":{
        "text":$scope.listView[1].text,
        "folder":$scope.folder,
        "name":$scope.nameScript
      }
  };
var view = new View(9999,$scope.nameView,"aplicacion/modules/"+archivo.html.folder+"/"+archivo.html.name+".html");
  view.archivo = archivo;
  $http({

    method:'POST',
    url:'http://localhost:8080/saveView',
    data: view
    //headers: {'Content-Type': 'application/json'}
    //contentType: "application/json"
    })
    .then(function successCallback(response){

      alert(responde.msg);

        });
  };
};
