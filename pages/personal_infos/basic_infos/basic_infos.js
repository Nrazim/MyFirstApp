const app = getApp()
const AV = require('../../../libs/av-core-min.js'); 
Page({
    data:{
      uname:'',
      ubirth:'',
      ugender:'',
      uweight:0,
      uheight:0
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
    },
});