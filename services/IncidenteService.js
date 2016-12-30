
var dbContext;
var DATABASE_URL;

exports.setProperties = function(databaseUrl, pgClient){

  DATABASE_URL = databaseUrl;
  dbContext = pgClient;

};

exports.deleteTable = function(){
  dbContext.connect((process.env.DATABASE_URL || DATABASE_URL),function(err,client){
     if (err){
        throw err;
    }
    var query = {};
    console.log('Comienza eliminacion de la tabla.');

  client.query('DROP TABLE INCIDENTE');

  client.on("end", client.end.bind(client));
    });
    console.log("Transaccion completada correctamente.");

};

exports.createTable = function (){


dbContext.connect((process.env.DATABASE_URL || DATABASE_URL),function(err,client){
   if (err){
      throw err;
  }
console.log('Comienza creacion de tabla.');
 client.query('CREATE TABLE INCIDENTE(id SERIAL PRIMARY KEY,'
                +'generadoPor VARCHAR(100) not null,'
                +'fecha       VARCHAR(100) not null,'
                +'estado      VARCHAR(100) not null,'
                +'detalle     text  not null,'
                +'prioridad   VARCHAR(20) not null,'
                +'numeroCau   integer not null)');

client.on('end', client.end.bind(client));
console.log("Transaccion completada correctamente.");
  });
};

//GET - Devuelve todos los incidentes en la base de datos
exports.getAll = function(req, res) {

    console.log('GET /getAll');
    var query={};
    var rows = [];

    dbContext.connect((process.env.DATABASE_URL || DATABASE_URL),function(err,client){
      if(err){
        throw err;
      }

      query = client.query('SELECT * FROM INCIDENTE');

        client.on('row', function(row, res) {
            rows.push(row);
          });

        client.on("end", function (result) {
              client.end.bind(client);
              res.json(JSON.stringify(rows));
          });
    });
};

exports.insert = function(req, res) {
  //console.log('POST /insert '+ req.body.generadoPor +req.body.fecha+req.body.estado+req.body.detalle+req.body.prioridad+req.body.numeroCaso);
  //console.log('POST /insert '+ res.body.generadoPor +res.body.fecha+res.body.estado+res.body.detalle+res.body.prioridad);
  dbContext.connect((process.env.DATABASE_URL || DATABASE_URL),function(err,client){
    if(err){
        console.error(err);
      }
var query = {};
      console.log("Comienza la query insert");

      query = client.query("INSERT INTO INCIDENTE (generadoPor,fecha,estado,detalle,prioridad,numeroCau)"
      +"VALUES($1,$2,$3,$4,$5,$6)",[req.body.generadoPor,req.body.fecha,req.body.estado,req.body.detalle,req.body.prioridad,req.body.numeroCaso]);

      console.log("continua la query insert");
      query.on("end",function(result){
                client.end.bind(query);
                console.log("termina la query insert");
      });

  });
};
