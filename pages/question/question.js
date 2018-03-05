// pages/question/question.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirmText:"发布问题",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  confirm:function(e){
    wx.createSelectorQuery().select('#text').fields({
      properties: ['value']
    }, function (res) {
      console.log(res.value);
      wx.createSelectorQuery().select('#topic').fields({
        properties:['value']
      },function(res2){
        console.log(res2.value);
        wx.request({
          url: app.globalData.serverUrl+'/writeQuestion',
          data:{
            topic:res2.value,
            context:res.value
          },
          success:function(res){
            wx.navigateBack();
          },
          fail:function(reason){
            console.log(reason);
          }
        })
      }).exec();
    }).exec();
  }
})