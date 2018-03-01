// pages/chat/chat.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatID:null,
    chatInfo:null,
    respInfo:null,
    inviteText:"邀请回答",
    addText:"写回答",
  },
  refresh:function(success){
    let that = this;
    let suc = success;
    wx.request({
      url: app.globalData.serverUrl + '/readQuestion',
      data: {
        brief: false,
        QID: app.globalData.chatID
      },
      success: function (res) {
        that.setData({
          chatInfo: res.data
        });
        app.globalData.context = res.data.context;
        app.globalData.topic = res.data.topic;
      },
      fail: function (reason) {
        console.log(reason);
      }
    });
    wx.request({
      url: app.globalData.serverUrl + '/readResponse',
      data: {
        brief: true,
        QID: app.globalData.chatID
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          respInfo: res.data
        });
        if (suc){
          suc();
        }
      },
      fail: function (reason) {
        console.log(reason);
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      chatID:app.globalData.chatID,
    });
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
    this.onLoad();
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
    // this.setData({
    //   addText:"点左边的，别点我！"
    // });
    // setTimeout(()=>{
    //   this.setData({
    //     addText:"写回答"
    //   });
    // },800);
    wx.navigateTo({
      url: '../comment/comment'
    })
  },

  fullResponseTap:function(e){
    app.globalData.responseID = e.currentTarget.id;
    console.log(app.globalData.responseID);
  }
})