

function viewerGalley() {
	var galley = document.getElementById('imgListDiv');
	var viewer = new Viewer(galley, {
		url: 'imgShowRul',//定义获取显示图像URL的位置，src不显示原始大小的
		//函数定义的是放大示的大小
		//url: function(galley) {	return galley.src.replace('?size=160', '');	},
		title: true,
		//图片工具栏
		toolbar: {
	
			zoomIn: true,
			zoomOut: true,
			reset: true,
			rotateLeft: true,
			rotateRight: true,
			flipHorizontal: true,
			flipVertical: true,
	
			oneToOne: true,
			prev: function() {
				viewer.prev(true);
			},
			play: true,
			next: function() {
				viewer.next(true);
			},
			// download: function() {
			// 	const a = document.createElement('a');
	
			// 	a.href = viewer.image.src;
			// 	a.download = viewer.image.alt;
			// 	document.body.appendChild(a);
			// 	a.click();
			// 	document.body.removeChild(a);
			// },
		},
		
	});
};
	
// 加载轮播图数据
// 这个是广告，信息分类，轮播图，个人信息页，活动信息页，动态信息页，主要是以图片+跳转链接，显示状态，和计算过程
const userInfo = new Vue(
{
	el:"#showPersonalInfo",
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
			axios.get('testjson/lunBoTuTest.json', {
				firstName: 'Fred',
				lastName: 'Flintstone'
			})
			.then(function (response) {
				if(response.status==200){
					_this.res=response.data;
				}else{
					console.log(response.statusText);
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
		reloadGridItem();
	});

	function reloadGridItem(){
		var $container = $('#imgListDiv');
	
		// post 本地json会失败
		axios.get('../Ffriends/testjson/imgtest.json', {
			firstName: 'Fred',
			lastName: 'Flintstone'
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
				res=response.data;
			}else{
				// console.log(response.statusText);
			}
			
			//生成item
			$.each(res, function (i, data) {
				var $gitem = $(
					'<div class="grid-item col-xl-3 col-lg-3 col-md-4 col-sm-6  col-xs-12" >'
					+'		<img class="" src="'+data['src']+'" imgShowRul="'+data['src']+'" alt="'+data['alt']+'">'
					+'</div>'
				);
				$container.append($gitem).masonry('appended', $gitem, true);
			});
				// // jQuery方式。重新布局，添加元素，另一种方式添加元素，重新布局
			// https://segmentfault.com/a/1190000007316788
			$container.imagesLoaded( function() {
				// new Masonry( document.getElementById('container'),{itemSelector:'.item'} );
				$container.masonry();
				viewerGalley();
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
