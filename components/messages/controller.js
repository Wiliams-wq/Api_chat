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

//funcion para obtener mensaje, con una promesa, y se resuelve llamando a store y la funcion list() que es getMessage
const getMessage = () => {
    return new Promise((resolve, reject) =>{
        resolve(store.list())
    })
}
module.exports = {
    addMessage,
    getMessage
}