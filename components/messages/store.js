//usamos mongoose y el modelo que fue creado
const db = require("mongoose")
const Model = require("./model");

//la url de la base de datos queda guardada en una constante
 const uri = "mongodb+srv://db_user_apiChat:6774tvEe4TF2nZIV@cluster0.hkokt.mongodb.net/Chat?retryWrites=true&w=majority"
 //mongoose tiene promesas por lo que se usa global.Promise
db.Promise = global.Promise;

//usamos el metodo connect para conectarnos a la base de datos, pasando la url y el useNewUrlParser para que no 
//nos muestre los warnings, esto en true
db.connect(uri,{
    useNewUrlParser: true
});


console.log("conectado")

//funcion para agregar el mensaje,recibe el mensaje completo de controller este ya vio si pasa o no a store
 const addMessage = (message) => {
     //creamos myMessage con el modelo que creamos, para que sea lo que nosotros necesitamos por eso moldea el message
     const myMessage = new Model(message);
        //añadimos el mensaje
     myMessage.save();
 };

 //de manera sincrona obtenemos los mensajes de la base de datos
 async function getMessage (){
     //Model.find() se trae vacio para que traiga todos los mensaje y lo retornamos
    const messages = await Model.find();
    return messages
 };

 module.exports = {
     //el metodo addMessage lo usa el controller pero con el nombre add al igual que list
     add: addMessage,
     list: getMessage,
 }