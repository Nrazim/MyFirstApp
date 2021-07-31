// pages/home/eat/eat.js
const app=getApp()
const AV = require('../../../libs/av-core-min');
var util = require('../../../utils/util.js');
//引入图片预加载组件
const ImgLoader = require('../../../components/img-loader/img-loader.js')
//原图
const ActionOriginal = ["https://www.z4a.net/images/2021/07/20/meal1.gif",
                        "https://www.z4a.net/images/2021/07/30/nekoEat1.gif"]
//缩略图 
const ActionThumbnail = ["https://www.z4a.net/images/2021/07/20/meal1.md.gif",
                        "https://www.z4a.net/images/2021/07/30/nekoEat1.md.gif"]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist1:[
      { url: '../../images/buttons/eat.png', id:"index/index"},
    ],
    Action:'',
    dialogShow: false,
    dialogShow2: false,
    medicineBeforeDialogShow: false,
    takeMedicineAfter: false,
    timeStart: util.formatTime(new Date()),
    buttons: [
      {text: '点错啦'}, {text: '早饭'},
      {text: '中饭'}, {text: '晚饭'}
    ],
    medicineButton: [
      {text: '这就去吃'}
    ],
    button:[
      {text: '现在就去'}
    ],
    meals:0,//0早饭，1午饭，2晚饭
  },

  click: function (e) {
    console.log(e.currentTarget.dataset.id)
    const jumpto = e.currentTarget.dataset.id
    console.log(this.data.takeMedicineAfter)
    //计算持续时间并上传
    //变量计算
    console.log('开始时间：',this.data.timeStart)
    var timeEnd = util.formatTime(new Date())
    var stime = Date.parse(new Date(this.data.timeStart))
    var etime = Date.parse(new Date(timeEnd))
    var eatDuration = etime - stime
    //计算完毕
    var date = this.data.timeStart.slice(5,10)//日期MM/DD
    const currentUser = AV.User.current()
    const eatTimeQuery = new AV.Query('EatTime')
    eatTimeQuery.equalTo('parent',currentUser)
    eatTimeQuery.equalTo('date',date)
    eatTimeQuery.find().then((eatTimes)=>{
      console.log(eatTimes)
      if(eatTimes.length!=0){//如果有
        console.log('有')
        const eatTime = eatTimes[0]
        let mealsData = eatTime.get('mealsData')?eatTime.get('mealsData'):[]
        mealsData[this.data.meals] = {
          eattimeStart: this.data.timeStart,
          eatDuration: eatDuration
        }
        console.log('更新的mealsData',mealsData)
        eatTime.set('mealsData',mealsData)
        console.log('更新的eatTime',eatTime)
        eatTime.save()
      }
      else{
        console.log('没有')
        const eatTime = new AV.Object('EatTime')
        eatTime.set('parent',currentUser)
        eatTime.set('date',date)
        let mealsData = [{},{},{}]
        currentUser.save()
        console.log(this.data.meals)
        mealsData[this.data.meals] = {
          eattimeStart: this.data.timeStart,
          eatDuration: eatDuration
        }
        console.log('创建的mealsData',mealsData)
        eatTime.set('mealsData',mealsData)
        console.log('创建的eatTime',eatTime)
        eatTime.save()
      }
    })
    const CalorieQuery = new AV.Query('Calorie')
    CalorieQuery.equalTo('parent',currentUser)
    CalorieQuery.equalTo('date',date)
    CalorieQuery.find().then((Calories)=>{
      console.log(Calories)
      if(Calories.length!=0){//如果有，在原来的基础上添加热量
        console.log('有')
        const Calorie = Calories[0]
        let calGetAll = Calorie.get('calGetAll')?Calorie.get('calGetAll'):0
        calGetAll = calGetAll + app.globalData.CalorieGet
        console.log('更新的calGetAll',calGetAll)
        Calorie.set('calGetAll',calGetAll)
        let calAll = Calorie.get('calAll')?Calorie.get('calAll'):0
        calAll = calAll + app.globalData.CalorieGet
        console.log('更新的calAll',calAll)
        Calorie.set('calAll',calAll)
        console.log('更新的Calorie',Calorie)
        Calorie.save()
      }
      else{//如果没有，新建一个
        console.log('没有')
        const Calorie = new AV.Object('Calorie')
        Calorie.set('parent',currentUser)
        Calorie.set('date',date)
        Calorie.set('calGetAll',app.globalData.CalorieGet)
        Calorie.set('calAll',app.globalData.CalorieGet)
        console.log('创建的Calorie',Calorie)
        Calorie.save()
      }
      app.globalData.CalorieGet = 0
    })
    //判断有没有按时吃饭，先调取计算时间，换算为int形式
    var tempTime = parseInt(this.data.timeStart.slice(11,16).replace(":",""))
    tempTime = parseInt(tempTime/100)*60+tempTime%100
    var planTime = currentUser.attributes.planForMeals[this.data.meals]
    planTime = parseInt(planTime/100)*60+planTime%100
    console.log("temptime:",tempTime)
    console.log("plantime:",planTime)
    if(Math.abs(planTime-tempTime)<=300){
      console.log("congratulations!")
    }
    else{
      console.log("hahaha")
      currentUser.set("mealOnTime",false)//有一餐没有按时吃，就无法完成任务
      currentUser.save()
    }
    var meals=currentUser.attributes.meals
    console.log("meal on time? ",currentUser.attributes.mealOnTime)
    if(meals[0]&&meals[1]&&meals[2]&&currentUser.attributes.mealOnTime){
      app.exp("eat");
      app.globalData.eatfinish = true;
      console.log(app.globalData.eatfinish);
      var complete = currentUser.attributes.accomplished; //从leancloud取数组赋值后存储，吃饭对应第2个
      complete[2] = true;
      currentUser.set("accomplished",complete);
      currentUser.save();
    }
    //判断有没有药要饭后吃
    if(this.data.takeMedicineAfter){
      this.timeToMedicineAfter()
    }
    else{
      wx.redirectTo({
        url: '../' + jumpto,
      })
    }
  },

  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },
  timeToMedicineAfter: function(){
    console.log("medicineAfter")
    this.setData({
      takeMedicineAfter: false,
      medicineAfterDialogShow: true,
    })
  },
  timeToMedicineBefore: function(){
    console.log("medicineBefore");
    this.setData({
      medicineBeforeDialogShow: true,
    })
  },
  tapDialogButton2(e) {
    this.setData({
      dialogShow2:false
    })
    wx.redirectTo({
      url: '../../reminder/healthplan/healthplan',
    })
  },
  bindClose2(){
    wx.redirectTo({
      url: '../index/index',
    })
  },
  tapDialogButton(e) {
    app.globalData.TakeMedicineBefore = false;
    console.log(e.detail)
    if(e.detail.index==0){
      wx.redirectTo({
        url: '../index/index',
      })
      return
    }
    const currentUser = AV.User.current()
    //记录每餐吃饭情况（早饭：0；中饭：1；晚饭：2）
    var meals = currentUser.get('meals')
    var planForMeals = currentUser.get('planForMeals')
    console.log(planForMeals[e.detail.index-1])
    var planMinutes = parseInt(planForMeals[e.detail.index-1]/100)*60+planForMeals[e.detail.index-1]%100
    var nowMinutes = parseInt(this.data.timeStart.slice(11,13))*60+parseInt(this.data.timeStart.slice(14,16))
    var tempTime = Math.abs(planMinutes-nowMinutes)
    let tempArray = [['您未按时吃饭，今天的任务失败了~','none'],['按时吃饭成功！','success']]
    console.log(tempTime)
    var tempIndex = (tempTime<=300)?1:0
    for(var j = 0; j<3 ;j++){
      if(e.detail.index-1 == j){
        if(meals[j]){//如果已经吃过
          wx.showToast({
            title: '今天已经吃过',
            icon: 'error',
            duration: 1500,
            success:function(){
              setTimeout(function(){
                wx.redirectTo({
                  url: '../index/index',
                });
              },1200)
            }
          })
          return
        }
        app.globalData.meals = e.detail.index-1
        meals[j]=true
        this.setData({
          meals: e.detail.index-1,
          timeStart: util.formatTime(new Date())
        })
      }
      currentUser.set("meals",meals);
      currentUser.save();
    }
    var values = currentUser.get('medicineBefore')?currentUser.get('medicineBefore'):[]
    var medicineBeforeFinish = currentUser.get('medicineBeforeFinish')?currentUser.get('medicineBeforeFinish'):[]
    for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if(e.detail.index-1 == values[j]){//index从1到3，values从0到2是吃饭前
          app.globalData.TakeMedicineBefore = true/* 饭前吃药，以便吃完药可以回到吃饭 */
          medicineBeforeFinish[j] =j
          currentUser.set("medicineBeforeFinish",medicineBeforeFinish);
          currentUser.save();
          
          var that=this
          wx.showToast({
            title: tempArray[tempIndex][0],
            icon: tempArray[tempIndex][1],
            duration: 1500,
            success: function(){
              setTimeout(function(){
                that.timeToMedicineBefore();
              },1200)
            }
          })
          //this.timeToMedicineBefore();

          break;
        }
    }
    values = currentUser.get('medicineAfter')?currentUser.get('medicineAfter'):[]
    var medicineAfterFinish = currentUser.get('medicineAfterFinish')?currentUser.get('medicineAfterFinish'):[]
    for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
      if(e.detail.index+2 == values[j]){//index从1到3，values从3到5是吃饭后
        this.setData({
          takeMedicineAfter: true,
        })
        medicineAfterFinish[j] =j+3
        currentUser.set("medicineAfterFinish",medicineAfterFinish);
        currentUser.save();

        console.log('TakeMedicineAfter');
        break;
      }
    }
    this.setData({
        dialogShow: false,
    })
    if(!app.globalData.TakeMedicineBefore){


      wx.showToast({
        title: tempArray[tempIndex][0],
        icon: tempArray[tempIndex][1],
        duration: 1500,
        success: function(){
          setTimeout(function(){
            wx.navigateTo({
              url: 'selectFood/selectFood',
            })
          },1200)
        }
      })

    }
  },

  tapMedicineBeforeDialog: function(){
    this.setData({
      medicineBeforeDialogShow: false,
    })
    wx.navigateTo({
      url: '../medicine/medicine',
    })
  },
  tapMedicineAfterDialog: function(){
    this.setData({
      medicineAfterDialogShow: false,
    })
    wx.redirectTo({
      url: '../medicine/medicine',
    })
  },
  loadImage() {
    //加载缩略图
    console.log('角色编号' + app.globalData.mainCharacter)
    this.setData({
        Action: ActionThumbnail[app.globalData.mainCharacter]
    })
    //同时对原图进行预加载，加载成功后再替换
    this.imgLoader.load(ActionOriginal[app.globalData.mainCharacter], (err, data) => {
        console.log('图片加载完成', err, data.src)
        if (!err)
            this.setData({ Action: data.src })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = AV.User.current()
    if(user.attributes.planForMeals){
      if(!app.globalData.CalorieGet){
        this.openConfirm()
      }
      //初始化图片预加载组件
      this.imgLoader = new ImgLoader(this)
      this.loadImage()
    }
    else{
      this.setData({
        dialogShow2:true
      })
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
