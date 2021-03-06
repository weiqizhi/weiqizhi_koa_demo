//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        requestResult: '',
        canIUseClipboard: wx.canIUse('setClipboardData')
    },

    testCgi: function () {
        //util.showBusy('请求中...')
        console.log('发送请求成功!');
        var that = this
        qcloud.request({
            url: config.service.tunnelUrl_2,
            login: false,
            success (result) {
                util.showSuccess('请求成功完成')
                that.setData({
                    requestResult: JSON.stringify(result.data)
                })
            },
            fail (error) {
                util.showModel('请求失败', error);
                console.log('request fail', error);
            }
        })
    },

    testUdp : function(){
      var thst = this
      qcloud.request({
        url : `${config.service.host}/weapp/demo/testUdp`,
        login : false,
        success (result){
          util.showSuccess('请求完成')
        },
        fail(err){
          util.showModel('请求失败',err);
        }
      })
    },
    copyCode: function (e) {
        var codeId = e.target.dataset.codeId
        wx.setClipboardData({
            data: code[codeId - 1],
            success: function () {
                util.showSuccess('复制成功')
            }
        })
    }
})

var code = [
`router.get('/demo', controllers.demo)`,
`module.exports = ctx => {
    ctx.state.data = {
        msg: 'Hello World'
    }
}`
]
