// pages/home/person/medal/medal.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist1:[
      { url:['https://i.loli.net/2021/07/28/dqcT3HujIMQkUrb.png','https://i.loli.net/2021/07/28/AR8mQyI9f1nYzOZ.png','https://i.loli.net/2021/07/28/k74glyjGIR3vtQU.png','',''],txt:"任务达成之星"},
      { url:['https://i.loli.net/2021/07/28/kcrXJCxZHgEYSFd.png','https://i.loli.net/2021/07/28/hSGPHTNYglw2seo.png','https://i.loli.net/2021/07/28/xgu4S3bC1wFkZEK.png','',''], txt:"经验升级之星"},
      { url:['../../../images/medal/bottom.png','','','',''], txt:"底部3"},
      { url:['../../../images/medal/bottom.png','','','',''],txt:"底部4"},
      { url:['../../../images/medal/bottom.png','','','',''],txt:"底部5"},
    ],
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      medal:app.globalData.medalAcquire
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