// pages/home/medicine/medicine.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist1:[
      { url: '../../images/buttons/medicine.png', id:"index/index"},
    ],
    slimeaction:"https://www.z4a.net/images/2021/07/16/medicine.gif",
  },
  click: function (e) {
    if(app.globalData.TakeMedicineBefore == false){
      app.homeclick(e);
    }
    else{/* 饭前吃药跳转进入 */
      console.log(e.currentTarget.dataset.id)
      const jumpto = e.currentTarget.dataset.id
      app.globalData.TakeMedicineBefore = false
      if(jumpto=="../reminder/takemedicine/takemedicine"){
        wx.navigateTo({
          url: '../' + jumpto,
        })
      }
      else if(jumpto=="index/index"){/* 需要将回到首页改为回到吃饭 */
        wx.navigateBack({})
      }
      else{
        wx.redirectTo({
          url: '../' + jumpto,
        })
      }
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