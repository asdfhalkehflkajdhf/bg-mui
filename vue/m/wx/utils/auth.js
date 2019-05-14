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
        eduList:[]
    },
    //获取user info
    getUserInfo: function () {
        var _this = this;
        // wx.showLoading({ title: '提交中…' });
        wx.request({
            url: api.userInfoGet, // 仅为示例，并非真实的接口地址
            data: {
                token: util.getLocalToken(),
                uid: util.getLocalID(),
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
                        _this.dtat.eduList = res.data.eduList;
                    } else {
                        app.util.layerMsg(res.msg, res.code);
                    }

                } else {
                    app.util.layerMsg(response.statusText);
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
                        // 获取个人信息
                        _vueThis.getUserInfo();
                        //修改导航栏状态
                        _vueThis.setLanding(true);
                        if (res.data.isa == 1) {
                            //是管理员
                        }
                        //
                        // 保存状态
                        util.setLocalID(res.data.id);
                        util.setLocalToken(res.data.token);

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



    
