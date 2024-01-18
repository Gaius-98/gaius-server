var express = require('express');
var router = express.Router();
var cat = require('../../utils/cat')
const intercept = require('../../utils/intercept')
const { Op } = require("sequelize");
/**
 * @api {post} /sys/dict/list getDictList
 * @apiName GetDictList
 * @apiGroup Dict
 * 
 * @apiBody {String} keyword
 * @apiBody {Number}  pageSize   
 * @apiBody {Number} pageNumber   
 * @apiSuccess {Object[]} rows    字典配置列表
 * @apiSuccess {Number}   rows.id   字典id
 * @apiSuccess {String}   rows.dictType 字典类别
 * @apiSuccess {String}   rows.dictTypeChdesc 字典类别中文
 * @apiSuccess {String}   rows.value 字典值
 * @apiSuccess {String}   rows.label 字典名称
 * @apiSuccess {Number}   rows.orderNum 排序号
 * @apiSuccess {String}   rows.description 字典描述
 * @apiSuccess {Number}   count 字典配置总数
 */
router.post('/list',async (req, res, next)=>{
  const { keyword,pageSize,pageNumber} = req.body
  const result = await intercept(cat.Dict.findAndCountAll({
    attributes:['id','dictType','dictTypeChdesc','value','label','orderNum','description'],
    limit:Number(pageSize),
    offset:(pageNumber - 1) * pageSize,
    where:{
      label:{
        [Op.like]:`%${keyword}%`
      },
      del:{
        [Op.eq]:0
      },
    }
  }))
  res.send(result)
})


/**
* @api {post} /sys/dict/save saveDict
* @apiName saveDict
* @apiGroup Dict
* 
* @apiBody {String} dictType
* @apiBody {String} dictTypeChdesc   
* @apiBody {String} value 
* @apiBody {String} label  
* @apiBody {Number} orderNum 
* @apiBody {String} description 
*/
router.post('/save', async (req,res,next)=>{
const { dictType,dictTypeChdesc,value,label,orderNum,description } = req.body
const data = await intercept(cat.Dict.create({
  dictType,
  dictTypeChdesc,
  value,
  label,
  orderNum, 
  description,
  del:0
}),{
  msg:'保存成功'
})
res.send(data)
})

/**
* @api {post} /sys/dict/detail getDictDetail
* @apiName getDictDetail
* @apiGroup Dict
* 
* @apiBody {Number} id   
* @apiSuccess {String}   id   字典id
* @apiSuccess {String}   dictType 字典类别
* @apiSuccess {String}   dictTypeChdesc 字典类别中文
* @apiSuccess {String}   value 字典值
* @apiSuccess {String}   label 字典名称
* @apiSuccess {Number}   orderNum 排序号
* @apiSuccess {String}   description 字典描述
*/
router.post('/detail',async (req,res,next)=>{
const { id } = req.body
const data =  await intercept(cat.Dict.findOne({
  attributes:['id','dictType','dictTypeChdesc','value','label','orderNum','description'],
  where:{
    id:{
      [Op.eq]:id
    },
    del:{
      [Op.eq]:0
    },
  }
}))
res.send(data)
})
/**
* @api {post} /sys/dict/update updateDict
* @apiName updateDict
* @apiGroup Dict
* @apiBody {String}   id   字典id
* @apiBody {String}   dictType 字典类别
* @apiBody {String}   dictTypeChdesc 字典类别中文
* @apiBody {String}   value 字典值
* @apiBody {String}   label 字典名称
* @apiBody {Number}   orderNum 排序号
* @apiBody {String}   description 字典描述
*/
router.post('/update',async (req,res,next)=>{
const { dictType,dictTypeChdesc,id,value,label,orderNum,description } = req.body

const data = await intercept(cat.Dict.update({
  dictType,
  dictTypeChdesc,
  value,
  label,
  orderNum,
  description,
},{
  where:{
    id:{
      [Op.eq]:id
    },
    del:{
      [Op.eq]:0
    },
  }
}),{
  msg:'修改成功'
})
res.send(data)
})
/**
* @api {post} /sys/dict/delete deleteDict
* @apiName deleteDict
* @apiGroup Dict
* @apiBody {Number} id 
*/
router.post('/delete',async (req,res,next)=>{
const { id } = req.body
const data = await intercept(cat.Dict.update({
  del:1
},{
  where:{
    id:{
      [Op.eq]:id
    },
    del:{
      [Op.eq]:0
    },
  }
}),{
  msg:'删除成功'
})
res.send(data)
})

/**
* @api {post} /sys/dict/listInfoByType listInfo
* @apiName listInfo
* @apiGroup Dict 
* @apiBody {String} dictType 
*/
router.post('/listInfo',async (req,res,next)=>{
const { dictType } = req.body
const data = await intercept(cat.Dict.findAll({
  attributes:['id','dictType','dictTypeChdesc','value','label'],
  where:{
    del:{
      [Op.eq]:0
    },
    dictType:{
      [Op.eq]:dictType
    }
  },
  order:[
    ['orderNum','ASC']
  ]
}),{
  msg:'查询成功'
})
res.send(data)
})
module.exports = router;
