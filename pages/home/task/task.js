// pages/message/message.js
var app = getApp()
Page({
  gotoPage_eat:function(){
    wx.redirectTo({
      url:'/pages/home/eat/eat'
    })
    app.globalData.eatfinish = true
  },
  gotoPage_medicine:function(){
    wx.redirectTo({
      url:'/pages/home/medicine/medicine'
    })
    app.globalData.medicinefinish = true
  },
  gotoPage_sleep:function(){
    wx.redirectTo({
      url:'/pages/home/sleep/sleep'
    })
    app.globalData.sleepfinish = true
  },
  gotoPage_practice:function(){
    wx.redirectTo({
      url:'/pages/home/practice/practice'
    })
    app.globalData.practicefinish = true
  },

  /**
   * 页面的初始数据
   */
  data: {
    message:'',
    medicine: app.globalData.medicine,
    sleepfinish: app.globalData.sleepfinish,
    eatfinish: app.globalData.eatfinish,
    medicinefinish: app.globalData.medicinefinish,
    practicefinish: app.globalData.practicefinish,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      message:options.message,
      sleepfinish:app.globalData.sleepfinish,
      eatfinish: app.globalData.eatfinish,
      medicinefinish: app.globalData.medicinefinish,
      practicefinish: app.globalData.practicefinish,
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