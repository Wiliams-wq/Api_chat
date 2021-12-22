const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

//enviamos el usuario por req.body.users  
router.post('/', (req, res) => {
    controller.addUserChats(req.body.users)
        .then((data) => {
            response.success(req, res, data, 201);
        }).catch(e => {
            response.error(req, res, "Error al crear", 500, e);
        });
});

//obtenemos los chats de la base de datos esto sera por userId, este id sera req.query.userId 
//que es el filtro
router.get('/:userId', (req, res) => {
    controller.listChat(req.params.id)
        .then((users) => {
            response.success(req, res, users, 200);
        }).catch(e => {
            response.error(req, res, "Error al listar", 500, e);
        });
});
module.exports = router;