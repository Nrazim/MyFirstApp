// pages/home/medicine/medicine.js
const app=getApp();
const AV = require('../../../libs/av-core-min.js');
//引入图片预加载组件
const ImgLoader = require('../../../components/img-loader/img-loader.js')
//原图
const slimeActionOriginal = "https://www.z4a.net/images/2021/07/19/medicine1.gif"
//缩略图 
const slimeActionThumbnail = "https://www.z4a.net/images/2021/07/19/medicine1.md.gif"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist1:[
      { url: '../../images/buttons/medicine.png', id:"index/index"},
    ],
    slimeAction: '',
    buttons:[{text: '点错啦'}]
  },
  click: function (e) {
    if(app.globalData.TakeMedicineBefore == false){
      app.homeclick(e);
    }
    else{/* 饭前吃药跳转进入 */
      console.log(e.currentTarget.dataset.id)
      const jumpto = e.currentTarget.dataset.id
      app.globalData.TakeMedicineBefore = false
      if(jumpto=="../reminder/takemedicine/takemedicine"){
        wx.navigateTo({
          url: '../' + jumpto,
        })
      }
      else if(jumpto=="index/index"){/* 需要将回到首页改为回到吃饭 */
        wx.navigateBack({})
        wx.navigateTo({
          url: '../eat/selectFood/selectFood',
        })
      }
      else{
        wx.redirectTo({
          url: '../' + jumpto,
        })
      }
    }
  },

  tapDialogButton:function(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  loadImage() {
    //加载缩略图
    this.setData({
        slimeAction: slimeActionThumbnail
    })
    //同时对原图进行预加载，加载成功后再替换
    this.imgLoader.load(slimeActionOriginal, (err, data) => {
        console.log('图片加载完成', err, data.src)
        if (!err)
            this.setData({ slimeAction: data.src })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化图片预加载组件
    this.imgLoader = new ImgLoader(this)
    this.loadImage()
    
    this.setData({
      medicine:app.globalData.medicine
    })
    console.log(app.globalData.medicine)
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
    wx.hideHomeButton();
    this.setData({
      medicine:app.globalData.medicine
    })
    console.log(app.globalData.medicine)
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