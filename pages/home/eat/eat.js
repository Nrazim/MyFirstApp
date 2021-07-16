// pages/home/eat/eat.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist1:[
      { url: '../../images/buttons/eat.png', id:"index/index"},
    ],
    slimeaction:"https://www.z4a.net/images/2021/07/16/eat.gif",
    dialogShow: false,
    medicineDialogShow: false,
    buttons: [
      {text: '点错啦'}, {text: '早饭'},
      {text: '中饭'}, {text: '晚饭'}
    ],
    medicineButton: [
      {text: 'eat'}
    ]
  },

  click: function (e) {
    app.homeclick(e)
  },

  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },

  timeToMedicine: function(){
    console.log("medicine");
    this.setData({
      medicineDialogShow: true,
    })
  },

  tapDialogButton(e) {
    app.globalData.TakeMedicineBefore = false;
    console.log(e.detail)
    if(e.detail.index==0){
      wx.navigateTo({
        url: '../index/index',
      })
    }
    var values = app.globalData.MedicineBefore
    for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if(e.detail.index-1 == values[j]){
          app.globalData.TakeMedicineBefore = true;/* 饭前吃药，以便吃完药可以回到吃饭 */
          this.timeToMedicine();
          break;
        }
    }
    this.setData({
        dialogShow: false,
    })
  },

  tapMedicineDialog: function(){
    this.setData({
      medicineDialogShow: false,
    })
    wx.navigateTo({
      url: '../medicine/medicine',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.openConfirm();
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