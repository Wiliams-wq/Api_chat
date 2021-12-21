//utilizamos el sotroe para agregar los datos
const store = require('./store');

//funcion para agregar usuarios, recibimos name como parametro,
const addUser = (name) => {
    //si no tiene nada, retornamos un error como promesa
    if(!name){
        return Promise.reject('El nombre es requerido');
    }

    //creamos la variable user para que tenga a name y lo mande a la base de datos en store
    const user = {
        name: name
    }

    return store.add(user);
};

//funcion para obtener todos los usuarios
const getUsers = () => {
    return new Promise((resolve, reject) => {
        resolve(store.list());
    });
};

module.exports = {
    addUser,
    getUsers
}