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
      url: app.globalData.serverUrl+'/readQuestion',
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
  onShow:function(){
    this.onLoad();
  },
  itemTap:function(e){
    app.globalData.chatID=e.currentTarget.id;
    console.log(app.globalData.chatID);
    
  }
})
