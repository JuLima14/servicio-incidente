
var dbContext;
var properties;

exports.setProperties = function(propFinder, pgClient){

  propFinder.parse('../app/properties/properties_database',{path : true},function(error,obj){
    if(error){
      return console.error(error);
    }
    properties = obj;
    console.log("Se cargaron correctamente las properties: " + process.env.DATABASE_URL);
  });

  dbContext = pgClient;
  console.log("MOSTRANDO DBCONTEXT: " + dbContext);
};


exports.createTable = function (){

//console.log("nada "+properties.DATABASE_URL);

dbContext.connect(process.env.DATABASE_URL,function(err,client){
   if (err){
      throw err;
  }
console.log('Comienza creacion de tabla.');

var query = client.query('CREATE TABLE INCIDENTE(id SERIAL PRIMARY KEY,'
                +'generadoPor VARCHAR(100) not null,'
                +'fecha       VARCHAR(10) not null,'
                +'estado      VARCHAR(100) not null,'
                +'detalle     VARCHAR(400) not null,'
                +'prioridad   VARCHAR(10) not null)');

query.on("end", client.end.bind(client));
  });
  console.log("Transaccion completada correctamente.");
};

//GET - Devuelve todos los incidentes en la base de datos
exports.getAll = function(req, res) {

    console.log('GET /getAll');


    dbContext.connect(process.env.DATABASE_URL,function(err,client){
      var query;
      var rows = [];

      if(err){
        console.error(err);
      }
      console.log("Comienza la query getAll");
      query =  client.query('SELECT * FROM INCIDENTE');

        query.on('row', function(row, res) {
            rows.addRow(row);
          });

        query.on("end", function (result) {
              client.end.bind(client);
              console.log("Termina la query getAll");
              res.json(JSON.stringify(rows));
          });
    });
    //res.json({ message: 'GET /getAll' });
};
exports.insert = function(req, res) {
  console.log('POST /insert '+ req.body.generadoPor +req.body.fecha+req.body.estado+req.body.detalle+req.body.prioridad);
  //console.log('POST /insert '+ res.body.generadoPor +res.body.fecha+res.body.estado+res.body.detalle+res.body.prioridad);
  dbContext.connect(process.env.DATABASE_URL,function(err,client){

      if(err){
        console.error(err);
      }
      console.log("Comienza la query insert");
client.query("INSERT INTO INCIDENTE (generadoPor,fecha,estado,detalle,prioridad)"
            +"VALUES($1,$2,$3,$4,$5,$6) RETURNING id",
            [req.body.generadoPor,req.body.fecha,req.body.estado,req.body.detalle,req.body.prioridad],
            function(err, result) {
                          if (err) {
                              console.log(err);
                          }
                              client.on("end",function(result){
                              client.end.bind(client);
                              res.json({message:"Se inserto correctamente"});
                          });

         });
  });
};
