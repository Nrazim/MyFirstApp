// pages/login/basic_setting.js
const app = getApp()
const AV = require('../../../libs/av-core-min.js'); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
      date: '2000-1-1',
      index:0,
      a_gender: ['未选择', '男', '女'],
      a_height: [],
      i_height: [120,0],
      a_weight: [],
      i_weight: [20,0],
      gender:0,
      height:'170.0',
      weight:'50.0',
      height_record:[],
  },
  bindGenderChange: function(e){
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function(e){
    this.setData({
      date: e.detail.value
    })
  },
  bindHeightChange(e) {
    this.setData({
      i_height: e.detail.value
    })
    this.setData({
      height: String(e.detail.value[0]+50)+'.'+String(e.detail.value[1])
    })
  },
  bindWeightChange(e) {
    this.setData({
      i_weight: e.detail.value
    })
    this.setData({
      weight: String(e.detail.value[0]+30)+'.'+String(e.detail.value[1])
    })
  },
  confirm(){
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration :2000
    })
    var myDate = new Date()
    var ymd = app.get_ymd8(myDate).slice(2)
    var ym6 = app.get_ymd8(myDate).slice(0,6)
    console.log(ym6)
    var h_temp = []
    h_temp.push(ym6)
    h_temp.push(this.data.height)
    console.log(h_temp)
    var h_monthly=[]
    h_monthly.push(h_temp)
    console.log(h_monthly)
    var completeDate = [];
    completeDate.push(0);
    completeDate.push(0);
    completeDate.push(0);
    if(this.data.index==0){
      wx.showToast({
        title: '请选择性别',
        icon: 'none',
      });
    }
    else{
      try{
        var currentUser=AV.User.current();
              
                /*var temp = h_monthly.pop()
                h_monthly.push(["202001","179.6"])
                h_monthly.push(["202006","178.0"])
                h_monthly.push(["202007","180.0"])
                h_monthly.push(["202009","179.6"])
                h_monthly.push(["202010","179.6"])
                h_monthly.push(["202012","179.6"])
                h_monthly.push(["202100","179.6"])
                h_monthly.push(["202101","179.6"])
                h_monthly.push(["202102","179.6"])
                h_monthly.push(["202103","179.6"])
                h_monthly.push(["202104","179.6"])
                h_monthly.push(["202105","179.6"])*/

                //用于测试月份变化导致新增记录的情况
              
        currentUser.set("birthday",this.data.date);
        currentUser.set("height",this.data.height);
        currentUser.set("weight",this.data.weight);
        currentUser.set("accomplished",[false,false,false,false]); //设置数组存储任务完成情况：锻炼、吃药、吃饭、睡觉
        currentUser.set("lastLogin",myDate.toLocaleDateString());
        currentUser.set("exp",0);
        currentUser.set("level",1);
        currentUser.set("dayonscheduel",0);
        currentUser.set("completeDate",completeDate);
        currentUser.set("height_record_monthly",[]);
        currentUser.set("meals",[false,false,false]);
        if(this.data.index==1){
          currentUser.set("gender",'男');
        }
        else{
          currentUser.set("gender",'女');
        }
        currentUser.save();
      }catch(error){
        wx.showToast({
          title:error.message,
          icon:'none',
        })
      }
      wx.redirectTo({
        url: '../../home/index/index',
      });
      wx.showToast({
        title: '更新成功',
        icon: 'success',
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _this = this;
    let heightStart = [],
      heightEnd = [],
      heightarray = [];
    for (let i = 50; i < 220; i++) {
      heightStart.push(`${i}`)
    }
    for (let i = 0; i < 10; i++) {
      heightEnd.push(`${i}`)
    }
    heightarray.push(heightStart);
    heightarray.push(heightEnd);
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
      a_height: heightarray,
      a_weight: weightarray
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