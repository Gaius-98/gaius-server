var express = require('express');
var router = express.Router();
var cat = require('../../utils/cat')
const intercept = require('../../utils/intercept')
const { v1 } = require('uuid')
const { Op } = require("sequelize");
const svgCaptcha = require('svg-captcha')
const jwt = require('../../utils/jwt')
/**
 * @api {post} /sys/user/register register
 * @apiName register
 * @apiGroup User
 * 
 * @apiBody {String} username
 * @apiBody {String}  password   
 * @apiBody {String} email   
 * @apiBody {String} name   
 */
router.post('/register',async (req,res,next)=>{
  const { username,password,email,name, } = req.body
  const result = await intercept(cat.User.findOne({
    where:{
      username
    }
  }))
  const data = await intercept(cat.User.create({
    name,
    username,
    password,
    email,
    id:v1()
  }),{
    msg:'注册成功',
    errMsg: result ? '此账户名已存在' : null
  })
  data.data = { }
  res.send(data)
})
/**
 * @api {post} /sys/user/login login
 * @apiName login
 * @apiGroup User
 * 
 * @apiBody {String} username
 * @apiBody {String}  password   
 * @apiBody {String} code    
 * @apiSuccess {String}   token   登录后的token
 */
router.post('/login',async (req,res,next)=>{
  const { username, password,code } = req.body
  const vData = await intercept(new Promise((resolve,reject)=>{
    if(code == req.cookies.gaiusCaptcha){
      resolve()
    }else {
      reject()
    }
  }),{
    errMsg:'验证码不正确'
  })
  const { code:vCode } = vData
  if(!vCode){
    const {data,code} = await intercept(cat.User.findOne({
      where:{
        username,
        password
      }
    }))
    if(data && !code){
      let token = jwt.sign({username},{
        expiresIn:'1h'
      })
      res.cookie('gaiusToken',token,{
        httpOnly:true
      })
      res.send({
        code:0,
        data:{
          token,
        },
        msg:'登录成功'
      })
    }else{
      res.send({
        code:500,
        data:{},
        msg:'账号不存在或密码错误'
      })
    }
  }else{
    res.send(vData)
  }
})
/**
 * @api {get} /sys/user/captcha captcha
 * @apiName captcha
 * @apiGroup User
 * @apiSuccess {String}   svg   svg图片
 */
router.get('/captcha',async (req,res,next)=>{
  const captcha = svgCaptcha.createMathExpr({
    size:4,
    ignoreChars: '0o1i',
    noise:1,
    height:32,
    width:100,
    fontSize:40
  })
  res.cookie('gaiusCaptcha',captcha.text,{
    httpOnly:true
  })
  res.send({
    code:0,
    data:captcha.data,
    msg:'成功获取验证码'
  })
})

/**
 * @api {post} /sys/user/info info
 * @apiName getUserInfo
 * @apiGroup User
 * @apiSuccess {String}   username   用户名
 * @apiSuccess {String}   email    邮箱
 * @apiSuccess {String}   name   姓名
 */
router.post('/info',async (req,res,next) =>{
  if(req.cookies.gaiusToken){
   const data  = await jwt.verify(req.cookies.gaiusToken)
   const result = await intercept(cat.User.findOne({
    attributes:['username','email','name'],
    where:{
      username:data.username
    }
   }))
   res.send(result)
  }else{
    res.send({
      code:500,
      data:{},
      msg:'请先登录'
    })
  }
})
module.exports = router;