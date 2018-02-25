//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    chatList:[{id:"0",name:"大学生撸猫正确姿势",responseCount:10,heat:15},{id:"1",name:"萌新初到，请问需要注意些什么",responseCount:50,heat:30},{id:"2",name:"这个辣鸡小程序是谁做的？",responseCount:"19800",heat:600},{id:"3",name:"口红色号如何辨识",responseCount:"20000",heat:100000}]
  },
  onLoad: function () {
    
  },
  itemTap:function(e){
    app.globalData.chatID=e.currentTarget.id;
    console.log(app.globalData.chatID);
  }
})
