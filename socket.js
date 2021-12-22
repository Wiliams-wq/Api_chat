//se encarga de inicializar el servidor con socket.io y poder usarlo desde cualquier lugar
//esto para trabajar  con websockets
const socketIO = require('socket.io');

//guardamos socket como objeto, ya que los objetos se guardan como referencia, que es equivalente
//a los punteros en C
const socket = {};

//funcion para inicializar el servidor de socket.io
const connect = (server) => {
    socket.io = socketIO(server);
}

//exportamos la funcion connect y socket
module.exports = {
    connect,
    socket
}
