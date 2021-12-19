
exports.success = function (req, res, message, status) {

    res.status(status || 200).send({
        error: "",
        body: message,
    })
}

exports.error = function (req, res, message, status, details) {
    //se muestran los detalles, esto para nosotros, ya que para el usuario
    //esta el parametro errorn 
    console.log(details);

    res.status(status || 500).send({
        error: message,
        body: "",
    })
}
