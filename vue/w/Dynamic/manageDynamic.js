
var localToken = getLocalToken();


const managedynamic = new Vue({
	data:{
		dynamicList:[],
		page:0,
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
		upVar( data){
			let _this = this;
			$.each(data, function(i,item){
				_this.dynamicList.push(item);
			})
			
		},

		delDynamic(objId, idx){
			
			var _vueThis=this;
			var item = _vueThis.dynamicList[idx];
			
			gAxios.post('api/dynamic/dynamicDel.php', {
				dyn_id: item.id,
				token: localToken,
			})
			.then(function (response) {
				var res=[];
				if(response.status==200){
					res=response.data;
					if(res.code==0){
						// 删除元素
						$("#"+objId).remove();
					}
					layerMsg(res.msg, res.code);
				}else{
					layerMsg("获取信息失败！", 2);
				}
			
			})
			.catch(function (error) {
				console.log(error);
			});
			
		}
	},
	created:function(){
		// this.getDynamicList();
		
	},
	mounted:function(){
	}
})


// jQuery页面加载后执行的事件(3种方式)
// 1 $(function () { });
// 2 $(document).ready(function () { });
// 3 window.onload = function () { }


//JS瀑布流插件masonry动态载入数据
$(function () {
	$("#getGridItem").on("click",function(){
		reloadGridItem();
	});

	function reloadGridItem(){
		var $container = $('#app');
		gAxios.post('api/dynamic/getListInfoMySelf.php', {
			token: localToken,
			page: managedynamic.page++
		})
		.then(function (response) {
			var res=[];
			let dynamicListLen =  managedynamic.dynamicList.length;
			if(response.status==200){
				// console.log(1);
				res=response.data.data;
				managedynamic.upVar(res);
			}else{
				layerMsg("获取信息失败！", 7);
				return;
			}
			
			if(res.length==0){
				layerMsg("没有更多！", 7);
				return;
			}
			//生成item
			$.each(res, function (i1, data) {
				
				let picturesClass='pictures-5';
				if(data.imgObj.data.length<5){
					picturesClass='pictures-4';
				};
				var idx =dynamicListLen + i1;
				var liList="";
				$.each(data.imgObj.data, function (i2, data){
					liList+='<li><img onclick="managedynamic.viewImg('+idx+', '+i2+')" class="rounded" src="'+data.thumb+'" alt="'+data.alt+'"></li>';
				});
				let dynid="dyn-"+idx;
				let $gitem = $(
					'<li class="list-group-item " id="'+dynid+'">'
					+'	<div class="row">'
					+'		<div class="col-md-2">'
					+'			<ul class="pictures '+picturesClass+'">'
					+				liList
					+'			</ul>'
					+'		</div>'
					+'		<div class="col-md-10">'
					+'			<div class="p-2 ml-2">'
					+'				<span class="text-success" >时间：'+data.ctime+'</span>'
					//+'				<span class="btn text-success">'+data.nickname+'</span>'
					+'				<span class="card__span_right">'
					+'					<span class="btn btn-outline-success" onclick="managedynamic.delDynamic(\''+dynid+'\', '+idx+')">删除</span>'
					+'				</span>'
					+'			</div>'
					+'			<div class="p-2 ml-2" style="font-size: 15px;">'
					+				data.content
					+'			</div>'
					// +'			<div class="p-2 ml-2">'
					// +'				<span class="text-success" >时间：'+data.ctime+'</span>'
					// +'			</div>'
					+'		</div>'
					+'	</div>'
					+'</li>'
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