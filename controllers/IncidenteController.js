
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
              res.json(JSON.stringify(rows));
              console.log("Termina la query getAll");
          });
    });
    //res.json({ message: 'GET /getAll' });
};
exports.insert = function(req, res) {
  console.log('POST /insert '+ req.body.generadoPor +req.fecha+req.estado+req.detalle+req.prioridad);
  console.log('POST /insert '+ res.generadoPor +res.fecha+res.estado+res.detalle+res.prioridad);
  dbContext.connect(process.env.DATABASE_URL,function(err,client){

    if(err){
      console.error(err);
    }
    var query = client.query("INSERT INTO INCIDENTE (generadoPor,fecha,estado,detalle,prioridad)"
                            +"VALUES("+req.generadoPor+","+req.fecha+","+req.estado+","+req.detalle+","+req.prioridad+");");

    query.on("end",function(result){
      res.json({message:"Se inserto correctamente"});
    });
  });
};
