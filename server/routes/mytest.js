/*
 *here is my koa-router test
 */
 var router = require('koa-router')();
 router.prefix ('/weapp');

 router.get('/mytest',async(ctx,next) =>{
    ctx.state.data = {
      msg : 'hello this is my router test'
    }
   next();
 })

 module.exports = router;