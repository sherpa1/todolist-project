const db = require("./DBConnection");

module.exports = class DBClient {

    static async all(sql, values = []) {
        return new Promise((resolve, reject) => {
            db.query(sql, values, (err, result) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(result);
                }
            })
        });
    }

    static async one(sql, values = []) {
        return new Promise((resolve, reject) => {
            db.query(sql, values, (err, result) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(result[0]);
                }
            })
        });
    }

    static query(sql, values = []) {
        return new Promise((resolve, reject) => {
            db.query(sql, values, (err, result) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(result);
                }
            })
        });
    }

    static close() {
        if (db.threadId) {
            try {
                db.end();
                console.log("Connection to DB closed");
            } catch (error) {
                throw new Error(error);
            }
        } else {
            throw new Error("DB already closed");
        }
    }


}