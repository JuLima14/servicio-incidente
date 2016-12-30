
var dbContext;
var DATABASE_URL;

exports.setProperties = function(databaseUrl, pgClient){

  DATABASE_URL = databaseUrl;
  dbContext = pgClient;
  
};


exports.createTable = function (){


dbContext.connect((process.env.DATABASE_URL || DATABASE_URL),function(err,client){
   if (err){
      throw err;
  }
console.log('Comienza creacion de tabla.');

client.query('CREATE TABLE INCIDENTE(id SERIAL PRIMARY KEY,'
                +'generadoPor VARCHAR(100) not null,'
                +'fecha       VARCHAR(10) not null,'
                +'estado      VARCHAR(100) not null,'
                +'detalle     VARCHAR(400) not null,'
                +'prioridad   VARCHAR(10) not null)');

client.on("end", client.end.bind(client));
  });
  console.log("Transaccion completada correctamente.");
};

//GET - Devuelve todos los incidentes en la base de datos
exports.getAll = function(req, res) {

    console.log('GET /getAll');
    var rows = [];

    dbContext.connect((process.env.DATABASE_URL || DATABASE_URL),function(err,client){
      if(err){
        throw err;
      }

      client.query('SELECT * FROM INCIDENTE');

        client.on('row', function(row, res) {
            rows.push(row);
          });

        client.on("end", function (result) {
              res.json(JSON.stringify(rows));
          });
    });
};

exports.insert = function(req, res) {
  console.log('POST /insert '+ req.body.generadoPor +req.body.fecha+req.body.estado+req.body.detalle+req.body.prioridad);
  //console.log('POST /insert '+ res.body.generadoPor +res.body.fecha+res.body.estado+res.body.detalle+res.body.prioridad);
  dbContext.connect((process.env.DATABASE_URL || DATABASE_URL),function(err,client){
    var query ;
      if(err){
        console.error(err);
      }

      console.log("Comienza la query insert");

      query = client.query("INSERT INTO INCIDENTE (generadoPor,fecha,estado,detalle,prioridad)"
      +"VALUES($1,$2,$3,$4,$5) RETURNING id",[req.body.generadoPor,req.body.fecha,req.body.estado,req.body.detalle,req.body.prioridad]);

      query.on("end",function(result){
                client.end.bind(client);
                res.json({message:"Se inserto correctamente"});
      });

  });
};
