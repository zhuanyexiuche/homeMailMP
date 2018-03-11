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
    addText:"增加回答",
    context:null,
    foldedContext:null,
    needToFold:false,
    folded:true,
    showContext:null
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
        console.log(res);
        let temp = res.data.context;
        if (res.data.context.length>24){
          that.setData({
            needToFold:true,
            folded:true
          });
          temp = res.data.context.substring(0,24)+"...";
        }
        that.setData({
          context:res.data.context,
          foldedContext:temp,
          chatInfo: res.data,
          showContext:temp
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
          respInfo: res.data.map(function(curVal){
            let temp = curVal;
            temp.briefContent = temp.briefContent.replace("\\n","\n\r");
            return temp;
          })
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
  temp:function(){
    this.refresh(wx.stopPullDownRefresh());
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      chatID:app.globalData.chatID,
    });
    this.refresh();
    this.data.folded=true;
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
    setTimeout(this.temp,200);
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

    wx.showModal({
      title: '点击右上角第一个按钮进行分享',
      showCancel:false
    })
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
  },
  folder:function(e){
    /*
    if (this.data.needToFold){
      this.setData({
        showContext:this.data.folded?this.data.context:this.data.foldedContext
      });
      this.data.folded = this.data.folded==false;
    }
    */
    console.log(this.data.needToFold+" "+this.data.folded);
    if (this.data.needToFold){
      this.setData({
        folded:this.data.folded==false
      });
    }
  }
})