// pages/actView/actView.js
// pages/friendView/friendView.js
var app = getApp().globalData;

// var WxParse = require('../../common/wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        res: {
            aid: "",
            uid: "",
            title: "",
            placeLife: "当地",
            activity_stats: true,
            eye: "",
            up: '',
            login_stats: false,
            actFirstPic: "",
            startTime: "",
            endTime: "",
            number: 2,
            avgSpending: 30,
            actBrief: "",

            actDetails: "",

            contact: "",

        },

        curAttentionPeople: [
            // {uid:"",name:""}
        ],
        befAttentionPeople: [

        ],
        attentionPeopleCount: 0,
        urlParameter: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取url参数
        this.data.urlParameter = options;

        // 请求数据
        this.getActionInfo();
        this.getAttentionInfo();
    },


    getAttentionInfo: function() {
        var _this = this;

        wx.request({
            url: app.api.actAttentionInfo, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken(),
                aid: _this.data.urlParameter.id
            },
            method: 'post',
            dataType: 'josn',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(response) {
                if (response.statusCode == 200) {
                    let res = JSON.parse(response.data);
                    
                    let curAttentionPeople=[];
                    let befAttentionPeople=[];
                    for(let i=0;i<res.data.length;i++){
                        if (res.data[i].cur_attend_status) {
                            curAttentionPeople.push(res.data[i]);
                        } else {
                            befAttentionPeople.push(res.data[i]);
                        }
                    }
                    _this.setData({
                        attentionPeopleCount: res.data.length,
                        befAttentionPeople: befAttentionPeople,
                        curAttentionPeople: curAttentionPeople
                    })

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
    getActionInfo: function() {
        var _this = this;
        wx.showLoading({ title: '加载中…' });
        
        wx.request({
            url: app.api.actGetInfo, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken(),
                aid: _this.data.urlParameter.id
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

                    if (res.data.actDetails == null) { res.data.actDetails = "这个家伙比较懒，什么也没写"; }  
                    _this.setData({
                        res: res.data
                    });
                    // WxParse.wxParse('actDetails', 'html', res.data.actDetails, _this, 5);
                    // console.log(res);
                    if (res.data.aid == -1 || res.data.uid == -1) {
                        app.util.layerMsg("活动不存在！", 2);
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
    sendReqInfo: function() {
        var _this = this;
        wx.showLoading({ title: '请求中…' });
        wx.request({
            url: app.api.actSendReqInfo, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken(),
                aid: _this.data.urlParameter.id,
                auth_id: _this.data.res.uid,
                type: 'act'
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

    // 跳转到登陆
    gotoLoginPage: function () {
        app.util.layerMsg("跳转到登陆");
    },
    gotoFriendView: function (event) {
        var uid = event.currentTarget.dataset['uid'];
        let url = "../friendView/friendView?fid=" + uid;
        app.util.gotoPage(url);
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