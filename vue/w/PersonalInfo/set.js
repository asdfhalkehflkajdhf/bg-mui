var localToken = getLocalToken();

// 编辑框初始化
var E = window.wangEditor;
var editor_si = new E('#personalMenu', '#personalIntroduction');
var editor_ti = new E('#duifangMenu', '#duifangIntroduction');
editor_si.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
editor_ti.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片

editor_si.customConfig.uploadImgMaxSize = 3 * 1024 * 1024 // 将图片大小限制为 3M
// editor_si.customConfig.uploadImgMaxLength = 1 // 限制一次最多上传 5 张图片

editor_ti.customConfig.uploadImgMaxSize = 3 * 1024 * 1024 // 将图片大小限制为 3M
// editor_ti.customConfig.uploadImgMaxLength = 1 // 限制一次最多上传 5 张图片


// 创建编辑器之后，使用editor.txt.html(...)设置编辑器内容
var editorMenus=[
    'head',  // 标题
    'bold',  // 粗体
    'fontSize',  // 字号
    // 'fontName',  // 字体
    // 'italic',  // 斜体
    'foreColor',  // 文字颜色
    'backColor',  // 背景颜色
    // 'link',  // 插入链接
    'list',  // 列表
    'justify',  // 对齐方式
    'quote',  // 引用
    // 'emoticon',  // 表情
    'image',  // 插入图片
    // 'table',  // 表格
];
// 自定义菜单配置
editor_si.customConfig.menus =editorMenus;
editor_ti.customConfig.menus =editorMenus;

editor_si.create();
editor_ti.create();



// 查找时为，一个表结构
const userInfo = new Vue({
	el:"#setPersonalInfo",
	data:{
		res:{
			find_switch:false,
			uid:'',
			eye:'',
			contact:"",
			nick_name:"",
			height:"",
			weight:"",
			living_place:"",
			profession:"",
			income:"",
			tryst_expect:"",
			marital_status:"",
			selfIntr:"",
			otehrIntr:"",
		},
		eduList:[],
		
		verify_code:'',
		livingPlaceList:[],
		maritalStatusList:[],

	},
	created:function(){
		this.getUserInfo();
		this.userLivingPlaceGet();
		this.userMaritalStatusGet();
		
	},
	mounted:function(){
		editor_si.txt.html(this.res.selfIntr);
		editor_ti.txt.html(this.res.otherIntr);
	},
	methods:{
		//查找开关
		up_find_switch(){
			this.res.find_switch = !this.res.find_switch;
            var _this = this;
			// post 本地json会失败
			gAxios.post('api/personalInfo/userFindSwitchSet.php', {
				token: localToken,
				uid:getQueryString("uid")
			})
			.then(function (response) {
				if(response.status==200){
					var res=response.data;
					parent.layer.msg(res.msg);
				}else{
					parent.layer.msg(response.statusText);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		//更新联系方式
		userContactSet(){
			var _this = this;
			// post 本地json会失败
			gAxios.post('api/personalInfo/userContactSet.php', {
				token: localToken,
				contact: _this.res.contact,
				uid:getQueryString("uid")
			})
			.then(function (response) {
				if(response.status==200){
					var res=response.data;
					parent.layer.msg(res.msg);
				}else{
					parent.layer.msg(response.statusText);
				}
			})
			.catch(function (error) {
				console.log(error);
			});

		},
		//获取user info		getUserInfo(){
            var _this = this;
			// post 本地json会失败
			gAxios.post('api/personalInfo/userinfoGet.php', {
				token: localToken,
				uid:setLocalID()
			})
			.then(function (response) {
				if(response.status==200){
					var res=response.data;
					if(res.code == 0){
						_this.res=res.data.res;
						_this.eduList=res.data.eduList;
					}else{
						parent.layer.msg(res.msg);
					}
				}else{
					parent.layer.msg(response.statusText);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		userLivingPlaceGet(){
            var _this = this;
			// post 本地json会失败
			gAxios.post('api/personalInfo/userLivingPlaceGet.php', {
				token: localToken,
			})
			.then(function (response) {
				if(response.status==200){
					var res=response.data;
					if(res.code==0){
						_this.livingPlaceList=res.data;
					}else{
						parent.layer.msg(res.msg);
					}
				}else{
					parent.layer.msg(response.statusText);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
			
		},
		userMaritalStatusGet(){
            var _this = this;
			// post 本地json会失败
			gAxios.post('api/personalInfo/userMaritalStatusGet.php', {
				token: localToken,
			})
			.then(function (response) {
				if(response.status==200){
					var res=response.data;
					if(res.code==0){
						_this.maritalStatusList=res.data;
					}else{
						parent.layer.msg(res.msg);
					}
				}else{
					parent.layer.msg(response.statusText);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		},

		
		userBaseSet(){
			var _this = this;
			// post 本地json会失败
			gAxios.post('api/personalInfo/userBaseSet.php', {
				token: localToken,
				nick_name:_this.res.nick_name,
				height:_this.res.height,
				weight:_this.res.weight,
				living_place:_this.res.living_place,
				profession:_this.res.profession,
				income:_this.res.income,
				tryst_expect:_this.res.tryst_expect,
				marital_status:_this.res.marital_status,
				uid:getQueryString("uid")
			})
			.then(function (response) {
				if(response.status==200){
					var res=response.data;
					parent.layer.msg(res.msg);
				}else{
					parent.layer.msg(response.statusText);
				}
			})
			.catch(function (error) {
				console.log(error);
			});

			
		},
		userSelfIntrSet(){
            var _this = this;
			// post 本地json会失败
			gAxios.post('api/personalInfo/userSelfIntrSet.php', {
				token: localToken,
				selfIntr: editor_si.txt.html(),
				uid:getQueryString("uid")
			})
			.then(function (response) {
				if(response.status==200){
					var res=response.data;
					parent.layer.msg(res.msg);
				}else{
					parent.layer.msg(response.statusText);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
			
		},
		userOtherIntrSet(){
            var _this = this;
			// post 本地json会失败
			gAxios.post('api/personalInfo/userOtherIntrSet.php', {
				token: localToken,
				otherIntr: editor_ti.txt.html(),
				uid:getQueryString("uid")
			})
			.then(function (response) {
				if(response.status==200){
					var res=response.data;
					parent.layer.msg(res.msg);
				}else{
					parent.layer.msg(response.statusText);
				}
			})
			.catch(function (error) {
				console.log(error);
			});

		},
		userEduSet(){
            var _this = this;
			// post 本地json会失败
			gAxios.post('api/personalInfo/userEduSet.php', {
				token: localToken,
				verify_code: _this.verify_code,
				uid:getQueryString("uid")
			})
			.then(function (response) {
				if(response.status==200){
					var res=response.data;
					if(res.code==0){
						_this.verify_code="";
					}
					parent.layer.msg(res.msg);
				}else{
					parent.layer.msg(response.statusText);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
			
		},


	}
});


