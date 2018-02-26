//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    chatList:[]
  },
  onLoad: function () {
    let that = this;
    wx.request({
      url: 'http://'+app.globalData.serverUrl+'/getQuestion',
      data:{
        brief:true
      },
      success:function(res){
        console.log(res.data);
        that.setData({
          chatList:res.data
        });
      },
      fail:function(reason){
        console.log(reason);
      }
    })
  },
  itemTap:function(e){
    app.globalData.chatID=e.currentTarget.id;
    console.log(app.globalData.chatID);
    
  }
})
