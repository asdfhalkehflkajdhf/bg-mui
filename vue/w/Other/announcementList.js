parent.navMenuRight.upLoginStatus();
var localToken = getLocalToken();

const announcementList = new Vue({
	el:"#app",
	data:{
		res:[]
	},
	methods:{
		getAList(){
			//发送请求
			var _vueThis = this;
			gAxios.post('api/other/getAnnouncementList.php', {
				offset:0,
				num:1000
			})
			.then(function (response) {
				if(response.status==200){
					res=response.data;
					//解析结果
					if(res.code == 0){
						// {code:0,msg:""}
						_vueThis.res=res.data;
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
			
		}
	},
	created:function(){
		this.getAList();
	}

});