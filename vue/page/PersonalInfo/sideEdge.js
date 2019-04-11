var localToken = getLocalToken();

const sideEdeg = new Vue({
	el:"#sideEdeg",
	data:{
		actionUrlPre:"../Factivities/viewAction.html?id=",
		announcementUrlPre1:"",
		announcementUrlPre2:"../Other/viewAnnouncement.html?id=",
		
		activeRankList:[],
		announcementList:[],
		friendshipLinkList:[
			// {id:-1,name:'联系方式',url:"../Other/contact.html"},
		]
	},
	methods:{
		getActiveRankList:function(){
			//发送请求
			var _vueThis = this;
			gAxios.post('api/activities/getActiveRank.php')
			.then(function (response) {
				if(response.status==200){
					res=response.data;
					//解析结果
					if(res.code == 0){
						// {code:0,msg:""}
						_vueThis.activeRankList=res.data;
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
		getAnnouncementList:function(status){
			//发送请求
			var _vueThis = this;
			gAxios.post('api/other/getAnnouncementList.php',{
				offset:0,
				num:10
			})
			.then(function (response) {
				if(response.status==200){
					res=response.data;
					//解析结果
					if(res.code == 0){
						_vueThis.announcementList=res.data;
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
		getFriendshipLinkList:function(){
			//发送请求
			var _vueThis = this;
			gAxios.post('api/other/getFriendshipLinkList.php', {
				token: localToken,
				uid: _vueThis.uid
			})
			.then(function (response) {
				if(response.status==200){
					res=response.data;
					//解析结果
					if(res.code == 0){
						if(res.data.length==0){
							var itemLen = _vueThis.friendshipLinkList.length
							Vue.set(_vueThis.friendshipLinkList,itemLen,res.data);
							// _vueThis.friendshipLinkList=res.data;
						}
						
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
		
		/////////返回链接函数
		getAnnouncementUrlPre2(id){
			return this.announcementUrlPre2+id;
		},
		getAnnouncementUrlPre1(){
			return this.announcementUrlPre1;
		},
		getActionUrlPre(id){
			return this.actionUrlPre+id;
		}
		
	},
	created:function(){
		// console.log(getinfor);
		this.getActiveRankList();
		this.getAnnouncementList();
		this.getFriendshipLinkList();
	}

});