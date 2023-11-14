const mysql = require('mysql')
const env = require('../env.json')
const pool = mysql.createPool({  
    host: env.sql.host,  
    user: env.sql.user,  
    password: env.sql.password,  
    database:env.sql.database,  
});
module.exports = pool