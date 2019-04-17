var localToken = getLocalToken();
		// 编辑框初始化
		var E = window.wangEditor;
		var editor_si = new E('#actionMenu','#actionIntroduction');
		editor_si.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
		editor_si.customConfig.uploadImgMaxSize = 3 * 1024 * 1024 // 将图片大小限制为 3M
		// editor_si.customConfig.uploadImgMaxLength = 1 // 限制一次最多上传 5 张图片

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
		
		editor_si.create();
		
		const eaBaseInfo = new Vue({
			el: "#ea-base-info",
			data:{
				res:{
					aid:-1,
					uid:-1,//作者
					title:"",
					activity_stats:true,
					eye:"",
					up:'',
					login_stats:false,
					actFirstPic:"",
					startTime:"",
					endTime:"",
					number:2,
					avgSpending:30,
					actBrief:"",

					actDetails:"",
				},
				nolzw_first_pic:"",
				nolzw_details:""
			},
			created:function(){
				if(getQueryString('id')!=""){
					// 加载数据
					this.getActionInfo();
				}
			},
			mounted:function(){
				// 初始化详情
				editor_si.txt.html(this.nolzw_details);
			},
			methods:{
				readFile(obj){
					var _this = this
					var inputDOM = this.$refs.inputer;
					var file = inputDOM.files[0];
					
					if(file.size>2*1024*1024){
						layer.msg("文件不能超过2M");
						return false;
					}
					//这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件 
					if(!/image\/\w+/.test(file.type)){ 
						layer.msg("请确保文件为图像类型");
						return false; 
					}
					$("#inputGroupFileLabel").html(inputDOM.value);
					var reader = new FileReader(); 
					reader.readAsDataURL(file);
					reader.onload = function(e){
						_this.res.actFirstPic = lzw_compress(this.result);
						_this.nolzw_first_pic = this.result;
						// console.log(this.result);
						// result.innerHTML = '<img src="'+this.result+'" alt=""/>'; 
						// img_area.innerHTML = '<div class="sitetip">图片img标签展示：</div><img src="'+this.result+'" alt=""/>'; 
					} 
				},
				viewFirstPic(){

					if(this.res.nolzw_first_pic.length==0){
						layer.msg("请先选择图片");
						return false;
					}
					
					var imgJson = {
					  "title": "", //相册标题
					  "id": 0, //相册id
					  "start": 0, //初始显示的图片序号，默认0
					  "data": [   //相册包含的图片，数组格式
						{
						  "alt": "",
						  "pid": 666, //图片id
						  "src": this.nolzw_first_pic, //原图地址
						  "thumb": this.nolzw_first_pic //缩略图地址
						}
					  ]
					};
					
					layer.photos({
						photos: imgJson
						//,anim: 2 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
					}); 
				},
				viewActionInfo(){
					// 预览内容
					layer.open({
						type: 1
						,title: '预览'
						,shade: false
						,area: ['100%', '100%']
						,scrollbar: false
						,content: '<div class="detail-body" style="margin:20px;">'+ editor_si.txt.html() +'</div>'
					});
				},
				getActionInfo(){
					var _this = this;
					// post 本地json会失败
					// axios.get('testjson/lunBoTuTest.json', {
					gAxios.post('api/activities/getActionInfo.php', {
						token: localToken,
						aid:getQueryString('id')
					})
					.then(function (response) {
						if(response.status==200){
							_this.res=response.data.data;
							// 解压
							_this.nolzw_first_pic = lzw_decompress(_this.res.actFirstPic);
							_this.nolzw_etails = lzw_decompress(_this.res.actDetails);

						}else{
							parent.layer.msg(response.statusText+response.data.msg);
						}
					})
					.catch(function (error) {
						console.log(error);
					});
					
				},
				putActionInfo(){
					var _this = this;
					// post 本地json会失败
					// axios.get('testjson/lunBoTuTest.json', {
					_this.res.actDetails = lzw_compress(editor_si.txt.html());
					_this.res.aid = getQueryString('id');
					gAxios.post('api/activities/putActionInfo.php', {
						token: localToken,
						data:_this.res
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
				}
				
			}
		})
	