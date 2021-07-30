const app = getApp()
const AV = require('../../../libs/av-core-min.js'); 
Page({
    data:{
      uname:'',
      ubirth:'',
      ugender:'',
      uweight:'',
      uheight:'',
      uBMI:0,
    },
    onLoad: function(){
    },
    onShow: function(){
      try{
        var user=AV.User.current();
        this.setData({
          uname:user.attributes.username,
          ugender:user.attributes.gender,
          ubirth:user.attributes.birthday,
          uweight:user.attributes.weight,
          uheight:user.attributes.height
        })
      }catch(error){
        showToast({
          title:'加载个人信息失败',
          icon:'none',
        })
      }
      var bmi=parseFloat(user.attributes.weight)/(parseFloat(user.attributes.height)/100)**2
      this.setData({
        uBMI:bmi.toFixed(1),
      })
      app.setNavBar()
    },
});