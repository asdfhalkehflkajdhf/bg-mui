// pages/setting/contact/contact.js
var app = getApp().globalData;
var localToken = app.util.getLocalToken();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        contact:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            contact:app.auth.data.selfInfo.contact
        })
    },

    bindContactInput:function(e){
        this.setData({
            contact: e.detail.value
        })
    },
    //更新联系方式
    userContactSet: function() {
        
        var _this = this;

        wx.showLoading({ title: '提交中…' });
        wx.request({
            url: app.api.userContactSet, // 仅为示例，并非真实的接口地址
            data: {
                token: localToken,
                contact: _this.data.contact,
                uid: app.auth.data.selfInfo.uid
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

    }
})