var localToken = getLocalToken();


const dynamicList = new Vue({
	el:"#headingOne",
	data:{
		dynamicList:[],
		floadTime:"null",
		page:0,
		// landing: false,
		landing: parent.navMenuRight.getLanding()
		
	},
	methods:{
		viewImg(idx, imgId){
			//获取当前img 上一级上一级下的所有img 对象
			// 这里的数据使用从服务器获取的直接进行设置,使用uid进行查找
			var imgJson = this.dynamicList[idx][0].imgObj;
			imgJson.start=imgId;//初始显示的图片序号，默认0
			layer.photos({
				photos: imgJson
				//,anim: 2 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
			}); 		
		},
		viewUid(obj){
			let url  = $(obj).data("url");
			let name = $(obj).val();
			console.log(url, name);
			openSubWin(url, name, true);			
		},
		upVar(floadTime, data){
			this.floadTime = floadTime;
			this.dynamicList.push(data);
		}
	},

})

// jQuery页面加载后执行的事件(3种方式)
// 1 $(function () { });
// 2 $(document).ready(function () { });
// 3 window.onload = function () { }


//JS瀑布流插件masonry动态载入数据
$("#getGridItem").on("click",function(){
	dynamicList.page++;
	reloadGridItem();
});


$(function () {
	function reloadGridItem(){
		var $container = $('#app');
	
		// post 本地json会失败
		// axios.get('testjson/imgtest.json', {
		gAxios.post('api/dynamic/getListInfo.php', {
			token: localToken,
			page: dynamicList.page,
			floadTime: dynamicList.floadTime
		})
		.then(function (response) {
			var res=[];
			if(response.status==200){
				// console.log(1);
				res=response.data.data;
				dynamicList.upVar(response.data.floadTime, res);
			}else{
				layer.msg("获取信息失败！");
				return;
			}
			
			if(res.length==0){
				layer.msg("没有更多！");
				return;
			}
			//生成item
			$.each(res, function (i1, data) {
				
				
				let picturesClass='pictures-5';
				if(data.imgObj.data.length<5){
					picturesClass='pictures-4';
				};
				var idx = dynamicList.dynamicList.length+i1-1;
				var liList="";
				$.each(data.imgObj.data, function (i2, data){
					liList+='<li><img onclick="dynamicList.viewImg('+idx+', '+i2+')" class="rounded" src="'+data.thumb+'" alt="'+data.alt+'"></li>';
				});
				
				let $gitem = $(
					'<div class="card">'
					+'	<div class="card-body">'
					//标题
					+'		<a class="font-weight-bold dyn-item" style="font-size: 15px;" href="#" '
					+'			data-url="../PersonalInfo/view.html?fid='+data.uid+'" onclick="dynamicList.viewUid(this)">'
					+			data.nickname+'</a>'
					+'		<span class="card__span_right" >'+data.ctime+'</span>'
					//内容
					+'		<div style="font-size: 20px;" >'+data.content+'</div>'
					//图片
					+'		<ul class="pictures '+picturesClass+'" style="text-align:center;">'
					+			liList
					+'		</ul>'
					+'	</div>'
					+'</div>'
				);
				$container.append($gitem);
			});

		})
		.catch(function (error) {
			console.log(error);
		});
	}
	
	reloadGridItem();


});