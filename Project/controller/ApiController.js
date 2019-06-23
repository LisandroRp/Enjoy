import { Component } from 'react';

class ApiController extends Component {

    getPeliculas(okPeliculas, nombre) {
        let uri = 'http://localhost:8080/appAppEventos/getPeliculasByKey?key=' + nombre
        fetch(uri).then(res => {
            return res.json()
        }).catch((err) => alert("Intentar de nuevo")).
            then(data => {
                okPeliculas(data);
            }).catch((err) => alert("Intentar de nuevo"));
    }

    getEventos(okEventos) {
        let uri = 'http://192.168.1.104:8080/apiAppEventos/getEventos'
        fetch(uri).then(res => {
            return res.json()
        }).catch((err) => alert("Intentar de nuevo")).
            then(data => {
                okEventos(data);
            }).catch((err) => alert("Intentar de nuevo"));
    }

    getDetalle(okDetalle, id) {
        let uri = 'http://localhost:8080/appAppEventos/getPeliculasAndSeriesById?movieId=' + id
        fetch(uri).then(res => {
            return res.json()
        }).catch((err) => console.log(err)).
            then(data => {
                okDetalle(data);
            }).catch((error) => console.log(error));
    }

    getSeries(okSeries, nombre) {
        let uri = 'http://localhost:8080/appAppEventos/getSeriesByKey?key=' + nombre
        fetch(uri).then(res => {
            return res.json()
        }).catch((err) => console.log(err)).
            then(data => {
                okSeries(data);
            }).catch((err) => console.log(err));
    }

    getComentarioByPelicula(okComentario, id) {
        let uri = 'http://localhost:8080/appAppEventos/getComentariosByPeliculaId?peliculaId=' + id
        fetch(uri).then(res => {
            return res.json()
        }).catch((err) => {
            console.log(err)
        }).
            then(data => {
                okComentario(data);
            }).catch((err => {
                console.log(err);
                alert("No existen Comentarios");
            }));
    }

    insertUsuario(name, lastName, email, user, password, okCreate) {
        let uri = 'http://192.168.1.103:8080/apiAppEventos/insertUsuario/Usuario'
        fetch(uri, {
            method: 'POST',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: name,
                apellido: lastName,
                email: email,
                username: user,
                password: password,
            })
        }).then((res) => {
            return res.json();
        }).catch((err) => console.log(err)).then((res) => {
            okCreate();
        }).catch((err) => console.log(err))

    }

    changePassword(user, pass, okChange) {
        let uri = 'http://192.168.1.103:8080/apiAppEventos/updateUsuarioByPassword/Usuario'
        console.log('holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'+user+pass),
        fetch(uri, {
            method: 'POST',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass }),
        }).then((res) => {
            return res.json();
        }).catch((err) => console.log('holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'+err)).then((res) => {
            okChange();
        }).catch((err) => console.log(err));
    }

    getUsuario(okUsuario, username) {
        let uri = 'http://192.168.1.104:8080/apiAppEventos/getUsuarioByUsername?username=' + username
        
        fetch(uri).then(res => {
            console.log(res.body)
            return res.json()
        }).catch((err) => {
            console.log(err)

        }).
            then(data => {
                okUsuario(data);
            }).catch((err => {
                console.log(err);
                alert("No existe el usuario");
            }));
    }

    createComment(idUsuario, idPelicula, descripcion, title, okComentario) {
        let uri = 'http://localhost:8080/appAppEventos/insertComentario/Comentario'
        fetch(uri, {
            method: 'POST',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                descripcion: descripcion,
                usuarioId: idUsuario,
                peliculaId: idPelicula,
                peliculaNombre: title,
            }),
        }).then((res) => {
            return res.json();
        }).catch((err) => console.log(err)).then((res) => {
            okComentario();
        }).catch((err) => console.log(err));
    }

    getCommentByIdUser(userId, okComentario) {
        let uri = 'http://localhost:8080/appAppEventos/getComentariosByUsuario?usuarioId=' + userId
        fetch(uri).then(res => {
            return res.json()
        }).catch((err) => {
            console.log(err)
        }).
            then(data => {
                okComentario(data);
            }).catch((err => {
                console.log(err);
                alert("No existen Comentarios");
            }));
    }

}

export default new ApiController();