// server.js
//http://soenkerohde.com/2012/04/using-redis-as-node-js-express-session-storage-on-heroku/comment-page-1/
// BASE SETUP
// =============================================================================

// call the packages we need
var express              = require("express");        // call express
var app                  = express();                 // define el servidor usando express
var http                 = require("http");
var bodyParser           = require("body-parser");
var methodOverride       = require("method-override");
var ip                   = require("ip");
var db                   = require("pg");
var path                 = require('path');
var config               = require("./properties.js");

var IncidenteServiceImpl;

if(config.PORT != 8080){
  IncidenteServiceImpl = require("../app/services/IncidenteService");
}else{
  IncidenteServiceImpl = require("../Servicio-incidente/services/IncidenteService");
}

//nos permite las transacciones con ssl para conectarnos a la BD
db.defaults.poolIdleTimeout = config.databaseConfig.poolIdleTimeout;
db.defaults.ssl = config.databaseConfig.ssl;
//se cargan las librerias en el servidor
// esto nos permite obtener data con un POST
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
//INICIALIZACION de controllers creacion de tablas
//==============================================================================
//TABLA INCIDENTE
IncidenteServiceImpl.setProperties(config.databaseConfig.DATABASE_URL,db);
//IncidentesController.createTable();


// ROUTES para la api API
// =============================================================================

// get an instance of the express Router
var router = express.Router();

// middleware cada vez que se invoca un servicio pasa por aca
router.use(function(req, res, next) {
    console.log('Servicio invocado.');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); // se usa para continuar a la ruta que fue invocada sino queda aca
});


// es la ruta predefinida del servidor ( GET http://localhost:8080/incidentes)
router.route('/').get(function(req, res) {
    res.sendFile('public/index.html' , { root : __dirname});
});

router.route('/getip').get(function(req,res){
  res.json({ip:ip.address()});
});
router.route('/createtable').get(IncidenteServiceImpl.createTable);
router.route('/deletetable').get(IncidenteServiceImpl.deleteTable);
router.route('/getall').get(IncidenteServiceImpl.getAll);
router.route('/insert').post(IncidenteServiceImpl.insert);
//router.route('/getbyid/:id').get(IncidenteServiceImpl.getById);

app.use('/', router);

//app.listen(port);
http.createServer(app).listen(config.PORT, function(){
  console.log("Node server corriendo en http://"+ip.address()+":"+config.PORT);
});

/*app.listen(port, function() {
//obtengo la ip donde se esta ejecutando el servidor
//require('dns').lookup(require('os').hostname(),function(err, add, fam){});
// mi ip
console.log("Node server corriendo en http://"+ip.address()+":"+port);
});*/
