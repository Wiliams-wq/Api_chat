const Model = require("./model");

//funcio para crear chat, obtenemo el chat de de network y lo mandmos al modelo
const createChat = (chat) => {
    const myChat = new Model(chat);
    return myChat.save();
}

//funcion para obtener los chats, recibe el id del usuario y se usa un filtro
const listChat = (userId) => {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (userId != null) {
            filter = { users: userId }
        }
        Model.find(filter)
        //se usa populate para que traiga los usuarios
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