//este archvio se encarga de definir la logica de negocio

//requerimos el store para poder usarlo
const store = require("./store")
//usamos socktes especificamente el objeto socket para poder emitir el evento
const sockets = require("../../socket").socket;

const config = require("../../config");
//con esta funcion obtenemos el mensaje para crear el fullMessage con el usuario, message y fecha
//se recibe file
const addMessage = (chat,user, message, file) => {
    //recibimos de network.js el usuario y el mensaje  y usamos una promesa
    return new Promise((resolve, reject) => {

        //si usuario o mensaje estan vacios entonces que muestre un error en consola y ejecutamos
        //el callaback reject
        if (!user || !message) {
            console.error('[messageController], no hay usaurio o mensaje');
            return reject('Los datos son incorrectos');
        }
//variable que alamacena el file en texto
        let fileUrl = '';

        //si file tiene algo entonces componemos la url, app/files es donde se guardan los 
        //estaticos en el servidor y concatenamos el nombre del archivo file.filename
        if(file){
            //uso de config
            fileUrl = `${config.host}:${config.port}/app/files/` + file.filename;
        }

        //el arreglo de mensajes tiene los datos enviados por network.js ademas de que agregamos
        //la fecha de creacion del mensaje. utilizamos el chat para que se sepa quien creo el mensaje
        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            //agregamos a mensaje el archivo
            file: fileUrl
        }
        //agregamos a sotre el fullMessage
        store.add(fullMessage);
        
        //emitimos el evento a sockets.io nombrando el nombre del evento y mandamos el fullMessage
        sockets.io.emit('message', fullMessage);
        //resolvemos con fullMessage
        resolve(fullMessage);

    });
}

//funcion para obtener mensaje, con una promesa, y se resuelve llamando a store y 
//la funcion list() que es getMessage

//obtenemos como parametro el filterUser para pasarselo a la funcion getMessage de store
//esta se encuentra como list
const getMessage = (filterUser) => {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser))
    })
}

//funcion para actualizar mensaje, recibe el id del mensaje y el mensaje
const updateMessage = (id, message) => {
    //uso de promesa,  de manera sicrona
    return new Promise(async (resolve, reject) => {
        //si id o mensaje no tiene nada rechaza la promesa mandando error en conosola
        if (!id || !message) {
            reject('Los datos son incorrectos');
            //retornamos falso para que se detenga la ejecucion
            return false;
        }
        //si sale bien, guardamos en result el nuevo resultado de la funcion updateMessage
        const result = await store.updateText(id, message)
        resolve(result);
    });
};

//borramos el mensaje, recibe el id del mensaje
const deleteMessage = (id) => {
    //con la promesa, de manera sincrona
    return new Promise(async (resolve, reject) => {
//compramos si el id esta vacio, lanzamos el reject
        if (!id) {
            reject('Id invalido');
            return false;
        }
        //si sale bien, usamos remove y mandamos el id a la store
        store.remove(id)
        //con la promesa resolvemos si no, la rechazamos
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