//app.js
var api = require("./utils/api.js");
var util = require("./utils/util.js");
var auth = require("./utils/auth.js");
App({
    onLaunch: function () {
        // 同步方式存储表单数据
        let u = wx.getStorageSync('BoyGUserName');
        let p = wx.getStorageSync('BoyGUserPassword');
        if(u != null && p != null){
            //自动登陆
            auth.setLoginForm(u, p);
            auth.login();
        }
        
        // 登录
        // wx.login({
        //     success: res => {
        //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //         console.log(res);
        //     }
        // })
        // 获取用户信息
        // https://developers.weixin.qq.com/miniprogram/dev/api/wx.getUserInfo.html
        wx.getSetting({
        success: res => {
            // console.log(res);
            if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
                success: res => {
                    console.log(res);
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
        util: util,
        api: api,
        auth: auth
    }
})