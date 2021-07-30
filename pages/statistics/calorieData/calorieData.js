// pages/statistics/calorieData/calorieData.js
const app=getApp()
var Chart = require('../../../script/Chart.umd.min.js');
const AV = require('../../../libs/av-core-min');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTimes: [],
    calorie: [],
  },
  touchHandler(e){
    this.chart.instance.touchHandler(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const currentUser = AV.User.current()
    const query = new AV.Query('Calorie')
    query.equalTo('parent',currentUser)
    query.descending('date')
    query.limit(12)
    query.find().then((Calories) => {
      console.log(Calories)
      Calories.forEach((Calorie) => {
        this.data.startTimes.unshift(Calorie.get('date'));//日期
        this.data.calorie.unshift(Math.round(Calorie.get('calAll')))
      })
      this.chart = {}
      this.chart.config = createConfig(this.data.startTimes,this.data.calorie)
      this.chart.instance = new Chart('calData', this.chart.config)
    })
    function createConfig(startTimes,lineDatas) {
      console.log(startTimes,lineDatas)
      return {
          type: 'line',
          data: {
            labels: startTimes,
            datasets: [{
                  label: '净热量获取',
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
                          labelString: '净热量获取（千卡）'
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
    app.setNavBar()
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