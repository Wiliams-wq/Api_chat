//este archivo maneja toda la red va a se la encargada  de recibir peticones http
//procesa toda la informacion y lo manda al controlador

//en network de mensajes usamos express y el router
const express = require('express');
const router = express.Router();

//requerimos el controlador
const controller = require('./controller');

//requerimos la respuesta de network y el archvivo response para trabajar las respuestas
const response = require('../../network/response');

router.get('/', (req, res) => {
    response.success(req, res, 'Hello world', 201);
});

router.post('/', (req, res) => {
    //enviamos mensaje y usuario al controlador
    controller.addMessage(req.body.user, req.body.message)
        //con la promesa, obtenemos fullMessage y responsemos a response, enviando el mensaje
        //y el estado de la peticion
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        //en caso de error, mostramos el error en consola y enviando el error a response
        .catch(e => {
            response.error(req, res, "Mensaje no enviado", 400, "error al enviar el mensaje");
        }
        );

});

//exportamos la ruta para ser utilizada 
module.exports = router;