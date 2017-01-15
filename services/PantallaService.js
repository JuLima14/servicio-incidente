var fileSearch;

exports.setProperties = function(fs){

  fileSearch = fs;

};


exports.addPantalla = function(req, res){

  fileSearch.writeFile("../Servicio-incidente/public/aplicacion/modules/"+req.body.archivo.controller.folder+"/"+req.body.archivo.controller.name+".js",req.body.archivo.controller.text,
   function(err) {
    if(err) {
res.json({msg:"fallo"});
        return console.log(err);
    }

    console.log("The file was saved!");
});

fileSearch.writeFile("../Servicio-incidente/public/"+req.body.url,req.body.archivo.html.text,
 function(err) {
  if(err) {
      return console.log(err);
  }

  console.log("The file was saved!");
});




}
