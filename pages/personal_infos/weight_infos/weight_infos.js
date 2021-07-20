const app = getApp()
const AV = require('../../../libs/av-core-min.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uweight:'',
    a_weight: [],
    i_weight: [30,0],
  },
  bindWeightChange(e) {
    this.setData({
      i_weight: e.detail.value
    })
    this.setData({
      uweight: String(e.detail.value[0]+30)+'.'+String(e.detail.value[1])
    })
    console.log(this.data.weight)
  },
  confirm(){
    try{
      var currentUser=AV.User.current()
      currentUser.set("weight",this.data.uweight);
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    let weightStart = [],
    weightEnd = [],
    weightarray = [];
    for (let i = 30; i < 200; i++) {
      weightStart.push(`${i}`)
    }
    for (let i = 0; i < 10; i++) {
      weightEnd.push(`${i}`)
    }
    weightarray.push(weightStart);
    weightarray.push(weightEnd);
    _this.setData({
      a_weight: weightarray,
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
      var weight = user.attributes.weight;
      console.log(myDate.getYear());
      console.log(myDate.getMonth());
      indexarray.push(parseInt(weight-30)),
      indexarray.push(parseInt((weight-parseInt(weight))*10))
      this.setData({
        uweight:weight,
        i_weight:indexarray,
      })
    }catch(error){
      wx.showToast({
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