const app = getApp()
const AV = require('../../../../libs/av-core-min.js'); 
var Chart = require('../../../../script/Chart.umd.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    t_month:'',
    l_month:'',
    cnt:0,
    avg:0,
    l_avg:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentUser=AV.User.current()
    var myDate=new Date()
    var tempArray=[]
    tempArray=app.deepClone(currentUser.attributes.w_monthly)
    console.log(tempArray.length)
    var temp0=tempArray.pop()
    if(temp0[0]==(app.get_ymd8(myDate)).slice(0,6)){
      this.setData({
        cnt:temp0[2],
        avg:(temp0[1]*1.0/temp0[2]).toFixed(1),
      })
      if(tempArray.length){
        var temp1=tempArray.pop()
        this.setData({
          l_month:temp1[0].slice(0,4)+"年"+String(parseInt(temp1[0].slice(4))+1)+"月",
          l_avg:(temp1[1]*1.0/temp1[2]).toFixed(1),
        })
      }
    }else{
      this.setData({
        l_month:temp0[0].slice(0,4)+"年"+String(parseInt(temp0[0].slice(4))+1)+"月",
        l_avg:(temp0[1]*1.0/temp0[2]).toFixed(1),
      })
    }
    this.setData({
      t_month:`${myDate.getFullYear()}年${myDate.getMonth()+1}月`
    })
    var w_daily=app.deepClone(currentUser.attributes.w_daily)
    var dateData=[]
    var weightData=[]
    w_daily.forEach((w_d) => {
      dateData.push(String(parseInt(w_d[0].slice(4))))//日期
      weightData.push(w_d[1])
    })
    console.log(dateData)
    console.log(weightData)
    this.chart = {}
    this.chart.config = createConfig(dateData,weightData)
    this.chart.instance = new Chart('dailyChange', this.chart.config)
    function createConfig(Times,lineDatas) {
      console.log(Times,lineDatas)
      return {
        type: 'line',
        data: {
          labels: Times,
          datasets: [{
            label: '本月体重变化走势',
            backgroundColor: 'rgba(0,0,255,0.5)',
            borderColor: 'rgba(255,0,255,0.2)',
            data: lineDatas,
            fill: true,
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
                labelString: '日期'
              },
            }],
            yAxes: [{
              ticks:{
                suggestedMin: 0,
                suggestedMax: 80,
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: '当日体重/kg'
              }
            }]
          }
        }
      }
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