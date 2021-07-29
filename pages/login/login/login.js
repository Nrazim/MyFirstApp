const app = getApp()
const AV = require('../../../libs/av-core-min'); 

Page({
  data: {
    username: '',
    password: '',
    selectchoice:'',
  },
  
  inputUsername(e) {
    this.setData({
      username: e.detail.value,
    })
  },
  inputPassword(e) {
    this.setData({
      password: e.detail.value,
    })
  },

  selectchoice_account(){
    this.setData({
      selectchoice:'0'
    })
  },

  selectchoice_password(){
    this.setData({
      selectchoice:'1'
    })
  },
 

  register() {
    wx.redirectTo({
      url: '../register/register',
    })
  },
  
  login() {
    var myDate = new Date();
    var fullDate=myDate.toLocaleDateString();
    const {
      username,
      password,
    } = this.data;
    AV.User.logIn(username, password).then(function (loginedUser) {
      app.globalData.SignedIn = true;
      if (!loginedUser.attributes.gender){
        app.globalData.lastLogin = fullDate
        wx.redirectTo({
          url: '../basic_setting/basic_setting',
        });
      }
      else{
        app.globalData.lastLogin = loginedUser.attributes.lastLogin
        if(loginedUser.attributes.lastLogin!=fullDate){
          var complete = loginedUser.attributes.accomplished;
          var continueDays = loginedUser.attributes.continueDays;
          if(complete[0]){
            continueDays[0]+=1
          }else{
            continueDays[0]=0
          }
          if(complete[2]){
            continueDays[1]+=1
          }else{
            continueDays[1]=0
          }
          if(complete[3]){
            continueDays[2]+=1
          }else{
            continueDays[2]=0
          }
          loginedUser.set("continueDays",continueDays);
          loginedUser.set("lastLogin",fullDate);
          loginedUser.set("accomplished",[false,false,false,false]);
          loginedUser.set("meals",[false,false,false]);
          loginedUser.set("mealOnTime",true);
          loginedUser.save();
        }
        var complete = loginedUser.attributes.accomplished;
        app.globalData.practicefinish = complete[0];
        app.globalData.medicinefinish = complete[1];
        app.globalData.eatfinish = complete[2];
        app.globalData.sleepfinish = complete[3];
        wx.redirectTo({
          url: '../../home/index/index',
        });
      }
      wx.showToast({
        title: '登录成功',
        icon: 'success',
      })
    }, (error) => {
      wx.showToast({
        title: '账号或密码错误',
        icon: 'error'
      })
      alert(JSON.stringify(error));
    });
  },
  
  onShow: function(){
    wx.hideHomeButton();
  }
  
})
