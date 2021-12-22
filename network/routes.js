//este archivo tiene todas las respuestas de red en un archivo, aca tenemos toda la informacion de router
//en un archivo separado
const express = require('express');

//requerimos el network de mensajes
const message = require("../components/messages/network");

const user = require("../components/user/network");
const chat = require("../components/chat/network");
//esta funcion añade todas las rutas, el parametro server es el servidor de express
// para añadir las rutas
const routes = function(server){
    //le decimos a serverque use el router de mensajes, ruta /messages y message es el archivo 
    //router de el componente mensajes
    server.use("/message", message),

    server.use("/user", user),

    server.use("/chat", chat)
}

//exportamos la funcion routes
module.exports = routes;