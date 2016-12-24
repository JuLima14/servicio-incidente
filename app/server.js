// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define el servidor usando express
var http     = require("http");
var server   = http.createServer(app);
var bodyParser = require('body-parser');
var methodOverride  = require("method-override");
var ip = require("ip");
var pg = require("pg");
var DATABASE_URL = "postgres://twlfziyretvaol:e47476a474996d6288a1cedf20448b60e1352f27783af0d506d2d589746805c2@ec2-54-235-112-37.compute-1.amazonaws.com:5432/d7t6cddl7ofpsl?ssl=true";
var port = process.env.PORT || 8080;        // set our port
var IncidentesController = require('../app/controllers/IncidenteController');

//se cargan las librerias en el servidor
// esto nos permite obtener data con un POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//==============================================================================


pg.defaults.ssl = true;
pg.connect(DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');
/*
  client.query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
  */
});

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

router.route('/getAll').get(IncidentesController.getAll);
router.route('/insert').post(IncidentesController.insert);

app.use('/api', router);

//app.listen(port);
app.listen(port, function() {

//obtengo la ip donde se esta ejecutando el servidor
//require('dns').lookup(require('os').hostname(),function(err, add, fam){});
// mi ip
console.log("Node server corriendo en http://"+ip.address()+":"+port);
});
