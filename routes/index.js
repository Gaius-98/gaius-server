var express = require('express');
var router = express.Router();
var axios = require('axios')
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
  axios({
    url,
    method,
    headers:{
      Cookie:`gaiusToken=${req.cookies.gaiusToken}`
    },
    [method == 'get' ? 'params' :'data']:data,
  }).then((resData)=>{
    res.send(JSON.stringify(resData.data))
    
  }).catch(err=>{
    res.send({
      code:500,
      msg:err
    })
  })

});

module.exports = router;
