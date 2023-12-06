
const env = require('../.env.json')
const { Sequelize } = require('sequelize')
const path = require('path')
const fs = require('fs')
const modelInfo = new Map()
const directoryPath = path.join(__dirname,'../models');  

function requireFilesRecursively(directoryPath,parentPath) {  
  const files = fs.readdirSync(directoryPath);  
  for (const file of files) {  
    const filePath = path.join(directoryPath, file);  
    if (fs.lstatSync(filePath).isDirectory()) {  
      requireFilesRecursively(filePath,  file) ; // 递归处理子文件夹  
    } else if (path.extname(file) === '.js') {  
      const module = require(filePath); // 引入当前文件夹下的JavaScript文件  
      modelInfo.set(file.split('.')[0],module)
    }  
  }  
}  
requireFilesRecursively(directoryPath)

const sequelize = new Sequelize({
    username:env.sql.user,
    host:env.sql.host,
    password: env.sql.password,  
    database:env.sql.database,  
    dialect:'mysql'
})
const catInfo = {}
const autoRegisterModel = (name,createModel) =>{
    catInfo[name] = createModel(sequelize)
}
modelInfo.forEach((createFn,name)=>{
    autoRegisterModel(name,createFn)
})
module.exports = catInfo