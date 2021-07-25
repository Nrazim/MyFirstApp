const app = getApp()
const AV = require('../../../../libs/av-core-min.js'); 
var Chart = require('../../../../script/Chart.umd.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cnt:0,
    avg:0,
    min:400,
    max:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentUser=AV.User.current()
    var myDate=new Date()
    var w_monthly=app.deepClone(currentUser.attributes.w_monthly)
    var myYear=myDate.getFullYear()
    var sum=0
    var cnt=0
    console.log(myYear)
    console.log(w_monthly)
    for(let i=0;i<w_monthly.length;i++){
      if(w_monthly[i][0].slice(0,4)==String(myYear)){
        console.log(String(i)+" ok")
        var temp=w_monthly[i][1]
        temp=temp/w_monthly[i][2]
        cnt+=1
        sum+=temp
        if (this.data.min>temp){
          this.setData({
            min:temp
          })
        }
        if (this.data.max<temp){
          this.setData({
            max:temp
          })
        }
      }
    }
    this.setData({
      cnt:cnt
    })
    if(cnt){
      this.setData({
        avg:sum*1.0/cnt
      })
    }
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

  },
})