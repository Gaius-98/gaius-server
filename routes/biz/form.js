var express = require('express');
var router = express.Router();
var cat = require('../../utils/cat')
const intercept = require('../../utils/intercept')
const { Op } = require("sequelize");
/**
 * @api {post} /biz/form/list getFormList
 * @apiName GetFormList
 * @apiGroup Form
 * 
 * @apiBody {String} keyword
 * @apiBody {Number}  pageSize   
 * @apiBody {Number} pageNumber   
 * @apiSuccess {Object[]} rows    表单配置列表
 * @apiSuccess {Number}   rows.id   表单id
 * @apiSuccess {String}   rows.list 表单组件构成
 * @apiSuccess {String}   rows.formProp 表单整体配置
 * @apiSuccess {String}   rows.name 表单名称
 * @apiSuccess {Number}   count 表单配置总数
 */
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


/**
 * @api {post} /biz/form/save saveForm
 * @apiName saveForm
 * @apiGroup Form
 * 
 * @apiBody {String} name
 * @apiBody {String}  list   
 * @apiBody {String} formProp   
 */
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

/**
 * @api {post} /biz/form/detail getFormDetail
 * @apiName getFormDetail
 * @apiGroup Form
 * 
 * @apiBody {Number} id   
 * @apiSuccess {String}   id   表单id
 * @apiSuccess {Object}   list 表单组件构成
 * @apiSuccess {Object}   formProp 表单整体配置
 * @apiSuccess {String}   name 表单名称
 */
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
/**
 * @api {post} /biz/form/update updateForm
 * @apiName updateForm
 * @apiGroup Form
 * @apiBody {Number} id
 * @apiBody {String} name
 * @apiBody {String}  list   
 * @apiBody {String} formProp   
 */
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
/**
 * @api {post} /biz/form/delete deleteForm
 * @apiName deleteForm
 * @apiGroup Form
 * @apiBody {Number} id 
 */
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
