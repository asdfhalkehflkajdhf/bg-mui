// pages/setting/photo/photo.js
var app = getApp().globalData;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        /////////编辑////////
        list: [],//页面显示,上传的内容
        imgCount:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    delImage: function (e) {
        //console.log("endTime - startTime = " + (this.endTime - this.startTime));
        var _this = this;
        let idx = e.currentTarget.dataset.idx;
        _this.data.list.splice(idx, 1);

        _this.setData({
            list: _this.data.list
        });
    },
    chooseImage: function (e) {
        var _this = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            count: 3,
            success: function (res) {
                console.log(res);
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                let list = _this.data.list.concat(res.tempFilePaths).slice(0, 9);

                _this.setData({
                    list: list
                });
            }
        })

    },

    previewImage: function (e) {
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.list // 需要预览的图片http链接列表
        })
    },
    callBackRes: [],
    upOK:function(){
        let upList = this.callBackRes.filter(item => item.upStatus > 0).map(item => item.upStatus);
        let imgCount = this.data.imgCount + upList.length;
        this.setData({
            imgCount: imgCount
        });
    },
    upFrom: function () {
        var _vueThis = this;
        let fileList = _vueThis.data.list;
        // check from
        if (fileList.length < 1 ) {
            app.util.layerMsg("内容为空！", 2);
            return false;
        }

        // 开始上传
        // 上传图片
        // FormData 对象
        var formObj = { token: app.util.getLocalToken(), uid: app.util.getLocalID(), page_id: 1 };
        // 发起上传请求
        app.util.uploadImgOneByOne(fileList, 0, formObj, _vueThis.upOK, _vueThis.callBackRes);

    },
    reloadGridItemCount: function(){
        let _this=this;
        wx.showLoading({ title: '加载中…' });
        wx.request({
            url: app.api.userImgGetCount, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken(),
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
                    // console.log(response);
                    const res = JSON.parse(response.data);
                    //解析结果
                    app.util.layerMsg(res.msg, res.code);
                    if (res.code == 0) {
                        _this.setData({
                            imgCount:res.data
                        })
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
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.reloadGridItemCount();
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