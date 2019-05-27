// pages/friendView/friendView.js
var app = getApp().globalData;

// var WxParse = require('../../common/wxParse/wxParse.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        res: {
            uid: '',
            eye: '',
            contact: "",
            nick_name: "",
            height: "",
            weight: "",
            living_place: "",
            profession: "",
            income: "",
            tryst_expect: "",
            marital_status: "",
            selfIntr: "",
            otherIntr: "",
            find_switch: false,
            age: 0
        },
        eduList: [],
        imgList:[],
        msg: "",
        urlParameter: {},
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取url参数
        this.data.urlParameter = options;
        
        // 请求数据
        this.getUserInfo();
        this.reloadGridItem();

    },

    getUserInfo: function () {
        var _this = this;
        wx.showLoading({ title: '加载中…' });
        
        wx.request({
            url: app.api.userInfoGet, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken(),
                uid: _this.data.urlParameter.fid
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
                    if (res.code == 0) {
                        //这里必须使用setData，否则不进行渲染
                        
                        if (res.data.res.selfIntr == null) { res.data.res.selfIntr = "这个家伙比较懒，什么也没写"; }
                        if (res.data.res.otherIntr == null) { res.data.res.otherIntr = "这个家伙比较懒，什么也没写"; }
                        _this.setData({
                            res: res.data.res
                        });
                        // WxParse.wxParse('selfIntr', 'html', res.data.res.selfIntr, _this, 5);
                        // WxParse.wxParse('otherIntr', 'html', res.data.res.otherIntr, _this, 5);
                    } else {
                        app.util.layerMsg(res.msg, res.code);
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
                
            }
        });

    },
    //获取msg
    bindMsgInput: function (e) {
        this.data.msg = e.detail.value;
    },
    sendMsg: function () {
        var _this = this;
        wx.showLoading({ title: '提交中…' });
        wx.request({
            url: app.api.newsAddUserMsg, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken(),
                uid: _this.data.urlParameter.fid,
                msg: _this.data.msg,
                type: 'info'
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
                    if (res.code == 0) {
                        _this.setData({
                            msg:""
                        })
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
    //获取图片数据
	reloadGridItem: function(){
        var _this=this;
        wx.request({
            url: app.api.userImgGetList, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken(),
                page_id: 1,
                fid: _this.data.urlParameter.fid
            },
            method: 'post',
            dataType: 'josn',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(response) {
                if (response.statusCode == 200) {
                    let res = JSON.parse(response.data);
                    if (res.code != 0) {
                        app.util.layerMsg(res.msg, res.code);
                    } else {
                        _this.setData({
                            imgList:res.data
                        })
                    }

                } else {
                    app.util.layerMsg(response.statusText);
                }
            },
            fail(errMsg) {
                console.log(errMsg);
            },
            complete(res) {
                //都会执行,res参数 成功和失败一起的。
                // errMsg:"request:ok"
                // console.log(res);
            }
        });
    },

    // 跳转到登陆
    gotoLoginPage: function(){
        app.util.layerMsg("跳转到登陆");
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