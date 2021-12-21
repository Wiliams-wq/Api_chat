//utilizamos model recibiendo el schema y el elemento que se usara
const Model = require("./model");

//funcion para agregar usuarios
const addUser = (user) => {
    const myUser = new Model(user);
    return myUser.save();
};

//funcion para obtener todos los usuarios
async function getUsers(){
    const users = await Model.find({});
    return users;
};


module.exports = {
add: addUser,
list: getUsers
}