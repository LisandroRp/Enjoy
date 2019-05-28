// Initialize express router
let router = require('express').Router();
let usuarioController = require('./controller/UsuarioController');
let comentarioController = require('./controller/ComentarioController');
let peliculaController = require('./controller/PeliculaController');
       
// Set default API response
router.get('/', function (req, res) 
{
    res.json(
    {
       status: 'Estoy Funcionando',
       message: 'Se esta ejecutando la Api!',
    });
});

//**************************Recursos de Usuarios**************************** */
//EndPoint para leer todos  los usuarios
// router.get('/getUsuarios',function(req,res)
// {
//     usuarioController.getUsuarios(req,res);
// });
router.get('/getUsuarios', (req, res) => {
    usuarioController.getUsuarios(req,res);
});
router.get('/Usuarios', (req, res) => {
    usuarioController.getUsuarios(req,res);
});
//EndPoint para leer usuario por id
router.get('/getUsuarioById',(req, res) =>{
    if(!req.query.usuarioId || req.query.usuarioId =='undefined' || req.query.usuarioId == '') 
        res.status(409).send({ msg: "El campo id usuario es requerido." });
    else
        usuarioController.getUsuarioById(req,res);
});
//Homologo al anterior
router.get('/Usuarios/Usuario',(req, res) =>{
    if(!req.query.usuarioId || req.query.usuarioId =='undefined' || req.query.usuarioId == '') 
        res.status(409).send({ msg: "El campo id usuario es requerido." });
    else
        usuarioController.getUsuarioById(req,res);
});
router.get('/getUsuarioByIdOne',(req, res) =>{
    if(!req.query.usuarioId || req.query.usuarioId =='undefined' || req.query.usuarioId == '') 
        res.status(409).send({ msg: "El campo id usuario es requerido." });
    else
        usuarioController.getUsuarioByIdOne(req,res);
});
//Endpoint de insert un usuarios
router.post('/insertUsuario/Usuario',(req, res) =>{
    console.log("Insertar nuevo usuario: ", req.body);
    if(!req.body || req.body.usuarioId =='undefined' || req.body.password =='undefined' || req.body.usuarioId == '' || req.body.password == '') 
        res.status(409).send({ msg: "El campo id usuario es requerido." });
    else
        usuarioController.insertUsuario(req,res);
});
router.post('/Usuarios/Usuario',(req, res) =>{
    console.log("Insertar nuevo usuario: ", req.body);
    if(!req.body || req.body.usuarioId =='undefined' || req.body.password =='undefined' || req.body.usuarioId == '' || req.body.password == '') 
        res.status(409).send({ msg: "El campo id usuario es requerido." });
    else
        usuarioController.insertUsuario(req,res);
});
//EndPoint para actualizar password por usuario.
router.post('/updateUsuarioByPassword/Usuario',(req, res) =>{
    console.log("Actualizar usuario y password: ", req.body);
    if(!req.body.usuarioId || !req.body.password) 
        res.status(409).send({ msg: "El campo nombre y password son requeridos del usuario." });
    else
        usuarioController.updateUsuarioByPassword(req,res); 
});
//**************************Recursos de Usuarios**************************** */
//EndPoint para insertar comentario
router.post('/insertComentario/Comentario',(req, res) =>{
    console.log("Insertar nuevo comentatrio: ",req.body);
    if(!req.body || req.body.usuarioId =='undefined' || req.body.peliculaId =='undefined' || req.body.usuarioId == '' || req.body.usuarioId == null || req.body.peliculaId == '' || req.body.peliculaId == null) 
        res.status(409).send({ msg: "El campo usuario y pelicula son requeridos del comentario." });
    else
        comentarioController.insertComentario(req,res);
});
//EndPoint para leer comentartios de un usuarios
router.get('/getComentariosByUsuario',(req, res) =>{
    console.log("Obtener  comentatrio por usuario: ",req.query);
    if(!req.query || req.query.usuarioId =='undefined' || req.query.usuarioId == '' || req.query.usuarioId == null ) 
        res.status(409).send({ msg: "El campo usuario es requerido del comentario." });
    else
        comentarioController.getComentariosByUsuarioId(req,res);
});
//EndPoint para leer comentartios de un usuarios
router.get('/getComentariosByPeliculaId',(req, res) =>{   
    console.log("Obtener  comentatrio por pelicula: ",req.query);
    if(!req.query ||  req.query.peliculaId =='undefined' || req.query.peliculaId == '' || req.query.peliculaId == null) 
        res.status(409).send({ msg: "El campo pelicula es requeridos del comentario." });
    else
        comentarioController.getComentariosByPeliculaId(req,res);
});
//**************************Recursos de Peliculas**************************** */
//EndPoint para buscar pelicula por titulo.
router.get('/getPeliculasByTitle',(req, res) =>{
    console.log("Obtener  pelicula por titulo: ",req.query);
    if(!req.query ||  req.query.title =='undefined' || req.query.title == '' || req.query.title == null) 
        res.status(409).send({ msg: "El campo titulo  de pelicula es requeridos." });
    else
        peliculaController.getPeliculasByTitle(req,res);
});
//EndPoint para buscar pelicula por titulo y anio.
router.get('/getPeliculasByTitleAndYear',(req, res) =>{
    console.log('Param getPeliculasByTitleAndYear: ',req.query);
    if(typeof req.query.title !== 'undefined' && typeof req.query.year !== 'undefined') {
        console.log(req.query.title);
        console.log(req.query.year);
        peliculaController.getPeliculasByTitleAndYear(req,res);
    }else{
        res.status(409).send({ msg: "Parametros invalidos." });
    }    
});
//EndPoint para buscar pelicula por key de nombre de pelicula.
router.get('/getPeliculasByKey',(req, res) =>{
    console.log('Param getPeliculasByKey: ',req.query);
    if(typeof req.query.key !== 'undefined') {
        console.log(req.query.key);
        peliculaController.getPeliculasByKey(req,res);
    }else{
        res.status(410).send({ msg: "Parametros no ingresado o invalidos." });
    }    
});
//EndPoint para buscar pelicula por Id  de pelicula.
router.get('/getPeliculasAndSeriesById',(req, res) =>{
    console.log('Param getPeliculasAndSeriesById: ',req.query);
    if(typeof req.query.movieId !== 'undefined') {
        console.log(req.query.movieId);
        peliculaController.getPeliculasAndSeriesById(req,res);
    }else{
        res.status(410).send({ msg: "Parametros no ingresado o invalidos." });
    }    
});
//EndPoint para buscar series por key de nombre de pelicula.
router.get('/getSeriesByKey',(req, res) =>{
    console.log('Param getSeriesByKey: ',req.query);
    if(typeof req.query.key !== 'undefined') {
        console.log(req.query.key);
        peliculaController.getSeriesByKey(req,res);
    }else{
        res.status(410).send({ msg: "Parametros no ingresado o invalidos." });
    }    
});

// Export API routes
module.exports = router;