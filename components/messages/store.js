const Model = require("./model");

//funcion para agregar el mensaje,recibe el mensaje completo de controller este ya vio si pasa o no a store
const addMessage = (message) => {
    //creamos myMessage con el modelo que creamos, para que sea lo que nosotros necesitamos por eso moldea el message
    const myMessage = new Model(message);
    //añadimos el mensaje
    myMessage.save();
};

//de manera sincrona obtenemos los mensajes de la base de datos
//recibimos el filtro
async function getMessage(filterUser) {

    //creamos un arreglo para guardar el filtro
    let filter = {};
    //si el filtro no esta vacio entonces asignamos a filter, creando a user lo que 
    //tenemos en filterUser
    if (filterUser != null) {
        filter = {user: filterUser}
    }
        //Model.find() se trae vacio para que traiga todos los mensaje y lo retornamos

        //agregamosa el modelo de mongo el filtro este sabe manejarlo y nos devuelve
        //el nombre establecido en el query
        const messages = await Model.find(filter);
        return messages
    };

    //funcion para actualizar el mensaje, recibe el id del mensaje y el mensaje
    async function updateMessage(id, message) {
        // buscara un mensaje que sea igual al id enviado con el de la base de datos
        //y lo guarda en foundMessage
        const foundMessage = await Model.findOne({ _id: id });

        //al tener ya el mensaje, cambia los valores con los del nuevo mensaje
        foundMessage.message = message;
        //guardamos el mensaje nuevo con save
        //y retornamos el mensaje nuevo
        const newMessage = await foundMessage.save();
        return newMessage;
    };

    //funcion para borrar el mensaje, recibe el id del mensaje
    function removeMessage(id) {
        //eliminamos el mensaje con el id que recibimos
       return Model.deleteOne({ _id: id });
    };

    module.exports = {
        //el metodo addMessage lo usa el controller pero con el nombre add al igual que list
        add: addMessage,
        list: getMessage,
        updateText: updateMessage,
        remove: removeMessage
    }