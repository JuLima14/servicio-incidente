
var aplicacion = angular.module('aplicacion', []);

aplicacion.controller('Incidente',['$scope','$http','$filter',IncidenteController]);

 function IncidenteController($scope,$http,$filter) {
    $scope._id = null;
    $scope.generadoPor = '';
    $scope.fecha = '';
    $scope.estado = '';
    $scope.prioridad = '';
    $scope.detalle = '';
	  $scope.cauTexto = '';
	  $scope.numeroCaso ='';

    $scope.incidentes = [];



    $scope.guardar = function() {

      var incidente = {
                generadoPor: $scope.generadoPor,
                fecha: $scope.fecha,
                estado: $scope.estado,
                prioridad: $scope.prioridad,
                detalle: $scope.detalle,
                numeroCaso: $scope.numeroCaso
            };

      var incidenteEcontrado = $filter('filter')($scope.incidentes,{numeroCaso: $scope.numeroCaso} ,true);

      if(incidenteEcontrado.length){
        var index = $scope.incidentes.indexOf(incidenteEcontrado[0])
        $scope.incidentes[index] = incidente;
      }else{
            $scope.incidentes.push(incidente);
          }

			$http({
				method:'POST',
				url:'http://192.168.0.30/insert',
				data: incidente,
				contentType: "application/json"
				})
				.then(function successCallback(response){

            alert('Enviado correctamente');

						});
        $scope.limpiarDatos();
    };

    $scope.recuperar = function(index) {
        $scope._id = index;
        $scope.generadoPor = $scope.incidentes[index].generadoPor;
        $scope.fecha = $scope.incidentes[index].fecha;
        $scope.estado = $scope.incidentes[index].estado;
        $scope.prioridad = $scope.incidentes[index].prioridad;
        $scope.detalle = $scope.incidentes[index].detalle;
		    $scope.numeroCaso = $scope.incidentes[index].numeroCaso;
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
		$scope.numeroCaso = '';
		$scope.cauTexto = '';
    };

	$scope.cargar = function(){
		if($scope.cauTexto != ''){
			var inicioTexto        = $scope.cauTexto.search("El caso ha sido reportado por");
			var findex             = 30+inicioTexto;
			var eindex             = $scope.cauTexto.search(" bajo el No.:") - findex ;
			$scope.generadoPor     = $scope.cauTexto.substr(findex, eindex) || '';
			findex  				       = eindex;
			findex 					       = $scope.cauTexto.search(" bajo el No.:");
			$scope.numeroCaso 		 = $scope.cauTexto.substr(findex+14,6) || '';
			var textoBusquedaFecha = " con Fecha de apertura: ";
			findex 					       = $scope.cauTexto.search(textoBusquedaFecha);
			$scope.fecha 			     = $scope.cauTexto.substr(findex+textoBusquedaFecha.length,19)|| '';
			var textoBusquedaDescr = "siguiente Descripción: ";
			findex 					       = $scope.cauTexto.search(textoBusquedaDescr);
			$scope.detalle		     = $scope.cauTexto.substr(findex+textoBusquedaDescr.length,$scope.cauTexto.length)|| '';
		}
	};
};
