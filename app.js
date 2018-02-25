//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    chatID:null,
    responseID:null,
    chatList: [{ id: "0", name: "大学生撸猫正确姿势", context: "如题", response: [{ id: "0", userName: "哆啦A梦", content: "巴拉巴拉巴拉拉拉小魔仙变变变身啦！巴拉巴拉巴拉拉拉小魔仙变变变身啦！巴拉巴拉巴拉拉拉小魔仙变变变身啦！巴拉巴拉巴拉拉拉小魔仙变变变身啦！", briefContent: "巴拉巴拉...", clap: 20 }, { id: "1", userName: "哆啦B梦", content: "楼上小仙女说的对呀", briefContent: "楼上小仙女...", clap: 10 }, { id: "2", userName: "哆啦C梦", content: "楼上说楼上小仙女说得对呀说的对呀", briefContent: "楼上说...", clap: 30 }], responseCount: 10, heat: 15 }, { id: "1", name: "萌新初到，请问需要注意些什么", context: "如题", response: [{ id: "3", userName: "哆啦A梦", content: "巴拉巴拉巴拉拉拉小魔仙变变变身啦！", briefContent: "巴拉巴拉...", clap: 20 }, { id: "4", userName: "哆啦B梦", content: "楼上小仙女说的对呀", briefContent: "楼上小仙女...", clap: 10 }, { id: "5", userName: "哆啦C梦", content: "楼上说楼上小仙女说得对呀说的对呀", briefContent: "楼上说...", clap: 30 }], responseCount: 50, heat: 30 }, { id: "2", name: "这个辣鸡小程序是谁做的？", context: "如题", response: [{ id: "6", userName: "哆啦A梦", content: "巴拉巴拉巴拉拉拉小魔仙变变变身啦！", briefContent: "巴拉巴拉...", clap: 20 }, { id: "7", userName: "哆啦B梦", content: "楼上小仙女说的对呀", briefContent: "楼上小仙女...", clap: 10 }, { id: "8", userName: "哆啦C梦", content: "楼上说楼上小仙女说得对呀说的对呀", briefContent: "楼上说...", clap: 30 }], responseCount: "19800", heat: 600 }, { id: "3", name: "口红色号如何辨识", context: "如题", response: [{ id: "9", userName: "哆啦A梦", content: "巴拉巴拉巴拉拉拉小魔仙变变变身啦！", briefContent: "巴拉巴拉...", clap: 20 }, { id: "10", userName: "哆啦B梦", content: "楼上小仙女说的对呀", briefContent: "楼上小仙女...", clap: 10 }, { id: "11", userName: "哆啦C梦", content: "楼上说楼上小仙女说得对呀说的对呀", briefContent: "楼上说...", clap: 30 }], responseCount: "20000", heat: 100000 }]
  }
})