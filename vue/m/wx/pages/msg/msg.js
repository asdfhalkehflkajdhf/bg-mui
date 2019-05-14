// pages/msg/msg.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp().globalData;
var localToken = app.util.getLocalToken();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        
        msgInfoList:[],
        msgActList: [],
        /////////nav 导航//////////
        tabs: ["info", "act"],
        types: ["info", "act"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.tabInit();
    },

    /// 长按
    delMsgItem: function (e) {
        let _this = this;
        wx.showModal({title: '删除',
            content: '确定要删除消息？',
            showCancel: true,//是否显示取消按钮
            cancelText: "否",//默认是“取消”
            cancelColor: 'skyblue',//取消文字的颜色
            confirmText: "是",//默认是“确定”
            confirmColor: 'skyblue',//确定文字的颜色
            success: function (res) {
                if (res.cancel) {
                    //点击取消,默认隐藏弹框
                } else {
                    //点击确定
                    wx.showModal({
                        title: '删除动作',
                        showCancel: true,//是否显示取消按钮
                        cancelText: "只删除",//默认是“取消”
                        cancelColor: 'skyblue',//取消文字的颜色
                        confirmText: "黑名单",//默认是“确定”
                        confirmColor: 'skyblue',//确定文字的颜色
                        success: function (res) {
                            let uid = e.currentTarget.dataset.uid;
                            let idx = e.currentTarget.dataset.idx;
                            _this.removeRecard(uid, idx);
                            if (res.cancel) {
                                //点击取消
                            } else {
                                //黑名单
                                let name = e.currentTarget.dataset.name;
                                _this.blackListAdd(uid, idx, name);
                            }
                        }
                    })
                }
            },
            fail: function (res) { },//接口调用失败的回调函数
            complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
        });

    },

    removeRecard: function(uid, idx){
        let _this = this;
        wx.showLoading({ title: '加载中…' });
        wx.request({
            url: app.api.newsDelUserMsg, // 仅为示例，并非真实的接口地址
            data: {
                token: localToken,
                uid: uid,
                type: _this.data.types[_this.data.activeIndex]
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
                    if (res.code == 0) {
                        // 在页面删除
                        if (_this.data.activeIndex == 0){
                            _this.data.msgInfoList.splice(idx,1);
                            _this.setData({
                                msgInfoList: _this.data.msgInfoList
                            })
                        }else{
                            _this.data.msgActList.splice(idx, 1);
                            _this.setData({
                                msgActList: _this.data.msgActList
                            })
                        }
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

    blackListAdd: function (uid, idx, name) {
        let _this=this;

        wx.showLoading({ title: '加载中…' });
        wx.request({
            url: app.api.blackListAdd, // 仅为示例，并非真实的接口地址
            data: {
                token: localToken,
                buid: uid,
                uid: app.util.getLocalID(),
                unname: name
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
                    if (res.code == 0) {
                        // 在页面删除
                        if (_this.data.activeIndex == 0) {
                            _this.data.msgInfoList.splice(idx, 1);
                            _this.setData({
                                msgInfoList: _this.data.msgInfoList
                            })
                        } else {
                            _this.data.msgActList.splice(idx, 1);
                            _this.setData({
                                msgActList: _this.data.msgActList
                            })
                        }
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

    reloadGridItem: function() {
        let _this=this;

        wx.showLoading({ title: '加载中…' });
        wx.request({
            url: app.api.newsGetUserMsgList, // 仅为示例，并非真实的接口地址
            data: {
                token: localToken,
                type:_this.data.types[_this.data.activeIndex]
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
                    if (res.code == 0) {
                        // 在页面消息加载
                        if (_this.data.activeIndex == 0) {
                            _this.setData({
                                msgInfoList: res.data
                            })
                        } else {
                            _this.setData({
                                msgActList: res.data
                            })
                        }
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
    onShow: function () {
        let _this=this;
        _this.reloadGridItem();
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

  },
  //////////////////////
    // 选项卡
    tabClick: function (e) {
        let _this=this;
        console.log(e.currentTarget);
        _this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        },function () {
            // this is setData callback
            _this.reloadGridItem();
        });
        // 
    },
    tabInit: function () {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
    },
    //////////////////////

    



})