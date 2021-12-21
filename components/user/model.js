//importamos el modelo de la base de datos
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creamos el modelo para la base de datos  
const mySchema = new Schema({
    name: {
        type: String,
        required: true
    },
})

//en model  guardamos el nuevo modelo pasando use y el schema para luego exportarlo, este
//se usa en store
const model = mongoose.model('user', mySchema);
module.exports = model;