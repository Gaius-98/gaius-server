const intercept = (promise,opt) =>{
    return  new Promise((resolve,reject)=>{
        promise.then(res=>{
            resolve({
                code:0,
                data:res,
                msg:opt?.msg || '查询成功'
            })
        })
        .catch(err=>{
            resolve({
                code:500,
                data:{},
                msg:opt?.errMsg || JSON.stringify(err)
            })
        })
    })
}
module.exports = intercept