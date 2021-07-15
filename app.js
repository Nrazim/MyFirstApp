// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  homeclick: function (e) {
  console.log(e.currentTarget.dataset.id)
  const jumpto = e.currentTarget.dataset.id
  if(jumpto=="../reminder/takemedicine/takemedicine"){
    wx.navigateTo({
      url: '../' + jumpto,
    })
  }
  else{wx.redirectTo({
      url: '../' + jumpto,
    })
  }
},
  globalData: {
    userInfo: null,
  }
})