const app = getApp()
const AV = require('../../../libs/av-core-min.js'); 

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
    wx.redirectTo({
      url: '../register/register',
    })
  },
  
  login() {
    const {
      username,
      password,
    } = this.data;
    AV.User.logIn(username, password).then(function (loginedUser) {
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
