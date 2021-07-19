const app = getApp()
const AV = require('../../../libs/av-core-min.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uheight:'',
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
    try{
      var user=AV.User.current();
      var myDate = new Date();
      console.log(myDate.getYear());
      console.log(myDate.getMonth());
      this.setData({
        uheight:user.attributes.height
      })
    }catch(error){
      showToast({
        title:'加载个人信息失败',
        icon:'none',
      })
    }
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