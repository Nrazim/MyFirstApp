// pages/home/eat/eat.js
const app=getApp()
const AV = require('../../../libs/av-core-min');
var util = require('../../../utils/util.js');

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
    medicineBeforeDialogShow: false,
    takeMedicineAfter: false,
    timeStart: util.formatTime(new Date()),
    buttons: [
      {text: '点错啦'}, {text: '早饭'},
      {text: '中饭'}, {text: '晚饭'}
    ],
    medicineButton: [
      {text: '吃'}
    ]
  },

  click: function (e) {
    console.log(e.currentTarget.dataset.id)
    const jumpto = e.currentTarget.dataset.id
    console.log(this.data.takeMedicineAfter)
    //设置吃饭结束时间计算持续时间并上传
    const query = new AV.Query('EatTime')
    query.equalTo('eattimeStart',this.data.timeStart)
    query.first().then((eatTime) => {
      var timeEnd = util.formatTime(new Date())
      console.log('搜索到：',eatTime)
      console.log('结束时间：',timeEnd)
      console.log('此次开始时间：',this.data.timeStart)
      eatTime.set('eattimeEnd',timeEnd)
      var stime = Date.parse(new Date(this.data.timeStart))
      var etime = Date.parse(new Date(timeEnd))
      console.log(eatTime)
      var eatDuration = etime - stime
      eatTime.set('eatDuration',eatDuration)
      eatTime.save()
    });
    //判断有没有药要饭后吃
    if(this.data.takeMedicineAfter){
      this.timeToMedicineAfter()
    }
    else{
      wx.redirectTo({
        url: '../' + jumpto,
      })
    }
  },

  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },
  timeToMedicineAfter: function(){
    console.log("medicineAfter")
    this.setData({
      takeMedicineAfter: false,
      medicineAfterDialogShow: true,
    })
  },
  timeToMedicineBefore: function(){
    console.log("medicineBefore");
    this.setData({
      medicineBeforeDialogShow: true,
    })
  },

  tapDialogButton(e) {
    app.globalData.TakeMedicineBefore = false;
    console.log(e.detail)
    if(e.detail.index==0){
      wx.redirectTo({
        url: '../index/index',
      })
    }
    const currentUser = AV.User.current()
    var values = currentUser.get('medicineBefore')?currentUser.get('medicineBefore'):[]
    for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if(e.detail.index-1 == values[j]){//index从1到3，values从0到2是吃饭前
          app.globalData.TakeMedicineBefore = true/* 饭前吃药，以便吃完药可以回到吃饭 */
          this.timeToMedicineBefore();
          break;
        }
    }
    values = currentUser.get('medicineAfter')?currentUser.get('medicineAfter'):[]
    for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
      if(e.detail.index+2 == values[j]){//index从1到3，values从3到5是吃饭后
        this.setData({
          takeMedicineAfter: true,
        })
        console.log('TakeMedicineAfter')
        break;
      }
    }
    this.setData({
        dialogShow: false,
    })
    app.globalData.eatfinish = true
  },

  tapMedicineBeforeDialog: function(){
    this.setData({
      medicineBeforeDialogShow: false,
    })
    wx.navigateTo({
      url: '../medicine/medicine',
    })
  },
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
    const currentUser = AV.User.current()
    const eatTime = new AV.Object('EatTime')
    eatTime.set('parent',currentUser)
    console.log('开始时间：',this.data.timeStart)
    eatTime.set('eattimeStart',this.data.timeStart)
    console.log('创建的eatTime',eatTime)
    eatTime.save()
    this.openConfirm()
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