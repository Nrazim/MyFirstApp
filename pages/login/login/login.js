const app = getApp()
const AV = require('../../../libs/av-core-min'); 

Page({
  data: {
    username: '',
    password: '',
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

  register() {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  

  login() {
    const {
      username,
      password,
    } = this.data;
    AV.User.logIn(username, password).then(function (loginedUser) {
      app.globalData.SignedIn = true
      if (!loginedUser.attributes.gender){
        wx.redirectTo({
          url: '../basic_setting/basic_setting',
        });
      }
      else{
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
