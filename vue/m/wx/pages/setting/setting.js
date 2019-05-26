// pages/setting/setting.js

var app = getApp().globalData;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        landing:false,
        findSwitch:false
    },
    //登陆
    logIn:function(){
        wx.navigateTo({
            url: '/pages/login/login'
        })
    },
    //退出
    logOut:function(){
        app.auth.logout();
    },
    //查找开关
    switchChange(e) {

        var _this = this;
        wx.showLoading({ title: '提交中…' });
        wx.request({
            url: app.api.userFindSwitchSet, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken(),
                uid: app.util.getLocalID(),
                switch: e.detail.value
            },
            method: 'post',
            dataType: 'josn',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(response) {
                wx.hideLoading();
                if (response.statusCode == 200) {
                    let res = JSON.parse(response.data);
                    //解析结果
                    if(res.code==0){
                        //页面显示结果
                        _this.setData({
                            findSwitch: e.detail.value
                        });
                        //当前个人信息
                        app.auth.data.selfInfo.find_switch = e.detail.value;
                    }
                    app.util.layerMsg(res.msg, res.code);
                } else {
                    app.util.layerMsg(response.statusText);
                }

            },
            fail(errMsg) {
                wx.hideLoading();
                console.log(errMsg);
            },
            complete(res) {
                //都会执行,res参数 成功和失败一起的。
                // errMsg:"request:ok"
                // console.log(res);

            }
        });
    },


    pageInit:function(){
        this.setData({
            landing: app.auth.getLanding()
        });

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.pageInit();
        // console.log("load 请求一次个人数据");
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
        this.pageInit();
        // console.log("show");
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

    }
})