// pages/home/setting/setting.js
const app = getApp()
const AV = require('../../../libs/av-core-min.js'); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rgb: app.globalData.rgb,
    pick: false
  },
  toPick: function () {
    this.setData({
      pick: true
    })
  },
  pickColor(e) {
    this.setData({
      rgb: e.detail.color
    })
    app.globalData.rgb = e.detail.color
  },
  handleLogout () {
    AV.User.logOut();
    wx.redirectTo({
      url: '../../login/login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      rgb: app.globalData.rgb
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
    this.setData({
      rgb: app.globalData.rgb
    })
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