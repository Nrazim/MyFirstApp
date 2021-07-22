const AV = require('./libs/av-core-min');
const adapters = require('./libs/leancloud-adapters-weapp.js');

AV.setAdapters(adapters);
AV.init({
  appId: 'YdI2zlaRbIk0oCCBnGtw9nQV-9Nh9j0Va',
  appKey: 'D6dpxvOO6g2I0xl1pkpDO1lg',
  // 请将 xxx.example.com 替换为你的应用绑定的自定义 API 域名
  serverURLs: "https://ydi2zlar.lc-cn-e1-shared.com",
});
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  homeclick: function (e) {
    console.log(e.currentTarget.dataset.id)
    const jumpto = e.currentTarget.dataset.id
    if(jumpto=="../reminder/takemedicine/takemedicine"||jumpto=="setting/setting"||
    jumpto=="../personal_infos/basic_infos/basic_infos"||jumpto=="../reminder/reminder"){
      wx.navigateTo({
        url: '../' + jumpto,
      })
    }
    else{wx.redirectTo({
        url: '../' + jumpto,
      })
    }
  },

  exp:function(present){
    if(present=="eat"){
      this.globalData.exp = this.globalData.exp+20,
      AV.User.current().set("exp",this.globalData.exp);
      console.log(this.globalData.exp);
      AV.User.current().save();
    }
    else if(present="sleep"){
      this.globalData.exp = this.globalData.exp+20,
      AV.User.current().set("exp",this.globalData.exp);
      AV.User.current().save();
    }
    else if(present=="present"){
      this.globalData.exp = this.globalData.exp+20,
      AV.User.current().set("exp",this.globalData.exp);
      AV.User.current().save();
    }
    else if(present=="medicine"){
      this.globalData.exp = this.globalData.exp+20,
      AV.User.current().set("exp",this.globalData.exp);
      AV.User.current().save();
    }
  },
  fix:function(num, length) {
    return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
  },//格式化数字使其显示指定位数
  get_ymd8:function(myDate){
    var year = `${myDate.getFullYear()}`
    var month = this.fix(myDate.getMonth(),2)
    var date = this.fix(myDate.getDate(),2)
    return (year + month + date)
  },//显示8位日期 格式：20210721
  deepClone:function(obj){
    var obj0 = JSON.stringify(obj),
    objClone = JSON.parse(obj0);
    return objClone;
  },//深拷贝，可以用于创建新数组
  
  globalData: {
    lastLogin: '',
    TakeMedicineBefore: false,
    userInfo: null,
    SignedIn: false,
    rgb: 'rgb(255,244,2)',
    level:1,
    exp:0,
    practicefinish:false,
    medicinefinish:false,
    eatfinish:false,
    sleepfinish:false,
    medicine:true,
    dayonscheduel:0,
    levelexplist:[0,100,125,150,175,200,225,250,275,300,325,350,375,400,425,450,475,500,525,550,575,600]
  }
})