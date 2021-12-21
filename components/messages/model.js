//mongoose es un modulo que sirve manejar esquemas, esto es para saber que
//almacenamos y como lo almacenamos y por que se guarda asi, se encarga de la 
//verificacion de datos, si no validan no lo guarda en la base de datos 

//npm install mongoose
const mongoose = require("mongoose")

//se separa por que es la clase que mas se utiliza
const Schema = mongoose.Schema;

//el nuevo schema es el de mongoose, se define que tipo sera lo que se va a guardar
const mySchema = new Schema({
    user: String,
    message: String,
    date: Date,
});

//creamos un model, este es el modelo y tiene es esquema por lo que todo lo que se cree
//debe guiarse por esto.
const model = mongoose.model("Message",mySchema);
module.exports = model;