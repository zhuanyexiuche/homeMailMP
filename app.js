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
                  withCredentials: false,
                  success: function (data) {
                    console.info("2成功获取用户返回数据");
                    console.info(data.userInfo);
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
                withCredentials: false,
                success: function (data) {
                  console.info("1成功获取用户返回数据");
                  console.info(data.userInfo);
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
                                  withCredentials: false,
                                  success: function (data) {
                                    console.info("3成功获取用户返回数据");
                                    console.info(data.userInfo);
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
  getOpenID:function(){
    wx.login({
      success: function (res) {
        wx.getSetting({
          success(setRes) {
            // 判断是否已授权  
            if (!setRes.authSetting['scope.userInfo']) {
              // 授权访问  
              wx.authorize({
                scope: 'scope.userInfo',
                success() {
                  //获取用户信息  
                  wx.getUserInfo({
                    lang: "zh_CN",
                    success: function (userRes) {
                      //发起网络请求  
                      wx.request({
                        url: config.loginWXUrl,
                        data: {
                          code: res.code,
                          encryptedData: userRes.encryptedData,
                          iv: userRes.iv
                        },
                        header: {
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: 'POST',
                        //服务端的回掉  
                        success: function (result) {
                          var data = result.data.result;
                          data.expireTime = nowDate + EXPIRETIME;
                          wx.setStorageSync("userInfo", data);
                          userInfo = data;
                        }
                      })
                    }
                  })
                }
              })
            } else {
              //获取用户信息  
              wx.getUserInfo({
                lang: "zh_CN",
                success: function (userRes) {
                  //发起网络请求  
                  wx.request({
                    url: config.loginWXUrl,
                    data: {
                      code: res.code,
                      encryptedData: userRes.encryptedData,
                      iv: userRes.iv
                    },
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: 'POST',
                    success: function (result) {
                      var data = result.data.result;
                      data.expireTime = nowDate + EXPIRETIME;
                      wx.setStorageSync("userInfo", data);
                      userInfo = data;
                    }
                  })
                }
              })
            }
          }
        })
      }
    })  
  },
  onLaunch: function () {
    // 展示本地存储能力
    /*
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    */
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //getOpenID();
      }
    })
    // 获取用户信息
    this.globalData.getPromission();
  }
})