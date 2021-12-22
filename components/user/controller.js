const store = require('./store');

const addUser = (name) => {

    if(!name){
        return Promise.reject('El nombre es requerido');
    }

    const user = {
        name: name
    }

    return store.add(user);
};

const getUsers = () => {
    return new Promise((resolve, reject) => {
        resolve(store.list());
    });
};

module.exports = {
    addUser,
    getUsers
}