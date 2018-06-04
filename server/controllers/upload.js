const { uploader } = require('../qcloud')

module.exports = async ctx => {
    // 获取上传之后的结果
    // 具体可以查看：
    
    const data = await uploader(ctx.req)
    console.log(data);
    console.log('你好!');
    ctx.state.data = data
}

