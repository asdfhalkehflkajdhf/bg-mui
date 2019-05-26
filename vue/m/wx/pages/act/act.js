// pages/act/act.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp().globalData;


Page({

  /**
   * 页面的初始数据
   */
    data: {

        page: 0,
        fload_time: "null",
        lunBoTuList: [],
        actList:[],

        //////查找条件
        statusIdx:0,
        regionIdx: [0, 0],
        livingTextList: [],//省市
        livingTextList2Obj: [],//不全部的
        conditionalForm: {
            living: "",
            //活动状态
            status: 1,
            uid: -1,
        },
        conditionalData: {
            statusList: [
                // 				{value:1,text:"全部"},
                // 				{value:2,text:"进行中"},
                // 				{value:3,text:"已结束"},
                // 				{value:3,text:"参加过的"},
            ]
        },

        ////////////nav tab
        tabs: ["活动", "条件"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0
    },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        this.getLunBoTuList();
        this.tabInit();
        this.reloadGridItem();
        this.getFrom();
    },

    getLunBoTuList: function () {
        var _this = this;

        wx.request({
            url: app.api.adsGetLunBoTuList, // 仅为示例，并非真实的接口地址
            // url:url,
            data: {},
            method: 'post',
            dataType: 'josn',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(response) {
                // data	string / Object / Arraybuffer	开发者服务器返回的数据
                // statusCode	number	开发者服务器返回的 HTTP 状态码
                // header	Object
                if (response.statusCode == 200) {
                    let res = JSON.parse(response.data);
                    //这里必须使用setData，否则不进行渲染
                    _this.setData({
                        lunBoTuList: res.data
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
        })

    },
    upAdsStatusInfo: function (event) {
        var _this = this;
        var idx = event.currentTarget.dataset['idx'];
        var item = this.data.lunBoTuList[idx];
        
        
        wx.request({
            url: app.api.adsUpAdsStatusInfo, // 仅为示例，并非真实的接口地址
            data: {
                id: item.id
            },
            method: 'post',
            dataType: 'josn',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(response) {
                // data	string / Object / Arraybuffer	开发者服务器返回的数据
                // statusCode	number	开发者服务器返回的 HTTP 状态码
                // header	Object
                if (response.statusCode == 200) {
                    let url = "/pages/webView/webView?url=" + item.herf;
                    app.util.gotoPage(url);
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
                
            }
        })
    },

    gotoActView: function (event) {
        var id = event.currentTarget.dataset['id'];
        let url = "../actView/actView?id=" + id;
        app.util.gotoPage(url);
    },


    //生活地
    bindRegionChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var _this = this;
        let data = _this.data.conditionalForm;
        data.living = _this.data.conditionalData.livingList[e.detail.value[0]].data[e.detail.value[1]].value;
        this.setData({
            regionIdx: e.detail.value,
            conditionalForm: data
        })
    },
    bindRegionColumnChange: function (e) {
        var _this = this;

        if (e.detail.column > 0) {
            return;
        }

        var _this = this;
        let livingTextList = _this.data.livingTextList;
        livingTextList[1] = _this.data.livingTextList2Obj[e.detail.value]
        //只处理第一列
        _this.setData({
            livingTextList: livingTextList
        });
    },
    //状态
    bindActStatusIdxInit: function (id) {
        for (let idx = 0; idx < this.data.conditionalData.statusList.length; idx++) {
            if (this.data.conditionalData.statusList[idx].value == id) {
                this.setData({
                    statusIdx: idx
                });
                break;
            }
        }

    },
    bindActStatusChange: function (e) {
        var _this = this;
        let data = _this.data.conditionalForm;
        data.status = e.detail.value;
        this.setData({
            statusIdx: e.detail.value,
            conditionalForm: data
        })
        
    },
     //查找
    getFrom: function (e) {
        var _vueThis = this;

        wx.request({
            url: app.api.actGetSearchCondition, // 仅为示例，并非真实的接口地址
            data: { token: app.util.getLocalToken(), },
            method: 'post',
            dataType: 'josn',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(response) {
                if (response.statusCode == 200) {
                    let res = JSON.parse(response.data);
                    //生活地
                    let regionIdx = [0, 0];
                    let livingTextList1 = res['data']['conditionalData']['livingList'].map(function (v) { return v.text; });
                    let code = res['data']['conditionalForm']['living'];
                    let id1 = code.substr(0, 2);
                    let id2 = code.substr(2, 2);
                    let livingTextList2Obj = [];
                    for (let i = 0; i < res['data']['conditionalData']['livingList'].length; i++) {
                        if (res['data']['conditionalData']['livingList'][i].value.substr(0, 2) == id1) { regionIdx[0] = i; }
                        let item = res['data']['conditionalData']['livingList'][i].data.map(function (v) { return v.text; });
                        livingTextList2Obj.push(item);
                    }
                    let livingTextList2 = livingTextList2Obj[0];
                    for (let i = 0; i < res['data']['conditionalData']['livingList'][regionIdx[0]].length; i++) {
                        if (res['data']['conditionalData']['livingList'][regionIdx[0]].data[i].value.substr(2, 2) == id1) {
                            regionIdx[1] = i;
                            livingTextList2 = livingTextList2Obj[i];
                        }
                    }

                    //活动状态
                    res['data']['conditionalData']['statusTextList'] = res['data']['conditionalData']['statusList'].map(function (v) { return v.text; });
                    
                    //这里必须使用setData，否则不进行渲染
                    _vueThis.setData({
                        livingTextList: [livingTextList1, livingTextList2],
                        livingTextList2Obj: livingTextList2Obj,

                        conditionalForm: res['data']['conditionalForm'],
                        conditionalData: res['data']['conditionalData']
                    });

                    //初始化
                    //状态
                    _vueThis.bindActStatusIdxInit(res['data']['conditionalForm']['status']);


                    console.log(_vueThis.data.conditionalData);
                    console.log(_vueThis.data.conditionalForm);
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
    //更新表单
    upFrom: function (e) {
        var _vueThis = this;
        wx.showLoading({ title: '提交中…' });
        
        wx.request({
            url: app.api.actPutSearchCondition, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken(),
                data: _vueThis.conditionalForm
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
                    app.util.layerMsg(res.msg, res.code);
                    // 初始化page信息
                    _vueThis.setData({
                        activeIndex: 0,
                        sliderOffset: 0,
                        sliderLeft: 0,

                        page: 0,
                        fload_time: "null",
                        actList: []
                    });
                    // 请求数据
                    _vueThis.reloadGridItem();

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


    reloadGridItem: function() {
        var _this = this;
        wx.showLoading({ title: '加载中…' });
        
        wx.request({
            url: app.api.actGetListInfo, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken(),
                page: _this.data.page++,
                first_load_time: _this.data.fload_time
            },
            method: 'post',
            dataType: 'josn',

            success(response) {
                wx.hideLoading();
                // data	string / Object / Arraybuffer	开发者服务器返回的数据
                // statusCode	number	开发者服务器返回的 HTTP 状态码
                // header	Object
                var res = JSON.parse(response.data);
                if (response.statusCode == 200) {
                    // console.log(1);
                    _this.data.fload_time = res.first_load_time;
                } else {
                    app.util.layerMsg("获取信息失败！", 7);
                    return;
                }

                if (res.data.length == 0) {
                    app.util.layerMsg("没有更多！", 7);
                    return;
                }

                //渲染数据
                _this.setData({
                    actList: res.data
                })
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

  },
    // 选项卡
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
    tabInit: function(){
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
    }
})