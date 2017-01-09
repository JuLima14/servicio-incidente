
function Incidente(generadoPor,fecha,estado,prioridad,detalle,numeroCaso){
          this.generadoPor = generadoPor;
          this.fecha = fecha.split('T')[0];
          this.estado = estado;
          this.prioridad = prioridad;
          this.detalle = detalle;
          this.numeroCaso = numeroCaso;
      }
