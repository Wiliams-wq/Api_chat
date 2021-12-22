const  config ={
    dbURL: process.env.DB_URL || "mongodb+srv://db_user_apiChat:6774tvEe4TF2nZIV@cluster0.hkokt.mongodb.net/Chat?retryWrites=true&w=majority",
    port: process.env.PORT || 3000,
    host: process.env.HOST || "http://localhost"
}


module.exports = config;