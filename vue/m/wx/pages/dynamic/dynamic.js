// pages/dynamic/dynamic.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
    data: {
        //显示列表内容
        dynamicList: [],
        
        floadTime: "null",
        page: 0,

        /////////编辑////////
        list: [],//页面显示
        content: "",

////////////////////////////////
        tabs: ["动态", "添加"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0
    },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        this.tabInit();
        this.reloadGridItem();
    },


    gotoFriendView: function (event) {
        var uid = event.currentTarget.dataset['uid'];
        let url = "../friendView/friendView?fid=" + uid;
        app.util.gotoPage(url);
    },
    upVar: function(floadTime, data) {
        let _this = this;
        _this.data.floadTime = floadTime;
        let dl = _this.data.dynamicList.concat(data);

        _this.setData({
            dynamicList:dl
        });
    },

    reloadGridItem: function(){
        let _this=this;
        wx.showLoading({ title: '加载中…' });
        wx.request({
            url: app.api.dynamicGetListInfo, // 仅为示例，并非真实的接口地址
            data: {
                token: app.util.getLocalToken(),
                page: _this.data.page++,
                floadTime: _this.data.floadTime
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
                    if (res.data.length == 0) {
                        app.util.layerMsg("没有更多！", 7);
                        return;
                    }
                    //这里必须使用setData，否则不进行渲染
                    _this.upVar(res.floadTime, res.data);
                    
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
    viewImg: function (e) {
        let dlidx = e.currentTarget.dataset['dlidx'];
        let imgidx = e.currentTarget.dataset['imgidx'];
        let imgObj = this.data.dynamicList[dlidx].imgObj;
        console.log(imgObj);
        console.log(e);
        let files = imgObj.data.map(function (v) { return v.src; });

        wx.previewImage({
            current: files[imgidx], // 当前显示图片的http链接
            urls: files // 需要预览的图片http链接列表
        })
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

      this.data.page = 0;
      this.data.dynamicList = [];
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
    // 选项卡
    tabClick: function (e) {
        console.log(e.currentTarget);
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
    },
    //////////////////

    bindContentInput: function (e) {
        
        this.setData({
            content: e.detail.value
        })

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


    ///////////发表动态
    upDyn: function() {
        
        let upList = this.callBackRes.filter(item => item.upStatus > 1).map(item => item.upStatus);

        var _vueThis = this;
        wx.showLoading({ title: '提交中…' });
        wx.request({
            url: app.api.dynamicAdd, // 仅为示例，并非真实的接口地址
            // url:url,
            data: {
                token: app.util.getLocalToken(),
                content: _vueThis.data.content,
                list: JSON.stringify(upList)
            },
            method: 'post',
            dataType: 'josn',
            success(response) {
                wx.hideLoading();
                // data	string / Object / Arraybuffer	开发者服务器返回的数据
                // statusCode	number	开发者服务器返回的 HTTP 状态码
                // header	Object
                if (response.statusCode == 200) {
                    let res = JSON.parse(response.data);
                    //这里必须使用setData，否则不进行渲染
                    if (res.code == 0) {
                        //清空内容，重新加载
                        _vueThis.setData({
                            list: [],
                            content: "",

                            floadTime: "null",
                            page: 0,
                            dynamicList:[]
                        });
                        _vueThis.reloadGridItem();
                    }else{
                        app.util.layerMsg(res.msg, res.code);    
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
                
            }
        });

    },
    callBackRes:[],
    upFrom:function() {
        var _vueThis = this;
        let fileList = _vueThis.data.list;
        
        // check from
        if (fileList.length < 1 && _vueThis.data.content.length < 1) {
            app.util.layerMsg("内容为空！", 2);
            return false;
        }

        // 开始上传
        
        if (fileList.length < 1) {
            // 只上传文本
            _vueThis.upDyn();
        }else{
            // 上传图片
            // FormData 对象
            var formObj = { token: app.util.getLocalToken(), uid: app.util.getLocalID(), page_id: 3 };
            // 发起上传请求
            app.util.uploadImgOneByOne(fileList, 0, formObj, _vueThis.upDyn, _vueThis.callBackRes);
        }

    },

    
 


})