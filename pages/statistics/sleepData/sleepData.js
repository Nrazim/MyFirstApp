// pages/statistics/sleepData/sleepData.js
var Chart = require('../../../script/Chart.umd.min.js');
const AV = require('../../../libs/av-core-min');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    awakeTimes: [],
    sleepDurations: [],
    week: ["周日","周一","周二","周三","周四","周五","周六"],
    sleepWeekly: [null,null,null,null,null,null,null],
    month: [],
    sleepMonthly: [],
    thisMonth:"",
    cnt_w: 0,
    avg_w: 0,
    cnt_w: 0,
    avg_w: 0,
    lastSleep:'',
    lastAwake:'',
    lastDuration:'',
    lastDate:''
  },
  touchHandler1(e){
    this.chart1.instance.touchHandler(e);
  },
  touchHandler2(e){
    this.chart2.instance.touchHandler(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myDate = new Date()
    this.setData({
      thisMonth:`${myDate.getFullYear()}年${myDate.getMonth()+1}月`
    })
    for(let i=1; i<=app.getMonthDays(myDate.getFullYear(),myDate.getMonth()+1); i++){
      this.data.month.push(i)
      this.data.sleepMonthly.push(null)
    }
    var thisMonthFirst = parseInt(app.get_ymd8(myDate))-myDate.getDate()+101
    var thisSunday = parseInt(app.getSunday())+100
    this.data.week[myDate.getDay()]+="(今天)"
    const currentUser = AV.User.current()
    const query = new AV.Query('SleepTime')
    query.equalTo('parent',currentUser)
    query.descending('sleepEnd')
    query.limit(31)
    var cnt_w = 0
    var sum_w = 0
    var cnt_m = 0
    var sum_m = 0
    query.find().then((sleepTimes) => {
      sleepTimes.forEach((sleepTime) => {
        if(!this.data.lastAwake){
          console.log()
          this.setData({
            lastAwake: sleepTime.get('sleepEnd').slice(11,16),
            lastDate: sleepTime.get('sleepEnd').slice(0,10).replace("/","年").replace("/","月")+'日',
            lastSleep: sleepTime.get('sleepStart').slice(11,16),
            lastDuration: ((sleepTime.get('sleepDuration'))/60).toFixed(1),
          })
        }
        var sleepEnd8 = parseInt((sleepTime.get('sleepEnd')).slice(0,10).replace("/","").replace("/",""))
        var thatDay = sleepEnd8-thisSunday
        var thatDate = sleepEnd8-thisMonthFirst
        if(thatDay>=0){
          this.data.sleepWeekly[thatDay]=((sleepTime.get('sleepDuration'))/60).toFixed(1)
          cnt_w+=1
          sum_w+=((sleepTime.get('sleepDuration'))/60)
        }
        if(thatDate>=0){
          this.data.sleepMonthly[thatDate]=((sleepTime.get('sleepDuration'))/60).toFixed(1)
          cnt_m+=1
          sum_m+=((sleepTime.get('sleepDuration'))/60)
        }
        //this.data.awakeTimes.unshift((sleepTime.get('sleepEnd')).slice(0,10));
        //this.data.sleepDurations.unshift(((sleepTime.get('sleepDuration'))/60).toFixed(1))
      })
      this.setData({
        cnt_w:cnt_w,
        avg_w:(sum_w/cnt_w).toFixed(1),
        cnt_m:cnt_m,
        avg_m:(sum_m/cnt_m).toFixed(1)
      })
      //this.chart.config = createConfig(this.data.awakeTimes,this.data.sleepDurations)
      this.chart1 = {}
      this.chart1.config = createConfig(this.data.week,this.data.sleepWeekly)
      this.chart1.instance = new Chart('sleepWeek', this.chart1.config)
      this.chart2 = {}
      this.chart2.config = createConfig(this.data.month,this.data.sleepMonthly)
      this.chart2.instance = new Chart('sleepMonth', this.chart2.config)
    })
    function createConfig(Times,lineDatas) {
      console.log(Times,lineDatas)
      return {
          type: 'bar',
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
                        labelString: ''
                    }
                }],
                yAxes: [{
                    ticks:{
                      suggestedMin:0,
                      suggestedMax:12,
                    },
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
})