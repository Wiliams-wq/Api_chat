const mongoose = require("mongoose")

//se separa por que es la clase que mas se utiliza
const Schema = mongoose.Schema;

//el nuevo schema es el de mongoose, se define que tipo sera lo que se va a guardar
const mySchema = new Schema({

    //se relaciona el usuario con con el chat para esto obtenemos el usuario
    users: [{
        type: Schema.ObjectId,
        ref: "user",
    }]

});

//creamos un model, este es el modelo y tiene es esquema por lo que todo lo que se cree
//debe guiarse por esto.
const model = mongoose.model("chat",mySchema);
module.exports = model;