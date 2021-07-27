// pages/home/sleep/sleep.js
const app=getApp();
const AV = require('../../../libs/av-core-min.js');
var util = require('../../../utils/util.js');
//引入图片预加载组件
const ImgLoader = require('../../../components/img-loader/img-loader.js')
//原图
const slimeActionOriginal = "https://www.z4a.net/images/2021/07/17/_x264.gif"
//缩略图 
const slimeActionThumbnail = "https://www.z4a.net/images/2021/07/17/_x264.md.gif"
var timeSleepFrom = 1630;
var timeSleepTo = 2330;
var timeAwakeFrom = 630;
var timeAwakeTo = 1030;          //设置可以睡觉的时间段

Page({
  data: {
    imglist1:[
      { url: '../../images/buttons/sleep.png', id:"index/index"},
    ],
    slimeAction: '',
    timeStart: util.formatTime(new Date()),
    dialogShow1: false,
    dialogShow2: false,
    buttons1:[{text:'好吧'}],
    buttons2:[{text:'再等等~'}, {text:'现在就睡'}],
    timeCanAwake:"",
  },
  click: function (e) {
    var currentUser = AV.User.current();
    app.homeclick(e);
    var t_time = new Date()
    var hms = parseInt((this.data.timeStart).slice(11,13)+(this.data.timeStart).slice(14,16))
    var hme = parseInt(`${t_time.getHours()}${t_time.getMinutes()}`)
    console.log(hme)
    if(hme>timeAwakeFrom&&hme<timeAwakeTo){
      //设置睡觉结束时间计算持续时间并上传
      const sleepTime = new AV.Object('SleepTime')
      var timeEnd = util.formatTime(new Date())
      var stime = Date.parse(this.data.timeStart)
      var etime = Date.parse(timeEnd)
      var sleepDuration = (etime - stime)/1000
      var symbol = true
      var settingAwake=currentUser.attributes.planToAwake
      var settingSleep=currentUser.attributes.planToSleep
      console.log("plan to sleep: ",settingSleep)
      console.log("plan to awake: ",settingAwake)
      if(settingAwake){
        if(hme>(settingAwake-30)&&hme<(settingAwake+30)&&hms>(settingSleep-30)&&hms<(settingSleep+30)){
          console.log("OK!")
          symbol=true
        }
        else{
          console.log("incorrect time!")
          symbol=false
        }
      }
      else{
        console.log("no plans!")
      }
      if(!app.globalData.sleepfinish&&sleepDuration<86400&&symbol){
        //规定时间内睡觉 规定时间内起床 且保证睡觉时间不超过一天 任务完成
        app.exp("sleep");
        app.globalData.sleepfinish = true;
        var complete = currentUser.attributes.accomplished; //从leancloud取数组赋值后存储，睡觉对应第3个
        complete[3] = true;
        currentUser.set("accomplished",complete);
      }
      if(sleepDuration>10800&&sleepDuration<57600){
        sleepTime.set('sleepDuration',sleepDuration/60)
        sleepTime.set('parent',currentUser)
        sleepTime.set('sleepStart',this.data.timeStart)
        sleepTime.set('sleepEnd',timeEnd)
        sleepTime.save()
      }
      else{
        wx.showToast({
          title: '睡眠时间过短或过长\n系统将不予记录哦~',
          duration: 2000,
          icon: 'none',
        })
      }
      currentUser.set("isSleeping",'')
      currentUser.save();
    }
    else{
      wx.showToast({
        title: '未到起床时间！',
        icon: 'error',
      })
    }
  },

  tapDialogButton1(e){
    this.setData({
      dialogShow1: false,
    })
    wx.redirectTo({
      url: '../index/index',
    })
  },
  
  tapDialogButton2(e){
    var currentUser=AV.User.current()
    this.setData({
      dialogShow2: false,
    })
    if(e.detail.index==0){
      wx.redirectTo({
        url: '../index/index',
      })
    }
    else{
      this.setData({
        timeStart:util.formatTime(new Date())
      })
      currentUser.set("isSleeping",this.data.timeStart)
      currentUser.save();
    }
  },

  loadImage() {
    //加载缩略图
    this.setData({
        slimeAction: slimeActionThumbnail
    })
    //同时对原图进行预加载，加载成功后再替换
    this.imgLoader.load(slimeActionOriginal, (err, data) => {
        console.log('图片加载完成', err, data.src)
        if (!err)
            this.setData({ slimeAction: data.src })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log((util.formatTime(new Date())).slice(11,13)+(util.formatTime(new Date())).slice(14,16))
    //初始化图片预加载组件
    this.imgLoader = new ImgLoader(this)
    this.loadImage()
    this.setData({
      timeCanAwake:String(timeAwakeFrom).slice(0,1)+":"+String(timeAwakeFrom).slice(1)
    })
    const currentUser = AV.User.current()
    var myDate = new Date()
    var myHour = myDate.getHours()
    var myMinute = myDate.getMinutes()
    var myTime = myHour*100+myMinute
    console.log(myTime)
    if(!currentUser.attributes.isSleeping){  //如果不在睡觉
      if (myTime<timeSleepFrom||myTime>timeSleepTo){  //如果入睡时间不对
        this.setData({          //进入判断
          dialogShow1: true
        })
      }
      else{
        this.setData({
          dialogShow2: true
        })
      }
    }
    else{
      this.setData({
        timeStart:currentUser.attributes.isSleeping
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