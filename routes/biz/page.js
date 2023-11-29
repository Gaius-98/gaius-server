var express = require('express');
var router = express.Router();
var cat = require('../../utils/cat')
const intercept = require('../../utils/intercept')
const { Op } = require("sequelize");
/**
 * @api {post} /biz/Page/list getPageList
 * @apiName GetPageList
 * @apiGroup Page
 * 
 * @apiBody {String} keyword
 * @apiBody {Number}  pageSize   
 * @apiBody {Number} pageNumber   
 * @apiSuccess {Object[]} rows    页面配置列表
 * @apiSuccess {Number}   rows.id   页面id
 * @apiSuccess {String}   rows.name 页面名称
 * @apiSuccess {Number}   rows.width 页面宽度
 * @apiSuccess {Number}   rows.height 页面高度
 * @apiSuccess {String}   rows.img 页面预览图
 * @apiSuccess {String}   rows.componentData 页面配置
 * @apiSuccess {Number}   count 页面配置总数
 */
router.post('/list',function(req, res, next){
    const { keyword,pageSize,pageNumber} = req.body
    intercept(cat.Page.findAndCountAll({
      attributes:['id','name','width','height','img'],
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
 * @api {post} /biz/Page/save savePage
 * @apiName savePage
 * @apiGroup Page
 * 
 * @apiBody {String} name
 * @apiBody {Number}  width   
 * @apiBody {Number}  height   
 * @apiBody {String}  img   
 * @apiBody {String}  componentData   
 */
router.post('/save',(req,res,next)=>{
  const { name,width,height,img,componentData } = req.body
  let configStr = JSON.stringify(componentData)
  intercept(cat.Page.create({
    name,
    componentData:configStr,
    width,
    height,
    img,
    del:0, 
  }),{
    msg:'保存成功'
  }).then(data=>{
    res.send(data)
  })
})

/**
 * @api {post} /biz/Page/detail getPageDetail
 * @apiName getPageDetail
 * @apiGroup Page
 * 
 * @apiBody {Number} id   
 * @apiSuccess {String}   id   页面id
 * @apiSuccess {Number}   width 页面宽度
 * @apiSuccess {Number}   height 页面高度
 * @apiSuccess {String}   name 页面名称
 * @apiSuccess {String}   img 页面预览图
 * @apiSuccess {Object}   componentData 页面配置
 */
router.post('/detail',(req,res,next)=>{
  const { id } = req.body
  intercept(cat.Page.findByPk(id)).then(data=>{
    if(data.code == 0){
      data.data.componentData = JSON.parse(data.data.componentData)
    }
    res.send(data)
  })
})
/**
 * @api {post} /biz/Page/update updatePage
 * @apiName updatePage
 * @apiGroup Page
 * @apiBody {Number} id
 * @apiBody {String} name
 * @apiBody {Number}  width   
 * @apiBody {Number}  height   
 * @apiBody {String}  img   
 * @apiBody {String}  componentData  
 */
router.post('/update',(req,res,next)=>{
  const { name,width,height,img,componentData,id } = req.body
  let configStr = JSON.stringify(componentData)
  intercept(cat.Page.update({
    name,
    componentData:configStr,
    width,
    height,
    img,
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
 * @api {post} /biz/Page/delete deletePage
 * @apiName deletePage
 * @apiGroup Page
 * @apiBody {Number} id 
 */
router.post('/delete',(req,res,next)=>{
  const { id } = req.body

  intercept(cat.Page.update({
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
