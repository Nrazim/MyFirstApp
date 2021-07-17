const app = getApp()
const AV = require('../../../libs/av-core-min.js'); 

Page({
  data: {
    username: '',
    password: '',
    password2: '',
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
  inputPassword2(e) {
    this.setData({
      password2: e.detail.value,
    })
  },

  register() {
    if (this.data.password != this.data.password2) {
      wx.showToast({
        title: '两次密码不同',
        icon: 'none',
      })
    } else {
    const {
      username,
      password,
    } = this.data;
    const user = new AV.User();
    if (username) user.set({username});
    if (password) user.set({password});
    user.set("first",1);
    user.save().then(() => {
      wx.redirectTo({
        url: '../login/login',
      });
      wx.showToast({
        title: '注册成功',
        icon: 'success',
      });
    }).catch(error => {
      wx.showToast({
        title:error.message,
        icon:'none'
      })
    });
  }
},
})