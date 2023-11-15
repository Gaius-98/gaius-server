var express = require('express');
var router = express.Router();
var cat = require('../../utils/cat')
const intercept = require('../../utils/intercept')
const { Op } = require("sequelize");
router.post('/list',function(req, res, next){
    const { keyword,pageSize,pageNumber} = req.body
    intercept(cat.Form.findAndCountAll({
      attributes:['id','list','formProp','name'],
      limit:Number(pageSize),
      offset:(pageNumber - 1) * pageSize,
      where:{
        name:{
          [Op.like]:`%${keyword}%`
        },
        del:{
          [Op.eq]:0
        }
      },
      order:[
        ['createTime','DESC']
      ]
    })).then(result=>{
      res.send(result)
    })
})

router.post('/save',(req,res,next)=>{
  const { name,list,formProp } = req.body
  let configStr = JSON.stringify(list)
  let formConfigStr = JSON.stringify(formProp)
  intercept(cat.Form.create({
    name,
    list:configStr,
    formProp:formConfigStr,
    del:0, 
  }),{
    msg:'保存成功'
  }).then(data=>{
    res.send(data)
  })
})

router.post('/detail',(req,res,next)=>{
  const { id } = req.body
  intercept(cat.Form.findByPk(id)).then(data=>{
    if(data.code == 0){
      data.data.list = JSON.parse(data.data.list)
      data.data.formProp = JSON.parse(data.data.formProp)
    }
    res.send(data)
  })
})

router.post('/update',(req,res,next)=>{
  const { name,list,id,formProp } = req.body
  let configStr = JSON.stringify(list)
  let formConfigStr = JSON.stringify(formProp)
  intercept(cat.Form.update({
    name,
    list:configStr,
    formProp:formConfigStr,
  },{
    where:{
      id:{
        [Op.eq]:id
      },
      del:{
        [Op.eq]:0
      }
    }
  }),{
    msg:'修改成功'
  }).then(data=>{
    res.send(data)
  })
})

router.post('/delete',(req,res,next)=>{
  const { id } = req.body

  intercept(cat.Form.update({
    del:1
  },{
    where:{
      id:{
        [Op.eq]:id
      },
      del:{
        [Op.eq]:0
      }
    }
  }),{
    msg:'删除成功'
  }).then(data=>{
    res.send(data)
  })
})
module.exports = router;
