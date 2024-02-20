var express = require('express');
var router = express.Router();
var cat = require('../../utils/cat')
const intercept = require('../../utils/intercept')
const { Op } = require("sequelize");
const jwt = require('../../utils/jwt')
/**
 * @api {post} /biz/Table/list getTableList
 * @apiName GetTableList
 * @apiGroup Table
 * 
 * @apiBody {String} keyword
 * @apiBody {Number}  pageSize   
 * @apiBody {Number} pageNumber   
 * @apiSuccess {Object[]} rows    表格配置列表
 * @apiSuccess {Number}   rows.id   id
 * @apiSuccess {String}   rows.name 表格名称
 * @apiSuccess {String}   rows.dataSetting 表格宽度
 * @apiSuccess {String}   rows.globalCfg 表格高度
 * @apiSuccess {String}   rows.tableCfg 表格预览图
 * @apiSuccess {Number}   count 表格配置总数
 */
router.post('/list',async (req, res, next)=>{
    const { keyword,pageSize,pageNumber} = req.body
    const { username } = await jwt.getJwtUser(req.cookies.gaiusToken)
    const result = await  intercept(cat.Table.findAndCountAll({
      attributes:['id','name','dataSetting','globalCfg','tableCfg'],
      limit:Number(pageSize),
      offset:(pageNumber - 1) * pageSize,
      where:{
        name:{
          [Op.like]:`%${keyword}%`
        },
        del:{
          [Op.eq]:0
        },
        creator:{
          [Op.eq]:username
        }
      },
      order:[
        ['createTime','DESC']
      ]
    }))
     res.send(result)
})


/**
 * @api {post} /biz/Table/save saveTable
 * @apiName saveTable
 * @apiGroup Table
 * 
 * @apiBody {String} name
 * @apiBody {Object}  dataSetting   
 * @apiBody {Object}  globalCfg   
 * @apiBody {Object}  tableCfg   
 */
router.post('/save',async (req,res,next)=>{
  const { name,tableCfg,globalCfg,dataSetting } = req.body
  const { username } = await jwt.getJwtUser(req.cookies.gaiusToken)
  const data = await intercept(cat.Table.create({
    name,
    dataSetting:JSON.stringify(dataSetting),
    tableCfg:JSON.stringify(tableCfg),
    globalCfg:JSON.stringify(globalCfg),
    del:0, 
    creator:username
  }),{
    msg:'保存成功'
  })
  res.send(data)
})

/**
 * @api {post} /biz/Table/detail getTableDetail
 * @apiName getTableDetail
 * @apiGroup Table
 * 
 * @apiBody {Number} id   
 * @apiSuccess {String}   id   表格id
 * @apiSuccess {Object}   dataSetting 表格宽度
 * @apiSuccess {Object}   globalCfg 表格高度
 * @apiSuccess {String}   name 表格名称
 * @apiSuccess {Object}   tableCfg 表格预览图
 */
router.post('/detail',async (req,res,next)=>{
  const { id } = req.body
  // const { username } = await jwt.getJwtUser(req.cookies.gaiusToken)
  const data = await intercept(cat.Table.findOne({
    attributes:['id','name','dataSetting','globalCfg','tableCfg'],
    where:{
      del:{
        [Op.eq]:0
      },
      id:{
        [Op.eq]:id
      }
    }
  }))
  if(data.code == 0){
    data.data.dataSetting = JSON.parse(data.data.dataSetting)
    data.data.globalCfg = JSON.parse(data.data.globalCfg)
    data.data.tableCfg = JSON.parse(data.data.tableCfg)
  }
  res.send(data)
})
/**
 * @api {post} /biz/Table/update updateTable
 * @apiName updateTable
 * @apiGroup Table
 * @apiBody {Number} id
 * @apiBody {String} name
 * @apiBody {Object}  dataSetting   
 * @apiBody {Object}  globalCfg   
 * @apiBody {Object}  tableCfg   
 */
router.post('/update',async (req,res,next)=>{
  const { name,dataSetting,globalCfg,tableCfg,id } = req.body
  const { username } = await jwt.getJwtUser(req.cookies.gaiusToken)
  const data = await intercept(cat.Table.update({
    name,
    dataSetting:JSON.stringify(dataSetting),
    tableCfg:JSON.stringify(tableCfg),
    globalCfg:JSON.stringify(globalCfg),
  },{
    where:{
      id:{
        [Op.eq]:id
      },
      del:{
        [Op.eq]:0
      },
      creator:{
        [Op.eq]:username
      }
    }
  }),{
    msg:'修改成功'
  })
  res.send(data)
})
/**
 * @api {post} /biz/Table/delete deleteTable
 * @apiName deleteTable
 * @apiGroup Table
 * @apiBody {Number} id 
 */
router.post('/delete',async (req,res,next)=>{
  const { id } = req.body
  const { username } = await jwt.getJwtUser(req.cookies.gaiusToken)
  const data =  intercept(cat.Table.update({
    del:1
  },{
    where:{
      id:{
        [Op.eq]:id
      },
      del:{
        [Op.eq]:0
      },
      creator:{
        [Op.eq]:username
      }
    }
  }),{
    msg:'删除成功'
  })
  res.send(data)
})
module.exports = router;
