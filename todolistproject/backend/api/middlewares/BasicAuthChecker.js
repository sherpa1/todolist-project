const validator = require("validator");
const jwt_private_key = process.env.JWT_PRIVATE_KEY;

const bcrypt = require('bcryptjs');
const DBClient = require("../utils/DB/DBClient");
const saltRounds = 10;


const isNotAuthorized = async (res, error_description = "", code = 401) => {
    return res.status(code).json({ code: code, error: "Not Authorized", error_description: error_description });
}

let email, password;

const isAuthorized = async (req, res, next) => {

    if (typeof req.headers.authorization == undefined || !req.headers.authorization) {
        return isNotAuthorized(res, "Missing Credentials");
    }

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    [email, password] = credentials.split(':');

    email = email.trim().toLowerCase();
    password = password.trim();

    if (!validator.isEmail(email)) return isNotAuthorized(res, "Email is required");
    if (validator.isEmpty(password)) return isNotAuthorized(res, "Password is required");


    const sql = `SELECT * FROM users WHERE email=?`;
    const values = [email];

    const user = await DBClient.one(sql, values);


    if (typeof user == "undefined" || !user || user == null) {
        console.error("User does not exist");
        return isNotAuthorized(res, `User with email "${email}" does not exist`);
    }

    const hash = user.password;

    try {

        await bcrypt.compare(password, hash).then(async (result) => {
            if (result === true) {

                next(user);//is authorized

            } else {
                console.error('Password is wrong');
                return isNotAuthorized(res, "Bad Credentials");
            }
        });

    } catch (error) {
        console.error(error);
        console.error('cant verify password');
        return isNotAuthorized(res,);
    }


}

module.exports = isAuthorized;