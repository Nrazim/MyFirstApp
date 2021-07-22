// pages/home/sleep/sleep.js
const app=getApp();
const AV = require('../../../libs/av-core-min.js');
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist1:[
      { url: '../../images/buttons/sleep.png', id:"index/index"},
    ],
    slimeaction:"https://www.z4a.net/images/2021/07/17/_x264.gif",
    timeStart: util.formatTime(new Date()),
  },
  click: function (e) {
    var currentUser = AV.User.current();
    app.homeclick(e);
    if(!app.globalData.sleepfinish){
    app.exp("sleep");
    //设置睡觉结束时间计算持续时间并上传
    const sleepTime = new AV.Object('SleepTime')
    sleepTime.set('parent',currentUser)
    console.log('开始时间：',this.data.timeStart)
    sleepTime.set('sleepStart',this.data.timeStart)
    var timeEnd = util.formatTime(new Date())
    console.log('结束时间：',timeEnd)
    sleepTime.set('sleepEnd',timeEnd)
    var stime = Date.parse(this.data.timeStart)
    var etime = Date.parse(timeEnd)
    console.log('创建的sleepTime',sleepTime)
    var sleepDuration = (etime - stime)/1000
    console.log('持续时间',sleepDuration)
    sleepTime.set('sleepDuration',sleepDuration)
    sleepTime.save()
    currentUser.set("isSleeping",'');
    app.globalData.sleepfinish = true;
    }
    var complete = currentUser.attributes.accomplished; //从leancloud取数组赋值后存储，睡觉对应第3个
    complete[3] = true;
    currentUser.set("accomplished",complete);
    currentUser.save();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const currentUser = AV.User.current();
    if(!currentUser.attributes.isSleeping){
      this.setData({
        timeStart:util.formatTime(new Date())
      })
      currentUser.set("isSleeping",this.data.timeStart)
      currentUser.save();
    }
    else{
      this.setData({
        timeStart:currentUser.attributes.isSleeping
      })
    }
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
    wx.hideHomeButton();
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