//app.js
App({
  globalData: {
    userInfo: null,
    chatID: null,
    responseID: null,
    topic: null,
    context: null,
    serverUrl: false ? 'http://localhost' : 'https://jjmfly.com/HomeMail_war',
    loginStatus: true,
    code:null,
    open_id:null,
    getPromission: function () {
      let that = this;
      console.log(this.loginStatus==true);
      if (!this.loginStatus) {
        wx.openSetting({
          success: function (data) {
            if (data) {
              if (data.authSetting["scope.userInfo"] == true) {
                loginStatus = true;
                wx.getUserInfo({
                  withCredentials: true,
                  success: function (data) {
                    console.info("2成功获取用户返回数据");
                    console.info(data);
                    that.userInfo=data.userInfo;
                  },
                  fail: function () {
                    console.info("2授权失败返回数据");
                  }
                });
              }
            }
          },
          fail: function () {
            console.info("设置失败返回数据");
          }
        });
      } else {

        wx.login({
          success: function (res) {
            if (res.code) {
              wx.getUserInfo({
                withCredentials: true,
                success: function (data) {
                  console.info("1成功获取用户返回数据");
                  console.info(data);
                  that.userInfo=data.userInfo;
                },
                fail: function () {
                  console.info("1授权失败返回数据");
                  that.loginStatus = false;
                  // 显示提示弹窗
                  wx.showModal({
                    title: '请求获取您的用户信息',
                    content: '点击取消退出应用',
                    confirmText: '允许',
                    cancelText: '取消',
                    success: function (res) {
                      if (res.cancel) {
                        console.log('用户点击取消');
                        wx.reLaunch({
                          url: '../index/index',
                        });
                        wx.navigateBack({
                          data:1
                        })
                      } else if (res.confirm) {
                        wx.openSetting({
                          success: function (data) {
                            if (data) {
                              if (data.authSetting["scope.userInfo"] == true) {
                                that.loginStatus = true;
                                wx.getUserInfo({
                                  withCredentials: true,
                                  success: function (data) {
                                    console.info("3成功获取用户返回数据");
                                    console.info(data);
                                    that.userInfo=data.userInfo;
                                    
                                  },
                                  fail: function () {
                                    console.info("3授权失败返回数据");
                                  }
                                });
                              }else{
                                wx.reLaunch({
                                  url: '../index/index',
                                });
                                wx.navigateBack({
                                  data:1
                                })
                              }
                            }
                          },
                          fail: function () {
                            console.info("设置失败返回数据");
                          }
                        });
                      }
                    }
                  });
                }
              });
            }
          },
          fail: function () {
            console.info("登录失败返回数据");
          }
        });
      }
    }
  },
  onLaunch: function () {
    // 展示本地存储能力
    /*
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    */
    // 登录
    let that = this;
    wx.login({
      success: res => {
        console.log(res);
        that.globalData.code = res.code;
        wx.request({
          url: that.globalData.serverUrl+'/readOpenID',
          data:{
            code:that.globalData.code
          },
          success:function(res){
            that.globalData.open_id=res.data.openid
            console.log(res);
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //xgetOpenID();
      }
    })
    // 获取用户信息
    this.globalData.getPromission();
  }
})