$(function () {
//菜单切换操作
	$('#myTab a').on('click', function (e) {
		// console.log($.trim($(this).text()).length);
		// e.preventDefault();
		$(this).tab('show');
		
	})
	
	// $('#myTab li:last-child a').tab('show');
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
// 		e.target // newly activated tab
// 		e.relatedTarget // previous active tab
		var destUrl = $.trim($(e.target).data("url"));
		if(destUrl.length>0){
			subPageSwitch(destUrl);
		}
	})
})
	

// 子页面切换
function subPageSwitch(url){
	// console.log("subPageSwitch");
	$("#subPage").empty();
	html = '<iframe id="subPageIframe" src="'+url+'"frameborder="0" scrolling="no"  width="100%"></iframe>';
	$("#subPage").append(html);
}


//加载iframe子页面内容
function reinitIframe(){
	var iframe = document.getElementById("subPageIframe");
	var iframeWinDoc = iframe.contentWindow.document;
	try{
		var bHeight = iframeWinDoc.body.scrollHeight;
		var dHeight = iframeWinDoc.documentElement.scrollHeight;
		// console.log(bHeight,dHeight);
		var height = Math.min(bHeight, dHeight);
		iframe.height = height;
		
		// 更新当前页面的title
		// console.log(document.title, iframeWinDoc.title);
		if(document.title != iframeWinDoc.title)
			document.title = iframeWinDoc.title;
	}catch (ex){}
}
window.setInterval("reinitIframe()", 500);


//////////////////////////////////////////////////////////
// 页面初始化
const aIndex=new Vue({
	el:"#myTab",
	data:{
		menu:[
			{ac:"statistics", id:"statistics-tab", isSelect:true, name:"统计信息", iframe:"statistics.html"},
			{ac:"addAdmin", id:"addAdmin-tab", isSelect:false, name:"添加管理员", iframe:"addAdmin.html"},
			{ac:"adManagement", id:"adManagement-tab", isSelect:false, name:"广告管理", iframe:"adManagement.html"},
			{ac:"announcement", id:"announcement-tab", isSelect:false, name:"公告管理", iframe:"announcement.html"},
			{ac:"", id:"", isSelect:false, name:"", iframe:""},

			{ac:"blackList", id:"blackList-tab", isSelect:false, name:"黑名单管理", iframe:"gBlackManagement.html"},
			{ac:"friendsLink", id:"friendsLink-tab", isSelect:false, name:"友情链接", iframe:"friendLink.html"},
			{ac:"", id:"", isSelect:false, name:"", iframe:""},

			{ac:"userManagement", id:"userManagement-tab", isSelect:false, name:"用户管理", iframe:"userManagement.html"},
			{ac:"resetpw", id:"resetpw-tab", isSelect:false, name:"重置密码", iframe:"resetpw-admin.html"}
		]
	},
	created:function(){
		subPageSwitch(this.menu[0].iframe);
	},
	methods:{
		
	}
});