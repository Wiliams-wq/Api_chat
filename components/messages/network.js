const express = require('express');
const router = express.Router();
const multer = require('multer');


const controller = require('./controller');

const response = require('../../network/response');
const upload = multer({
    dest: 'public/files/'
})

router.get('/', (req, res) => {
    const filterMessages = req.query.chat || null;
    controller.getMessage(filterMessages)
        .then((messageList) => {
            response.success(req, res, messageList, 200)
        }).catch(e => {
            response.error(req, res, "Unexpected Error", 500, e)
        })
});
router.post('/', upload.single('file'), (req, res) => {


    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(e => {
            response.error(req, res, "Mensaje no enviado", 400, "error al enviar el mensaje");
        }
        );

});

router.patch('/:id', (req, res) => {
    console.log(req.params.id);
    res.send("OK");
    

    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200);
        }).catch(e => {
            response.error(req, res, "Error al actualizar", 500, e);
        });
});

router.delete('/:id', (req, res) => {
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Usuario ${req.params.id} eliminado`, 200);
        }).catch(e => {
            response.error(req, res, "Error al eliminar", 500, e);
        });
});

module.exports = router;