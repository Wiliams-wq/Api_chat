const Model = require("./model");

const createChat = (chat) => {
    const myChat = new Model(chat);
    return myChat.save();
}

const listChat = (userId) => {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (userId != null) {
            filter = { users: userId }
        }
        Model.find(filter)
            .populate("users")
            .exec((err, populated) => {
                if (err) {
                    reject("Error al obtener los mensajes");
                    return false;
                } else {
                    resolve(populated);
                }
            })
    })
}


module.exports = {
    add: createChat,
    list: listChat
}