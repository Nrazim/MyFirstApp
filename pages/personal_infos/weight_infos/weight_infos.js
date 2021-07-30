const app = getApp()
const AV = require('../../../libs/av-core-min.js'); 
//var Chart = require('../../../script/Chart.umd.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uweight:'',
    a_weight: [],
    i_weight: [30,0],
    text0:'',
 },
  bindWeightChange(e) {
    this.setData({
      i_weight: e.detail.value
    })
    this.setData({
      uweight: String(e.detail.value[0]+30)+'.'+String(e.detail.value[1])
    })
  },

  confirm(){
    try{
      var currentUser=AV.User.current()
      var myDate = new Date();
      var w_monthly = app.deepClone(currentUser.attributes.w_monthly);
      var w_daily = app.deepClone(currentUser.attributes.w_daily);
      console.log(w_monthly)
      console.log(w_daily)
      var recentMonthRecord = w_monthly.pop();
      var recentDayRecord = w_daily.pop();
      var currentMonth = app.get_ymd8(myDate).slice(0,6)
      var currentDay = app.get_ymd8(myDate).slice(2)
      if(currentMonth!=recentMonthRecord[0]){   
      //不在同一个月，清空w_daily数组，并新增一条w_monthly记录和一条w_daily记录
        w_daily.length = 0    //清空数组
        var newDayRecord=[]
        var newMonthRecord=[]
        console.log(w_daily)
        newDayRecord.push(currentDay)
        newDayRecord.push(this.data.uweight)
        newMonthRecord.push(currentMonth)
        newMonthRecord.push(parseInt(this.data.uweight))
        newMonthRecord.push(1)
        w_daily.push(newDayRecord)
        w_monthly.push(recentMonthRecord)   //重新push推出的月记录
        w_monthly.push(newMonthRecord)
        if(w_monthly.length>12){            //最多储存12条记录
          w_monthly=w_monthly.slice(1)
        }
        console.log("不在同一月")
      }else{                                
      //在同一个月，继续判断处理w_daily，对recentMonthRecord做修改再回退
        if(currentDay==recentDayRecord[0]){
        //在同一天，更新w_daily，更新w_monthly
          recentMonthRecord[1]=recentMonthRecord[1]-parseInt(recentDayRecord[1])+parseInt(this.data.uweight)
          recentDayRecord[1]=this.data.uweight
          w_daily.push(recentDayRecord)
          console.log("在同一天")
        }
        else{
        //不在同一天，新增一条w_daily数据，更新w_monthly
          recentMonthRecord[1]=recentMonthRecord[1]+parseInt(this.data.uweight)
          recentMonthRecord[2]+=1
          w_daily.push(recentDayRecord) //回退原有记录
          var newRecord = []
          newRecord.push(currentDay)
          newRecord.push(this.data.uweight)
          w_daily.push(newRecord)
          if(w_daily.length>31){            //最多储存31条记录
            w_daily=w_daily.slice(1)
          }
        }
        w_monthly.push(recentMonthRecord)
      }
      currentUser.set("w_monthly",w_monthly)
      currentUser.set("w_daily",w_daily)
      currentUser.set("weight",this.data.uweight);
      currentUser.save();
    }catch(error){
      wx.showToast({
        title:error.message,
        icon:'none',
      })
    }
    wx.showToast({
      title: '更新成功',
      icon: 'success',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    let weightStart = [],
    weightEnd = [],
    weightarray = [];
    for (let i = 30; i < 200; i++) {
      weightStart.push(`${i}`)
    }
    for (let i = 0; i < 10; i++) {
      weightEnd.push(`${i}`)
    }
    weightarray.push(weightStart);
    weightarray.push(weightEnd);
    _this.setData({
      a_weight: weightarray,
    })
    /*this.chart = {};
    this.chart.config = this.createConfig(this.data.textA1,this.data.textA2);
    this.chart.instance = new Chart('canvas', this.chart.config)*/
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
    try{
      let indexarray=[];
      var user=AV.User.current();
      var myDate = new Date();
      var weight = user.attributes.weight;
      console.log(myDate.getYear());
      console.log(myDate.getMonth());
      indexarray.push(parseInt(weight-30)),
      indexarray.push(Math.round((weight-Math.round(weight))*10))
      this.setData({
        uweight:weight,
        i_weight:indexarray,
      })
    }catch(error){
      wx.showToast({
        title:'加载个人信息失败',
        icon:'none',
      })
    }
  },
  /*createConfig:function(array1,array2) {
    return {
        type: 'line',
        data: {
            labels: array1,
            datasets: [{
                label: '用餐时长',
                backgroundColor: 'rgba(255,0,0,0.5)',
                borderColor: 'rgba(255,0,0,0.3)',
                data: array2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: '就餐时间点'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: '用餐时长（秒）'
                    }
                }]
            }
        }
    }
  },*/
  

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})