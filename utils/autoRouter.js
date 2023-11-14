const fs = require('fs');  
const path = require('path');  
//路由信息
const routerInfo = new Map()

const directoryPath = path.join(__dirname,'../routes');  

function requireFilesRecursively(directoryPath,parentPath) {  
  const files = fs.readdirSync(directoryPath);  
  for (const file of files) {  
    const filePath = path.join(directoryPath, file);  
    if (fs.lstatSync(filePath).isDirectory()) {  
      requireFilesRecursively(filePath,  parentPath ? `/${parentPath}/${file}` : '/'+file) ; // 递归处理子文件夹  
    } else if (path.extname(file) === '.js') {  
      const module = require(filePath); // 引入当前文件夹下的JavaScript文件  
      routerInfo.set(`${parentPath ?? ''}${'/'+ file.split('.')[0]}`,module)
    }  
  }  
}  
requireFilesRecursively(directoryPath)
module.exports = routerInfo