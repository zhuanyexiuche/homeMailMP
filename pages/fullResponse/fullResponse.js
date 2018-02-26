// pages/fullResponse/fullResponse.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic:null,
    context:null,
    response:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      topic:app.globalData.topic,
      context:app.globalData.context
    });
    wx.request({
      url: 'http://'+app.globalData.serverUrl+'/getResponse',
      data:{
        brief:false,
        RID:app.globalData.responseID
      },
      success:function(res){
        that.setData({
          response:res.data
        });
      },
      fail:function(reason){
        console.log(reason);
      }
    })
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
})