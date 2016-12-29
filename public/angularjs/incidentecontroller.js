
var aplicacion = angular.module('aplicacion', []);


aplicacion.controller('Incidente', function($scope) {
    $scope._id = null;
    $scope.generadoPor = '';
    $scope.fecha = ''
    $scope.estado = '';
    $scope.prioridad = '';
    $scope.detalle = '';

    $scope.incidentes = [];

    $scope.guardar = function() {

        if ($scope._id == null) {
            $scope.incidentes.push({
                generadoPor: $scope.generadoPor,
                fecha: $scope.fecha,
                estado: $scope.estado,
                prioridad: $scope.prioridad,
                detalle: $scope.detalle
            });
        } else {
            $scope.incidentes[$scope._id] = {
              generadoPor: $scope.generadoPor,
              fecha: $scope.fecha,
              estado: $scope.estado,
              prioridad: $scope.prioridad,
              detalle: $scope.detalle
            };
        }
        $scope.limpiarDatos();
    }
    $scope.recuperar = function(index) {
        $scope._id = index;
        $scope.generadoPor = $scope.incidentes[index].generadoPor;
        $scope.fecha = $scope.incidentes[index].fecha;
        $scope.estado = $scope.incidentes[index].estado;
        $scope.prioridad = $scope.incidentes[index].prioridad;
        $scope.detalle = $scope.incidentes[index].detalle;
    };
    $scope.eliminar = function(indice) {
        var incidentes_actualizado = [];
        for (var i = 0; i < $scope.incidentes.length; i++) {
            if (i != indice) {
                incidentes_actualizado.push($scope.incidentes[i]);
            }
        }
        $scope.incidentes = incidentes_actualizado;
    };
    $scope.limpiarDatos = function() {
        $scope._id = null;
        $scope.generadoPor = '';
        $scope.fecha = '';
        $scope.estado = '';
        $scope.prioridad = '';
        $scope.detalle = '';
    };
});
