// 编辑框初始化
var E = window.wangEditor;
var editor_si = new E('#personalIntroduction');
var editor_ti = new E('#duifangIntroduction');
editor_si.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
editor_ti.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片

editor_si.customConfig.uploadImgMaxSize = 3 * 1024 * 1024 // 将图片大小限制为 3M
// editor_si.customConfig.uploadImgMaxLength = 1 // 限制一次最多上传 5 张图片

editor_ti.customConfig.uploadImgMaxSize = 3 * 1024 * 1024 // 将图片大小限制为 3M
// editor_ti.customConfig.uploadImgMaxLength = 1 // 限制一次最多上传 5 张图片


// 创建编辑器之后，使用editor.txt.html(...)设置编辑器内容
var editorMenus=[
    'head',  // 标题
    'bold',  // 粗体
    'fontSize',  // 字号
    // 'fontName',  // 字体
    // 'italic',  // 斜体
    'foreColor',  // 文字颜色
    'backColor',  // 背景颜色
    // 'link',  // 插入链接
    'list',  // 列表
    'justify',  // 对齐方式
    'quote',  // 引用
    // 'emoticon',  // 表情
    'image',  // 插入图片
    // 'table',  // 表格
];
// 自定义菜单配置
editor_si.customConfig.menus =editorMenus;
editor_ti.customConfig.menus =editorMenus;

editor_si.create();
editor_ti.create();

			
// 上传初始化
// 参数 https://blog.csdn.net/u012526194/article/details/69937741/
var fileUpLoadVar={
	language: 'zh', //设置语言
	theme: 'fa',
	// showUpload: true,
	showCaption: false,//按钮前边的输入框
	// showPreview: false,
	dropZoneEnabled: false,
	browseClass: "btn btn-success",
	previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
	overwriteInitial: false,
	// initialPreviewAsData: true,
	// deleteUrl:String,//删除图片时的请求路径
	// deleteExtraData:Object,删除图片时额外传入的参数{}
	allowedFileExtensions:['jpg','png','gif','jpeg','bmp'],
	uploadUrl:"String",//上传图片时的请求路径
	// uploadExtraData:Object,上传图片时额外传入的参数{}
	maxFileSize:5*1024,//以kb计算
	maxFileCount:10,
	previewFileType:['image', 'video'],//预览文件类型,内置
	uploadAsync:false,// 关闭异步上传
};

$("#txt_file").fileinput(fileUpLoadVar);


// 文件上传方法
// $("#txt_file").fileinput("upload");
// 上传成功后处理方法
$("#txt_file").on("fileuploaded", function(event, data, previewId, index) {

});


// 加载轮播图数据
// 这个是广告，信息分类，轮播图，个人信息页，活动信息页，动态信息页，主要是以图片+跳转链接，显示状态，和计算过程
const lunBoTuVar = new Vue(
{
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

// 查找时为，一个表结构
const formTag = new Vue({
	el:"form",
	data:{
		conditionalForm:{
			currentLivingPlace:"不可修改",
			sex:1,
			age1:3,
			age2:5,
			height1:56,
			height2:17,
			edu:2,
			school:3,
			income:1,
			ownness:2
		},
		conditionalData:{
			sexList:[
				{value:1,text:"全部"},
				{value:2,text:"男"},
				{value:3,text:"女"},
			],
			eduList:[
				{value:1,text:"全部"},
				{value:2,text:"全部1"},
				{value:3,text:"全部2"},
				{value:4,text:"全部3"},
			],
			schoolList:[
				{value:1,text:"全部"},
				{value:2,text:"全部1"},
				{value:3,text:"全部2"},
				{value:4,text:"全部3"},
			],
			ownnessList:[
				{value:1,text:"全部"},
				{value:2,text:"全部1"},
				{value:3,text:"全部2"},
				{value:4,text:"全部3"},
			]
		}
		
	},
	created:function(){
		
	},
	methods:{
		//检查表单
		checkForm(){
			
		},
		//获取表单		getFrom(){
			
		},
		//更新表单
		upFrom(){
			console.log(this.conditionalForm);
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
	// 保存成功之后，返回data list
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
// 					'<div class="grid-item col-xl-2 col-lg-3 col-md-4 col-sm-6  col-xs-12" style="list-style:none">'
// 		            +'	<div class="card thumbnail">'
// 		            +'		<a class="lightbox" href="'+data['src']+'">'
// 		            +'			<img src="'+data['src']+'" alt="'+data['alt']+'">'
// 		            +'		</a>'
// 		            // +'		<div class="caption">'
// 					+'			<div class="">'
// 					+'				<input type="checkbox" class="card__span_left">'
// 					+'				<button type="button" class="btn btn-link card__span_right">删除</button>'
// 					+'			</div>'
// // 		            +'            <h3>Thumbnail label</h3>'
// // 		            +'            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'
// 		            // +'		</div>'
// 		            +'	</div>'
// 		            +'</div>'

					'<div class="grid-item col-xl-3 col-lg-3 col-md-4 col-sm-6  col-xs-12" >'
					+'	<div class="card ">'
		            // +'		<a class="" href="'+data['src']+'">'
					+'			<img class="card-img-top" src="'+data['src']+'" imgShowRul="'+data['src']+'" alt="'+data['alt']+'">'
		            // +'		</a>'
					+'		<div class="">'
					+'				<input type="checkbox" class="card__span_left">'
					+'				<button type="button" class="btn btn-link card__span_right">删除</button>'
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
				// bootstrap 样式
				// baguetteBox.run('#imgListDiv');

				
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

