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
        app.globalData.NavigationBarSettings = loginedUser.get("NavigationBarSettings")?
          loginedUser.get("NavigationBarSettings"):app.globalData.NavigationBarSettings
        app.globalData.mainCharacter = loginedUser.get("mainCharacter")?loginedUser.get("mainCharacter"):0
        app.globalData.rgb = app.colorHex2RGB(app.globalData.NavigationBarSettings.background)
        app.globalData.lastLogin = loginedUser.attributes.lastLogin
        console.log(loginedUser.attributes.lastLogin)
        console.log(fullDate)
        var yesterday= new Date()
        yesterday.setTime( yesterday.getTime()-24*60*60*1000);
        var y_date = yesterday.toLocaleDateString();
        console.log(y_date)
        if(loginedUser.attributes.lastLogin!=fullDate){
          var complete = loginedUser.get("accomplished")?loginedUser.get("accomplished"):[0,0,0];
          var continueDays = loginedUser.get("continueDays")?loginedUser.get("continueDays"):[0,0,0];
          let judge = (y_date == loginedUser.attributes.lastLogin)   
          //若不在一天登录，判断是否昨天登录过，若昨天登录过，judge=true
          if(complete[0]&&judge){
            continueDays[0]+=1
          }else{
            continueDays[0]=0
          }
          if(complete[2]&&judge){
            continueDays[1]+=1
          }else{
            continueDays[1]=0
          }
          if(complete[3]&&judge){
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
    app.setNavBar()
    wx.hideHomeButton();
  }
  
})
