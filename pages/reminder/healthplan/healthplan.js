// pages/reminder/healthplan/healthplan.
const AV = require('../../../libs/av-core-min'); 
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
    sleepTime: '21:30',
    awakeTime: '06:30',
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
  bindTimeSleep: function(e) {
    this.setData({
      sleepTime: e.detail.value
    })
  },
  bindTimeAwake: function(e) {
    this.setData({
      awakeTime: e.detail.value
    })
  },
  confirm: function(e) {
    const currentUser = AV.User.current()
    var a_time=parseInt(this.data.awakeTime.replace(":",""))
    var s_time=parseInt(this.data.sleepTime.replace(":",""))
    var b_time=parseInt(this.data.breakfastTime.replace(":",""))
    var l_time=parseInt(this.data.lunchTime.replace(":",""))
    var d_time=parseInt(this.data.dinnerTime.replace(":",""))
    var planForMeals=[]
    planForMeals.push(b_time)
    planForMeals.push(l_time)
    planForMeals.push(d_time)
    currentUser.set("planForMeals",planForMeals)
    currentUser.set("planToAwake",a_time)
    currentUser.set("planToSleep",s_time)
    currentUser.save()
    wx.showToast({
      title: '保存成功',
      icon: 'success',
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