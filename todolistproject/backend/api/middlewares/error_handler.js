const CustomException = (message = "", code = 500, url = '', http_method = '') => {
    //permet de personnaliser les informations contenues dans l'erreur et le code http retourné par la fonction errorHandler
    const error = new Error(message);
    //on ajoute autant d'attributs qu'on le souhaite
    error.code = code;
    error.http_method = http_method;
    error.url = url;
    return error;
}

CustomException.prototype = Object.create(Error.prototype);

const errorHandler = (err, req, res, next) => {
    //on récupère les informations contenues dans l'erreur personnalisée
    const code = err.code || 500;

    console.error(err);

    let message = "";
    message = err.message || err || '';
    const url = err.url || '';
    const method = err.http_method || '';
    res.status(code).json({ message: message, url: url, method: method, code: code })
}

module.exports = { CustomException, errorHandler };