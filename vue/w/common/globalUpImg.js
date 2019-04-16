function upImgInit(objID, pageId, token, isUpload, mfc){
	if(!mfc){mfc=9;} 
	// 上传初始化
	//			// vue 不能包含 bootstrap fileinput ,否则bootstrap fileinput会冲突
	// 参数 https://blog.csdn.net/u012526194/article/details/69937741/
	var fileUpLoadVar={
		language: 'zh', //设置语言
		theme: 'fa',
		showUpload: isUpload,
		showCaption: true,//按钮前边的输入框
		// showPreview: false,
		dropZoneEnabled: false, //拖拽区
		browseClass: "btn btn-success",
		// previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
		overwriteInitial: false,
		// initialPreviewAsData: true,
		// deleteUrl:String,//删除图片时的请求路径
		// deleteExtraData:{token:localToken}, //删除图片时额外传入的参数{}
		allowedFileExtensions:['jpg','png','gif','jpeg','bmp','mp4'],
		uploadUrl:'${baseURL}api/personalInfo/userImgUp.php', //上传图片时的请求路径
		uploadExtraData:{token:token, page_id:pageId, uid:getQueryString("uid")}, //,上传图片时额外传入的参数{}uid,admin opt
		maxFileSize:5*1024,//以kb计算
		maxFileCount:mfc,
		previewFileType:['image', 'video'],//预览文件类型,内置
		uploadAsync:false,// 关闭异步上传
		msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
	};
	
	$("#"+objID).fileinput(fileUpLoadVar);
	
}

function upImgEvent(objID, eventFunc){
	// 文件上传方法
	$("#"+objID).fileinput("upload");
	// 上传成功后处理方法
	$("#"+objID).on("fileuploaded", function(event, data, previewId, index) {
		if(eventFunc){
			eventFunc(event, data, previewId, index);
		}
	}).on('fileerror', function(event, data, msg) {  //一个文件上传失败
		console.log('文件上传失败！',event);
		console.log('文件上传失败！',data);
		console.log('文件上传失败！',msg);
  
	})
}

function upImgClean(objID){
	$("#"+objID).fileinput('destroy');
	// $("#"+objID).fileinput('reset/clear');
}



