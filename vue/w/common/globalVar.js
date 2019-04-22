
var BoyGIDKey='BoyGID';
function setLocalID(id){
	localStorage.setItem(BoyGIDKey, id);
}
function getLocalID(){
	var BoyGIDVal = localStorage.getItem(BoyGIDKey);
	// console.log(BoyGIDVal);
	if(BoyGIDVal == null){
		setLocalID("");
		return "";
	}else{
		return BoyGIDVal;
	}
}


var BoyGTokenKey='BoyGToken';
function setLocalToken(token){
	// console.log("set",token);
	localStorage.setItem(BoyGTokenKey, token);
}
function getLocalToken(){
	var BoyGTokenVal = localStorage.getItem(BoyGTokenKey);
	// console.log("get",BoyGTokenVal);
	if(BoyGTokenVal == null){
		// console.log("get BoyGToken is null");
		setLocalToken("");
		return "";
	}else{
		// console.log("get BoyGToken is :", BoyGTokenVal);
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

////////////////////////////////////////////////////////////
function layerMsg(msg, code){
	if(!code){code=7;}
	
	//0
	let icon_id=1;
	if(code >2){
		icon_id=7;
	}else if(code ==2){
		icon_id=2;
// 		setLocalToken("");
// 		if(parent.navMenuRight){
// 			parent.navMenuRight.logout();
// 		}

	}else{
		icon_id=1;
	}
	// 2错误
	
	// 7警告
	parent.layer.msg(msg, {icon:icon_id});
}
