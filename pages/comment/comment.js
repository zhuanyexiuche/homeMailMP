const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirmText:"提交",
    maxWord :512,
    restWord : 512,
    focus:false,
    defaultText:"回答",
    secret:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.defaultText){
      this.setData({
        defaultText:options.defaultText,
        secret:true
      });
    }
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
    let that = this;
    console.log('confirm');
    wx.createSelectorQuery().select('#text').fields({
      properties:['value']
    },function(res){
      console.log(res.value);
      if(res.value==""){
        wx.showModal({
          title: that.data.secret?'秘密内容不可以为空':'回复内容不可以为空',
          content: that.data.secret?'请输入秘密内容':'请输入回复内容',
          showCancel:false
        });
        return;
      }
      console.log(app.globalData.userInfo);
      //发表秘密回复||秘密
      if (app.globalData.isSecret){
        if(that.data.secret){
          //发表秘密
          wx.request({
            url: app.globalData.serverUrl+'/writeSecret',
            data:{
              context:res.value
            },
            success:function(res){
              wx.showToast({
                title: '发表成功',
                duration:750
              });
              setTimeout(()=>{
                wx.navigateBack({
                  
                });
              },750);
            },
            fail:function(res){
              console.log(res);
            }
          })
        }else{
          //发表秘密回复
          wx.request({
            url: app.globalData.serverUrl + '/writeSecretComment',
            data: {
              SID: app.globalData.chatID,
              context: res.value
            },
            success: function (res) {
              console.log(res);
              if (res.data == 'fail') {
                console.log("数据库访问出错");
              } else {
                console.log(res);
                wx.showToast({
                  title: '发表成功',
                });
                setTimeout(() => {
                  wx.navigateBack({

                  });
                }, 750);

              }
            },
            fail: function (reason) {
              console.log(reason);
            }
          });
        }
        
      }else{
        //发表聊天回复
        wx.request({
          url: app.globalData.serverUrl + '/writeResponse',
          data: {
            QID: app.globalData.chatID,
            WXID: app.globalData.open_id,
            nickName: app.globalData.userInfo.nickName,
            text: res.value,
            avatarUrl: app.globalData.userInfo.avatarUrl
          },
          success: function (res) {
            console.log(res);
            if (res.data == 'success') {
              console.log(res);
              wx.showToast({
                title: '发表成功',
              });
              setTimeout(()=>{
                wx.navigateBack({
                  
                });
              },750);
              // setTimeout(wx.navigateBack(),1000);
            } else {
              console.log("数据库访问出错");
            }
          },
          fail: function (reason) {
            console.log(reason);
          }
        });
      }
    }).exec();
  },
  textInput:function(input){
    console.log(input);
    this.setData({
      restWord : this.data.maxWord-input.detail.cursor,
      focus:true
    });
  },
  textFocus:function(){
    this.setData({
      focus:true
    });
    console.log("focus");
  },
  textBlur:function(){
    this.setData({
      focus:false
    });
    console.log("blur");
  }
})