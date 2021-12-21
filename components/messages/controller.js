//este archvio se encarga de definir la logica de negocio

//requerimos el store para poder usarlo
const store = require("./store")
//con esta funcion obtenemos el mensaje para crear el fullMessage con el usuario, message y fecha
const addMessage = (user, message) => {
//recibimos de network.js el usuario y el mensaje  y usamos una promesa
    return new Promise((resolve, reject) => {

//si usuario o mensaje estan vacios entonces que muestre un error en consola y ejecutamos
//el callaback reject
        if(!user || !message) {
            console.error('[messageController], no hay usaurio o mensaje');
            return reject('Los datos son incorrectos');
        }

//el arreglo de mensajes tiene los datos enviados por network.js ademas de que agregamos
//la fecha de creacion del mensaje
        const fullMessage = {
            user: user,
            message: message,
            date: new Date()
        }
//agregamos a sotre el fullMessage
        store.add(fullMessage)
//resolvemos con fullMessage
        resolve(fullMessage);

    });
}

//funcion para obtener mensaje, con una promesa, y se resuelve llamando a store y 
//la funcion list() que es getMessage

//obtenemos como parametro el filterUser para pasarselo a la funcion getMessage de store
//esta se encuentra como list
const getMessage = (filterUser) => {
    return new Promise((resolve, reject) =>{
        resolve(store.list(filterUser))
    })
}

//funcion para actualizar mensaje, recibe el id del mensaje y el mensaje
const updateMessage = (id, message) => {
    //uso de promesa,  de manera sicrona
    return new Promise( async (resolve, reject) => {
        //si id o mensaje no tiene nada rechaza la promesa mandando error en conosola
        if(!id || !message) {
            reject('Los datos son incorrectos');
            //retornamos falso para que se detenga la ejecucion
            return false;
        }
        //si sale bien, guardamos en result el nuevo resultado de la funcion updateMessage
        const result = await store.updateText(id, message)
        resolve(result);
    });
}
module.exports = {
    addMessage,
    getMessage,
    updateMessage
}