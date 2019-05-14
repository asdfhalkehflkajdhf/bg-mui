// pages/setBindEmail/setBindEmail.js
var app = getApp().globalData;
var localToken = app.util.getLocalToken();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        boundEmailForm: {
            token: localToken,
            email: "",
            newEmail: "",
            checkCode: ""
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getEmail();
    },

    bindEmailInput: function (e) {
        this.data.boundEmailForm.newEmail = e.detail.value;
    },
    getEmail: function () {
        //发送请求
        var _vueThis = this
        wx.request({
            url: app.api.userEmailGet, // 仅为示例，并非真实的接口地址
            // url:url,
            data: { token: localToken},
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
                    //解析结果
                    if (res.code == 0) {
                        // {code:0,msg:""}
                        let data = _vueThis.data.boundEmailForm;
                        data.email = res.data;
                        data.newEmail = res.data;
                        _vueThis.setData({
                            boundEmailForm:data
                        });

                    } else {
                        app.util.layerMsg(res.msg, res.code);
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

    checkForm: function () {
        if (this.data.boundEmailForm.newEmail.length < 1) {
            app.util.layerMsg("邮箱不能为空！");
            return false;
        } else if (this.data.boundEmailForm.newEmail == this.data.boundEmailForm.email) {
            app.util.layerMsg("同原来邮箱一样！");
            return false;
        }
        return true;
    },
    formSubmit: function (e) {
        var _vueThis = this;
        //获得表单数据
        var objData = e.detail.value;
        _vueThis.data.boundEmailForm.checkCode = objData.checkCode;
        _vueThis.data.boundEmailForm.newEmail = objData.email;

        _vueThis.boundEmail();
    },
    boundEmail: function () {
        var _vueThis = this;
        
        if (!_vueThis.checkForm()) {
            return false;
        };
        wx.showLoading({ title: '提交中…' });
        wx.request({
            url: app.api.userEmailSet, // 仅为示例，并非真实的接口地址
            // url:url,
            data: _vueThis.data.boundEmailForm,
            method: 'post',
            dataType: 'josn',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(response) {
                wx.hideLoading();
                // data	string / Object / Arraybuffer	开发者服务器返回的数据
                // statusCode	number	开发者服务器返回的 HTTP 状态码
                // header	Object
                if (response.statusCode == 200) {
                    let res = JSON.parse(response.data);
                    //解析结果
                    //解析结果
                    app.util.layerMsg(res.msg, res.code);
                    if (res.code == 0) {
                        _vueThis.data.boundEmailForm.checkCode = "";
                        wx:wx.navigateBack({
                            delta: 1,
                        });
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
    getCheckCodeEmail: function () {
        var _vueThis = this;
        if (!_vueThis.checkForm()) {
            return false;
        };
        wx.showLoading({ title: '提交中…' });
        wx.request({
            url: app.api.userEmailCodeSend, // 仅为示例，并非真实的接口地址
            // url:url,
            data: _vueThis.data.boundEmailForm,
            method: 'post',
            dataType: 'josn',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(response) {
                wx.hideLoading();
                // data	string / Object / Arraybuffer	开发者服务器返回的数据
                // statusCode	number	开发者服务器返回的 HTTP 状态码
                // header	Object
                if (response.statusCode == 200) {
                    let res = JSON.parse(response.data);
                    //解析结果
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