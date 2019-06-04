var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var precioSchema = new Schema({
    nombre:String,
    descripcion:String,
    precio:float,
});

var Precio = mongoose.model('Precio', precioSchema);
console.log("se creo modelo Precio");
module.exports = Precios;