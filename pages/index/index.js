//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    chatList:[]
  },
  getQuestion:function(success){
    let suc = success;
    let that = this;
    wx.request({
      url: app.globalData.serverUrl + '/readQuestion',
      data: {
        brief: true
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          chatList: res.data
        });
        if (suc){
          suc();
        }
      },
      fail: function (reason) {
        console.log(reason);
      }
    })
  },
  temp:function(){
    this.getQuestion(wx.stopPullDownRefresh());
  },
  onLoad: function () {
    this.getQuestion();
  },
  onShow:function(){
    this.getQuestion();
  },
  onPullDownRefresh:function(){
    
    setTimeout(this.temp,200);
  },
  itemTap:function(e){
    app.globalData.chatID=e.currentTarget.id;
    console.log(app.globalData.chatID);
  },
  addQTap:function(e){
    wx.navigateTo({
      url: '../question/question'
    })
  }
})
