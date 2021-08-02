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
  },//显示8位日期 格式：20210701，月份从0开始
  deepClone:function(obj){
    var obj0 = JSON.stringify(obj),
    objClone = JSON.parse(obj0);
    return objClone;
  },//深拷贝，可以用于创建新数组
  getSunday:function(){
    var nowDay = (new Date()).getDay()
    var thisSunday = new Date()
    thisSunday.setTime((new Date()).getTime()-24*60*60*1000*(nowDay));
    thisSunday = this.get_ymd8(thisSunday)
    return thisSunday
  },//用于获得本周一的日期，月份从0开始
  getMonthDays:function(year,month){
    var thisDate = new Date(year,month,0); //当天数为0 js自动处理为上一月的最后一天
    return thisDate.getDate();
  },//用于获得本月的天数
  colorRGB2Hex:function(color) {//rgb转16进制
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
  },
  colorHex2RGB:function(color) {//16进制转rgb
    var hex = (color.charAt(0)=="#") ? color.substring(1,7):color
    var r = parseInt(hex.substring(0,2),16)
    var g = parseInt(hex.substring(2,4),16)
    var b = parseInt(hex.substring(4,6),16)
    var rgb = "rgb(" + r + ',' + g + ',' + b + ")"
    return rgb
  },
  isLight: function (color) {//判断明度是否大于0.5
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);
    return (
      0.213 * r +
      0.715 * g +
      0.072 * b >
      255 / 2
    )
  },
  setNavBar:function(){
    wx.setNavigationBarColor({
      frontColor: this.globalData.NavigationBarSettings.front,
      backgroundColor: this.globalData.NavigationBarSettings.background,
    })
  },
  globalData: {
    mainCharacter: 0,//0史莱姆，1猫
    isSleeping: false,
    lastLogin: '',
    CalorieGet:0,
    meals: 0,
    TakeMedicineBefore: false,
    SignedIn: false,
    rgb: 'rgb(238,238,238)',
    level:1,
    exp:0,
    practicefinish:false,
    medicinefinish:false,
    eatfinish:false,
    sleepfinish:false,
    medicine:true,
    dayonscheduel:0,
    NavigationBarSettings:{
      front:"#000000",
      background: "#eeeeee",
    },
    levelexplist:[0,100,125,150,175,200,225,250,275,300,325,350,375,400,425,450,475,500,525,550,575,600],
    medalAcquire:[0,0,0,0,0,0]//0-4：保持天数；5-9:；
  }
})
