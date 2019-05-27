// pages/setting/otherIntr/otherIntr.js
var app = getApp().globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        apiPath: "otherIntr"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    callBackRes: [],
    onImgUpOk: function () {
        console.log(this.callBackRes);
        this.selectComponent("#eidtor").upImgOk(this.callBackRes);
    },
    onImgUpEvent: function (e) {
        var _this = this;
        //  获取上传文件列表
        let imgPathList = e.detail.imgList;
        // check from
        if (imgPathList.length < 1) {
            app.util.layerMsg("内容为空！", 2);
            return false;
        }

        // 开始上传
        // 上传图片
        // FormData 对象
        var formObj = { token: app.util.getLocalToken(), uid: app.util.getLocalID(), page_id: 1 };
        // 发起上传请求
        app.util.uploadImgOneByOne(imgPathList, 0, formObj, _this.onImgUpOk, _this.callBackRes);
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