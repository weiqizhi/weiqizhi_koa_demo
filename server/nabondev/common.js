/** 
 *通用函数，主要用于拼接指令
 */

module.exports = function Common(){
  /** 
   *十六进制字符串转byte数组 
   */
  this.strHex2Bytes = function(strHex) {
    var len = strHex.length;
    if (len % 2 != 0) {
      return null;
    }
    var pos = 0;
    var byteArry = new Array();
    len /= 2;
    for (var i = 0; i < len; i++) {
      var s = strHex.substr(pos, 2);
      var v = parseInt(s, 16);
      byteArry.push(v);
      pos += 2;
    }
    return byteArry;
  }

  //异或加密
  this.xor_encryption = function(strData) {
    var nXor = 0;
    //产生一个1-255的随机数 random *（max-min + 1）+ 1
    var nNum = Math.floor(Math.random() * (255 - 1 + 1) + 1);
    var strReturn = dec2Hex(nNum, 1);   //十进制转十六进制

    for (var i = 0; i < strData.length / 2; i++) {
      nXor = nNum ^ parseInt(strData.substr(i * 2, 2), 16);
      strReturn += dec2Hex(nXor)
    }

    return strReturn;
  }

  //重写十进制转为十六进制，指定转换后的十六进(Hex)制的字节数，使用每位十六进制使用两位表示，不足者前面补零
  this.dec2Hex = function(strDec, len = 1) {
    strHex = parseInt(strDec).toString(16);
    var nLen = len * 2;
    var hexReturn = '';

    if (strHex.length >= nLen) {
      hexReturn = strHex.substr(strHex.length - nLen);
    }
    else {
      for (var i = strHex.length; i < nLen; i++) {
        hexReturn += "0";
      }
      hexReturn += strHex;
    }
    return hexReturn;
  }

  //和校验
  this.sumCheckFun = function(strMsg) {
    if (strMsg.length % 2 != 0) {
      return null;
    }
    var strReturn = '';
    var nSum = 0;
    var byteArry = strHex2Bytes(strMsg);
    console.log(byteArry)
    console.log(byteArry.length)
    for (var i = 0; i < byteArry.length; i++) {
      nSum += byteArry[i];
    }
    strReturn = dec2Hex(nSum, 2);
    return strReturn;

  }

  //产生1-255的随机数，并转化为十六进制
  this.devFloorNum = function() {
    var nNum = Math.floor(Math.random() * (255 - 1 + 1) + 1);
    return dec2Hex(nNum, 1);
  }
  //生成指令
  function createCommand(devSN, password, version, funParam) {
    try {
      var head = '9EA5';
      var floorNum = devFloorNum();
      var devType = devSN.substr(0, 2)
      var devNumber = dec2Hex(devSN.substr(2), 3);
      var strActv = funParam.substr(0, 4);
      var strData = funParam.substr(4);
      var dataLen = dec2Hex(strData.length / 2 + 20, 2);
      var commuSign = '00';

      var tail = '9D';
      var strCommand = head + floorNum + devType + devNumber + version + password + strActv + dataLen + commuSign + strData;

      strCommand = strCommand + sumCheckFun(strCommand) + tail;
      return xor_encryption(strCommand);

    } catch (e) {
      console.log(e)
    }
  }

}