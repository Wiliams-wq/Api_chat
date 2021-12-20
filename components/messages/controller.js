//este archvio se encarga de definir la logica de negocio

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

//resolvemos con fullMessage
        resolve(fullMessage);

    });
}

module.exports = {
    addMessage
}