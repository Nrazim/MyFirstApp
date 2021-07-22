// pages/home/eat/selectFood/selector/seclector.js
const AV = require('../../../../../libs/av-core-min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"无",
    foodName: "",
    annotation: "",
    kcalPer100g: "",
    amt: 0,
  },
  search: function (value) {
    return new Promise((resolve, reject) => {
      var searchList = []
      const query = new AV.Query('Calories')
      query.equalTo('Type',this.data.type)
      query.contains('foodName',value)
      query.find().then((searchedItems) => {
        searchedItems.forEach((food) => {
          var foodItem = new Object()
          foodItem.name = food.get('foodName')
          foodItem.KcalPer100g = food.get('KcalPer100g')
          foodItem.text = foodItem.name + '　　　' + foodItem.KcalPer100g + '千卡/100克'
          foodItem.annotation = food.get('annotation')
          foodItem.defaultGram = food.get('defaultGram')
          searchList.push(foodItem)
        })
        console.log('搜索结果为',searchList)
        resolve(searchList)
      })
    })
  },
  selectResult: function (e) {
      console.log('选择结果', e.detail.item)
      this.setData({
        foodName: e.detail.item.name,
        annotation: e.detail.item.annotation,
        kcalPer100g: e.detail.item.KcalPer100g + '千卡/100克',
        amt: e.detail.item.defaultGram,
      })
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      type: options.type,
      search: this.search.bind(this)
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