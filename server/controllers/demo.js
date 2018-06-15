var mysqldb = require('../middlewares/mysql.js');
var Udp = require('../middlewares/udp.js');

//开发环境的IP地址，通过域名得到的，这里不能写成127.0.0.1,这样会无效
var udp = new Udp(43952,'119.29.223.150')

//连接数据库
var mysql = mysqldb.connection();

async function route1(ctx,next){
  ctx.state.data = {
    msg : 'this is route1'
  }
  await next();
}

async function route2(ctx,next){
  /**
   * 测试使用数据库
   */
  var insSql = 'INSERT INTO mytable(title,date) VALUES (?,?)';
  var insParam = ['test insert', '2018-05-01'];
  mysql.query(insSql, insParam, function (err) {
    if (err) {
      console.log('test insert error');
    } else {
      console.log('test insert success');
    }
  })
  ctx.state.data = {
    msg : 'this is route2'
  }
}

async function search(ctx,next){
  ctx.state.data = {
    msg : 'search response ok'
  }
}

async function testUdp(ctx,next){
  //测试发送udp,发送接收成功
  udp.sendUdpData('hello world',8878,'121.41.42.243')
  ctx.state.data = {
    msg : 'test udp revice message'
  }
}

module.exports = {
  route1,
  route2,
  search,
  testUdp
}


