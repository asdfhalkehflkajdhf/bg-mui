
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

//基础路径
var baseURL = "http://127.0.0.1/vue/";
var gAxios = axios.create({
	baseURL:"http://127.0.0.1/vue/"
});