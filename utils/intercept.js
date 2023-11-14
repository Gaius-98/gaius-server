const intercept = (err,result,opt) =>{
    if(err){
        return  {
            code:500,
            data:{},
            msg:err
        }
    }else{
        return {
            code:0,
            data:result,
            msg:opt?.msg || '查询成功'
        }
    }
}
module.exports = intercept