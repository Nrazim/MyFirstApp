// pages/home/eat/selectFood/selectFood.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mealIndex:0,
    meals: ['早饭', '午饭', '晚饭'],
    foodSelectList:[
      {url: 'stapleFood/stapleFood', value:"主食", icon:"../../../images/icons/eatselect/stapleFood.png"},
      {url: 'meatAndEggs/meatAndEggs.js', value:"肉蛋", icon:"../../../images/icons/eatselect/meat.png"},
      {url: 'fruitAndVegetables/fruitAndVegetables.js', value:"果蔬", icon:"../../../images/icons/eatselect/vegetable.png"},
      {url: 'drink/drink.js', value:"饮品", icon:"../../../images/icons/eatselect/drink.png"},
      {url: 'dessert/dessert', value:"甜品", icon:"../../../images/icons/eatselect/dessert.png"},
    ],
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