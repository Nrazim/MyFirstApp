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
    const {
      username,
      password,
    } = this.data;
    AV.User.logIn(username, password).then(function (loginedUser) {
      app.globalData.SignedIn = true
      wx.redirectTo({
        url: '../../home/index/index',
      });
      wx.showToast({
        title: '登录成功',
        icon: 'success',
      })
    }, function (error) {
      alert(JSON.stringify(error));
    });
  },
})
