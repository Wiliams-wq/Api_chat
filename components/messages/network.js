//este archivo maneja toda la red va a se la encargada  de recibir peticones http
//procesa toda la informacion y lo manda al controlador

//en network de mensajes usamos express y el router
const express = require('express');
const router = express.Router();

//multer maneja archvios multimedia
const multer = require('multer');


//requerimos el controlador
const controller = require('./controller');

//requerimos la respuesta de network y el archvivo response para trabajar las respuestas
const response = require('../../network/response');
//se le dice a multer el destino de los archivos, en este caso la carpeta uploads 
//esto en el disco local
const upload = multer({
    dest: 'uploads/'
})

router.get('/', (req, res) => {
    //rcreamos un query que servira como filtro, o devuelve null
    const filterMessages = req.query.chat || null;
    //retornamos la promesa resuelta de controller.getMessage y en response pasamos 
    //la lista de mensajes que fue retornada

    //enviamos el filetro a getMessage
    controller.getMessage(filterMessages)
        .then((messageList) => {
            response.success(req, res, messageList, 200)
        }).catch(e => {
            response.error(req, res, "Unexpected Error", 500, e)
        })
});
//pasamos upload com o middleware(punto donde va a pasar algo antes de entrar a la funcion)
//le decimos que solo tiene un archivo de nombre file
router.post('/', upload.single('file'), (req, res) => {
    //enviamos mensaje y usuario al controlador tambien el chat
    controller.addMessage(req.body.chat, req.body.user, req.body.message)
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

//funcion para modificar n mensaje, recibe el id del mensaje, para esto se usan parametros
//de la ruta /:id
router.patch('/:id', (req, res) => {
    console.log(req.params.id);
    res.send("OK");
    

    //al metodo updateText de controller, le pasamos el id del mensaje y el mensaje nuevo
    controller.updateMessage(req.params.id, req.body.message)
    //como devuelve una promesa con datos, lo obtenemos y lo pasamos a response
        .then((data) => {
            response.success(req, res, data, 200);
        }).catch(e => {
            //todo sale mal, mostraos error
            response.error(req, res, "Error al actualizar", 500, e);
        });
});

//metodo para eliminar con id
router.delete('/:id', (req, res) => {
    //al metodo deleteMessage de controller, le pasamos el id del mensaje
    controller.deleteMessage(req.params.id)
        .then(() => {
            //mostramos mensaje de exito
            response.success(req, res, `Usuario ${req.params.id} eliminado`, 200);
        }).catch(e => {
            //todo sale mal, mostramos error
            response.error(req, res, "Error al eliminar", 500, e);
        });
});

//exportamos la ruta para ser utilizada 
module.exports = router;