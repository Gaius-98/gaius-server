
const env = require('../env.json')
const { Sequelize } = require('sequelize')
const createForm = require('../models/Form')
const createPage = require('../models/Page')
const sequelize = new Sequelize({
    username:env.sql.user,
    host:env.sql.host,
    password: env.sql.password,  
    database:env.sql.database,  
    dialect:'mysql'
})
const Form = createForm(sequelize)
const Page = createPage(sequelize)
const cat = {
    Form,
    Page
}
module.exports = cat