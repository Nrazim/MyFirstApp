// pages/home/person/medal/medal.js
const app=getApp()
const AV = require('../../../../libs/av-core-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist1:[
      { url:['https://i.loli.net/2021/07/29/SGQR5IrdNBiY1oP.png','https://i.loli.net/2021/07/28/AR8mQyI9f1nYzOZ.png','https://i.loli.net/2021/07/28/k74glyjGIR3vtQU.png','https://i.loli.net/2021/07/29/68zwgLVK93AeCio.png','https://i.loli.net/2021/07/29/CVzIaiLnTHw2rYd.png','https://i.loli.net/2021/07/29/uUABaHreTtIZv3F.png'],txt:"任务达成之星",toNext:0,present:0,id1:'连续达成任务天数：',id2:'天'},

      { url:['https://i.loli.net/2021/07/28/kcrXJCxZHgEYSFd.png','https://i.loli.net/2021/07/28/hSGPHTNYglw2seo.png','https://i.loli.net/2021/07/28/xgu4S3bC1wFkZEK.png','https://i.loli.net/2021/07/29/MDzUwpANfKqFRkX.png','https://i.loli.net/2021/07/29/AJb8HMlo4srDVSF.png','https://i.loli.net/2021/07/29/MdeoIjNPZUH24QO.png'], txt:"经验升级之星",toNext:0,present:0,id1:'　　当前等级：',id2:'级　　'},

      { url:['https://i.loli.net/2021/07/29/75wkRPiWZ9gfFyL.png','https://i.loli.net/2021/07/29/QKR1NwhvioIqJCd.png','https://i.loli.net/2021/07/29/qaTlIzH9EA5Qh7f.png','https://i.loli.net/2021/07/29/aBhfM68pKlguw4o.png','https://i.loli.net/2021/07/29/g1crQeSwyOh4aPD.png','https://i.loli.net/2021/07/29/G1ywY6gcNZRq2Vn.png'], txt:"保持运动之星",toNext:0,present:0,id1:'　保持运动天数：',id2:'天　'},

      { url:['https://i.loli.net/2021/07/29/8nMVeIgU6CqQcPX.png','https://i.loli.net/2021/07/29/PcLSvgxuDkyrV6f.png','https://i.loli.net/2021/07/29/UCxvJPktALr2wS4.png','https://i.loli.net/2021/07/29/nHT3AXipR4I1yQa.png','https://i.loli.net/2021/07/29/gYVW4Mb8sT3oefP.png'],txt:"锻炼强度之星",toNext:0,present:0,id1:'　最大锻炼强度：',id2:'小时　'},

      { url:['https://i.loli.net/2021/07/29/FqtdYwsGNzDXfTJ.png','https://i.loli.net/2021/07/29/1QFm4nzsOUT9YA8.png','https://i.loli.net/2021/07/29/9ryEWozf2vwZhcq.png','https://i.loli.net/2021/07/29/6QBscAPiqyRp754.png','https://i.loli.net/2021/07/29/wymOICLoxdB3TkP.png','https://i.loli.net/2021/07/29/k9YjbDTiGZWBmyH.png'],txt:"按时干饭之星",toNext:0,present:0,id1:'连续按时干饭天数：',id2:'天'},
      { url:['https://i.loli.net/2021/07/29/FuwHVBJY5aSiNgl.png','https://i.loli.net/2021/07/29/3yodvVPaWgserK8.png',
      'https://i.loli.net/2021/07/29/thdIlunLAFaewQ2.png','https://i.loli.net/2021/07/29/yBtCI5AeNsQSFu3.png','https://i.loli.net/2021/07/29/Xd2aNGB4zjgvhWH.png','https://i.loli.net/2021/07/29/sqc3azD9EXu4KvA.png'],txt:"早睡早起之星",toNext:0,present:0,id1:'连续按时睡眠天数：',id2:'天'},
    ],
    medallist:[3,5,10,15,20,20],
    medalMaxTimelist:[0.5,1,2,3,3]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentUser = AV.User.current();
    var continueDays = currentUser.get('continueDays')
    var PracticeMaxTime = currentUser.get('PracticeMaxTime')
    this.setData({
      medal:app.globalData.medalAcquire,
      'imglist1[0].toNext':Math.round(app.globalData.dayonscheduel/this.data.medallist[app.globalData.medalAcquire[0]]*100)<100?Math.round(app.globalData.dayonscheduel/this.data.medallist[app.globalData.medalAcquire[0]]*100):100,
      'imglist1[0].present':app.globalData.dayonscheduel,

      'imglist1[1].toNext':Math.round(app.globalData.level/this.data.medallist[app.globalData.medalAcquire[1]]*100)<100?Math.round(app.globalData.level/this.data.medallist[app.globalData.medalAcquire[1]]*100):100,
      'imglist1[1].present':app.globalData.level,

      'imglist1[2].toNext':Math.round(continueDays[0]/this.data.medallist[app.globalData.medalAcquire[2]]*100)<100?Math.round(continueDays[0]/this.data.medallist[app.globalData.medalAcquire[2]]*100):100,
      'imglist1[2].present':continueDays[0],

      'imglist1[3].toNext':Math.round(PracticeMaxTime/this.data.medalMaxTimelist[app.globalData.medalAcquire[3]]*100)<100?Math.round(PracticeMaxTime/this.data.medalMaxTimelist[app.globalData.medalAcquire[3]]*100):100,
      'imglist1[3].present':PracticeMaxTime,
      
      'imglist1[4].toNext':Math.round(continueDays[1]/this.data.medallist[app.globalData.medalAcquire[4]]*100)<100?Math.round(continueDays[1]/this.data.medallist[app.globalData.medalAcquire[4]]*100):100,
      'imglist1[4].present':continueDays[1],

      'imglist1[5].toNext':Math.round(continueDays[2]/this.data.medallist[app.globalData.medalAcquire[5]]*100)<100?Math.round(continueDays[2]/this.data.medallist[app.globalData.medalAcquire[5]]*100):100,
      'imglist1[5].present':continueDays[2],
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