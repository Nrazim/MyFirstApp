// index.js
const AV = require('../../../libs/av-core-min');
// 获取应用实例
const app=getApp()
Page({
  data: {
    imglist1:[
      { url: '../../images/buttons/eat.png', id:"eat/eat"},
      { url: '../../images/buttons/medicine.png', id:"medicine/medicine"},
      { url: '../../images/buttons/infos.png', id:"../personal_infos/basic_infos/basic_infos"},
      { url: '../../images/buttons/practice.png', id:"practice/select/select"},
      { url: '../../images/buttons/sleep.png', id:"sleep/sleep"},
    ],
    imglist2:[
      { url: '../../images/buttons/setting.png', id:"setting/setting"},
      { url: '../../images/buttons/reminder.png', id:"../reminder/reminder"},
    ],
    exp: app.globalData.exp,
    slimeaction:"https://www.z4a.net/images/2021/07/19/relax1.gif",
  },
  
  gotoPage_task:function(){
    wx.navigateTo({
      url:'/pages/home/task/task'
    })
  },
  gotoPage_statistics:function(){
    wx.navigateTo({
      url:'/pages/statistics/statistics'
    })
  },
  gotoPage_person:function(){
    wx.navigateTo({
      url:'/pages/home/person/person'
    })
  },
  click: function (e) {
    app.homeclick(e)
  },
  // 事件处理函数
  onLoad() {
    if(app.globalData.SignedIn==false){
      wx.redirectTo({
        url: '../../login/login/login',
      })
    }
  },
  onShow(){
    if(app.globalData.SignedIn==false){
      wx.redirectTo({
        url: '../../login/login/login',
      })
    }
    const currentUser = AV.User.current();

    //判断有无生病
    var sick1 = currentUser.get('medicineBefore')?currentUser.get('medicineBefore'):[];
    var sick2 = currentUser.get('medicineAfter')?currentUser.get('medicineAfter'):[];
    if(sick1.length>0||sick2.length>0){
      app.globalData.medicine=true
    }
    else{
      app.globalData.medicine=false
    }
    //当前时间读取，用来判断是否连续完成每日打卡任务
    var myDate = new Date();
    var completeDate = [];
    completeDate.push(myDate.getFullYear());
    completeDate.push(myDate.getMonth()+1);
    completeDate.push(myDate.getDate());

    //判定每日任务是否连续完成，第一个是不用吃药，第二个是要吃药
    var lastDate = currentUser.get('completeDate');
    if(app.globalData.eatfinish&&app.globalData.practicefinish&&app.globalData.sleepfinish&&!app.globalData.medicine){
      if(lastDate[0]==completeDate[0]&&lastDate[1]==completeDate[1]-1&&lastDate[2]==completeDate[2]){
      app.globalData.dayonscheduel=currentUser.get(dayonscheduel);
      app.globalData.dayonscheduel=app.globalData.dayonscheduel+1;
      }
      else{
        app.globalData.dayonscheduel=1;
      }
      currentUser.set("completeDate",completeDate);
      currentUser.set("dayonscheduel",app.globalData.dayonscheduel)
    }
    if(app.globalData.eatfinish&&app.globalData.practicefinish&&app.globalData.sleepfinish&&app.globalData.medicine&&app.globalData.medicinefinish){
      if(lastDate[0]==completeDate[0]&&lastDate[1]==completeDate[1]-1&&lastDate[2]==completeDate[2]){
      app.globalData.dayonscheduel=currentUser.get(dayonscheduel);
      app.globalData.dayonscheduel=app.globalData.dayonscheduel+1;
      console.log(app.globalData.dayonscheduel);
      }
      else{
        app.globalData.dayonscheduel=1
      }
      currentUser.set("completeDate",completeDate);
      currentUser.set("dayonscheduel",app.globalData.dayonscheduel)
    }
    
    //根据设定调整等级和经验值
    app.globalData.exp = currentUser.get('exp')
    app.globalData.level=currentUser.get('level')
    if(app.globalData.exp>=app.globalData.levelexplist[app.globalData.level]){
      app.globalData.exp=app.globalData.exp-app.globalData.levelexplist[app.globalData.level];
      app.globalData.level=app.globalData.level+1;
    }

    currentUser.set("exp",app.globalData.exp);
    currentUser.set("level",app.globalData.level);
    AV.User.current().save();

    //显示经验和等级
    this.setData({
      level:app.globalData.level,
      exp: Math.round(app.globalData.exp/app.globalData.levelexplist[app.globalData.level]*100),
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
})
