var dgram = require('dgram');
//var Common = require('./common');
//var common = new Common();

module.exports = function UDP(port,localIp){
	var serverUdp = dgram.createSocket('udp4');
	serverUdp.bind(port,localIp);
	
	//开启监听时触发
	serverUdp.on('listening', () => {
	var address = serverUdp.address();
		console.log(`开启udp服务 ${address.address}:${address.port}`);
	});
	
	//错误产生时触发
	serverUdp.on('error', (err) => {
		console.log(`server error:\n${err.stack}`);
		//server.close();
	});
	
	
	this.recevUdpData = function(callback){
		serverUdp.on('message',function(msg,rinfo){
		callback(msg,rinfo);
    console.log('receive:' + msg);	
		});
	};
	
	
	//发送udp数据
	this.sendUdpData = function(msg,port,ip){
		serverUdp.send(msg, 0, msg.length, port, ip);
		var sendMsg ='IP:'+ip + '  ' + 'PORT:' + port;
		//common.NoteLog(sendMsg,HEARTBEATSIGN);
	};
	
	
	this.HexRandom = function(n){
		var chars = ['0','1','2','3','4','5','6','7','8','9'];
		var res = "";
		for(var i = 0; i < n ; i ++) {
        var id = Math.floor(Math.random()*10);
        res += chars[id];
		}
		 if(res<999999999 || res>4294967295)
		 {
			 //递归
			 return this.HexRandom(n); 
		 }
		 
	    return res;
		
	};	
	
};


