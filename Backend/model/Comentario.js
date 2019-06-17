var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var comentarioSchema = new Schema({
    nombre:String,
    descripcion:String,
    usuarioId:{type:String, required:true},
    fecha:{type:Date, default:Date.now()},
    eventoId:{type:String, required:true}
});

var Comentario = mongoose.model('Comentario', comentarioSchema);
console.log("se creo modelo Comentario");
module.exports = Comentario;