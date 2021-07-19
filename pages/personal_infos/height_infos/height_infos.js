const app = getApp()
const AV = require('../../../libs/av-core-min.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uheight:'',
    a_height: [],
    i_height: [120,0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindHeightChange(e) {
    this.setData({
      i_height: e.detail.value
    })
    this.setData({
      uheight: String(e.detail.value[0]+50)+'.'+String(e.detail.value[1])
    })
    console.log(this.data.uheight)
  },
  onLoad: function (options) {
    let heightStart = [],
      heightEnd = [],
      heightarray = [];
    for (let i = 50; i < 260; i++) {
      heightStart.push(`${i}`)
    }
    for (let i = 0; i < 10; i++) {
      heightEnd.push(`${i}`)
    }
    heightarray.push(heightStart);
    heightarray.push(heightEnd);
    this.setData({
      a_height: heightarray,
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
    try{
      let indexarray=[];
      var user=AV.User.current();
      var myDate = new Date();
      var height = user.attributes.height;
      console.log(myDate.getYear());
      console.log(myDate.getMonth());
      indexarray.push(parseInt(height-50)),
      indexarray.push(parseInt((height-parseInt(height))*10))
      this.setData({
        uheight:height,
        i_height:indexarray,
      })
    }catch(error){
      wx.showToast({
        title:'加载个人信息失败',
        icon:'none',
      })
    }
  },
  confirm(){
    try{
      var currentUser=AV.User.current()
      currentUser.set("height",this.data.uheight);
      currentUser.save();
    }catch(error){
      wx.showToast({
        title:error.message,
        icon:'none',
      })
    }
    wx.showToast({
      title: '更新成功',
      icon: 'success',
    });
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