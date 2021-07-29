// pages/home/person/medal/medal.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist1:[
      { url:['https://i.loli.net/2021/07/29/SGQR5IrdNBiY1oP.png','https://i.loli.net/2021/07/28/AR8mQyI9f1nYzOZ.png','https://i.loli.net/2021/07/28/k74glyjGIR3vtQU.png','',''],txt:"任务达成之星",toNext:0},
      { url:['https://i.loli.net/2021/07/28/kcrXJCxZHgEYSFd.png','https://i.loli.net/2021/07/28/hSGPHTNYglw2seo.png','https://i.loli.net/2021/07/28/xgu4S3bC1wFkZEK.png','',''], txt:"经验升级之星",toNext:0},
      { url:['https://i.loli.net/2021/07/29/75wkRPiWZ9gfFyL.png','https://i.loli.net/2021/07/29/QKR1NwhvioIqJCd.png','https://i.loli.net/2021/07/29/qaTlIzH9EA5Qh7f.png','',''], txt:"保持运动之星",toNext:0},
      { url:['https://i.loli.net/2021/07/29/8nMVeIgU6CqQcPX.png','https://i.loli.net/2021/07/29/PcLSvgxuDkyrV6f.png','https://i.loli.net/2021/07/29/UCxvJPktALr2wS4.png','',''],txt:"锻炼强度之星",toNext:0},
      { url:['https://i.loli.net/2021/07/29/FqtdYwsGNzDXfTJ.png','https://i.loli.net/2021/07/29/1QFm4nzsOUT9YA8.png','https://i.loli.net/2021/07/29/9ryEWozf2vwZhcq.png','',''],txt:"按时干饭之星",toNext:0},
      { url:['https://i.loli.net/2021/07/29/FuwHVBJY5aSiNgl.png','https://i.loli.net/2021/07/29/3yodvVPaWgserK8.png',
      'https://i.loli.net/2021/07/29/thdIlunLAFaewQ2.png','',''],txt:"早睡早起之星",toNext:0},
    ],
    medallist:[3,5,10,15,20],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      medal:app.globalData.medalAcquire,
      'imglist1[0].toNext':Math.round(app.globalData.dayonscheduel/this.data.medallist[app.globalData.medalAcquire[0]]*100),
      'imglist1[1].toNext':Math.round(app.globalData.level/this.data.medallist[app.globalData.medalAcquire[1]]*100),
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