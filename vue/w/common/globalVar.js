
var BoyGIDKey='BoyGID';
function setLocalID(id){
	localStorage.setItem(BoyGIDKey, id);
}
function getLocalID(){
	var BoyGIDVal = localStorage.getItem(BoyGIDKey);
// 	console.log(BoyGIDVal);
	if(BoyGIDVal == null){
		setLocalID("");
		return "";
	}else{
		return BoyGIDVal;
	}
}


var BoyGTokenKey='BoyGToken';
function setLocalToken(token){
	localStorage.setItem(BoyGTokenKey, token);
}
function getLocalToken(){
	var BoyGTokenVal = localStorage.getItem(BoyGTokenKey);
// 	console.log(BoyGTokenVal);
	if(BoyGTokenVal == null){
		setLocalToken("");
		return "";
	}else{
		return BoyGTokenVal;
	}
}
function removeLocalToken(){
	localStorage.setItem(BoyGTokenKey, "");
	// localStorage.removeItem('BoyGToken');
}
////////////////////////////////////////////////////////////
//基础路径
var baseURL = "http://127.0.0.1/vue/";
var gAxios = axios.create({
	baseURL:"http://127.0.0.1/vue/"
});

/////////////////////////////////////////////////////////////
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
	var context = ""; 
	if (r != null) 
		context = r[2]; 
	reg = null; 
	r = null; 
	return context == null || context == "" || context == "undefined" ? "" : context; 
}

