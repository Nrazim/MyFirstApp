// pages/home/eat/selectFood/selectFood.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mealIndex:0,
    meals: ['早饭', '午饭', '晚饭'],
    foodSelectList:[
      {url: 'selector/seclector?type=主食', value:"主食", icon:"../../../images/icons/eatselect/stapleFood.png"},
      {url: 'selector/seclector?type=肉蛋', value:"肉蛋", icon:"../../../images/icons/eatselect/meat.png"},
      {url: 'selector/seclector?type=果蔬', value:"果蔬", icon:"../../../images/icons/eatselect/vegetable.png"},
      {url: 'selector/seclector?type=饮品', value:"饮品", icon:"../../../images/icons/eatselect/drink.png"},
      {url: 'selector/seclector?type=甜品', value:"甜品", icon:"../../../images/icons/eatselect/dessert.png"},
    ],
    calorie: app.globalData.calorie
  },
  bindmealsChange:function(e){
    this.setData({
      mealIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      calorie: app.globalData.calorie,
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