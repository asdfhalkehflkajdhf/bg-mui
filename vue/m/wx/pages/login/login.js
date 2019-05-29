// pages/login/login.js
var app = getApp().globalData;

Page({
    data: {
        formShow: [true, false, false],
        
        userName: '',
        userPassword: '',
    },

    formLogin: function (e) {
        // console.log(e.detail.value);//格式 Object {userName: "user", userPassword: "password"}

        //获得表单数据
        var objData = e.detail.value;

        if (objData.userName && objData.userPassword) {
            // 同步方式存储表单数据
            wx.setStorageSync('BoyGUserName', objData.userName);
            wx.setStorageSync('BoyGUserPassword', objData.userPassword);
            app.auth.setLoginForm(objData.userName, objData.userPassword);
            app.auth.login();
        }else{
            app.util.layerMsg("参数不能为空");
        }
    },

    formRegist: function (e) {
        // console.log(e.detail.value);//格式 Object {userName: "user", userPassword: "password"}

        //获得表单数据
        var objData = e.detail.value;

        if (objData.userName && objData.userPassword && objData.checkCode) {
            // 同步方式存储表单数据
            wx.setStorageSync('BoyGUserName', objData.userName);
            wx.setStorageSync('BoyGUserPassword', objData.userPassword);
            app.auth.setRegistForm(objData.userName, objData.userPassword, objData.checkCode);
            app.auth.regist();
        } else {
            app.util.layerMsg("参数不能为空");
        }
    },

    formForget: function (e) {
        // console.log(e.detail.value);//格式 Object {userName: "user", userPassword: "password"}

        //获得表单数据
        var objData = e.detail.value;

        if (objData.userName && objData.userEmail) {
            // 同步方式存储表单数据
            app.auth.setForgetForm(objData.userName, objData.userEmail);
            app.auth.forget();
        } else {
            app.util.layerMsg("参数不能为空");
        }
    },

    //加载完后，处理事件 
    // 如果有本地数据，则直接显示
    onLoad: function (options) {
        //获取本地数据
        var userName = wx.getStorageSync('BoyGUserName');
        var userPassword = wx.getStorageSync('BoyGUserPassword');

        if (userName) {
            this.setData({ userName: userName });
        }
        if (userPassword) {
            this.setData({ userPassword: userPassword });
        }
        
    },

    changeFormShow:function(e){
        // console.log(e.currentTarget.dataset.idx);
        let _this = this;
        let show=[false, false, false];
        let showTitle = ["登陆", "注册", "忘记密码"];
        show[e.currentTarget.dataset.idx]=true;
        this.setData({
            formShow:show
        });
        wx.setNavigationBarTitle({
            title: showTitle[e.currentTarget.dataset.idx]
        });
    },
    
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
})