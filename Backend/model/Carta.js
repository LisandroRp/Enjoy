var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cartaSchema = new Schema({
    nombre:String,
    descripcion:String,
    precios:[],
});

var Carta = mongoose.model('Carta', cartaSchema);
console.log("se creo modelo Carta");
module.exports = Cartas;