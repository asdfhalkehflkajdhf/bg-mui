var localToken = getLocalToken();

const personalInfo = new Vue({
	el:"#app",
	data:{
		res:[
			{title: "个人信息管理", url:"set.html"},
			{title: "相册管理", url:"photoAlbum.html"},

			{title: "活动管理", url:"../Factivities/manageAction.html"},
			{title: "动态管理", url:"../Dynamic/manageDynamic.html"},
			{title: "", url:""},
			{title: "黑名单管理", url:"../Ffriends/blackList.html"},
			{title: "问题建议", url:"../Other/questionsAndSuggestions.html"},
			{title: "", url:""},
			{title: "修改密码", url:"changePW.html"},
			{title: "绑定邮箱", url:"boundEmail.html"},
			{title: "", url:""},
			{title: "注销账号", url:"cancel.html"},
			{title: "", url:""},
			{title: "关于我们", url:"../Other/about.html"},
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
			openSubWin(obj.url, obj.title, true);
		}
	},
	created:function(){
	}

});