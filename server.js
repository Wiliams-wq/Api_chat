const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const server = require('http').Server(app);
const  socket = require("./socket")
const config = require("./config");
const cors = require('cors');
const routes = require("./network/routes");

app.use("/app", express.static('public'));

db();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
socket.connect(server)
routes(app)

server.listen(config.port, () => {
    console.log(`La aplicacion esta escuchando en ${config.host}:${config.port}`);
}
);