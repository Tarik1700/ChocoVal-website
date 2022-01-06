const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});

const getConnection = function (){
    return new Promise(async (resolve, reject) => {
        try{
           const connection  = await pool.getConnection(); 
           resolve(connection);
        }catch (err){
            console.log(`Connection is not set:  ${err}`);
            reject({error: "could get connection to server"});
        }
    })
}

module.exports = getConnection;