// pages/reminder/healthplan/healthplan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    breakfastTime: '07:00',
    lunchTime: '12:00',
    dinnerTime: '18:00',
    switchBreakfastChecked: false,
    switchLunchChecked: false,
    switchDinnerChecked: false,
  },

  bindTimeBreakfast: function(e) {
    console.log('早饭时间发送选择改变，携带值为', e.detail.value)
    this.setData({
      breakfastTime: e.detail.value
    })
  },
  bindTimeLunch: function(e) {
    console.log('中饭时间发送选择改变，携带值为', e.detail.value)
    this.setData({
      lunchTime: e.detail.value
    })
  },
  bindTimeDinner: function(e) {
    console.log('晚饭时间发送选择改变，携带值为', e.detail.value)
    this.setData({
      dinnerTime: e.detail.value
    })
  },
  switchBreakfastChange: function(e){
    console.log('早饭提醒发送切换改变，携带值为', e.detail.value)
    this.setData({
      switchBreakfastChecked: e.detail.value
    })
  },
  switchLunchChange: function(e){
    console.log('午饭提醒发送切换改变，携带值为', e.detail.value)
    this.setData({
      switchLunchChecked: e.detail.value
    })
  },
  switchDinnerChange: function(e){
    console.log('晚饭提醒发送切换改变，携带值为', e.detail.value)
    this.setData({
      switchDinnerChecked: e.detail.value
    })
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