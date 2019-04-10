
var localToken = getLocalToken();


// 个人信息
// 相册，视频，图片为一个表，按页页面分类，个人信息，动态信息，活动信息，资源保存以路径形式存储，时间，uid
const userInfo = new Vue(
{
	el:"#showPersonalInfo",
	data:{
		res:{
			uid:'',
			eye:'',
			contact:"",
			nick_name:"",
			height:"",
			weight:"",
			living_place:"",
			profession:"",
			income:"",
			tryst_expect:"",
			marital_status:"",
			selfIntr:"",
			otehrIntr:"",
			find_switch:false
		},
		eduList:[],

	},
	created:function() {
		this.getUserInfo();
	},
	methods:{
		getUserInfo:function(){
            var _this = this;
			// post 本地json会失败
			gAxios.post('api/personalInfo/userinfoGet.php', {
				token: localToken,
				uid:getQueryString("fid")
			})
			.then(function (response) {
				if(response.status==200){
					var res=response.data;
					if(res.code == 0){
						_this.res=res.data.res;
						_this.eduList=res.data.eduList;
					}else{
						parent.layer.msg(res.msg);
					}
				}else{
					parent.layer.msg(response.statusText);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
        }
	}

});


// jQuery页面加载后执行的事件(3种方式)
// 1 $(function () { });
// 2 $(document).ready(function () { });
// 3 window.onload = function () { }
//相册更新数据，并追加到masonry容器中
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
//JS瀑布流插件masonry动态载入数据
$(function () {
	$("#getGridItem").on("click",function(){
		reloadGridItem();
	});

	function getQueryString(name) { 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
		var context = ""; 
		if (r != null) 
			context = r[2]; 
		reg = null; 
		r = null; 
		return context == null || context == "" || context == "undefined" ? "" : context; 
	}
	// console.log(getQueryString("fid"));

	function reloadGridItem(){
		var $container = $('#imgListDiv');
	
		// post 本地json会失败
		gAxios.post('api/personalInfo/userImgGetList.php', {
				token: localToken,
				uid:getQueryString("fid")
		})
		.then(function (response) {
			var res=[];
			if(response.status==200){
				// console.log(1);
				res=response.data;
				if(res.code!=0){
					parent.layer.msg(res.msg);
				}else{
					//生成item
					$.each(res.data, function (i, data) {
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
						$container.masonry();
						viewerGalley();
					});					
				}
			}else{
				parent.layer.msg(response.statusText);
			}
			
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

