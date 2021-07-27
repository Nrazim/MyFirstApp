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
    now_year:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  touchHandler(e){
    this.chart.instance.touchHandler(e);
  },
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
        avg:(sum*1.0/cnt).toFixed(2)
      })
    }
    this.setData({
      now_year: String((new Date()).getFullYear())
    })
    var dateData=[]
    var weightData=[]
    w_monthly.forEach((w_m) => {
      dateData.push(String(parseInt(w_m[0].slice(4))+1))//日期
      weightData.push((w_m[1]/w_m[2]).toFixed(2))
    })
    dateData=dateData.slice(dateData.length-cnt)
    weightData=weightData.slice(weightData.length-cnt)
    console.log(dateData)
    console.log(weightData)
    this.chart = {}
    this.chart.config = createConfig(dateData,weightData)
    this.chart.instance = new Chart('monthlyChange', this.chart.config)
    function createConfig(Times,lineDatas) {
      console.log(Times,lineDatas)
      return {
        type: 'line',
        data: {
          labels: Times,
          datasets: [{
            label: '体重变化走势',
            backgroundColor: 'rgba(255,0,0,0.5)',
            borderColor: 'rgba(255,0,0,0.3)',
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
                labelString: '月份'
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
                labelString: '平均体重/kg'
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
})