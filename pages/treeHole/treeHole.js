// pages/treeHole/treeHole.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    treeHoleList: [{ id: "0", content: "我想放假啊啊啊，不想开学啊啊啊啊" }, { id: "1", content: "决定攒钱买一个Chanel包包" }, { id: "2", content: "想看一场wuli何美男的演唱会" }, { id: "3", content: "一定要再去一次厦门，去鼓浪屿看日出" }, { id: "4", content: "程序员需要听从颈椎康复指南手册的指导" }, { id: "5", content: "妈耶我编不出来了啊哭泣" }, { id: "6", content: "" }, { id: "7", content: "" }, { id: "8", content: "" }]
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

  itemTap: function (e) {
    app.globalData.chatID = e.currentTarget.id;
  }
})