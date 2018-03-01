const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirmText:"提交",
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
    console.log('confirm');
    wx.createSelectorQuery().select('#text').fields({
      properties:['value']
    },function(res){
      console.log(res.value);
      console.log(app.globalData.userInfo);
      
      wx.request({
        url: app.globalData.serverUrl+'/writeResponse',
        data:{
          QID:app.globalData.chatID,
          WXID:app.globalData.userInfo.nickName,
          text:res.value,
          avatarUrl:app.globalData.userInfo.avatarUrl
        },
        success:function(res){
          console.log(res);
          if (res.data=='success'){
            console.log(res);
            wx.navigateBack();
          }else{
            console.log("数据库访问出错");
          }
        },
        fail:function(reason){
          console.log(reason);
        }
      })
    }).exec();
  }
})