// pages/setting/qa/qa.js
var app = getApp().globalData;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:"",
        content:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    bindContentInput: function (e) {
        this.setData({
            content: e.detail.value
        })
    },
    bindTitleInput:function(e){
        this.setData({
            title: e.detail.value
        })
    },
    checkForm: function () {
        console.log(this.data);
        if (this.data.title.length == 0 ||
            this.data.content.length == 0
        ) {
            app.util.layerMsg("输入不能为空");
            return false;
        }

        return true;
    },
    suggest: function () {
        
        
        //发送请求
        var _this = this;

        if (!_this.checkForm()) {
            return false;
        }
        wx.showLoading({ title: '提交中…' });
        wx.request({
            url: app.api.otherSuggest, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken(),
                title: _this.data.title,
                content: _this.data.content
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
                    if (res.code == 0) {
                        wx:wx.navigateBack({
                            delta: 1,
                        })
                    }

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