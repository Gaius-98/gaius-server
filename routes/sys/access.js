var express = require('express');
var router = express.Router();
var cat = require('../../utils/cat')
const intercept = require('../../utils/intercept')
const { v1 } = require('uuid')
const { Op } = require("sequelize");
const svgCaptcha = require('svg-captcha')
const jwt = require('../../utils/jwt')
const geoip = require('geoip-lite');  
function getClientIp(req) {
	return req.headers['x-forwarded-for'] ||
	req.ip ||
	req.connection.remoteAddress ||
	req.socket.remoteAddress ||
	req.connection.socket.remoteAddress ||
	'';
}
/**
 * @api {post} /sys/access/record record
 * @apiName record
 * @apiGroup Access
 *   
 */
router.get('/record',async (req,res,next)=>{
  const ip = getClientIp(req)
  const addressInfo = geoip.lookup(ip)
  let address = addressInfo ? `${addressInfo.country}|${addressInfo.city}` :''
  const data = await intercept(cat.Access.create({
    ip,
    address
  }))
  res.send(data)
})

module.exports = router;