const express = require('express');
const bodyParser = require('body-parser');
//usamos la conexion a la base de datos
const db = require('./db');
const app = express();
const server = require('http').Server(app);
//usamos sockets
const  socket = require("./socket")

//con cors habilitamos todas las cabeceras, para que se puedan usar desde cualquier lugar
//es recomendado asi luego poco a poco se va restringiendo
const cors = require('cors');
//archivos estaticos
app.use("/app", express.static('public'));

//usamos la base de datos
db();

//traemos el router de routes, este maneja el router de tosdos los componentes
const routes = require("./network/routes");
//router de network/routes usado
//a la funcion de routes.js le pasamos la app que es el servidor de espress para que cree
// todas las rutas

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//usamos cors
app.use(cors());

//usamos el socket para enviarle a connect el server de http
socket.connect(server)
routes(app)

server.listen(3000, () => {
    console.log("Servidor corriendo en el puerto localhost:3000");
}
);