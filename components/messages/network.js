//este archivo maneja toda la red va a se la encargada  de recibir peticones http
//procesa toda la informacion y lo manda al controlador

//en network de mensajes usamos express y el router
const express = require('express');
const router = express.Router();

//requerimos la respuesta de network y el archvivo response para trabajar las respuestas
const response = require('../../network/response');

router.get('/', (req, res) => {
    response.success(req, res, 'Hello world', 201);
});

router.post('/message', (req, res) => {
    response.success(req, res, 'Hello world', 201);
});

//exportamos la ruta para ser utilizada 
module.exports = router;