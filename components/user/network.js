const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

router.post("/", (req, res) => {
    controller.addUser(req.body.name)
    .then(data => { 
        response.success(req, res, data, 201);
    }).catch(e => {
        response.error(req, res, "Error al agregar usuario", 500, e);
    })


});

router.get("/", (req, res) => {
    controller.getUsers()
    .then(data => {
        response.success(req, res, data, 200);
    }).catch(e => {
        response.error(req, res, "Error al obtener usuarios", 500, e);
    })
});


module.exports = router
