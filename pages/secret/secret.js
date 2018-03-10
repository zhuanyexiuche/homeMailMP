// pages/secret/secret.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    secretID:null,
    secret:null
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
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  
  },
  addTap: function () {
    wx.navigateTo({
      url: '../comment/comment'
    })
  }
})