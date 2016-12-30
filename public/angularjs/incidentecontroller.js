
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
	  $scope.numeroCaso = -1;

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
      if(validar(incidente)){

        var incidenteEcontrado = $filter('filter')($scope.incidentes,{numeroCaso: $scope.numeroCaso} ,true);

      if(incidenteEcontrado.length){
        var index = $scope.incidentes.indexOf(incidenteEcontrado[0])
            $scope.incidentes[index] = incidente;
      }else{
            $scope.incidentes.push(incidente);
          }

			$http({
				method:'POST',
				url:'http://172.16.82.29:8080/insert',
				data: incidente,
				contentType: "application/json"
				})
				.then(function successCallback(response){

            alert('Enviado correctamente');

						});
        $scope.limpiarDatos();
      }
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
			$scope.numeroCaso 		 = parseInt($scope.cauTexto.substr(findex+14,6)) ;
			var textoBusquedaFecha = " con Fecha de apertura: ";
			findex 					       = $scope.cauTexto.search(textoBusquedaFecha);
			$scope.fecha 			     = $scope.cauTexto.substr(findex+textoBusquedaFecha.length,19)|| '';
			var textoBusquedaDescr = "siguiente Descripción: ";
			findex 					       = $scope.cauTexto.search(textoBusquedaDescr);
			$scope.detalle		     = $scope.cauTexto.substr(findex+textoBusquedaDescr.length,$scope.cauTexto.length)|| '';
		}
	};
$scope.cargarIncidentes = function (){
  $http({
    method:'GET',
    //url:'http://172.16.82.29:8080/getall',
      url:'http://servicio-incidente.herokuapp.com/getall',
    dataType: "application/json"
    })
    .then(function successCallback(response){
      var log = [];
      $scope.incidentes = [];
      angular.forEach($scope.incidentes, function(value, key) {
          this.push(value);
      }, log);
        alert('Enviado correctamente');

        });
}
  function validar(incidente){
    if(incidente.numeroCaso == -1){
        return false;
    }
    if(incidente.generadoPor == ''){
        return false;
    }
    if(incidente.fecha == ''){
        return false;
    }
    if(incidente.estado == ''){
        return false;
    }
    if(incidente.prioridad == ''){
        return false;
    }
    if(incidente.detalle == ''){
        return false;
    }
    return true;
  }
};
