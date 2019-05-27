// pages/setting/changePW/changePW.js
var app = getApp().globalData;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        token: "",
        srcPw: "",
        newPw1: "",
        newPw2: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    bindSrcPwInput: function (e) {
        this.data.srcPw = e.detail.value;
    },
    bindNewPw1Input: function (e) {
        this.data.newPw1 = e.detail.value;
    },
    bindNewPw2Input: function (e) {
        this.data.newPw2 = e.detail.value;
    },

    checkForm: function () {
        if (this.data.newPw1 != this.data.newPw2) {
            app.util.layerMsg("新密码输入一样");
            return false;
        }
        if (this.data.srcPw == this.data.newPw2) {
            app.util.layerMsg("新旧密码一样");
            return false;
        }
        if (this.data.newPw1.length == 0 ||
            this.data.newPw2.length == 0 ||
            this.data.srcPw.length == 0
        ) {
            app.util.layerMsg("输入不能为空");
            return false;
        }

        return true;
    },
    changePW: function () {
        //发送请求
        var _vueThis = this;
        _vueThis.data.token = app.util.getLocalToken();
        if (!_vueThis.checkForm()) {
            return false;
        }
        wx.showLoading({ title: '加载中…' });
        wx.request({
            url: app.api.userChangePW, // 仅为示例，并非真实的接口地址
            data: _vueThis.data,
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
                    // 初始化输入参数
                    if (res.code == 0) {
                        _vueThis.setData({
                            newPw1: "",
                            newPw2: "",
                            srcPw: ""
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