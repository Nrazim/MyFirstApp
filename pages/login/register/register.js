const app = getApp()
const AV = require('../../../libs/av-core-min.js'); 

Page({
  data: {
    username: '',
    password: '',
    password2: '',
    registerchoice:'',
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
  selectchoice_account(){
    this.setData({
      registerchoice:'0'
    })
  },
  selectchoice_password(){
    this.setData({
      registerchoice:'1'
    })
  },
  selectchoice_password2(){
    this.setData({
      registerchoice:'2'
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
  goBack(){
    wx.redirectTo({
      url: '../login/login',
    })
  },
  onShow: function () {
    app.setNavBar()
    wx.hideHomeButton();
  },
})