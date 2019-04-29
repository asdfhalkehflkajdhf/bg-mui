let maxImgNum=9;
let imgUpFileList=[];

function cleanFileList(){
//清空图片
	let a = $(".up-section");
	$.each(a, function(i, item){
		item.remove();
	});
}

//获取图片list
function getFileList(){
	return imgUpFileList;
};
//添加图片list
function addFileList(obj){
	imgUpFileList = $.merge(imgUpFileList, obj);
	// console.log(imgUpFileList, obj);
};
//删除图片
function delFileList(name) {
	let idx = 0;

	for(var i=0; i<imgUpFileList.length; ++i){
		if(imgUpFileList[i].name == name){
			idx=i;
			break;
		}
	}
	imgUpFileList.splice(idx, 1);
	
	// console.log(imgUpFileList);
};



$(function(){
	var defaults = {
		fileType         : ["jpg","png","bmp","jpeg", "gif", "mp4"],   // 上传文件的类型
		fileSize         : 1024 * 1024 * 5                  // 上传文件的大小 5M
	};
	
	
	/*点击图片的文本框*/
	$(".file").change(function(){
		var idFile = $(this).attr("id");
		var file = document.getElementById(idFile);
		var imgContainer = $(this).parents(".z_photo"); //存放图片的父亲元素
		var fileList = file.files; //获取的图片文件
		var input = $(this).parent();//文本框的父亲元素
		var imgArr = [];
		//遍历得到的图片文件
		var numUp = imgContainer.find(".up-section").length;
		var totalNum = numUp + fileList.length;  //总的数量
		if(fileList.length > maxImgNum || totalNum > maxImgNum ){
			layer.msg("上传图片数目不可以超过"+maxImgNum+"个，请重新选择");
		}else if(numUp < maxImgNum){
			fileList = validateUp(fileList);
			addFileList(fileList);
			// console.log(fileList);
			for(var i = 0;i<fileList.length;i++){
			 var imgUrl = window.URL.createObjectURL(fileList[i]);
			     imgArr.push(imgUrl);
			 var $section = $("<div class='up-section fl loading'>");
			     imgContainer.prepend($section);
			 var $span = $("<span class='up-span'>");
			     $span.appendTo($section);
			
			var $img0 = $("<i class='fa fa-trash-o fa-3x close-upimg' style='color:white'></i>").on("click",function(event){
					event.preventDefault();
					event.stopPropagation();
					let delParent = $(this).parent();
					let filename = $(this).parent().find('.img-name-p').text();
					
					top.layer.confirm('您确定要删除？', {
						title: false, //不显示标题栏,
						btn: ['确定','取消'] //按钮
					}, function(index, layero){
						var numUp = delParent.siblings().length;
						if(numUp < maxImgNum+1){
							delParent.parent().find(".z_file").show();
						}
						delFileList(filename);
						// console.log(filename);
						
						 delParent.remove();
						//layer.msg('的确很重要', {icon: 1});
						layer.close(index);
					}, function(index){
						// layer.msg('也可以这样', {
						// 	time: 20000, //20s后自动关闭
						// 	btn: ['明白了', '知道了']
						// });
					});
				});   
				$img0.appendTo($section);
		     var $img = $("<img class='up-img up-opcity'>");
		         $img.attr("src",imgArr[i]);
		         $img.appendTo($section);
		     var $p = $("<p class='img-name-p'>");
		         $p.html(fileList[i].name).appendTo($section);
		     // var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
		     //     $input.appendTo($section);
		     // var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
		     //     $input2.appendTo($section);
		      
		   }
		}
		setTimeout(function(){
				$(".up-section").removeClass("loading");
				$(".up-img").removeClass("up-opcity");
			},450);
		numUp = imgContainer.find(".up-section").length;
		if(numUp >= maxImgNum){
			$(this).parent().hide();
		}
		
		//input内容清空
		// $(this).val("");
	});
	

	function validateUp(files){
		var arrFiles = [];//替换的文件数组
		for(var i = 0, file; file = files[i]; i++){
			//获取文件上传的后缀名
			var newStr = file.name.split("").reverse().join("");
			if(newStr.split(".")[0] != null){
					var type = newStr.split(".")[0].split("").reverse().join("");
					// console.log(type+"===type===");
					if(jQuery.inArray(type, defaults.fileType) > -1){
						// 类型符合，可以上传
						if (file.size >= defaults.fileSize) {
							layerMsg('您这个"'+ file.name +'"文件大小['+file.size+']过大');	
						} else {
							// 在这里需要判断当前所有文件中
							arrFiles.push(file);	
						}
					}else{
						layerMsg('您这个"'+ file.name +'"上传类型不符合');	
					}
				}else{
					layerMsg('您这个"'+ file.name +'"没有类型, 无法识别');	
				}
		}
		return arrFiles;
	}
		
	
	
})
