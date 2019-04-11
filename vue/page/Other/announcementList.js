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
			
		}
	},
	created:function(){
		this.getAList();
	}

});