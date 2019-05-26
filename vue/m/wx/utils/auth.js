var api = require("api.js");
var util = require("util.js");
module.exports = {
    data: {
        // navListRight:[
        // 	{name:"登陆/注册",url:"#", landing:false}
        // 	,{name:"退出",url:"#", landing:true}
        // ],
        //登陆状态
        landing: false,
        uid: -1,
        token:"",

		loginForm: {
            phone: "",
            pw: ""
        },
        registForm: {
            phone: "",
            pw: "",
            checkCode: ""
        },
        forgetForm: {
            phone: "",
            email: ""
        },

        //个人信息
        selfInfo:{},
        eduList:[],
                   
        livingList:[],//获取的原始数据    
        livingTextList: [],//省，市，其中省不变动，市会变动
        livingTextList2Obj: [],//对应所有省的市list
    },
    //获取user info
    getUserInfo: function () {
        var _this = this;
        // wx.showLoading({ title: '提交中…' });
        wx.request({
            url: api.userInfoGet, // 仅为示例，并非真实的接口地址
            data: {
                token: _this.data.token,
                uid: _this.data.uid
            },
            method: 'post',
            dataType: 'josn',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(response) {
                // wx.hideLoading();
                if (response.statusCode == 200) {
                    let res = JSON.parse(response.data);
                    //解析结果
                    if (res.code == 0) {
                        _this.data.selfInfo = res.data.res;
                        _this.data.eduList = res.data.eduList;
                    } else {
                        util.layerMsg(res.msg, res.code);
                    }

                } else {
                    util.layerMsg(response.statusText);
                }

            },
            fail(errMsg) {
                // wx.hideLoading();
                console.log(errMsg);
            },
            complete(res) {
                //都会执行,res参数 成功和失败一起的。
                // errMsg:"request:ok"
                // console.log(res);

            }
        });
    },
    userLivingPlaceGet() {
        var _this = this;
        wx.request({
            url: api.userLivingPlaceGet, // 仅为示例，并非真实的接口地址
            data: {
                token: _this.data.token
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
                    //生活地
                    let regionIdx = [0, 0];
                    let livingTextList1 = res.data.map(function (v) { return v.text; });
                    
                    let livingTextList2Obj = [];
                    for (let i = 0; i < res.data.length; i++) {
                        let item = res.data[i].data.map(function (v) { return v.text; });
                        livingTextList2Obj.push(item);
                    }
                    let livingTextList2 = livingTextList2Obj[0];

                    
                    _this.data.livingList= res.data;
                    _this.data.livingTextList= [livingTextList1, livingTextList2];
                    _this.data.livingTextList2Obj= livingTextList2Obj;

                    // console.log(_this.data.livingList);
                } else {
                    util.layerMsg(response.statusText);
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
    logout: function () {
        //发送请求
        var _vueThis = this;
        wx.showLoading({ title: '加载中…' });
        wx.request({
            url: api.authLogout, // 仅为示例，并非真实的接口地址
            data: {
                token: util.getLocalToken(),
                uid: _vueThis.data.uid
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
                        // {code:0,msg:""}
                        _vueThis.setLanding(false);
                        // 保存状态//删除本地token
                        util.setLocalID(-1);
                        util.setLocalToken("");

                        //修改菜单显示状态
                        
                        //修改导航栏状态
                        _vueThis.setLanding(false);

                        //跳转到页面
                        wx.navigateTo({
                            url: "/pages/friend/friend"
                        })
                    }

                } else {
                    util.layerMsg(response.statusText);
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
    setLoginForm:function(u,p){
        this.data.loginForm.phone=u;
        this.data.loginForm.pw=p;
    },
    login: function () {
        //发请请求登陆
        var _vueThis = this;
        wx.showLoading({ title: '加载中…' });
        wx.request({
            url: api.authLogin, // 仅为示例，并非真实的接口地址
            data: _vueThis.data.loginForm,
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
                        // 保存状态
                        util.setLocalID(res.data.id);
                        util.setLocalToken(res.data.token);
                        _vueThis.data.uid=res.data.id;
                        _vueThis.data.token = res.data.token;
                        
                        console.log(util.getLocalToken(), util.getLocalID());

                        //修改导航栏状态
                        _vueThis.setLanding(true);
                        if (res.data.isa == 1) {
                            //是管理员
                        }

                        // 获取个人信息
                        _vueThis.getUserInfo();
                        _vueThis.userLivingPlaceGet();

                        //跳转到上一个页面
                        wx.navigateBack({
                            delta: 1
                        })

                    } else {
                        util.layerMsg(res.msg, res.code);
                    }


                } else {
                    util.layerMsg(response.statusText);
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
    setRegistForm: function(u,p,c){
        this.data.registForm.phone=u;
        this.data.registForm.pw=p;
        this.data.registForm.checkCode=c;
    },
    regist: function () {
        var _vueThis = this;
        wx.showLoading({ title: '加载中…' });
        wx.request({
            url: api.authRegist, // 仅为示例，并非真实的接口地址
            data: _vueThis.data.registForm,
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
                    util.layerMsg(res.msg, res.code);
                } else {
                    util.layerMsg(response.statusText);
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
    setForgetForm: function (u, e) {
        this.data.registForm.phone = u;
        this.data.registForm.email = e;
    },
    forget: function () {
        var _vueThis = this;
        wx.showLoading({ title: '加载中…' });
        wx.request({
            url: api.authForget, // 仅为示例，并非真实的接口地址
            data: _vueThis.data.forgetForm,
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
                    util.layerMsg(res.msg, res.code);
                } else {
                    util.layerMsg(response.statusText);
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
    getCheckCode: function () {
        var _vueThis = this;
        wx.showLoading({ title: '加载中…' });
        wx.request({
            url: api.authForget, // 仅为示例，并非真实的接口地址
            data: _vueThis.data.registForm,
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
                    util.layerMsg(res.msg, res.code);
                } else {
                    util.layerMsg(response.statusText);
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

    upLoginStatus: ()=> {
        //发送请求
        var _vueThis = this;
        wx.request({
            url: api.authGetLoginStatus, // 仅为示例，并非真实的接口地址
            data: { token: util.getLocalToken()},
            method: 'post',
            dataType: 'josn',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(response) {
                
                if (response.statusCode == 200) {
                    let res = JSON.parse(response.data);
                    //解析结果
                    if (res.code != 0) {
                        //修改导航栏状态
                        _vueThis.setLanding(false);

                        // 保存状态//删除本地token
                        util.setLocalID(-1);
                        util.setLocalToken("");
                    } else {
                        //修改导航栏状态
                        _vueThis.setLanding(true);

                        // 保存状态//删除本地token
                        util.setLocalID(res.data.id);
                        // setLocalToken("");

                    }
                    if (res.data.isa) {
                        //修改菜单显示状态
                        // navMenuLeft.modMenuStatus(res.data.nav);
                    }
                    
                } else {
                    util.layerMsg(response.statusText);
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
    setLanding: function (status) {
        if (this.data.landing == status) {
            return;
        }
        this.data.landing = status;
    },
    getLanding: function () {
        return this.data.landing;
    },

};



    
