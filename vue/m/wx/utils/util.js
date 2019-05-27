var api = require("api.js");
//上传方法
/**
   * 采用递归的方式上传多张
   */
function uploadImgOneByOne(imgList, idx, formData, callBackFunc, callBackRes) {
    
    wx.showLoading({ title: '正在上传第' + idx + '张', });
    let upRes = { upStatus: -1, src:"" };
    const uploadTask = wx.uploadFile({
        url: api.userImgUp, //仅为示例，非真实的接口地址
        filePath: imgList[idx],
        name: "file",
        formData: formData,
        success: function (response) {
            wx.hideLoading();
            if (response.statusCode == 200) {
                let res = JSON.parse(response.data);
                if (res.code) {
                    // app.util.layerMsg(res.msg, res.code);
                    // that.data.upStatus.push(0);

                } else {
                    //// 有上传成功，更新res_list
                    // that.data.upStatus.push(1);
                    // 因为只是一张一张的上传，所以data中中人有一个list不需要使用for
                    let key = res.data.ok[0];
                    let value = res.data.msg[key];
                    upRes.upStatus = value.imgId;
                    upRes.src = value.src;

                }
            } else {
                // app.util.layerMsg(response.statusText);
            }


        },
        fail: function (response) {
            wx.hideLoading();
            // that.data.upStatus.push(0);
        },
        complete: function (response) {
            callBackRes.push(upRes);
            console.log(callBackRes);
            idx=idx+1;
            if (idx < imgList.length) {
                //单个上传完成回调

                //递归调用，上传下一张
                uploadImgOneByOne(imgList, idx, formData, callBackFunc, callBackRes);
            } else {
                //全部上传完成回调
                // that.upDyn();
                if (callBackFunc!=null){
                    callBackFunc();
                }
                
            }
        }
    });
    // uploadTask.onProgressUpdate((res) => {
    //     upRes.res=res;
    //     // console.log('上传进度', res.progress)
    //     // console.log('已经上传的数据长度', res.totalBytesSent)
    //     // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    // });

}

//////////////////登录状态
var BoyGIDKey = 'BoyGID';
function setLocalID(id) {
    wx.setStorageSync(BoyGIDKey,id);
}
function getLocalID() {
    var BoyGIDVal = wx.getStorageSync(BoyGIDKey);
    // console.log(BoyGIDVal);
    if (BoyGIDVal == null) {
        setLocalID("");
        return "";
    } else {
        return BoyGIDVal;
    }
}


var BoyGTokenKey = 'BoyGToken';
function setLocalToken(token) {
    wx.setStorageSync(BoyGTokenKey,token);
}
function getLocalToken() {
    var BoyGTokenVal = wx.getStorageSync(BoyGTokenKey);
    
    if (BoyGTokenVal == null) {
        // console.log("get BoyGToken is null");
        setLocalToken("");
        return "";
    } else {
        // console.log("get BoyGToken is :", BoyGTokenVal);
        return BoyGTokenVal;
    }
}
function removeLocalToken() {
    wx.setStorageSync(BoyGTokenKey,"");
}

function layerMsg(msg, code) {
	/*
	code 0,1,2,....
	icon_id: 1,2,3,..
	*/

    //没有定义的情况：7
    if (code == undefined || code == null || code ==NaN) { code = 7; }

    // icon_id 默认为1，表示成功
    let icon_id = "/res/img/status/success.png";
    if (code > 2) {
        icon_id = "/res/img/status/warning.png";
    } else if (code == 1 || code == 2) {
        icon_id = "/res/img/status/error.png";
    }

    // 7警告
    // parent.layer.msg(msg, {icon:icon_id});
    wx.showToast({
        title: msg,
        image: icon_id,
        duration: 2000
    })
    
}
function gotoPage(url){
    wx.navigateTo({
        url: url
    })
}

//////登陆状态

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
    formatTime: formatTime,
    uploadImgOneByOne: uploadImgOneByOne,

    //////登陆状态
    removeLocalToken: removeLocalToken,
    setLocalID: setLocalID,
    getLocalID: getLocalID,
    setLocalToken: setLocalToken,
    getLocalToken: getLocalToken,
    //全局变量
    layerMsg: layerMsg,
    gotoPage: gotoPage,

}
