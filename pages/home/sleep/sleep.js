// pages/home/sleep/sleep.js
const app=getApp();
const AV = require('../../../libs/av-core-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist1:[
      { url: '../../images/buttons/sleep.png', id:"index/index"},
    ],
    slimeaction:"https://www.z4a.net/images/2021/07/17/_x264.gif",
  },
  click: function (e) {
    var currentUser = AV.User.current();
    app.homeclick(e);
    app.exp("sleep");
    currentUser.set("isSleeping",false);
    app.globalData.sleepfinish = true;
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
      var myDate = new Date()
      var myTime = `${myDate.getHours()}${myDate.getMinutes()}`
      console.log(myTime)
      currentUser.set("isSleeping",true)
      //currentUser.set("sleepStart",)
    }
    currentUser.save();
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