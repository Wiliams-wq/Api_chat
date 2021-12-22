const store = require("./store")

//funcion para crear chat, obtenemo los usuarios de network y lo mandmos al store
const addUserChats = (users) => {
    if (!users || !Array.isArray(users)) {
        return Promise.reject("El nombre es requerido");
    }
    //creamos el chat
    const chat = {
        users: users
    };
    //retornamos agregando a la base de datos en store
    return store.add(chat);

}
//obtenemos los chats de la base de datos
const listChat = (userId) => {
    return store.list(userId);
}

module.exports = {
    addUserChats,
    listChat
}