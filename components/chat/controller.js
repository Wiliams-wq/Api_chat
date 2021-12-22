const store = require("./store")

const addUserChats = (users) => {
    if (!users || !Array.isArray(users)) {
        return Promise.reject("El nombre es requerido");
    }

    const chat = {
        users: users
    };
    return store.add(chat);

}
const listChat = (userId) => {
    return store.list(userId);
}

module.exports = {
    addUserChats,
    listChat
}