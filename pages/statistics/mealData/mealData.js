// pages/statistics/mealData/mealData.js
var Chart = require('../../../script/Chart.umd.min.js');
const AV = require('../../../libs/av-core-min');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTimes: [],
    eatDurations: [],
  },
  touchHandler(e){
    this.chart.instance.touchHandler(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const currentUser = AV.User.current()
    const query = new AV.Query('EatTime')
    query.equalTo('parent',currentUser)
    query.descending('eattimeStart')
    query.limit(12)
    query.find().then((eatTimes) => {
      console.log(eatTimes)
      eatTimes.forEach((eatTime) => {
        this.data.startTimes.unshift(eatTime.get('eattimeStart'));
        this.data.eatDurations.unshift(eatTime.get('eatDuration')/1000);
      });
      console.log(this.data.startTimes,this.data.eatDurations)
      this.chart = {};
      this.chart.config = createConfig(this.data.startTimes,this.data.eatDurations);
      this.chart.instance = new Chart('canvas', this.chart.config)
    })
    function createConfig(startTimes,eatDurations) {
      console.log(startTimes,eatDurations)
      return {
          type: 'line',
          data: {
              labels: startTimes,
              datasets: [{
                  label: '用餐时长',
                  backgroundColor: 'rgba(255,0,0,0.5)',
                  borderColor: 'rgba(255,0,0,0.3)',
                  data: eatDurations,
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