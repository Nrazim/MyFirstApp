// pages/home/practice/practice.js
const app=getApp();
const AV = require('../../../libs/av-core-min.js');
//引入图片预加载组件
const ImgLoader = require('../../../components/img-loader/img-loader.js')
//原图
const slimeActionOriginal = "https://www.z4a.net/images/2021/07/20/run1.gif"
//缩略图 
const slimeActionThumbnail = "https://www.z4a.net/images/2021/07/20/run1.md.gif"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist1:[
      { url: '../../images/buttons/practice.png', id:"index/index"},
    ],
    slimeaction:"",
  },
  click: function (e) {
    var currentUser = AV.User.current();
    app.homeclick(e);
    if(!app.globalData.practicefinish){
    app.exp("practice");
    app.globalData.practicefinish = true
    }
    var complete = currentUser.attributes.accomplished; //从leancloud取数组赋值后存储，锻炼对应第0个
    complete[0] = true;
    currentUser.set("accomplished",complete);
    currentUser.save();
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