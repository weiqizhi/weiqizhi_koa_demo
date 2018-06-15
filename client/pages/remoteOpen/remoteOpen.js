// pages/mytest/mytest.js
var util = require('../../utils/util.js');
var config = require('../../config.js');
var qcloud = require('../../vendor/wafer2-client-sdk/index')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    devListArr: [1, 2, 3],
    //device array
    devices: [
      { devsn: '2209456',name: '大门', version: 'v3306', password: '123456', door: '1', checked: true},
      { devsn: '2408906',name: '二门', version: 'v3306', password: '123456', door: '3' },
    ],
    //note current selected device index
    selectedDevIndex : 0 , 
    //control add device modal hidden or not
    showModal : false,
  },
  /**
   * 监听设备选择事件
   */
  radioChange: function(e){
    this.data.selectedDevIndex = e.detail.value;
    console.log(this.data.selectedDevIndex);
  },
  /**
   * 监听远程开门事件
   */
  remoteOpenDoor: function(){
    var index = this.data.selectedDevIndex;
    console.log(this.data.devices[index])
    //在此可以发送远程开门的指令
  },
  /**
   * 删除设备
   */
  removeDev:function(e){
    this.data.devices.splice(this.data.selectedDevIndex,1);
    this.setData({
      devices : this.data.devices
    })
  },
  /**
   * 添加设备
   */
  addDevice: function(){
    this.setData({
      showModal : true
    })
  },
  addConfirm: function(e){
    var newDevObj = {
      devsn : e.detail.value.devSN,
      name  : e.detail.value.devName,
      version : '3306',
      password : e.detail.value.password,
      door : e.detail.value.doorNum
    } 
      
    this.data.devices.push(newDevObj);

    this.setData({
      showModal : false,
      devices : this.data.devices
    })
    
  },
  addCancel: function(){
    this.setData({
      showModal : false
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove:function(){

  },
  /*
   *列表测试
   */ 
  searchDev: function(){
    var that = this;
    qcloud.request({
      url : config.service.searchUrl,
      login : false,
      success (res){
        var result = JSON.stringify(res.data.data);
        that.setData({
          devList: that.data.devListArr.concat(result)
        })
      },
      fail (err){
        util.showModle('failed')
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取app对象
    var app = getApp()
    //适应全局变量
    var data = app.globalData.mytest
    //给全局变量赋值
    app.globalData.mytest = 'global data change';
    console.log(data);

    var pages = getCurrentPages();
    var prePage = pages[pages.length-2]
    prePage.setData({
      index:'234'
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})

