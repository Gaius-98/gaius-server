const jwt = require('jsonwebtoken')
const env = require('../env.json')
const cat = require('./cat')
const intercept = require('./intercept')
const secretKey = env.JWT.secretKey
module.exports = {
    sign: (payload,opt)=>{
        return jwt.sign(payload,secretKey,opt)
    },
    verify:(jwtStr) =>{
        let p = new Promise((resolve,reject)=>{
            jwt.verify(jwtStr,secretKey,(err,data)=>{
                if(err){
                    reject({
                        code:500,
                        data:{},
                        msg:'您没有对应权限！'
                    })
                }else{
                    cat.User.findOne({where:{
                        username:data.username
                    }}).then(vData=>{
                        if(vData){
                            resolve(data)
                        }else {
                            reject({
                                code:500,
                                data:{},
                                msg:'此账户不存在'
                            })
                        }
                    }).catch(err=>{
                        reject(reject({
                            code:500,
                            data:{},
                            msg:'您没有对应权限'
                        }))
                    })
                    
                }
            })
        })
        
        return p
    }
}