
const navMenuRight = new Vue({
	el:"#navMenuRight",
	data:{
		navListRight:[
			{name:"登陆/注册",url:"#", landing:false}
			
			,{name:"退出",url:"#", landing:true}
		],
		//登陆状态
		landing:false
	},
	methods:{
		logout:function(){
			//发送请求
			var info={token:""};
			info.token = JSON.parse(localStorage.getItem('BoyGToken'));
			//解析结果
			localStorage.removeItem('BoyGToken');
			var res = {code:0,msg:"",token:""}
			// {code:0,msg:""}
			this.setLanding(false);
			
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
			,{name:"消息",url:"#", isActive:false, ifm_url:"News/index.html"}
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
			var res = {code:0,msg:"",token:""};
			//发请请求登陆
			
			//解析结果
			if(res.code == 0){
				// 保存状态
				sessionStorage.setItem('BoyGToken', JSON.stringify(res.token));
				//修改导航栏状态
				console.log(navMenuRight);
				navMenuRight.setLanding(true);
				$("#loginModal").modal('hide');
			}else{
				// 显示提示信息
				layer.msg(res.msg);
			}
		},
		regist:function(){
			var res = {code:0,msg:"",token:""};
			//解析结果
			if(res.code == 0){
				// 保存状态
				sessionStorage.setItem('BoyGToken', JSON.stringify(res.token));
				//修改导航栏状态
				console.log(navMenuRight);
				navMenuRight.setLanding(true);
				$("#loginModal").modal('hide');
			}else{
				// 显示提示信息
				layer.msg(res.msg);
			}
			// {code:0,msg:"",data:{}}
			console.log(this.registForm);
		},
		forget:function(){
			// 忘记密码
			var res = {code:0,msg:""};
			//解析结果
			if(res.code == 0){
				// 提示跳转到登陆面
				layer.msg(res.msg);
			}else{
				// 显示提示信息
				layer.msg(res.msg);
			}

			// {code:0,msg:"",data:{}}
			console.log(this.forgetForm);
		},
		getCheckCode:function(){
			// 发送验证码
			var res = {code:0,msg:""};
			//解析结果
			if(res.code == 0){
				// 提示有效时间，
				layer.msg(res.msg);
			}else{
				// 显示提示信息
				layer.msg(res.msg);
			}
			console.log(this.registForm);
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
