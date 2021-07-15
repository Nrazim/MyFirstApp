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
    slimeaction:"../../images/eat.gif",
    dialogShow: false,
    medicineBeforeDialogShow: false,
    medicineAfterDialogShow: false,
    takeMedicineAfter: false,
    buttons: [
      {text: '手滑了'}, {text: '早饭'},
      {text: '中饭'}, {text: '晚饭'}
    ],
    medicineButton: [
      {text: '吃'}
    ]
  },

  click: function (e) {
    console.log(e.currentTarget.dataset.id)
    const jumpto = e.currentTarget.dataset.id
    if(this.data.takeMedicineAfter==true){
      this.setData({
        takeMedicineAfter: false,
      })
      this.timeToMedicineAfter();
    }
    else{
      wx.redirectTo({
        url: '../' + jumpto,
      })
    }
  },
  /* 页面打开时弹出吃饭时点选择 */
  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },

  timeToMedicineBefore: function(){
    console.log("medicine before");
    this.setData({
      medicineBeforeDialogShow: true,
    })
  },
  timeToMedicineAfter: function(){
    console.log("medicine after");
    this.setData({
      medicineAfterDialogShow: true,
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
      if(e.detail.index-1 == values[j]){//index的0是取消，123分别为早中晚饭，而MedicineBefore的012分别为早中晚饭
        app.globalData.TakeMedicineBefore = true;//饭前吃药，以便吃完药可以回到吃饭
        this.timeToMedicineBefore();
        break;
      }
    }
    var values = app.globalData.MedicineAfter
    for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
      if(e.detail.index+2 == values[j]){//index的0是取消，123分别为早中晚饭，而MedicineAfter的012分别为早中晚饭
        this.setData({//饭后吃药的变量设定
          takeMedicineAfter: true,
        });
        break;
      }
    }
    this.setData({
        dialogShow: false,
    })
  },
  /* 饭前吃药框 */
  tapMedicineBeforeDialog: function(){
    this.setData({
      medicineBeforeDialogShow: false,
    })
    wx.navigateTo({
      url: '../medicine/medicine',
    })
  },
  /* 饭后吃药框 */
  tapMedicineAfterDialog: function(){
    this.setData({
      medicineAfterDialogShow: false,
    })
    wx.redirectTo({
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