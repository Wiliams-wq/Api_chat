/*
Se crea este archivo para gestionar la conexion inicial con la base de datos, 
de esta manera esa mas divido y se ve mejor el codigo.
 */

//usamos mongoose y el modelo que fue creado
const db = require("mongoose");

//la url de la base de datos queda guardada en una constante
const uri = "mongodb+srv://db_user_apiChat:6774tvEe4TF2nZIV@cluster0.hkokt.mongodb.net/Chat?retryWrites=true&w=majority"
//mongoose tiene promesas por lo que se usa global.Promise
db.Promise = global.Promise;

async function connect (){

//usamos el metodo connect para conectarnos a la base de datos, pasando la url y el useNewUrlParser para que no 
//nos muestre los warnings, esto en true
await db.connect(uri, {
    useNewUrlParser: true
});

console.log("conectado")

}

module.exports = connect;