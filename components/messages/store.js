const Model = require("./model");


const addMessage = (message) => {
    const myMessage = new Model(message);
    myMessage.save();
};


async function getMessage(filterUser) {

    return new Promise((resolve, reject) => {

        let filter = {};
        if (filterUser != null) {
            filter = { user: filterUser }
        }
        Model.find(filter)

            .populate("user")
            .exec((err, populated) => {
                if (err) {
                    reject("Error al obtener los mensajes");
                    return false;
                } else {
                    resolve(populated);
                }
            })
    })
};

async function updateMessage(id, message) {
    const foundMessage = await Model.findOne({ _id: id });

    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
};

function removeMessage(id) {
    return Model.deleteOne({ _id: id });
};

module.exports = {
    add: addMessage,
    list: getMessage,
    updateText: updateMessage,
    remove: removeMessage
}