/*
 *here is my koa-router test
 */
 var router = require('koa-router')();
 var formidable = require('formidable');
 var path = require('path');
 router.prefix ('/mytest');


//响应请求IP/mytest/test
 router.get('/test',async(ctx,next) =>{
    ctx.state.data = {
      msg : 'hello this is my router test'
    }
   next();
})
 module.exports = router;