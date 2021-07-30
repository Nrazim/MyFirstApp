const app = getApp()
const AV = require('../../../libs/av-core-min.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uheight:'',
    a_height: [],
    i_height: [120,0],
    h_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindHeightChange(e) {
    this.setData({
      i_height: e.detail.value
    })
    this.setData({
      uheight: String(e.detail.value[0]+50)+'.'+String(e.detail.value[1])
    })
  },
  onLoad: function (options) {
    let heightStart = [],
      heightEnd = [],
      heightarray = [];
    for (let i = 50; i < 260; i++) {
      heightStart.push(`${i}`)
    }
    for (let i = 0; i < 10; i++) {
      heightEnd.push(`${i}`)
    }
    heightarray.push(heightStart);
    heightarray.push(heightEnd);
    this.setData({
      a_height: heightarray,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var user=AV.User.current();
    let h_monthly = app.deepClone(user.attributes.h_monthly);
    for(let j = 0; j < h_monthly.length; j++) {
      h_monthly[j][0]=String(h_monthly[j][0]).slice(0,4)+"年"+String(parseInt(String(h_monthly[j][0]).slice(4))+1)+"月"
    }
    console.log(this.data.h_list)
    try{
      let indexarray=[];   
      let height = user.attributes.height;
      indexarray.push(parseInt(height-50))
      indexarray.push(Math.round((height-Math.round(height))*10))
      this.setData({
        uheight:height,
        i_height:indexarray,
        h_list:h_monthly,
      })
      console.log("hlist:"+this.data.h_list)
    }catch(error){
      wx.showToast({
        title:'加载个人信息失败',
        icon:'none',
      })
    }
  },
  confirm(){
    try{
      var currentUser=AV.User.current()
      var myDate = new Date();
      var h_monthly = currentUser.attributes.h_monthly;
      var recentRecord = h_monthly.pop();
      var currentMonth = app.get_ymd8(myDate).slice(0,6)
      if(currentMonth==recentRecord[0]){   //还在同一个月，改变身高记录
        recentRecord[1]=this.data.uheight
        h_monthly.push(recentRecord)
      }else{                                //不在同一月，插入新身高记录
        h_monthly.push(recentRecord)
        var newRecord = []
        newRecord.push(currentMonth)
        newRecord.push(this.data.uheight)
        h_monthly.push(newRecord)
        if(h_monthly.length>12){            //最多储存12条记录
          h_monthly=h_monthly.slice(1)
        }
      }
      currentUser.set("h_monthly",h_monthly)
      currentUser.set("height",this.data.uheight);
      currentUser.save();
    }catch(error){
      wx.showToast({
        title:error.message,
        icon:'none',
      })
    }
    wx.redirectTo({
      url: '../height_infos/height_infos',
    })
    wx.showToast({
      title: '更新成功',
      icon: 'success',
    });
  },
})