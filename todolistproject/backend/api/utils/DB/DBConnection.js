const mysql = require('mysql');

const { DB_HOST, DB_NAME, DB_USER, DB_PWD, DB_PORT, DB_ENDPOINT, ENV } = process.env;

let db;

try {

    db = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PWD,
        database: DB_NAME
    });

} catch (error) {

    console.error(error);
    throw new Error(`Can't create connection to the MySQL "${DB_NAME}" database`);

}

try {

    db.connect((err) => {

        if (err) throw err;

        console.log(`✅ Successful connection to the MySQL "${DB_NAME}" database`);

    });

} catch (error) {

    console.error(error);
    throw new Error(`Can't Connect to the MySQL "${DB_NAME}" database`);

}

module.exports = db;

