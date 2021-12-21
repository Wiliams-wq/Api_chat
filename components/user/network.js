const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

//funcion para enviar los datos de usuario a la base de datos
router.post("/", (req, res) => {
    //se recibe de re.body el nombre y se responde con success y el nombre si todo esta bien
    // y si no, responde con un error
    controller.addUser(req.body.name)
    .then(data => { 
        response.success(req, res, data, 201);

    }).catch(e => {
        response.error(req, res, "Error al agregar usuario", 500, e);
    })


});
//funcion para obtener todos los usuarios
router.get("/", (req, res) => {
    controller.getUsers()
    .then(data => {
        response.success(req, res, data, 200);
    }).catch(e => {
        response.error(req, res, "Error al obtener usuarios", 500, e);
    })
});


module.exports = router
