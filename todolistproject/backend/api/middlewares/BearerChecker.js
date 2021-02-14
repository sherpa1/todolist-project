const jwt = require('jsonwebtoken');
const validator = require("validator");
const jwt_private_key = process.env.JWT_PRIVATE_KEY;
const DBClient = require("../utils/DB/DBClient");

const is_not_authorized = async (res, error_description = "", code = 401) => {
    return res.status(code).json({ code: code, error: "Not Authorized", error_description: error_description });
}

const is_authorized = async (req, res, next) => {

    if (typeof req.headers.authorization == undefined || !req.headers.authorization)
        return is_not_authorized(res, "Missing Credentials");


    const token = req.headers.authorization.split(' ')[1];//Bearer Authorization

    if (token == undefined || token == null)
        return is_not_authorized(res, "Missing Credentials");

    if (!validator.isJWT(token))
        return is_not_authorized(res, "Token is not valid");

    try {

        jwt.verify(token, jwt_private_key, { algorithm: "HS256" }, (err, payload) => {

            if (err) {
                console.error(err);
                if (err.message === "jwt expired")
                    return is_not_authorized(res, "Expired Token", 498);

                return is_not_authorized(res,);
            }

            return next(payload);//is authorized

        });

    } catch (error) {
        return is_not_authorized(res,);
    }

}

module.exports = is_authorized;