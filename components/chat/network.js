const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');
 
router.post('/', (req, res) => {
    controller.addUserChats(req.body.users)
        .then((data) => {
            response.success(req, res, data, 201);
        }).catch(e => {
            response.error(req, res, "Error al crear", 500, e);
        });
});

router.get('/:userId', (req, res) => {
    controller.listChat(req.params.id)
        .then((users) => {
            response.success(req, res, users, 200);
        }).catch(e => {
            response.error(req, res, "Error al listar", 500, e);
        });
});
module.exports = router;