// pages/home/setting/setting.js
const app = getApp()
const AV = require('../../../libs/av-core-min.js'); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rgb: app.globalData.rgb,
    pick: false,
    buttons: [
      {text: '取消'}, {text: '确认'}
    ],
    character:['史莱姆','严小喵'],
    cha: app.globalData.mainCharacter,
    dialogShow: false,
  },
  bindChaChange: function(e){
    this.setData({
      cha: e.detail.value
    })
    app.globalData.mainCharacter = e.detail.value
    console.log('角色编号改为' + app.globalData.mainCharacter)
    const currentUser = AV.User.current()
    currentUser.set('mainCharacter',e.detail.value)
  },
  toPick: function () {
    this.setData({
      pick: true
    })
  },
  pickColor(e) {
    this.setData({
      rgb: e.detail.color
    })
    console.log(e.detail.color)
    app.globalData.rgb = e.detail.color
    app.globalData.NavigationBarSettings.background = app.colorRGB2Hex(e.detail.color) 
    app.globalData.NavigationBarSettings.front = app.isLight(e.detail.color)?"#000000":"#ffffff"
    app.setNavBar()
    const currentUser = AV.User.current()
    currentUser.set('NavigationBarSettings',app.globalData.NavigationBarSettings)
  },
  openConfirm: function(){
    this.setData({
        dialogShow: true
    })
  },
  handleLogout (e) {
    if(e.detail.index==1){
      AV.User.logOut();
      app.globalData.SignedIn = false;
      wx.navigateBack({});
      wx.redirectTo({
        url: '../../login/login/login',
      })
    }
    this.setData({
      dialogShow: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      rgb: app.globalData.rgb,
      cha: app.globalData.mainCharacter,
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
    this.setData({
      rgb: app.globalData.rgb,
      cha: app.globalData.mainCharacter,
    })
    app.setNavBar()
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