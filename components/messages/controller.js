const store = require("./store")
const sockets = require("../../socket").socket;

const config = require("../../config");

const addMessage = (chat,user, message, file) => {

    return new Promise((resolve, reject) => {
        if (!user || !message) {
            console.error('[messageController], no hay usaurio o mensaje');
            return reject('Los datos son incorrectos');
        }
        let fileUrl = '';

        if(file){
            fileUrl = `${config.host}:${config.port}/app/files/` + file.filename;
        }

        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            
            file: fileUrl
        }
    
        store.add(fullMessage);
    
        sockets.io.emit('message', fullMessage);
        
        resolve(fullMessage);

    });
}

const getMessage = (filterUser) => {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser))
    })
}


const updateMessage = (id, message) => {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            reject('Los datos son incorrectos');
            return false;
        }
        
        const result = await store.updateText(id, message)
        resolve(result);
    });
};


const deleteMessage = (id) => {
    return new Promise(async (resolve, reject) => {

        if (!id) {
            reject('Id invalido');
            return false;
        }
        store.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            })
    })
};

module.exports = {
    addMessage,
    getMessage,
    updateMessage,
    deleteMessage
}