// pages/fullResponse/fullResponse.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic:null,
    context:null,
    response:null,
    supported:null,
    belongToMe:null
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
      url: app.globalData.serverUrl+'/readResponse',
      data:{
        brief:false,
        RID:app.globalData.responseID
      },
      success:function(res){
        that.setData({
          response:res.data,
          belongToMe:(res.data.WXID===app.globalData.open_id)
        });
      },
      fail:function(reason){
        console.log(reason);
      }
    });
    wx.request({
      url: app.globalData.serverUrl+'/readClap',
      data:{
        RID:app.globalData.responseID,
        WXID: app.globalData.open_id
      },
      success:function(res){
        console.log(res.data);
        that.setData({
          supported:res.data
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

  supportTap:function(e){
    let that = this;
    wx.request({
      url: app.globalData.serverUrl+'/writeClap',
      data:{
        RID:app.globalData.responseID,
        WXID:app.globalData.open_id
      },
      success:function(res){
        if (res.data!='fail'){
          that.setData({
            supported:that.data.supported==false
          });
        }else{
          console.log("数据库访问出错");
        }
      },
      fail:function(reason){
        console.log(reason);
        console.log("网络通讯出错");
      }
    })
  },

  deleteTap:function(e){
    wx.request({
      url: app.globalData.serverUrl+'/writeResponse',
      data:{
        delete:true,
        RID:app.globalData.responseID
      },
      success:function(res){
        wx.navigateBack();
      },
      fail:function(reason){
        console.log(reason);
      }
    })
  }
})