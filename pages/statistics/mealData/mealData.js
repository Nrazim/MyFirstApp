// pages/statistics/mealData/mealData.js
const app=getApp()
var Chart = require('../../../script/Chart.umd.min.js');
const AV = require('../../../libs/av-core-min');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTimes: [],
    eatDurations: [[],[],[]],//早饭、午饭、晚饭
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
    query.descending('date')
    query.limit(12)
    query.find().then((eatTimes) => {
      console.log(eatTimes)
      eatTimes.forEach((eatTime) => {
        this.data.startTimes.unshift(eatTime.get('date'));
        var mealsData = eatTime.get('mealsData')
        for(var j = 0; j<3 ;j++){
          console.log(Object.keys(mealsData[j]))
          if(Object.keys(mealsData[j]).length==0){//如果为空
            this.data.eatDurations[j].unshift(null);//添加一个空点
          }
          else{//不为空，则添加一个持续时间数据点，单位为秒
            this.data.eatDurations[j].unshift(mealsData[j].eatDuration/1000);
          }
        }
      })
      this.chart = {}
      this.chart.config = createConfig(this.data.startTimes,this.data.eatDurations,'用餐时长（秒）','用餐时长')
      this.chart.instance = new Chart('eatData', this.chart.config)
    })
    function createConfig(startTimes,lineDatas,yAxisNm,lineNm) {
      console.log(startTimes,lineDatas)
      return {
          type: 'line',
          data: {
            labels: startTimes,
            datasets: [{
                  label: '早餐' + lineNm,
                  backgroundColor: 'rgba(255,0,0,0.5)',
                  borderColor: 'rgba(255,0,0,0.3)',
                  data: lineDatas[0],
                  fill: false,
              },{
                  label: '午餐' + lineNm,
                  backgroundColor: 'rgba(0,255,0,0.5)',
                  borderColor: 'rgba(0,255,0,0.3)',
                  data: lineDatas[1],
                  fill: false,
              },{
                  label: '晚餐' + lineNm,
                  backgroundColor: 'rgba(0,0,255,0.5)',
                  borderColor: 'rgba(0,0,255,0.3)',
                  data: lineDatas[2],
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
                          labelString: '就餐时间点'
                      }
                  }],
                  yAxes: [{
                      display: true,
                      scaleLabel: {
                          display: true,
                          labelString: yAxisNm
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