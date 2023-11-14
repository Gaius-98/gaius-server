var express = require('express');
var router = express.Router();
var cat = require('../../utils/cat')
const intercept = require('../../utils/intercept')
const tableName = 'gaius_form_list'
/* GET home page. */
router.get('/', function(req, res, next) {
  cat.query('select * from gaius_sys_dict',(err,result)=>{
    res.send(result)
  })
});
router.post('/list',function(req, res, next){
    const { keyword,pageSize,pageNumber} = req.query
    let sql = `SELECT * FROM ${tableName} WHERE name LIKE '%${keyword}%' LIMIT ${pageSize} OFFSET ${(pageNumber - 1) * pageSize}`
    cat.query(sql,(err,result)=>{
       res.send(intercept(err,result))  
    })
})
module.exports = router;
