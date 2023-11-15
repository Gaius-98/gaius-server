const mysql = require('mysql')
const env = require('../env.json')
const { Sequelize } = require('sequelize')
const createForm = require('../models/Form')
const sequelize = new Sequelize({
    username:env.sql.user,
    host:env.sql.host,
    password: env.sql.password,  
    database:env.sql.database,  
    dialect:'mysql'
})
const Form = createForm(sequelize)
// const pool = mysql.createPool({  
//     host: env.sql.host,  
//     user: env.sql.user,  
//     password: env.sql.password,  
//     database:env.sql.database,  
// });
const cat = {
    Form
}
module.exports = cat