// pages/setting/baseInfo/baseInfo.js
var app = getApp().globalData;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //
        nick_name: app.auth.data.selfInfo.nick_name,
        height: app.auth.data.selfInfo.height,
        weight: app.auth.data.selfInfo.weight,
        income: app.auth.data.selfInfo.income,
        profession: app.auth.data.selfInfo.profession,
        tryst_expect: app.auth.data.selfInfo.tryst_expect,


        //////查找条件
        regionIdx: [0, 0],
        livingTextList: [],//省市
        livingTextList2Obj: [],//不全部的

        ownnessList:[],
        mStatusTextList:[],
        
        mStatusIdx: 0,
    },


    dataInit:function(){



        this.setData({
            nick_name: app.auth.data.selfInfo.nick_name,
            height: app.auth.data.selfInfo.height,
            weight: app.auth.data.selfInfo.weight,
            income: app.auth.data.selfInfo.income,
            profession: app.auth.data.selfInfo.profession,
            tryst_expect: app.auth.data.selfInfo.tryst_expect,

            livingList: app.auth.data.livingList,//原始数据
            livingTextList: app.auth.data.livingTextList, //变动数据
            livingTextList2Obj: app.auth.data.livingTextList2Obj,//市一级所有数据
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.dataInit();

        this.userLivingPlaceInit();
        this.userMaritalStatusGet();
        console.log(this.data);
        
    },


    ///////////////查找条件
    //生活地
    bindRegionChange: function (e) {
        var _this = this;
        // console.log('picker发送选择改变，携带值为', e.detail.value);
        
        app.auth.data.selfInfo.user_living_place_id = _this.data.livingList[e.detail.value[0]].data[e.detail.value[1]].value;
        this.setData({
            regionIdx: e.detail.value,
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
    //昵称
    bindNickNameChange: function (e) {
        app.auth.data.selfInfo.nick_name = e.detail.value;
    },

    //体重
    bindWeightChange: function (e) {
        app.auth.data.selfInfo.weight = e.detail.value;
    },

    //身高  
    bindHeightChange: function (e) {
        app.auth.data.selfInfo.height = e.detail.value;
    },
    
    // 收入
    bindIncomeInput: function (e) {
        var _this = this;
        app.auth.data.selfInfo.income = e.detail.value;
    },
    bindProfessionInput:function(e){
        app.auth.data.selfInfo.profession = e.detail.value;
    },
    bindTrystInput: function (e) {
        app.auth.data.selfInfo.tryst_expect = e.detail.value;
    },
    //状态
    bindMStatusIdxInit: function (id) {
        for (let idx = 0; idx < this.data.ownnessList.length; idx++) {
            if (this.data.ownnessList[idx].value == id) {
                this.setData({
                    mStatusIdx: idx
                });
                break;
            }
        }

    },
    bindMStatusChange: function (e) {
        var _this = this;
        app.auth.data.selfInfo.user_marital_status_id = e.detail.value;;

        this.setData({
            mStatusIdx: e.detail.value,
            
        })
        console.log(this.data.conditionalForm);
    },


    userLivingPlaceInit() {
        var _this = this;

        let resData = app.auth.data.livingList;
        
        //生活地
        let regionIdx = [0, 0];
        let code = app.auth.data.selfInfo.user_living_place_id;
        let id1 = code.substr(0, 2);
        let id2 = code.substr(2, 2);
        
        for (let i = 0; i < resData.length; i++) {
            if (resData[i].value.substr(0, 2) == id1) { regionIdx[0] = i; break;}
        }
        for (let i = 0; i < resData[regionIdx[0]].length; i++) {
            if (resData[regionIdx[0]].data[i].value.substr(2, 2) == id1) {regionIdx[1] = i;break;}
        }

        console.log(regionIdx);
        let livingTextList = _this.data.livingTextList;
        livingTextList[1] = _this.data.livingTextList2Obj[regionIdx[0]]

        _this.setData({
            livingTextList: livingTextList,
            regionIdx: regionIdx
        });

    },
    userMaritalStatusGet() {
        var _this = this;
        wx.request({
            url: app.api.userMaritalStatusGet, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken()
            },
            method: 'post',
            dataType: 'josn',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(response) {
                if (response.statusCode == 200) {
                    let res = JSON.parse(response.data);
                    //这里必须使用setData，否则不进行渲染
                    _this.setData({
                        ownnessList: res.data,
                        mStatusTextList: res.data.map(function (v) { return v.text; })
                    })
                    _this.bindMStatusIdxInit(app.auth.data.selfInfo.ownness);
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
        });
    },


    userBaseSet: function() {
        var _this = this;
        wx.showLoading({ title: '提交中…' });
        wx.request({
            url: app.api.userBaseSet, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken(),
                nick_name: app.auth.data.selfInfo.nick_name,
                height: app.auth.data.selfInfo.height,
                weight: app.auth.data.selfInfo.weight,
                living_place: app.auth.data.selfInfo.user_living_place_id,
                profession: app.auth.data.selfInfo.profession,
                income: app.auth.data.selfInfo.income,
                tryst_expect: app.auth.data.selfInfo.tryst_expect,
                marital_status: app.auth.data.selfInfo.user_marital_status_id,
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
        this.bindMStatusIdxInit(app.auth.data.selfInfo.user_marital_status_id);
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