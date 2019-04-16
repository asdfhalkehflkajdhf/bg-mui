var localToken = getLocalToken();


const dynamic = new Vue({
	el:"#app",
	data:{
		dynamicList:[],
		page:0		
	},
	methods:{
		getDynamicList(){
			var _vueThis=this;
			gAxios.post('api/dynamic/getListInfo.php', {
				token: localToken,
				page: _vueThis.page
			})
			.then(function (response) {
				var res=[];
				if(response.status==200){
					res=response.data;
					if(res.code==0){
						if(res.data.length>0){
							Vue.set(_vueThis.dynamicList,_vueThis.dynamicList.length,res.data);
						}
						
						// _vueThis.dynamicList.push(res.data);
						// console.log(_vueThis.dynamicList);
					}else{
						parent.layer.msg(res.msg);
					}
				}else{
					parent.layer.msg("获取信息失败！");
				}

			})
			.catch(function (error) {
				// parent.layer.msg(error);
			});
		},
		viewImg(imgJson){
			//获取当前img 上一级上一级下的所有img 对象
			// 这里的数据使用从服务器获取的直接进行设置,使用uid进行查找
			layer.photos({
				photos: imgJson
				//,anim: 2 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
			}); 		
		}
	},
	created:function(){
		
	},
	mounted:function(){
		this.getDynamicList();
	}
})


// jQuery页面加载后执行的事件(3种方式)
// 1 $(function () { });
// 2 $(document).ready(function () { });
// 3 window.onload = function () { }


//JS瀑布流插件masonry动态载入数据
$(function () {
	$("#getGridItem").on("click",function(){
		dynamic.page++;
		dynamic.getDynamicList();
	});


});