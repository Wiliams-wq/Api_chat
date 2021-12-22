const db = require("mongoose");
const config = require("./config");

const uri = config.dbURL;
db.Promise = global.Promise;

async function connect() {
    await db.connect(uri, {
        useNewUrlParser: true
    });

    console.log("conectado")

}

module.exports = connect;