

var funcion = x

function Incidente(generadoPor,fecha,estado,prioridad,detalle,numeroCaso){
          this.generadoPor = generadoPor;
          this.fecha = fecha;
          this.estado = estado;
          this.prioridad = prioridad;
          this.detalle = detalle;
          this.numeroCaso = numeroCaso;
          
          this.fecha.getFecha = function(){
                     return this.fecha;
          };
      }


