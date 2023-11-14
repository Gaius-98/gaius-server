var express = require('express');
var router = express.Router();
var cat = require('../utils/cat')
/* GET home page. */
router.get('/', function(req, res, next) {
  cat.query('select * from gaius_sys_dict',(err,result)=>{
    res.send(result)
  })
});

module.exports = router;
