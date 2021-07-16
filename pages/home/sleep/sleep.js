// pages/home/sleep/sleep.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist1:[
      { url: '../../images/buttons/eat.png', id:"eat/eat"},
      { url: '../../images/buttons/medicine.png', id:"medicine/medicine"},
      { url: '../../images/buttons/reminder.png', id:"../reminder/takemedicine/takemedicine"},
      { url: '../../images/buttons/practice.png', id:"practice/practice"},
      { url: '../../images/buttons/sleep.png', id:"index/index"},
    ],
    slimeaction:"../../images/sleep.gif",
  },
  click: function (e) {
    app.homeclick(e)
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