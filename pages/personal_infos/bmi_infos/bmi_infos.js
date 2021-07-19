// pages/personal_infos/bmi_infos/bmi_infos.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bmi:0,
    comment:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bmi: options.bmi,
    })
    var b=this.data.bmi;
    if(b<18.5){
      this.setData({
        comment:'偏瘦',
      })
    }else if(b<24){
      this.setData({
        comment:'标准',
      })
    }else if(b<28){
      this.setData({
        comment:'偏重',
      })
    }else if(b<32){
      this.setData({
        comment:'肥胖',
      })
    }else{
      this.setData({
        comment:'极度肥胖',
      })
    }
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