var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var jwt = require('./utils/jwt')
// 路由信息
var routerInfo = require('./utils/autoRouter')
const router = express.Router()
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 请求拦截
router.use((req,res,next)=>{
  const whiteList  = [
    '/sys/user/login',
    '/sys/user/register',
    '/sys/user/captcha',
    '/doc',
    '/assets'
  ]
  const { url } = req
  if(whiteList.some(item=>(url.includes(item)))){
    next()
  }else {
    jwt.verify(req.cookies.gaiusToken).then(()=>{
      next()
    }).catch(err=>{
      res.send(err)
    })
  }
  
})
app.use(router)
app.use('/assets',express.static(path.join(__dirname, 'public')));
app.use('/doc',express.static(path.join(__dirname, 'apidoc')));
routerInfo.forEach((val,key)=>{
  app.use(key, val)
  console.log(`路由模块---${key}---已引入😊`)
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.options('*', (req, res) => {
  // 允许CORS跨域的域名
  res.setHeader('Access-Control-Allow-Origin', '*')
  // 允许CORS跨域的请求方式，默认只有GET,POST
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
  // 允许CORS跨域请求的请求头
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  res.send(null)
})
module.exports = app;
