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
					parent.layer.msg(response.statusText+response.data.msg);
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
					parent.layer.msg(response.statusText+response.data.msg);
				}
			})
			.catch(function (error) {
				console.log(error);
				// parent.layer.msg(error);
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
			living:"",
			//活动状态
			status:1,
			uid:-1,
			floadTime:"null",
		},
		conditionalData:{
			statusList:[
// 				{value:1,text:"全部"},
// 				{value:2,text:"进行中"},
// 				{value:3,text:"已结束"},
// 				{value:3,text:"参加过的"},
			]
		},
		page: 0,
		landing: parent.navMenuRight.getLanding()
	},
	created:function(){
		this.getFrom();
	},
	methods:{
		//检查表单
		checkForm(){
			
		},
		//获取表单		getFrom(){
			var _vueThis = this;
			gAxios.post('api/activities/getSearchCondition.php', {
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
					parent.layer.msg("获取信息失败！");
					return;
				}

			})
			.catch(function (error) {
				// parent.layer.msg(error);
			});

		},
		//更新表单
		upFrom(){
			var _vueThis = this;
			// 初始化page信息
			_vueThis.page=0;
			gAxios.post('api/activities/putSearchCondition.php', {
				token: localToken,
				data: _vueThis.conditionalForm
			})
			.then(function (response) {
				var res=[];
				if(response.status==200){
					res=response.data;
					parent.layer.msg(res['msg']);
					console.log(res);
				}else{
					parent.layer.msg("获取信息失败！");
					return;
				}
			
			})
			.catch(function (error) {
				console.log(error);
				// parent.layer.msg(error);
			});
		}
	}
});

// 更新数据，并追加到masonry容器中
// 相册，视频，图片为一个表，按页页面分类，个人信息，动态信息，活动信息，资源保存以路径形式存储，时间，uid
const imgListVar = new Vue({
	el:"#imgListDiv",
	data:{
		res:[]
	},
	created:function(){
		var _this = this;
		// 生成 card
         // this.$nextTick(function(){
			 // document.getElementById('lz66303').outerHTML
         // });
		
// 		console.log($("#imgListDivTemp"));
		// console.log("created");
		// $("#imgListDiv")
	},
	mounted:function(){
        var _this = this;
        this.$nextTick(function(){
	        _this.getImgList();
			// $("#imgListDiv").masonry();
			// console.log(document.getElementById('imgListDivTemp').outerHTML);
			//.prop("innerHTML")
			// https://zhidao.baidu.com/question/652695212709545885.html
// 			var tvar=$("#imgListDivTemp")
// 			console.log(tvar.prop("outerHTML"));
        });
		// this.$forceUpdate();
		// console.log("mounted");
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
    methods:{
        getImgList:function(){
            var _this = this;
        }

    }
});


// jQuery页面加载后执行的事件(3种方式)
// 1 $(function () { });
// 2 $(document).ready(function () { });
// 3 window.onload = function () { }


//JS瀑布流插件masonry动态载入数据
$(function () {
	$("#getGridItem").on("click",function(){
		formTag.page++;
		// console.log(formTag);
		reloadGridItem();
	});


	function reloadGridItem(){
		var $container = $('#imgListDiv');
	
		// post 本地json会失败
		// axios.get('testjson/imgtest.json', {
		gAxios.post('api/activities/getListInfo.php', {
			token: localToken,
			page: formTag.page
		})
		.then(function (response) {
// {
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
				layer.msg("获取信息失败！");
				return;
			}
			
			if(res.length==0){
				layer.msg("没有更多，请修改查找条件！");
				return;
			}
			//生成item
			$.each(res, function (i, data) {
				// {"id":"00000000003","title":"test","s_time":"2019-04-19","e_time":"2019-04-28","region_name":"\u6d4b\u8bd5","activity_stats":"1","up":"0","eye":"0","activity_img":"1","activity_summary":"test"},
				var $gitem = $(
					'<div class="grid-item col-xl-3 col-lg-3 col-md-4 col-sm-6  col-xs-12" >'
					+'	<div class="card ">'
					+'		<a target="_blank" href="./viewAction.html?id='+data['id']+'" >'
					+'			<img class="card-img-top" src="'+data['activity_img']+'">'
					+'		</a>'
					+'		<div class="card-body">'
					+'			<div class="card__span">'
					+'				<span class="card__span_left">'
					+'					<span class="btn btn-outline-success" id="">'+data['region_name']+'</span>'
					+ (data['activity_stats']=='1'?'<span class="btn bg-success text-white " >进行中</span>':'<span class="btn bg-secondary text-white" >结束</span>')
	
					+'				</span>'
					+'				<span class="btn card__span_right"  data-aid="'+data['id']+'">'
					+'					<span title="浏览" >'
					+'							<span class="fa fa-eye ">'+data['eye']+'</span>'
					+'						<!-- <a href=""><a> -->'
					+'					</span>'
					+'				</span>'
					+'			</div>			'					
					+'			<!-- <div class="card__link"></div> -->'
					+'			<hr />'
					+'			<div class="card__span">'
					+'				<span class="card__span_left">'
					+'					<span class="fa fa-clock-o" title="开始时间">'+data['s_time']+'</span>'
					+'				</span>'
					+'				<span class="card__span_right">'
					+'					<span class="fa fa-clock-o" title="结束时间">'+data['e_time']+'</span>'
					+'				</span>'
					+'			</div>			'					
					+'			<!-- <div class="card__link"></div> -->'
					+'			<hr />'
					+'			<h2 class="card-title">'+data['title']+'</h2>'
					+'			<p class="card-text">'+data['activity_summary']+'</p>'
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
	
	reloadGridItem();
	// var $getTempItemListElems=$($("#imgListDivTemp").html());
	// $("#imgListDivTemp").empty();
	// $container.append($getTempItemListElems).masonry('appended', $getTempItemListElems,true).masonry();
});

