
var dbContext;
var properties;

exports.setProperties = function(propFinder, pgClient){

  propFinder.parse('../properties_database',{path : true},function(error,obj){
    if(error){
      return console.error(error);
    }
    properties = obj;
    console.log("Se cargaron correctamente las properties: " + properties.DATABASE_URL);
  });

  dbContext = pgClient;
};


exports.createTable = function (){

//console.log("nada "+properties.DATABASE_URL);

dbContext.connect(properties.DATABASE_URL,function(err,client){
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
    var query;
    var rows = [];

    dbContext.connect(properties.DATABASE_URL,function(err,client){
      if(err){
        throw err;
      }

      query =  client.query('SELECT * FROM INCIDENTE');

        client.on('row', function(row, res) {
            rows.addRow(row);
          });

        client.on("end", function (result) {
              res.json(JSON.stringify(rows));
          });
    });
    //res.json({ message: 'GET /getAll' });
};
exports.insert = function(req, res) {

    console.log('POST /insert');
    res.json({ message: 'POST /insert' });
};
