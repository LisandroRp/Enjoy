var comentarios = require('../model/Comentario');
var bodyParser = require('body-parser');

let insertComentario = (req,res) =>
{
    console.log(req.body);
    //var date = new Date().toISOString().slice(0,10);
    var newComentario = comentarios({
        nombre:req.body.usuarioId,
        descripcion:req.body.descripcion,
        usuarioId:req.body.usuarioId,
        fecha:req.body.fecha,
        eventoId:req.body.eventoId
    });
    newComentario.save().
    then
    (
        (newComentario)=>
        {
            console.log(newComentario.nombre) ; 
            res.send(newComentario); //devuelvo resultado query   
        },
        (err)=>{console.log(err);}
    ) 
}

let getComentariosByUsuarioId = (req, res) =>
{      
    console.log("llegue a leer comentarios con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.query.usuarioId);
    let idBusqueda = {usuarioId: req.query.usuarioId};
    console.log(idBusqueda);
    //Listar resultados
    comentarios.find(idBusqueda)
    .then
    (
        (listaComentarios)=>
        {
            console.log(listaComentarios);    
            res.send(listaComentarios); //devuelvo resultado query   
        },
        (err)=>{console.log(err);}
    )       
};

let getComentariosByEventoId = (req, res) =>
{      
    console.log("llegue a leer comentarios con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.query.eventoId);
    let idBusqueda = {eventoId: req.query.eventoId};
    console.log(idBusqueda);
    //Listar resultados
    comentarios.find(idBusqueda)
    .then
    (
        (listaComentarios)=>
        {
            console.log(listaComentarios);    
            res.send(listaComentarios); //devuelvo resultado query   
        },
        (err)=>{console.log(err);}
    )       
};

module.exports = {insertComentario,getComentariosByUsuarioId,getComentariosByEventoId};