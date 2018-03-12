//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    chatList:[]
  },
  getQuestion:function(success){
    let that = this;
    wx.createSelectorQuery().select('#search').fields({
      properties: ['value']
    }, function (res) {
      console.log(res.value);
      wx.request({
        url: app.globalData.serverUrl + '/readQuestion',
        data: {
          brief: true,
          search: true,
          keyWord: res.value
        },
        success: function (res) {
          that.setData({
            chatList: res.data
          });
        },
        fail: function (reason) {
          console.log(reason);
        }
      })
    }).exec();
  },
  getQuestion2:function(success){
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
  onLoad: function () {
    this.getQuestion();
  },
  onShow:function(){
    app.globalData.isSecret = false;
    this.getQuestion();
  },
  onPullDownRefresh:function(){
    this.getQuestion(wx.stopPullDownRefresh());
  },
  itemTap:function(e){
    app.globalData.chatID=e.currentTarget.id;
    console.log(app.globalData.chatID);
  },
  addQTap:function(e){
    wx.navigateTo({
      url: '../question/question'
    })
  },
  searchTap:function(e){
    let that = this;
    wx.createSelectorQuery().select('#search').fields({
      properties: ['value']
    }, function (res) {
      console.log(res.value);
      wx.request({
        url: app.globalData.serverUrl+'/readQuestion',
        data:{
          brief:true,
          search:true,
          keyWord:res.value
        },
        success:function(res){
          that.setData({
            chatList:res.data
          });
          wx.showToast({
            title: '检索成功',
            duration:750
          })
        },
        fail:function(reason){
          console.log(reason);
          wx.showToast({
            title: '请求失败',
            
          })
        }
      })
    }).exec();
  }
})
