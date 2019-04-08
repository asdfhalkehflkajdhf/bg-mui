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
			var res=[];
			if(response.status==200){
				res=response.data;
				if(res.code==0){
					//生成item
					$.each(res.data, function (i, data) {
						var $gitem = $(
				
							'<div class="grid-item col-xl-3 col-lg-3 col-md-4 col-sm-6  col-xs-12" >'
							+'	<div class="card ">'
							+'			<img class="card-img-top" src="'+data['src']+'" imgShowRul="'+data['src']+'" alt="'+data['alt']+'">'
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
						$container.masonry();
					});
				}else{
					parent.layer.msg(res.msg);
				}
			}else{
				parent.layer.msg(response.statusText+response.data.msg);
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

