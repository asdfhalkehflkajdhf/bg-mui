
var localToken = getLocalToken();

// 编辑框初始化
// 编辑框初始化
var editor_si = wangEditorInit('personalMenu','personalIntroduction', localToken, getQueryString("fid"), 1);
var editor_ti = wangEditorInit('duifangMenu','duifangIntroduction', localToken, getQueryString("fid"), 1);


// 查找时为，一个表结构
const userInfo = new Vue({
	el:"#setPersonalInfo",
	data:{
		res:{
			find_switch:1,
			uid:'',
			eye:'',
			contact:"",
			nick_name:"",
			height:"",
			weight:"",
			living_place:"",
			user_living_place_id:"",
			profession:"",
			income:"",
			tryst_expect:"",
			marital_status:"",
			user_marital_status_id:"",
			selfIntr:"",
			otehrIntr:"",
			res_list:[]
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

	},
	methods:{
		//查找开关
		up_find_switch(){
			var _this = this;
			
			_this.res.find_switch = _this.res.find_switch?0:1;
			gAxios.post('api/personalInfo/userFindSwitchSet.php', {
				token: localToken,
				uid:getQueryString("fid"),
				switch: _this.res.find_switch
			})
			.then(function (response) {
				if(response.status==200){
					var res=response.data;
					layerMsg(res.msg, res.code);
				}else{
					layerMsg(response.statusText);
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
				uid:getQueryString("fid")
			})
			.then(function (response) {
				if(response.status==200){
					var res=response.data;
					layerMsg(res.msg, res.code);
				}else{
					layerMsg(response.statusText);
				}
			})
			.catch(function (error) {
				console.log(error);
			});

		},
		//获取user info
		getUserInfo(){
            var _this = this;
			// admin need opt,uid user get url param
			gAxios.post('api/personalInfo/userInfoGet.php', {
				token: localToken,
				uid:getQueryString("fid")
			})
			.then(function (response) {
				if(response.status==200){
					var res=response.data;
					if(res.code == 0){
						_this.res=res.data.res;
						_this.eduList=res.data.eduList;
						editor_si.txt.html(_this.res.selfIntr);
						editor_ti.txt.html(_this.res.otherIntr);
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

		
		userBaseSet(){
			var _this = this;
			
			// console.log(_this.res);
			gAxios.post('api/personalInfo/userBaseSet.php', {
				token: localToken,
				nick_name:_this.res.nick_name,
				height:_this.res.height,
				weight:_this.res.weight,
				living_place:_this.res.user_living_place_id,
				profession:_this.res.profession,
				income:_this.res.income,
				tryst_expect:_this.res.tryst_expect,
				marital_status:_this.res.user_marital_status_id,
				uid:getQueryString("fid")
			})
			.then(function (response) {
				if(response.status==200){
					var res=response.data;
					layerMsg(res.msg, res.code);
				}else{
					layerMsg(response.statusText);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		userSelfIntrSet(){
            var _this = this;
			_this.res.res_list = $.merge(_this.res.res_list, editor_si.upImgResList);
			gAxios.post('api/personalInfo/userSelfIntrSet.php', {
				token: localToken,
				intr: editor_si.txt.html(),
				uid:getQueryString("fid"),
				res_list:_this.res.res_list
			})
			.then(function (response) {
				if(response.status==200){
					var res=response.data;
					layerMsg(res.msg, res.code);
				}else{
					layerMsg(response.statusText);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
			
		},
		userOtherIntrSet(){
            var _this = this;
			_this.res.res_list = $.merge(_this.res.res_list, editor_ti.upImgResList);		
			gAxios.post('api/personalInfo/userOtherIntrSet.php', {
				token: localToken,
				intr: editor_ti.txt.html(),
				uid:getQueryString("fid"),
				res_list:_this.res.res_list
			})
			.then(function (response) {
				if(response.status==200){
					var res=response.data;
					layerMsg(res.msg, res.code);
				}else{
					layerMsg(response.statusText);
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
				uid:getQueryString("fid")
			})
			.then(function (response) {
				if(response.status==200){
					var res=response.data;
					if(res.code==0){
						_this.verify_code="";
						_this.eduList.push(res.data);
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


	}
});


