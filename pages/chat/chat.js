// pages/chat/chat.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatID:null,
    chatInfo:null,
    inviteText:"邀请回答",
    addText:"添加回答"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      chatID:app.globalData.chatID,
      chatInfo:app.globalData.chatList[app.globalData.chatID]
    });
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

  inviteTap:function(){
    this.setData({
      inviteText:"点右边的，别点我！"
    });
    setTimeout(()=>{
      this.setData({
        inviteText:"邀请回答"
      });
    },800);
  },

  addTap:function(){
    this.setData({
      addText:"点左边的，别点我！"
    });
    setTimeout(()=>{
      this.setData({
        addText:"添加回答"
      });
    },800);
  },

  fullResponseTap:function(e){
    app.globalData.responseID = e.currentTarget.id;
    console.log(app.globalData.responseID);
  }
})