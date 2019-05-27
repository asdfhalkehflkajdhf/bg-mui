// pages/msg/win/win.js
var app = getApp().globalData;
String.prototype.startWith = function (str) {
    var reg = new RegExp("^" + str);
    return reg.test(this);
};
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg: "",
        msgLastTime: "",
        intervalid1: -1,
        msgList:[],
        urlParameter: {},
        actList:[],

        curScrollTop:100,
        scrollTop: 100,
        // centendata: [
        //     { ctime: "2019-03-05", content: "<p>asdf</p><p>asdfasdfasdf</p>", origin: "right"},
        //     { ctime: "2019-03-05", content: "leftasdfasdfasdfasdf", origin: "left"},
        //     { ctime: "2019-03-05", content: "asdfasdfasdfasdf", origin: "right"},
        //     { ctime: "2019-03-05", content: "asdfasdfasdfasdf", origin: "right"},
        //     { ctime: "2019-03-05", content: "leftasdfasdfasdfasdf", origin: "left"},
        //     { ctime: "2019-03-05", content: "asdfasdfasdfasdf", origin: "right"},
        //     { ctime: "2019-03-05", content: "asdfasdfasdfasdf", origin: "right"},
        //     { ctime: "2019-03-05", content: "leftasdfasdfasdfasdf", origin: "left"},
        //     { ctime: "2019-03-05", content: "asdfasdfasdfasdf", origin: "right"},
        //     { ctime: "2019-03-05", content: "asdfasdfasdfasdf", origin: "right"},
        //     { ctime: "2019-03-05", content: "leftasdfasdfasdfasdf", origin: "left"}
        // ]
    },

    intervalId:-1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options);
        // 获取url参数
        this.setData({
            urlParameter: options
        })
        //定时器，获取数据
        this.upMsgWin();
        //定时器，获取数据
        this.intervalId = setInterval(this.upMsgWin, 3000);
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        clearInterval(this.intervalId);
    },
    //获取数据请求
    upMsgWin: function () {
        var _this = this;
        wx.request({
            url: app.api.newsGetUserMsg, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken(),
                msgLastTime: _this.data.msgLastTime,
                uid: _this.data.urlParameter.fid,
                type: _this.data.urlParameter.type
            },
            method: 'post',
            dataType: 'josn',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(response) {
                if (response.statusCode == 200) {
                    let res = JSON.parse(response.data);
                    //解析结果
                    // 更新上次的获取数据时间
                    _this.data.msgLastTime = res.msgLastTime;

                    //   // 服务端返回的数据
                    if (res.data.length == 0) {
                        if (res.code) {
                            app.util.layerMsg(res.msg, res.code);
                        }
                    } else {
                        if (_this.data.urlParameter.type == "act"){
                            let actList=[];
                            res.data.map(function (item, index, array) {
                                if (item.origin == "left" && item.content.startWith("ACTREQ:")) {
                                    let tc = array[index].content.substr(7);
                                    let tc_json = JSON.parse(tc);
                                    array[index].content = tc_json.head + '<a url="../actView/actView?id=' + tc_json.aid + '" >' + tc_json.atitle + '</a>';

                                    if (tc_json.atitle.length>4){
                                        tc_json.atitle = tc_json.atitle.substr(0, 4) + "...";
                                    }
                                    actList.push(tc_json);
                                }
                            });
                            _this.setData({
                                actList: actList
                            })
                        }

                        // console.log(res.data);
                        let ml_data=_this.data.msgList.concat(res.data);
                        _this.setData({
                            msgList: ml_data
                        })
                    };
                    _this.pageScrollToBottom();
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


    bindMsgChange:function(e){
        let _this=this;
        _this.setData({
            msg: e.detail.html
        })
    },

    onEditorReady() {
        const that = this
        wx.createSelectorQuery().select('#editor').context(function (res) {
            that.editorCtx = res.context
        }).exec()
    },
    clear() {
        this.editorCtx.clear({
            success: function (res) {

            }
        })
    },
    pageScrollToBottom: function () {
        var _this = this;
        _this.data.curScrollTop = _this.data.scrollTop;
        _this.setData({
            scrollTop: _this.data.msgList.length * 100
        });
        //没有新内容不进行更新
        if (_this.data.curScrollTop == _this.data.scrollTop){return;}

        wx.createSelectorQuery().select('#scroll').boundingClientRect(function (rect) {
            // 使页面滚动到底部
            wx.pageScrollTo({
                scrollTop: _this.data.scrollTop
            })
        }).exec()
    },
    // 发送数据
    sendMsg: function () {
        function Trim(str) {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        };
        var _this = this;

        let content = Trim(_this.data.msg);
        if (content.length<1){
            return;
        }

        wx.request({
            url: app.api.newsAddUserMsg, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken(),
                uid: _this.data.urlParameter.fid,
                msg: content,
                type: _this.data.urlParameter.type
            },
            method: 'post',
            dataType: 'josn',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(response) {
                if (response.statusCode == 200) {
                    let res = JSON.parse(response.data);
                    //解析结果
                    if (res.code == 0) {
                        _this.setData({
                            msg:""
                        })
                        _this.clear();
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


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var _this = this;
        _this.pageScrollToBottom();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        
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