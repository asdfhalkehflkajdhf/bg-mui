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
			if(obj.title.length==0){
				return;
			}
			//多窗口模式，层叠置顶
			openMsgWinWidth=document.documentElement.clientWidth;
			openMsgWinHeight=document.documentElement.clientHeight;
			if (openMsgWinWidth>900){
				openMsgWinWidth=900;
			}
			if (openMsgWinHeight>700){
				openMsgWinHeight=700;
			}

			var index = layer.open({
				type: 2 //此处以iframe举例
				,title: obj.title
				//,area: ['900px', '700px']
				,area: [ String(openMsgWinWidth)+'px', String(openMsgWinHeight)+'px' ]
				,shade: 0
				,maxmin: true //最大最小化
				,offset: 'auto'
				,content: obj.url
// 				,btn: ['全部关闭', '全部关闭'] //只是为了演示  http://www.layui.com/doc/modules/layer.html#btn
// 				,yes: function(){       //第一个按钮,按钮1的回调是yes，而从按钮2开始，则回调为btn2: function(){}，以此类推。
// 					layer.msg('全部关闭'); 
// 					layer.closeAll();
// 				}
// 				,btn2: function(){
// 				  layer.closeAll();
// 				}
// 				,btnAlign: 'l' //按钮排列
// 
				,zIndex: layer.zIndex //重点1
				,success: function(layero){
				  layer.setTop(layero); //重点2
				}
			});
			// layer 弹出默认全屏
			layer.full(index);
		}
	},
	created:function(){
	}

});