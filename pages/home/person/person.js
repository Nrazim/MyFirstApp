// pages/home/person/person.js
const app=getApp();
const AV = require('../../../libs/av-core-min');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    medalschedual:[3,5,10,15,20],
    medallevel:[3,5,10,15,20],
    medalmeal:[3,5,10,15,20],
    medalpractice:[3,5,10,15,20],
    medalsleep:[3,5,10,15,20],
    medalMaxPractice:[0.5,1,2,3]
  },

  /**
   * 生命周期函数--监听页面加载
   */

   medalClick:function(){
    wx.navigateTo({
      url:'../person/medal/medal'
    })
   },

  onLoad: function (options) {
    this.setData({
      exp:Math.round(app.globalData.exp/app.globalData.levelexplist[app.globalData.level]*100),
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
    app.setNavBar()
    const currentUser = AV.User.current();
    app.globalData.dayonscheduel=currentUser.get('dayonscheduel');
    console.log(app.globalData.dayonscheduel);
    this.setData({
      exp:Math.round(app.globalData.exp/app.globalData.levelexplist[app.globalData.level]*100),
      level:app.globalData.level,
      dayonscheduel:app.globalData.dayonscheduel,
    })
    //任务达成成就显示
    for(var j=0;j<=5;j++)
    {
      if(app.globalData.dayonscheduel>=this.data.medalschedual[j])
      {
        app.globalData.medalAcquire[0]=j+1
      }
    }

    //等级升级成就显示
    for(var j=0;j<=5;j++)
    {
      if(app.globalData.level>=this.data.medallevel[j])
      {
        app.globalData.medalAcquire[1]=j+1
      }
    }

    var continueDays = currentUser.get('continueDays')
    //锻炼天数成就显示
    for(var j=0;j<=5;j++)
    {
      if(continueDays[0]>=this.data.medalpractice[j])
      {
        app.globalData.medalAcquire[2]=j+1
      }
    }
    var PracticeMaxTime = currentUser.get('PracticeMaxTime')
    //最大锻炼时间
    for(var j=0;j<=5;j++)
    {
      if(PracticeMaxTime>=this.data.medalMaxPractice[j])
      {
        app.globalData.medalAcquire[3]=j+1
      }
    }
    //吃饭成就显示
    for(var j=0;j<=5;j++)
    {
      if(continueDays[1]>=this.data.medalmeal[j])
      {
        app.globalData.medalAcquire[4]=j+1
      }
    }

    //睡觉成就显示
    for(var j=0;j<=5;j++)
    {
      if(continueDays[2]>=this.data.medalsleep[j])
      {
        app.globalData.medalAcquire[5]=j+1
      }
    }

  },
  
  
  
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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