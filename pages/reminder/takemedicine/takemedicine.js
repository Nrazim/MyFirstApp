// pages/reminder/takemedicine/takemedicine.js
const app=getApp()
const AV = require('../../../libs/av-core-min');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: [
      {name: '早饭前', value: '0'},
      {name: '中饭前', value: '1'},
      {name: '晚饭前', value: '2'},
      {name: '早饭后', value: '3'},
      {name: '中饭后', value: '4'},
      {name: '晚饭后', value: '5'}
    ],
  },
  checkboxChange1: function (e) {
    console.log('checkbox1发生change事件，携带value值为：', e.detail.value);
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = 3; i < lenI; ++i) {
        checkboxItems[i].checked = false;

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
            if(checkboxItems[i].value == values[j]){
                checkboxItems[i].checked = true;
                break;
            }
        }
    }
    try{
      const currentUser = AV.User.current()
      console.log('用户medicineBefore的值原为', currentUser.get('medicineBefore'));
      currentUser.set('medicineBefore', values);
      currentUser.save();
      console.log('用户medicineBefore的值现在为', currentUser.get('medicineBefore'));
    } catch(error){
      console.error(error);
    }
    this.setData({
      checkboxItems: checkboxItems,
      [`formData.checkbox1`]: e.detail.value,
    });
  },
  checkboxChange2: function (e) {
    console.log('checkbox2发生change事件，携带value值为：', e.detail.value);
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 3, lenI = 6; i < lenI; ++i) {
        checkboxItems[i].checked = false;

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
            if(checkboxItems[i].value == values[j]){
                checkboxItems[i].checked = true;
                break;
            }
        }
    }
    this.setData({
      checkboxItems: checkboxItems,
      [`formData.checkbox2`]: e.detail.value
    });
    try{
      const currentUser = AV.User.current()
      console.log('用户medicineAfter的值原为', currentUser.get('medicineAfter'));
      currentUser.set('medicineAfter', values);
      currentUser.save();
      console.log('用户medicineAfter的值现在为', currentUser.get('medicineAfter'));
    } catch(error){
      console.error(error);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const currentUser = AV.User.current()
    var values = currentUser.get('medicineBefore')?currentUser.get('medicineBefore'):[]
    var checkboxItems = this.data.checkboxItems
    for (var i = 0, lenI = 3; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if(checkboxItems[i].value == values[j]){
              checkboxItems[i].checked = true;
              break;
          }
      }
    }
    values = currentUser.get('medicineAfter')?currentUser.get('medicineAfter'):[]
    for (var i = 3, lenI = 6; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if(checkboxItems[i].value == values[j]){
              checkboxItems[i].checked = true;
              break;
          }
      }
    }
    this.setData({
      checkboxItems: checkboxItems,
    });
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