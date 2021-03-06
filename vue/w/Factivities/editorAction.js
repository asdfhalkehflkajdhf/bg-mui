
var localToken = getLocalToken();
// 编辑框初始化,活动页，2
var editor_si = wangEditorInit('actionMenu','actionIntroduction', localToken, getLocalID(), 2);
 
///////////////////////////////////
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
			activity_img_id:-1,
			
			startTime:"",
			endTime:"",
			number:2,
			avgSpending:30,
			actBrief:"",
			actDetails:"",
			//旧的
			res_list:[]
		},
		// 只作展示用
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
	},
	methods:{
		readFile(obj){
			var _this = this
			var inputDOM = _this.$refs.inputer;
			var fileObj = inputDOM.files;
			let size = fileObj[0].size;
			let type = fileObj[0].type;
						
			if(size>2*1024*1024){
				layerMsg("文件不能超过2M", 7);
				return false;
			}
			//这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件 
			if(!/image\/\w+/.test(type)){ 
				layerMsg("请确保文件为图像类型", 7);
				return false; 
			}
			
			$("#inputGroupFileLabel").html(inputDOM.value);
			var reader = new FileReader(); 
			reader.readAsDataURL(fileObj[0]);
			reader.onload = function(e){
				_this.nolzw_first_pic= this.result;
				//压缩
				//_this.res.actFirstPic = lzw_compress(_this.nolzw_first_pic);
				//未压缩
				_this.res.actFirstPic = _this.nolzw_first_pic;

				// result.innerHTML = '<img src="'+this.result+'" alt=""/>'; 
				// img_area.innerHTML = '<div class="sitetip">图片img标签展示：</div><img src="'+this.result+'" alt=""/>'; 
			}
			
			// FormData 对象
			var formFile = new FormData();
			formFile.append("token", localToken);  // 可以增加表单数据
			formFile.append("uid", getLocalID());  // 可以增加表单数据
			formFile.append("page_id", 2);  // 可以增加表单数据
			formFile.append("file", fileObj[0]); //加入文件对象

			// 发起上传请求
			gAxios.post('api/personalInfo/userImgUp.php',formFile)
			.then(function (response) {
				if(response.status==200){
					let res=response.data;
					if(res.code){
						layerMsg(res.msg, res.code);
					}else{
						//
						if(res.data.ok.length>0){
							_this.res.activity_img_id=res.data.msg[res.data.ok[0]].imgId;
							// _this.res.nolzw_first_pic = res.data.msg[_this.res.activity_img_id];
							
							// 更新res_list
							_this.res.res_list.push(_this.res.activity_img_id);
							layerMsg("上传成功！", 0);
						}else{
							layerMsg(res.data.msg[res.data.error[0]]);
						}
					}
				}else{
					layerMsg(response.statusText);
				}
			})
			.catch(function(error) {
				console.log(error);
			});


		},
		viewFirstPic(){
			if(this.nolzw_first_pic.length==0){
				layerMsg("请先选择图片", 7);
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
					// _this.nolzw_first_pic = lzw_decompress(_this.res.actFirstPic);
					// _this.nolzw_details = lzw_decompress(_this.res.actDetails);
					// 未压缩
					_this.nolzw_first_pic = _this.res.actFirstPic;
					_this.nolzw_details = _this.res.actDetails;
					// 初始化活动详情
					editor_si.txt.html(_this.nolzw_details);
					
					if(response.data.code){
						layerMsg(response.data.msg, response.data.code);
					}


				}else{
					layerMsg(response.statusText);
				}
			})
			.catch(function(error) {
				console.log(error);
			});
			
		},
		checkForm(){
			var _this = this;
			if(_this.res.title.length==0){
				layerMsg("活动标题为空！");
			}else if(_this.res.activity_img_id==-1){
				layerMsg("活动首图为空！");
			}else if(_this.res.startTime=="" || _this.res.endTime==""){
				layerMsg("活动时间范围为空！");				
			}else if(_this.res.actBrief==""){
				layerMsg("活动简介为空！");
			}else if(_this.res.actDetails==""){
				layerMsg("活动详情为空！");
			}else{
				return true;
			}
			return false;
		},
		putActionInfo(){
			var _this = this;
			_this.res.actDetails = editor_si.txt.html();
			var index = layer.load(1, { shade: [0.1,'#fff']}); //0.1透明度的白色背景

			if(!this.checkForm()){
				return false;
			}
			
			// 对文本数据进行压缩
			// _this.res.actDetails = lzw_compress(editor_si.txt.html());
			// 未压缩
			// a获取活动id
			_this.res.aid = getQueryString('id');
			//添加新的图片数据
			_this.res.res_list = $.merge(_this.res.res_list, editor_si.upImgResList);
			// _this.res.res_list = _this.res.res_list.concat(editor_si.upImgResList);
			
			console.log(_this.res);
			gAxios.post('api/activities/putActionInfo.php', {
				token: localToken,
				data:_this.res
			})
			.then(function (response) {
        layer.close(index);
				if(response.status==200){
					var res=response.data;
					layerMsg(res.msg, res.code);
				}else{
					layerMsg(response.statusText);
				}
				
			})
			.catch(function(error) {
				console.log(error);
				layer.close(index);
			});
		}
		
	}
})
