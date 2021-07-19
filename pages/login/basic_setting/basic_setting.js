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
  },
  bindGenderChange: function(e){
    console.log("user's gender is "+e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function(e){
    console.log("user's birthday is "+e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindHeightChange(e) {
    this.setData({
      i_height: e.detail.value
    })
    this.setData({
      height: String(e.detail.value[0]+100)+'.'+String(e.detail.value[1])
    })
    console.log(this.data.height)
  },
  bindWeightChange(e) {
    this.setData({
      i_weight: e.detail.value
    })
    this.setData({
      weight: String(e.detail.value[0]+30)+'.'+String(e.detail.value[1])
    })
    console.log(this.data.weight)
  },
  confirm(){
    if(this.data.index==0){
      wx.showToast({
        title: '请选择性别',
        icon: 'none',
      });
    }
    else{
      try{
        var currentUser=AV.User.current()
        console.log(currentUser.get('birthday'));
        currentUser.set("birthday",this.data.date);
        currentUser.set("height",this.data.height);
        currentUser.set("weight",this.data.weight);
        currentUser.set("exp",0);
        currentUser.set("level",1);
        if(this.data.index==1){
          currentUser.set("gender",'男');
        }
        else{
          currentUser.set("gender",'女');
        }
        currentUser.save();
      }catch(error){
        showToast({
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