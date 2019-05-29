// 请求地址

// const baseUrl = "http://127.0.0.1/vue/";
const baseUrl = "https://www.男生女生.cn/";

module.exports = {
    // 找朋友
    friendGetListInfo : baseUrl + "api/friends/getListInfo.php",
    friendGetSearchCondition: baseUrl + "api/friends/getSearchCondition.php",
    friendSetSearchCondition: baseUrl + "api/friends/putSearchCondition.php",

    blackListAdd: baseUrl + "api/friends/blackListAdd.php",
    blackListDel: baseUrl + "api/friends/blackListDel.php",
    blackListGet: baseUrl + "api/friends/blackListGet.php",

    // 动态
    dynamicAdd: baseUrl + "api/dynamic/dynamicAdd.php",
    dynamicDel: baseUrl + "api/dynamic/dynamicDel.php",
    dynamicGetListInfo: baseUrl + "api/dynamic/getListInfo.php",
    dynamicGetListInfoMySelf: baseUrl + "api/dynamic/getListInfoMySelf.php",

    // 找活动
    actDel: baseUrl + "api/activities/delActionById.php",
    actPut: baseUrl + "api/activities/putActionInfo.php",

    actGetInfo: baseUrl + "api/activities/getActionInfo.php",
    actAttentionInfo: baseUrl + "api/activities/getAttentionInfo.php",
    actGetListInfo: baseUrl + "api/activities/getListInfo.php",

    actGetSearchCondition: baseUrl + "api/activities/getSearchCondition.php",
    actPutSearchCondition: baseUrl + "api/activities/putSearchCondition.php",

    actSendReqInfo: baseUrl + "api/activities/sendReqInfo.php",
    // 消息
    newsAddUserMsg: baseUrl + "api/news/addUserMsg.php",
    newsDelUserMsg: baseUrl + "api/news/delUserMsg.php",
    newsGetUserMsg: baseUrl + "api/news/getUserMsgInfo.php",
    newsGetUserMsgList: baseUrl + "api/news/getUserMsgList.php",

    // 设置
    userChangePW: baseUrl + "api/personalInfo/changePW.php",
    userEmailCodeSend: baseUrl + "api/personalInfo/emailCodeSend.php",
    userEmailGet: baseUrl + "api/personalInfo/emailGet.php",
    userEmailSet: baseUrl + "api/personalInfo/emailSet.php",
    userBaseSet: baseUrl + "api/personalInfo/userBaseSet.php",
    userContactSet: baseUrl + "api/personalInfo/userContactSet.php",
    userEduSet: baseUrl + "api/personalInfo/userEduSet.php",
    userFindSwitchSet: baseUrl + "api/personalInfo/userFindSwitchSet.php",
    userImgDel: baseUrl + "api/personalInfo/userImgDel.php",
    userImgGetCount: baseUrl + "api/personalInfo/userImgGetCount.php",
    userImgGetList: baseUrl + "api/personalInfo/userImgGetList.php",
    userImgUp: baseUrl + "api/personalInfo/userImgUp.php",
    userInfoGet: baseUrl + "api/personalInfo/userInfoGet.php",
    userLivingPlaceGet: baseUrl + "api/personalInfo/userLivingPlaceGet.php",
    userMaritalStatusGet: baseUrl + "api/personalInfo/userMaritalStatusGet.php",
    userOtherIntrSet: baseUrl + "api/personalInfo/userOtherIntrSet.php",
    userSelfIntrSet: baseUrl + "api/personalInfo/userSelfIntrSet.php",

    /////////////////////////////////////////////////
    // invar
    invarGetFormatAreaCode: baseUrl + "api/invar/getFormatAreaCode1.php",

    // ads
    adsGetLunBoTuList: baseUrl + "api/ads/getLunBoTuList.php",
    adsUpAdsStatusInfo: baseUrl + "api/ads/upAdsStatusInfo.php",

    // auth
    authLogin: baseUrl + "api/auth/login.php",
    authLogout: baseUrl + "api/auth/logout.php",
    authSendCode: baseUrl + "api/auth/sendCode.php",
    authGetLoginStatus: baseUrl + "api/auth/getLoginStatus.php",
    authRegist: baseUrl + "api/auth/regist.php",
    authForget: baseUrl + "api/auth/forget.php",

    // oterh
    otherGetAnnouncementList: baseUrl + "api/other/getAnnouncementList.php",
    otherGetAnnouncementRecard: baseUrl + "api/other/getAnnouncementRecard.php",
    otherSuggest: baseUrl + "api/other/suggest.php"

}