const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const config = require('./config')


// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())

// 引入路由分发
const router = require('./routes/index.js')
app.use(router.routes())


//这里引入一个路由
const mytest = require('./routes/mytest.js');
app.use(mytest.routes());

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))
