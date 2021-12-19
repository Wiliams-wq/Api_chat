const express = require('express');
const app = express();
//archivos estaticos
app.use("/app", express.static('public'));


//traemos el router de routes, este maneja el router de tosdos los componentes
const routes = require("./network/routes");
//router de network/routes usado
//a la funcion de routes.js le pasamos la app que es el servidor de espress para que cree
// todas las rutas
routes(app)





app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto localhost:3000");
}
);