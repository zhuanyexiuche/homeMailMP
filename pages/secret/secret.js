// pages/secret/secret.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    secretID:null,
    secret:null,
    comment:null,
  },
  refresh:function(succ){
    this.setData({
      secretID:app.globalData.chatID
    });
    let that = this;
    wx.request({
      url: app.globalData.serverUrl+'/readSecret',
      data:{
        brief:false,
        SID:app.globalData.chatID
      },
      success:function(res){
        that.setData({
          secret:res.data
        });
        console.log(res);
      }
    });
    wx.request({
      url: app.globalData.serverUrl+'/readSecretComment',
      data:{
        brief:true,
        SID:app.globalData.chatID
      },
      success:function(res){
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].rand = Math.floor(Math.random() * 8);
        }
        that.setData({
          comment:res.data
        });
        console.log(res);
      },
      fail:function(reason){
        console.log(reason);
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.refresh();
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
    this.refresh();
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
    this.refresh(wx.stopPullDownRefresh());
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
  
  },
  addTap: function () {
    wx.navigateTo({
      url: '../comment/comment'
    })
  },
  shareTap:function(){
    wx.showModal({
      title: '点击右上角第一个按钮进行分享',
      showCancel: false,
    });
  }
})