// pages/friend/friend.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp().globalData;

Page({
  /**
   * 页面的初始数据
   */
    data: {
        lunBoTuList: [],

        friendList:[],
        page:0,
        ////////nav tab
        tabs: ["朋友", "条件"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,


        //////查找条件
        regionIdx: [0, 0],
        livingTextList:[],//省市
        livingTextList2Obj: [],//不全部的

        sexIdx:0,
        ageIdx:[0,0],
        heightIdx:[0,0],
        eduIdx:0,
        mStatusIdx:0,

        conditionalForm:{},
        conditionalData:{},

    },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        this.getLunBoTuList();
        this.tabInit();
        this.reloadGridItem();
        this.getFrom();
    //   console.log(app);
    //   console.log(this.data);
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
            fail(errMsg){
                console.log(errMsg);
            },
            complete(res){
                //都会执行,res参数 成功和失败一起的。
                // errMsg:"request:ok"
                // console.log(res);
            }
        })

    },
    upAdsStatusInfo: function(event) {
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


    reloadGridItem: function(){
        var _this = this;
        wx.showLoading({ title: '加载中…' });
        
        wx.request({
            url: app.api.friendGetListInfo, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken(),
                page: _this.data.page++
            },
            method: 'post',
            dataType: 'josn',
            
            success(response) {
                wx.hideLoading();
                // data	string / Object / Arraybuffer	开发者服务器返回的数据
                // statusCode	number	开发者服务器返回的 HTTP 状态码
                // header	Object
                if (response.statusCode == 200) {
                    var res = JSON.parse(response.data);
                   
                    _this.setData({
                        friendList: _this.data.friendList.concat(res.data),
                        page: _this.data.page++
                    });
                    // _this.data.page++;
                } else {
                    app.util.layerMsg("获取信息失败！");
                    return;
                }

                if (res.data.length == 0) {
                    app.util.layerMsg("没有更多！");
                    return;
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
    gotoFriendView: function (event){
        var uid = event.currentTarget.dataset['uid'];
        let url ="../friendView/friendView?fid="+uid;
        app.util.gotoPage(url);
    },


    ///////////////查找条件
  //生活地
    bindRegionChange: function (e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        var _this = this;
        let data = _this.data.conditionalForm;
        data.living = _this.data.conditionalData.livingList[e.detail.value[0]].data[e.detail.value[1]].value;
        this.setData({
            regionIdx: e.detail.value,
            conditionalForm: data
        })
    },
    bindRegionColumnChange:function(e){
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
  //性别
    bindSexIdxInit: function (id) {
        for (let idx = 0; idx < this.data.conditionalData.sexList.length; idx++){
            if (this.data.conditionalData.sexList[idx].value==id){
                this.setData({
                    sexIdx: idx
                });
                break;              
            }
        }
        
    },
    bindSexChange: function (e) {
        var _this = this;
        let data = _this.data.conditionalForm;
        data.sex = _this.data.conditionalData.sexList[e.detail.value].value;
        this.setData({
            sexIdx: e.detail.value,
            conditionalForm:data
        })
    },

  //年龄
    bindAgeChange: function (e) {
        var _this = this;
        let data = _this.data.conditionalForm;
        data.age1 = _this.data.conditionalData.ageList[0][e.detail.value[0]];
        data.age2 = _this.data.conditionalData.ageList[0][e.detail.value[1]];
        this.setData({
            ageIdx: e.detail.value,
            conditionalForm: data
        })
    },
    bindAgeColumnChange: function (e) {
        return;
        if (e.detail.column>0){
            return;
        }
        let data = _this.data.conditionalData;
        data.ageList = [this.data.conditionalData.ageList[0], this.data.conditionalData.ageList[0].slice(1 + e.detail.value)];
        //只处理第一列
        let opt={
            ageIdx: this.data.ageIdx,
            conditionalData: data
        };
        
        this.setData(opt);
    },

  //身高  
    bindHeightChange: function(e) {
        var _this = this;
        let data = _this.data.conditionalForm;
        data.height1 = _this.data.conditionalData.heightList[0][e.detail.value[0]];
        data.height2 = _this.data.conditionalData.heightList[0][e.detail.value[1]];
        this.setData({
            heightIdx: e.detail.value,
            conditionalForm: data
        })
    },
    bindHeightColumnChange: function (e) {
        return;
        if (e.detail.column > 0) {
            return;
        }
        let data = _this.data.conditionalData;
        data.heightList = [this.data.conditionalData.heightList[0], this.data.conditionalData.heightList[0].slice(1 + e.detail.value)];
        //只处理第一列
        let opt = {
            heightIdx: this.data.heightIdx,
            conditionalData: data
        };

        this.setData(opt);
    },

  // 学历
    bindEduIdxInit: function (id) {
        for (let idx = 0; idx < this.data.conditionalData.eduList.length; idx++) {
            if (this.data.conditionalData.eduList[idx].value == id) {
                this.setData({
                    eduIdx: idx
                });
                break;
            }
        }
    },
    bindEduChange: function (e) {
        var _this = this;
        let data = _this.data.conditionalForm;
        data.edu = _this.data.conditionalData.eduList[e.detail.value].value;
        this.setData({
            eduIdx: e.detail.value,
            conditionalForm: data
        })
    },
  // 收入
    bindIncomeInput:function(e){
        var _this = this;
        let data = _this.data.conditionalForm;
        data.income = e.detail.value;
        this.setData({
            conditionalForm: data
        })
    },
  //状态
    bindMStatusIdxInit: function (id) {
        for (let idx = 0; idx < this.data.conditionalData.ownnessList.length; idx++) {
            if (this.data.conditionalData.ownnessList[idx].value == id) {
                this.setData({
                    mStatusIdx: idx
                });
                break;
            }
        }
    },
    bindMStatusChange: function (e) {
        var _this = this;
        let data = _this.data.conditionalForm;
        data.ownness = _this.data.conditionalData.ownnessList[e.detail.value].value;
        this.setData({
            mStatusIdx: e.detail.value,
            conditionalForm: data
        })
    },
  //查找
    getFrom: function (e) {
        var _vueThis = this;

        wx.request({
            url: app.api.friendGetSearchCondition, // 仅为示例，并非真实的接口地址
            data: { token: app.util.getLocalToken(),},
            method: 'post',
            dataType: 'josn',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(response) {
                if (response.statusCode == 200) {
                    let res = JSON.parse(response.data);
                    //生活地
                    let regionIdx =[0,0];
                    let livingTextList1 = res['data']['conditionalData']['livingList'].map(function (v) { return v.text; });
                    let code = res['data']['conditionalForm']['living'];
                    let id1 = code.substr(0, 2);
                    let id2 = code.substr(2, 2);
                    let livingTextList2Obj=[];
                    for (let i = 0; i < res['data']['conditionalData']['livingList'].length; i++) {
                        if (res['data']['conditionalData']['livingList'][i].value.substr(0,2) == id1) { regionIdx[0]=i;}
                        let item = res['data']['conditionalData']['livingList'][i].data.map(function(v){return v.text;});
                        livingTextList2Obj.push(item);
                    }
                    let livingTextList2 = livingTextList2Obj[0];
                    for (let i = 0; i < res['data']['conditionalData']['livingList'][regionIdx[0]].length; i++) {
                        if (res['data']['conditionalData']['livingList'][regionIdx[0]].data[i].value.substr(2,2) == id1) { 
                            regionIdx[1] = i; 
                            livingTextList2 = livingTextList2Obj[i];
                        }
                    }

                    //性别
                    res['data']['conditionalData']['sexTextList'] = res['data']['conditionalData']['sexList'].map(function (v) { return v.text; });
                    //年龄
                    let ageList=[];
                    for(let i=18;i<65;i++){
                        ageList.push(i);
                    }
                    res['data']['conditionalData']['ageList'] = [ageList, ageList];
                    let t_ageIdx = [
                        ageList.indexOf(parseInt(res['data']['conditionalForm']['age1'])),
                        ageList.indexOf(parseInt(res['data']['conditionalForm']['age2']))
                    ];
                    //身高
                    let heightList = [];
                    for (let i = 100; i < 250; i++) {
                        heightList.push(i);
                    }
                    res['data']['conditionalData']['heightList'] = [heightList, heightList];
                    let t_heightIdx=[
                        heightList.indexOf(parseInt(res['data']['conditionalForm']['height1'])),
                        heightList.indexOf(parseInt(res['data']['conditionalForm']['height2']))
                    ];
                    // 学历
                    res['data']['conditionalData']['eduTextList'] = res['data']['conditionalData']['eduList'].map(function (v) { return v.text; });
                    //收入

                    // 状态
                    res['data']['conditionalData']['mStatusTextList'] = res['data']['conditionalData']['ownnessList'].map(function (v) { return v.text; });
                    //这里必须使用setData，否则不进行渲染
                    _vueThis.setData({
                        livingTextList: [livingTextList1, livingTextList2],
                        livingTextList2Obj: livingTextList2Obj,

                        ageIdx: t_ageIdx,
                        heightIdx: t_heightIdx,

                        conditionalForm : res['data']['conditionalForm'],
                        conditionalData : res['data']['conditionalData']
                    });

                    //初始化
                    //性别
                    _vueThis.bindSexIdxInit(res['data']['conditionalForm']['sex']);

                    //学历
                    _vueThis.bindEduIdxInit(res['data']['conditionalForm']['edu']);
                    //状态
                    _vueThis.bindMStatusIdxInit(res['data']['conditionalForm']['ownness']);

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

        console.log(_vueThis.data.conditionalForm);
        // return;
        wx.showLoading({ title: '提交中…' });
        wx.request({
            url: app.api.friendSetSearchCondition, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken(),
                data: _vueThis.data.conditionalForm
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
                        page:0,
                        activeIndex: 0,
                        sliderOffset: 0,
                        sliderLeft: 0,
                        friendList:[]
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
        this.data.page=0;
        this.data.friendList=[];
        this.reloadGridItem();
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
    ///////////////// 选项卡
    tabClick: function (e) {
        // console.log(e.currentTarget);
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
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
    }
    ///////////
})