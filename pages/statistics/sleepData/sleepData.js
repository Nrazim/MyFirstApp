// pages/statistics/sleepData/sleepData.js
var Chart = require('../../../script/Chart.umd.min.js');
const AV = require('../../../libs/av-core-min');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    awakeTimes: [],
    sleepDurations: [],
  },
  touchHandler(e){
    this.chart.instance.touchHandler(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const currentUser = AV.User.current()
    const query = new AV.Query('SleepTime')
    query.equalTo('parent',currentUser)
    query.descending('sleepEnd')
    query.limit(7)
    query.find().then((sleepTimes) => {
      console.log(sleepTimes)
      sleepTimes.forEach((sleepTime) => {
        this.data.awakeTimes.unshift((sleepTime.get('sleepEnd')).slice(0,10));//日期
        this.data.sleepDurations.unshift(((sleepTime.get('sleepDuration'))/60).toFixed(1))
      })
      this.chart = {}
      this.chart.config = createConfig(this.data.awakeTimes,this.data.sleepDurations)
      this.chart.instance = new Chart('sleepData', this.chart.config)
    })
    function createConfig(Times,lineDatas) {
      console.log(Times,lineDatas)
      return {
          type: 'line',
          data: {
            labels: Times,
            datasets: [{
                  label: '夜间睡眠时间',
                  backgroundColor: 'rgba(255,0,0,0.5)',
                  borderColor: 'rgba(255,0,0,0.3)',
                  data: lineDatas,
                  fill: false,
              }
            ]
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
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: '睡眠时长/h'
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