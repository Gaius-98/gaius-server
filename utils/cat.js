
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
const cat = {
    Form
}
module.exports = cat