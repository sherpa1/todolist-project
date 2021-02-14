const jwt = require('jsonwebtoken');
const jwt_private_key = process.env.JWT_PRIVATE_KEY;

class Token {
    static async create(payload = {}, hours_duration = 1) {

        const hour_seconds = 3600;//number of seconds in 1 hour

        const expiration = hour_seconds * hours_duration;//convert hour in seconds

        let token;

        try {

            token = await jwt.sign(payload, jwt_private_key, { algorithm: 'HS256', expiresIn: expiration });

        } catch (error) {

            throw new Error(error);

        }

        return token;
    }

    static async verify(token) {

    }

    static async decode(hash) {

    }
}

module.exports = Token;