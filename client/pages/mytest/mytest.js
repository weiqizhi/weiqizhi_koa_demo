// pages/mytest/mytest.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  mytest: function () {
    //util.showBusy('请求中...')
    console.log('发送请求成功!');
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/mytest`,
      login: false,
      success(result) {
        util.showSuccess('请求成功完成')
        that.setData({
          requestResult: JSON.stringify(result.data)
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
