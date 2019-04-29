
var localToken = getLocalToken();

// 加载轮播图数据
// 这个是广告，信息分类，轮播图，个人信息页，活动信息页，动态信息页，主要是以图片+跳转链接，显示状态，和计算过程
const lunBoTuVar = new Vue({
	el:"#lunBoTuDiv",
	data:{
		res:[],
	},
	created:function() {
		$('.carousel').carousel({
		  interval: 2000
		});
		this.getLunBoTuList();
	},
	methods:{
        getLunBoTuList:function(){
            var _this = this;
			// post 本地json会失败
			// axios.get('testjson/lunBoTuTest.json', {
			gAxios.post('api/ads/getLunBoTuList.php', {
				token: localToken
			})
			.then(function (response) {
				if(response.status==200){
					_this.res=response.data.data;
				}else{
					layerMsg(response.statusText);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
        },
		upAdsStatusInfo:function(id, herf){
			var _this = this;
			gAxios.post('api/ads/upAdsStatusInfo.php', {
				id: id
			})
			.then(function (response) {
				if(response.status==200){
					// _this.res=response.data.data;
					window.open(herf);
				}else{
					layerMsg(response.statusText);
				}
			})
			.catch(function (error) {
				console.log(error);
				
			});
			
		}
	}
// 	mounted: function(){
// 		// showData('挂载到dom后',this);
// 		// 加载token查看是否在线
// 	},	
}
);



// 查找时为，一个表结构
const formTag = new Vue({
	el:"#accordion",
	data:{
		conditionalForm:{
// 			currentLivingPlace:"不可修改",
// 			sex:1,
// 			age1:3,
// 			age2:5,
// 			height1:56,
// 			height2:17,
// 			edu:2,
// 			school:3,
// 			income:1,
// 			ownness:2
		},
		conditionalData:{
// 			sexList:[
// 				{value:1,text:"全部"},
// 				{value:2,text:"男"},
// 				{value:3,text:"女"},
// 			],
// 			eduList:[
// 				{value:1,text:"全部"},
// 				{value:2,text:"全部1"},
// 				{value:3,text:"全部2"},
// 				{value:4,text:"全部3"},
// 			],
// 			schoolList:[
// 				{value:1,text:"全部"},
// 				{value:2,text:"全部1"},
// 				{value:3,text:"全部2"},
// 				{value:4,text:"全部3"},
// 			],
// 			ownnessList:[
// 				{value:1,text:"全部"},
// 				{value:2,text:"全部1"},
// 				{value:3,text:"全部2"},
// 				{value:4,text:"全部3"},
// 			]
		},
		page:0,
		landing:parent.navMenuRight.getLanding()==null?false:parent.navMenuRight.getLanding()
		// landing:parent.navMenuRight.getLanding()
		
	},
	created:function(){
		//请求查询条件数据
		this.getFrom();
	},
	methods:{
		//检查表单
		checkForm(){
			
		},
		//获取表单
		getFrom(){
			var _vueThis = this;
			gAxios.post('api/friends/getSearchCondition.php', {
				token: localToken,
			})
			.then(function (response) {
				var res=[];
				if(response.status==200){
					// console.log(1);
					res=response.data;
					_vueThis.conditionalForm=res['data']['conditionalForm'];
					_vueThis.conditionalData=res['data']['conditionalData'];

				}else{
					layerMsg("获取信息失败！");
					return;
				}

			})
			.catch(function (error) {
				console.log(error);
			});
		},
		//更新表单
		upFrom(){
			var _vueThis = this;
			// 初始化page信息
			_vueThis.page=0;
			gAxios.post('api/friends/putSearchCondition.php', {
				token: localToken,
				data:_vueThis.conditionalForm
			})
			.then(function (response) {
				var res=[];
				if(response.status==200){
					res=response.data;
					layerMsg(res.msg, res.code);
					console.log(res);
				}else{
					layerMsg("获取信息失败！");
					return;
				}
			
			})
			.catch(function (error) {
				console.log(error);
				
			});
		},
		
	},
	mounted:function(){
		
	},
	watch:{
		// 监听到了 res 数据发生变化执行arr方法
		res: function() {
			this.$nextTick(function(){
				/*现在数据已经渲染完毕*/
	            _this.getImgList();
				// console.log($("#imgListDivTemp").prop("outerHTML"));
				// $("#imgListDiv").masonry();
			})
			// console.log("wathc");
		}
    },

});



//JS瀑布流插件masonry动态载入数据
// $(function () {
// 更新list数据
$("#getGridItem").on("click",function(){
	formTag.page++;
	// console.log(formTag);
	reloadGridItem();
});

function reloadGridItem(){
	var $container = $('#imgListDiv');

	// post 本地json会失败
	// axios.get('testjson/imgtest.json', {
	gAxios.post('api/friends/getListInfo.php', {
		token: localToken,
		page: formTag.page
	})
	.then(function (response) {
// response{
//   // 服务端返回的数据
//   data: {},
//   // 服务端返回的状态码
//   status: 200,
//   // 服务端返回的状态信息
//   statusText: 'OK',
//   // 响应头
//   // 所有的响应头名称都是小写
//   headers: {},
//   // axios请求配置
//   config: {},
//   // 请求
//   request: {}
// }
		var res=[];
		if(response.status==200){
			// console.log(1);
			res=response.data.data;
			
		}else{
			layerMsg("获取信息失败！");
			return;
		}

		if(res.length==0){
			layerMsg("没有更多，请修改查找条件！");
			return;
		}
		//生成item
		$.each(res, function (i, data) {
			var $gitem = $(
				'<div class="grid-item col-xl-3 col-lg-3 col-md-4 col-sm-6  col-xs-12" >'
				+'	<div class="card ">'
				+'		<a target="_blank" href="../PersonalInfo/view.html?fid='+data['uid']+'" >'
				+'			<img class="card-img-top" src="'+data['src']+'" alt="'+data['alt']+'">'
				+'		</a>'
				+'		<div class="card-body">'
				+'			<div class="card__span">'
				+'				<span class="card__span_left">'
				+'					<span class="fa fa-clock-o" title="上次登陆时间">'+data['ontime']+'</span>'
				+'				</span>'
				+'				<span class="card__span_right"  data-aid="'+data['uid']+'">'
				+'					<span title="点赞" >'
				+'							<span class="fa fa-eye ">'+data['eye']+'</span>'
				+'						<!-- <a href=""><a> -->'
				+'					</span>'
				+'				</span>'
				+'			</div>			'					
				+'			<!-- <div class="card__link"></div> -->'
				+'			<hr />'
				+'			<h3 class="card-title" title="昵称">'+data['nickname']+'</h3>'
				+'			<p class="card-text title="喜欢的活动">'+data['tryst_expect']+'</p>'
				+'		</div>'
				+'	</div>'
				+'</div>'
			);
			$container.append($gitem).masonry('appended', $gitem, true);
		});
			// // jQuery方式。重新布局，添加元素，另一种方式添加元素，重新布局
		// https://segmentfault.com/a/1190000007316788
		$container.imagesLoaded( function() {
			// new Masonry( document.getElementById('container'),{itemSelector:'.item'} );
			$container.masonry();
		});
	})
	.catch(function (error) {
		console.log(error);
	});
}
	
	// var $getTempItemListElems=$($("#imgListDivTemp").html());
	// $("#imgListDivTemp").empty();
	// $container.append($getTempItemListElems).masonry('appended', $getTempItemListElems,true).masonry();
// });
// jQuery页面加载后执行的事件(3种方式)
// 1 $(function () { });
// 2 $(document).ready(function () { });
// 3 window.onload = function () { }
$(function () { 
	reloadGridItem();
});


