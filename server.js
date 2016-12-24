// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express              = require("express");        // call express
var app                  = express();                 // define el servidor usando express
var http                 = require("http");
var server               = http.createServer(app);
var bodyParser           = require("body-parser");
var methodOverride       = require("method-override");
var ip                   = require("ip");
var port                 = process.env.PORT || 8080;       // set port
var propertiesFinder     = require("properties");
var db                   = require("pg");
var IncidentesController = require("/controllers/IncidenteController");
//nos permite las transacciones con ssl para conectarnos a la BD
db.defaults.ssl = true;
//se cargan las librerias en el servidor
// esto nos permite obtener data con un POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//INICIALIZACION de controllers creacion de tablas
//==============================================================================
//TABLA INCIDENTE
IncidentesController.setProperties(propertiesFinder,db);
//IncidentesController.createTable();


// ROUTES para la api API
// =============================================================================

// get an instance of the express Router
var router = express.Router();

// middleware cada vez que se invoca un servicio pasa por aca
router.use(function(req, res, next) {
    console.log('Servicio invocado.');
    next(); // se usa para continuar a la ruta que fue invocada sino queda aca
});


// es la ruta predefinida del servidor ( GET http://localhost:8080/api)
router.route('/').get(function(req, res) {
    res.json({ message: 'server ok' });
});

router.route('/getall').get(IncidentesController.getAll);
router.route('/insert').post(IncidentesController.insert);

app.use('/incidentes', router);

//app.listen(port);

app.listen(port, function() {
//obtengo la ip donde se esta ejecutando el servidor
//require('dns').lookup(require('os').hostname(),function(err, add, fam){});
// mi ip
console.log("Node server corriendo en http://"+ip.address()+":"+port);
});
