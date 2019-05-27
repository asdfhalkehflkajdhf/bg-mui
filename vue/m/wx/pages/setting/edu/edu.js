// pages/setting/edu/edu.js
var app = getApp().globalData;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        eduList:app.auth.data.eduList,
        verify_code:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            eduList: app.auth.data.eduList
        })
    },

    bindGotoChsi:function(){
        
        let url = "/pages/webView/webView?url=https://www.chsi.com.cn/xlcx/rhsq.jsp";
        console.log(url);
        app.util.gotoPage(url);
    },
    bindVCodeInput: function (e) {
        this.setData({
            verify_code: e.detail.value
        })
    },

    userEduSet: function() {
        var _this = this;

        if(_this.data.verify_code.length<1){
            app.util.layerMsg("不能为空");
            return;
        }

        wx.showLoading({ title: '提交中…' });
        wx.request({
            url: app.api.userEduSet, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken(),
                verify_code: _this.data.verify_code,
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
                    //这里必须使用setData，否则不进行渲染
                    if (res.code == 0) {
                        _this.setData({
                            verify_code:"",
                            eduList: res.data
                        });
                        //更新
                        app.auth.data.eduList = res.data;
                        
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