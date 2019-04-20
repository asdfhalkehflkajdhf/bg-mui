//存在editor的页面,set 2个 action 1个



function wangEditorImg(editor, token, page_id, imgSize){
	editor.customConfig.uploadImgMaxSize = imgSize * 1024 * 1024 // 将图片大小限制为 3M
	editor.customConfig.uploadImgMaxLength = 9 // 限制一次最多上传 5 张图片 默认为 10000 张（即不限制）
	editor.customConfig.uploadImgServer = baseURL+'api/personalInfo/userImgUp.php'
	
	//新加一个反回值list
	editor.upImgResList=[];
	
	editor.customConfig.uploadImgParams = {
		// 如果版本 <=v3.1.0 ，属性值会自动进行 encode ，此处无需 encode
		// 如果版本 >=v3.1.1 ，属性值不会自动 encode ，如有需要自己手动 encode
		token: token,
		page_id: page_id
	};
	// 将 timeout 时间改为 3s
	editor.customConfig.uploadImgTimeout = 3000;
	
	// 监听函数
	editor.customConfig.uploadImgHooks = {
		before: function (xhr, editor, files) {
			// 图片上传之前触发
			// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
			
			// 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
			// return {
			//     prevent: true,
			//     msg: '放弃上传'
			// }
		},
		success: function (xhr, editor, result) {
			// 图片上传并返回结果，图片插入成功之后触发
			// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
		},
		fail: function (xhr, editor, result) {
			// 图片上传并返回结果，但图片插入错误时触发
			// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
		},
		error: function (xhr, editor) {
			// 图片上传出错时触发
			// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
			parent.layer.msg("上传失败！")
		},
		timeout: function (xhr, editor) {
			// 图片上传超时时触发
			// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
			parent.layer.msg("上传超时！")
		},

		// 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
		// （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
		customInsert: function (insertImg, result, editor) {
			// 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
			// insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

			// 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
			// var url = result.url
			// insertImg(url)

			// result 必须是一个 JSON 格式字符串！！！否则报错
			
			
			/////////////////////////////////////////////////////
			// 接收格式
			// 	code
			// 	msg
			// 	data
			// 		ok[]
			// 		error[]
			// 		msg{
			// 			id:imgid or info
			// 		}
			
			$.each(result.data.ok, function(i,item){
				// 插入图片
				insertImg(result.msg[item].src);
				// 保存图片id
				editor.upImgResList.push(result.msg[item].imgId);
				// editor
			});   
			
		}
		
	}
}


function wangEditorInit(menu_id, body_id, token, page_id, imgSize=3){
	// 编辑框初始化
	var E = window.wangEditor;
	var editor = new E('#'+menu_id,'#'+body_id);
	// editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
	// 图片上传设置
	wangEditorImg(editor, token, page_id, imgSize);
	
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
	editor.customConfig.menus =editorMenus;
	editor.create();
	return editor;
}