// pages/treeHole/treeHole.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    treeHoleList: null/*[{ id: "0", content: "我想放假啊啊啊，不想开学啊啊啊啊" }, { id: "1", content: "决定攒钱买一个Chanel包包" }, { id: "2", content: "想看一场wuli何美男的演唱会" }, { id: "3", content: "一定要再去一次厦门，去鼓浪屿看日出" }, { id: "4", content: "程序员需要听从颈椎康复指南手册的指导" }, { id: "5", content: "妈耶我编不出来了啊哭泣" }, { id: "6", content: "" }, { id: "7", content: "" }, { id: "8", content: "" }]*/
  },
  refresh:function(succ){
    let that = this;
    wx.request({
      url: app.globalData.serverUrl+'/readSecret',
      data:{
        brief:true
      },
      success:function(res){
        that.setData({
          treeHoleList:res.data
        });
        console.log(res);
        if (succ)succ();
      },
      fail:function(reason){
        console.log(reason);
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
    app.globalData.isSecret = true;
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

  itemTap: function (e) {
    app.globalData.chatID = e.currentTarget.id;

  },
  writeTap:function(e){
    wx.navigateTo({
      url: '../comment/comment?defaultText=请输入秘密内容',
    });
  }
})