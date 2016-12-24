//GET - Devuelve todos los incidentes en la base de datos
exports.getAll = function(req, res) {

    console.log('GET /getAll');
    res.json({ message: 'GET /getAll' });
};

exports.insert = function(req, res) {

    console.log('POST /insert');
    res.json({ message: 'POST /insert' });
};
