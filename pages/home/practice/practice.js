// pages/home/practice/practice.js
const app=getApp();
const AV = require('../../../libs/av-core-min.js');
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist1:[
      { url: '../../images/buttons/practice.png', id:"index/index"},
    ],
    slimeaction:"https://www.z4a.net/images/2021/07/20/run1.gif",
    timeStart: util.formatTime(new Date()),
    sportDuration: [0,0.5,1,1.5,2,2.5,3],
  },
  click: function (e) {
    var currentUser = AV.User.current();
    var timeEnd = util.formatTime(new Date())
    var stime = Date.parse(this.data.timeStart)
    var etime = Date.parse(timeEnd)
    var practiceDuration = (etime - stime)/3600000
    var practiceSetting = currentUser.get('practiceSetting')?currentUser.get('practiceSetting'):[]
    var practiceTimeset =this.data.sportDuration[practiceSetting[2]]
    console.log(practiceDuration)
    console.log(practiceTimeset)
    if(practiceDuration>practiceTimeset){
      if(!app.globalData.practicefinish){
        app.exp("practice");
        app.globalData.practicefinish = true
        }
      console.log(1)
      var complete = currentUser.attributes.accomplished; //从leancloud取数组赋值后存储，锻炼对应第0个
      complete[0] = true;
      currentUser.set("accomplished",complete);
      currentUser.save();

      app.homeclick(e);
    }
    else{
      wx.showToast({
        title: '您尚未完成训练计划，请继续加油哦',
        icon: 'none',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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