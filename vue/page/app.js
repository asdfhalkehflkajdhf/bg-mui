
const navMenuRight = new Vue({
	el:"#navMenuRight",
	data:{
		navListRight:[
			{name:"登陆/注册",url:"#", landing:false}
			,{name:"退出",url:"#", landing:true}
		],
		//登陆状态
		landing:false,
		uid:-1
	},
	methods:{
		logout:function(){
			//发送请求
			var _vueThis = this;
			gAxios.post('api/auth/logout.php', {
				token: localToken,
				uid: _vueThis.uid
			})
			.then(function (response) {
				if(response.status==200){
					res=response.data;
					//解析结果
					if(res.code == 0){
						// {code:0,msg:""}
						_vueThis.setLanding(false);
						// 保存状态//删除本地token
						setLocalID(-1);
						setLocalToken("");
						parent.layer.msg(res.msg);
						
						//修改导航栏状态
						navMenuRight.setLanding(false);
												
					}else{
						parent.layer.msg(res.msg);
					}
				}else{
					parent.layer.msg(response.statusText+response.data.msg);
				}
			})
			.catch(function (error) {
				console.log(error);
				// parent.layer.msg(error);
			});
			
		},

		checkLoginStatus:function(){
			var BoyGToken = window.sessionStorage.getItem("BoyGToken");
			if(BoyGToken){
				this.setLanding(true);
			}else{
				this.setLanding(false);
			}
		},
		setLanding:function(status){
			this.landing=status;
			// 关闭模态
			$("#loginModal").modal('hide');

		}
	},
	created:function(){
		// console.log(getinfor);
		this.checkLoginStatus();
	}

});

const navMenuLeft = new Vue({
	el:"#navMenuLeft",
	data:{
		nvaListLeft:[
			 {name:"朋友",url:"#", isActive:true , ifm_url:"Ffriends/index.html"}
			,{name:"活动",url:"#", isActive:false, ifm_url:"Factivities/index.html"}
			,{name:"动态",url:"#", isActive:false, ifm_url:"Dynamic/index.html"}
			,{name:"消息",url:"#", isActive:false, ifm_url:"News/msgList.html"}
			,{name:"我的",url:"#", isActive:false, ifm_url:"PersonalInfo/index.html"}
		],
		//前一个选中的标签,在mounted中初始化
		preNavItem:[],
	},
	methods:{
		modActionStatus:function(curNavItemIndex, event){
			//切换标签状态
			console.log(curNavItemIndex);
			curNavItem = this.nvaListLeft[curNavItemIndex];
			this.preNavItem.isActive=false;
			curNavItem.isActive=true;
			this.preNavItem=curNavItem;
			
			//加载子页面
			subPageSwitch(curNavItem.ifm_url);
		},
	},
	mounted: function(){
		// 初始化子页面
		this.preNavItem=this.nvaListLeft[0];
		//首次加载子页面
		subPageSwitch(this.preNavItem.ifm_url);
		// showData('挂载到dom后',this);
		// 加载token查看是否在线，的线认证
		// 加载完成数据这后执行，注意，不同于jq和js onload
	},
	created:function(){
		getLocalToken();
	}
	
}
);	

var loginModal=new Vue({
	el:"#loginModal",
	data:{
		loginForm:{
			phone:"",
			pw:""
		},
		registForm:{
			phone:"",
			pw:"",
			checkCode:""
		},
		forgetForm:{
			phone:"",
			email:""
		},
	},
	methods:{
		login:function(){
			//发请请求登陆
			var _vueThis = this;
			gAxios.post('api/auth/login.php', _vueThis.loginForm)
			.then(function (response) {
				if(response.status==200){
					res=response.data;
					//解析结果
					if(res.code == 0){
						if(res.data.isa==1){
							// navMenuLeft.nvaListLeft.push(res.data.nav);
							Vue.set(navMenuLeft.nvaListLeft, navMenuLeft.nvaListLeft.length, res.data.nav);
						}
						//
						// 保存状态
						setLocalID(res.data.id);
						setLocalToken(res.data.token);
						
						//修改导航栏状态
						navMenuRight.setLanding(true);
						
						
					}else{
						parent.layer.msg(res.msg);
					}
				}else{
					parent.layer.msg(response.statusText+response.data.msg);
				}
			})
			.catch(function (error) {
				console.log(error);
				// parent.layer.msg(error);
			});
		},
		regist:function(){
			var _vueThis = this;
			gAxios.post('api/auth/regist.php', _vueThis.registForm)
			.then(function (response) {
				if(response.status==200){
					res=response.data;
					//解析结果
					parent.layer.msg(res.msg);
				}else{
					parent.layer.msg(response.statusText+response.data.msg);
				}
			})
			.catch(function (error) {
				console.log(error);
				// parent.layer.msg(error);
			});
		},
		forget:function(){
			var _vueThis = this;
			gAxios.post('api/auth/forget.php', _vueThis.forgetForm)
			.then(function (response) {
				if(response.status==200){
					res=response.data;
					//解析结果
					parent.layer.msg(res.msg);
				}else{
					parent.layer.msg(response.statusText+response.data.msg);
				}
			})
			.catch(function (error) {
				console.log(error);
				// parent.layer.msg(error);
			});

		},
		getCheckCode:function(){
			
			var _vueThis = this;
			gAxios.post('api/auth/sendCode.php', _vueThis.loginForm)
			.then(function (response) {
				if(response.status==200){
					res=response.data;
					//解析结果
					parent.layer.msg(res.msg);
				}else{
					parent.layer.msg(response.statusText+res.msg);
				}
			})
			.catch(function (error) {
				console.log(error);
				// parent.layer.msg(error);
			});
		}
	}
});
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
