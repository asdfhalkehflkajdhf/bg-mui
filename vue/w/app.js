var localToken = getLocalToken();

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
			// console.log(curNavItemIndex);
			curNavItem = this.nvaListLeft[curNavItemIndex];
			this.preNavItem.isActive=false;
			curNavItem.isActive=true;
			this.preNavItem=curNavItem;
			
			//加载子页面
			subPageSwitch(curNavItem.ifm_url);
		},
		modMenuStatus(obj){
			if(!obj){
				// 保持最小个数为5个, nvaListLeft的初始个数
				if(this.nvaListLeft.length>5){
					this.nvaListLeft.splice(this.nvaListLeft.length-1,1);
				}	
			}else{
				// 保持最小个数为5个, nvaListLeft的初始个数
				if(this.nvaListLeft.length<=5){
					this.nvaListLeft.push(obj);
				}				
			}
			
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
		// 加载页面之前
	}
	
});	

var navMenuRight = new Vue({
	el:"#navMenuRight",
	data:{
		// navListRight:[
		// 	{name:"登陆/注册",url:"#", landing:false}
		// 	,{name:"退出",url:"#", landing:true}
		// ],
		//登陆状态
		landing:false,
		uid:getLocalID()
	},
	methods:{
		logout:function(){
			//发送请求
			var _vueThis = this;
			gAxios.post('api/auth/logout.php', {
				token: getLocalToken(),
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
						
						//修改菜单显示状态
						navMenuLeft.modMenuStatus();
						//修改导航栏状态
						_vueThis.setLanding(false);
						
						// 刷新子页面
						subPageSwitch(navMenuLeft.preNavItem.ifm_url);
												
					}
					layerMsg(res.msg, res.code);
				}else{
					layerMsg(response.statusText);
				}
			})
			.catch(function (error) {
				console.log(error);
				
			});
			
		},

		upLoginStatus:function(){
			//发送请求
			var _vueThis = this;
			gAxios.post('api/auth/getLoginStatus.php', {
				token: getLocalToken(),
			})
			.then(function (response) {
				if(response.status==200){
					res=response.data;
					//解析结果
					if(res.code != 0){
						//修改导航栏状态
						_vueThis.setLanding(false);
						
						// 保存状态//删除本地token
						setLocalID(-1);
						setLocalToken("");
					}else{
						//修改导航栏状态
						_vueThis.setLanding(true);
						
						// 保存状态//删除本地token
						setLocalID(res.data.id);
						// setLocalToken("");
						
					}
					if(res.data.isa){
						//修改菜单显示状态
						navMenuLeft.modMenuStatus(res.data.nav);
					}
					
				}else{
					layerMsg(response.statusText);
				}
			})
			.catch(function (error) {
				console.log(error);
				
			});

		},
		setLanding:function(status){
			if(this.landing == status){
				return;
			}
			this.landing=status;
			// 关闭模态
			$("#loginModal").modal('hide');
		},
		getLanding:function(){
			return this.landing;
		}
	},
	created:function(){
		this.upLoginStatus();
	}

});



const loginModal=new Vue({
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
						//修改导航栏状态
						navMenuRight.setLanding(true);
						if(res.data.isa==1){
							Vue.set(navMenuLeft.nvaListLeft, navMenuLeft.nvaListLeft.length, res.data.nav);
						}
						//
						// 保存状态
						setLocalID(res.data.id);
						setLocalToken(res.data.token);
					
						// 刷新子页面
						subPageSwitch(navMenuLeft.preNavItem.ifm_url);
						
					}else{
						layerMsg(res.msg, res.code);
					}
				}else{
					layerMsg(response.statusText);
				}
			})
			.catch(function (error) {
				console.log(error);
				
			});
		},
		regist:function(){
			var _vueThis = this;
			var index = layer.load(1, { shade: [0.1,'#fff']}); //0.1透明度的白色背景
			gAxios.post('api/auth/regist.php', _vueThis.registForm)
			.then(function (response) {
				if(response.status==200){
					res=response.data;
					//解析结果
					layerMsg(res.msg, res.code);
				}else{
					layerMsg(response.statusText);
				}
				layer.close(index);
			})
			.catch(function (error) {
				layer.close(index);
				console.log(error);
				
			});
		},
		forget:function(){
			var _vueThis = this;
			var index = layer.load(1, { shade: [0.1,'#fff']}); //0.1透明度的白色背景
			gAxios.post('api/auth/forget.php', _vueThis.forgetForm)
			.then(function (response) {
				if(response.status==200){
					res=response.data;
					//解析结果
					layerMsg(res.msg, res.code);
				}else{
					layerMsg(response.statusText);
				}
				layer.close(index);
			})
			.catch(function (error) {
				console.log(error);
				layer.close(index);
			});

		},
		getCheckCode:function(){
			
			var _vueThis = this;
			var index = layer.load(1, { shade: [0.1,'#fff']}); //0.1透明度的白色背景
			gAxios.post('api/auth/sendCode.php', _vueThis.registForm)
			.then(function (response) {
				if(response.status==200){
					res=response.data;
					//解析结果
					
					layerMsg(res.msg, res.code);
				}else{
					layerMsg(response.statusText+res.msg);
				}
				layer.close(index);
			})
			.catch(function (error) {
				console.log(error);
				layer.close(index);
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
