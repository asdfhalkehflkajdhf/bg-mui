var app = getApp().globalData;

Component({
    /**
   * 组件的属性列表,外部数据
   */
    properties: {
        apiPath: {
            type: String,
            value: '',
        },
        //组件数据一般都 在data中设置，其他位置不能进行初始化和定义
        callBackRes: {
            type: null,
            value: [],
        },
    },

  /**
   * 组件的初始数据，内部数据
   */
    data: {
        formats: {},
        bottom: 0,
        placeholder: '开始输入...',
        _focus: false,
        content:"",


    },
    //图片上传
    
    methods:{
        getApiPath(){
            if(this.properties.apiPath=="selfIntr"){
                return app.api.userSelfIntrSet;
            } else if (this.properties.apiPath == "otherIntr"){
                return app.api.userOtherIntrSet;
            }

            return "";
        },
        contentInit(){
            if (this.properties.apiPath == "selfIntr") {
                this.editorCtx.setContents({ html: app.auth.data.selfInfo.selfIntr});
            } else if (this.properties.apiPath == "otherIntr") {
                this.editorCtx.setContents({ html: app.auth.data.selfInfo.otherIntr });
            }
        },
        userIntrSet() {
            var _this = this;

            wx.showLoading({ title: '加载中…' });
            wx.request({
                url: _this.getApiPath(), // 仅为示例，并非真实的接口地址
                data: {
                    token: app.util.getLocalToken(),
                    intr: _this.data.content,
                    uid: app.util.getLocalID(),
                    res_list: app.auth.data.selfInfo.res_list
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
        _onEditorReady() {
            const that = this
            //获取当前组件元素
            wx.createSelectorQuery().in(this).select('#editor').context(function (res) {
                that.editorCtx = res.context;
                that.contentInit();
            }).exec();

        },
        //获取文本数据,并提交
        submit(){
            let _this = this;
            this.editorCtx.getContents({
                success(res) {
                    _this.data.content = res.html;
                    console.log(_this.data.content);
                    _this.userIntrSet();
                }
            });
        },
        
    /**/

        undo() {
            this.editorCtx.undo()
        },
        redo() {
            this.editorCtx.redo()
        },
        format(e) {
            let { name, value } = e.target.dataset
            if (!name) return
            // console.log('format', name, value)
            this.editorCtx.format(name, value)

        },
        onStatusChange(e) {
            const formats = e.detail
            this.setData({ formats })
        },
        insertDivider() {
            this.editorCtx.insertDivider({
                success: function () {
                    console.log('insert divider success')
                }
            })
        },
        clear() {
            this.editorCtx.clear({
                success: function (res) {
                    console.log("clear success")
                }
            })
        },
        removeFormat() {
            this.editorCtx.removeFormat()
        },
        insertDate() {
            const date = new Date()
            const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
            this.editorCtx.insertText({
                text: formatDate
            })
        },

        insertImage() {
            const that = this
            wx.chooseImage({
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                count: 1,
                success: function (res) {
                    //上传图片
                    that.upImg(res.tempFilePaths);
                }
            })
        },

        
        upImgOk: function (imgObjList) {
            // console.log(imgObjList)
            let that = this;
            for (let i=0;i<imgObjList.length; ++i){
                let item = imgObjList[i];
                console.log(item)
                if (item.upStatus>0){
                    //追加到img list
                    app.auth.data.selfInfo.res_list.push(item.upStatus);
                    ////插入图片
                    that.editorCtx.insertImage({
                        src: item.src,
                        data: {
                            id: item.upStatus,
                            role: 'god'
                        },
                        success: function () {
                            console.log('insert image success')
                        },
                        fail:function() {
                            console.log('insert image fail')
                        },
                        complete: function () {
                            console.log('insert image complete')
                        }
                    })
                }
            }

        },
        upImg: function (imgPathList) {
            const imgUpEventDetail = { imgList: imgPathList } // detail对象，提供给事件监听函数
            const imgUpEventOption = {} // 触发事件的选项
            this.triggerEvent('imgup', imgUpEventDetail, imgUpEventOption)
        },

    }
})
