var express = require('express');
var router = express.Router();
var request = require('request')
/**
 * @api {post} /index/proxy proxy
 * @apiName proxy
 * @apiGroup Index
 * 
 * @apiBody {String} url
 * @apiBody {String}  method   
 * @apiBody {Object} data   
 * @apiSuccess {Object} data    代理接口返回值
 */
router.post('/proxy', (req, res, next)=>{
  const {url,method,data} = req.body
  request({
    url,
    method,
    data
  },(err,resData,body)=>{
    if(err){
      res.send({
        code:500,
        msg:err,
        data:{}
      })
    }else{
      res.send(JSON.parse(body))
    }
  })

});

module.exports = router;
