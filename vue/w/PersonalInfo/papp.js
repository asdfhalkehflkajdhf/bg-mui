
var localToken = getLocalToken();

const personalInfo = new Vue({
	el:"#app",
	data:{
		res:[
			{title: "个人信息管理", show:true, url:"set.html?fid="+getLocalID()},
			{title: "相册管理", show:true, url:"photoAlbum.html?fid="+getLocalID()},

			{title: "活动管理", show:true, url:"../Factivities/manageAction.html"},
			{title: "动态管理", show:true, url:"../Dynamic/manageDynamic.html"},
			{title: "", show:false, url:""},
			{title: "黑名单管理", show:true, url:"../Ffriends/blackList.html"},
			{title: "问题建议", show:true, url:"../Other/questionsAndSuggestions.html"},
			{title: "", show:false, url:""},
			{title: "修改密码", show:true, url:"changePW.html"},
			{title: "绑定邮箱", show:true, url:"boundEmail.html"},
			{title: "", show:false, url:""},
			{title: "注销账号", show:true, url:"cancel.html"},
			{title: "", show:false, url:""},
			{title: "关于我们", show:true, url:"../Other/about.html"},
		]
		
		
	},
	methods:{
		openSubPage:function(obj){
			
			//过滤无效参数
			if(obj.title.length==0){
				return;
			}
			//过滤登陆开关
			if(!parent.navMenuRight.getLanding()){
				layerMsg("请先登陆！");
				return;
			}
			window.location.href=obj.url;
			// openSubWin(obj.url, obj.title, true);
		}
	},
	created:function(){
	}

});