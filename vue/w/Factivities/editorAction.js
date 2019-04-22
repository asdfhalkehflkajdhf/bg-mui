var localToken = getLocalToken();
// 编辑框初始化
var editor_si = wangEditorInit('actionMenu','actionIntroduction', localToken, 2);
 
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
			startTime:"",
			endTime:"",
			number:2,
			avgSpending:30,
			actBrief:"",
			
			actDetails:"",
			//旧的
			res_list:[]
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
				layerMsg("文件不能超过2M", 7);
				return false;
			}
			//这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件 
			if(!/image\/\w+/.test(file.type)){ 
				layerMsg("请确保文件为图像类型", 7);
				return false; 
			}
			$("#inputGroupFileLabel").html(inputDOM.value);
			var reader = new FileReader(); 
			reader.readAsDataURL(file);
			reader.onload = function(e){
				_this.nolzw_first_pic= this.result;
				_this.res.actFirstPic = lzw_compress(_this.nolzw_first_pic);
				// _this.nolzw_first_pic = res;
				// console.log(_this.res.actFirstPic);
				// console.log(_this.nolzw_first_pic);
				// result.innerHTML = '<img src="'+this.result+'" alt=""/>'; 
				// img_area.innerHTML = '<div class="sitetip">图片img标签展示：</div><img src="'+this.result+'" alt=""/>'; 
			} 
		},
		viewFirstPic(){
			if(this.nolzw_first_pic.length==0)
			{
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
					_this.nolzw_first_pic = lzw_decompress(_this.res.actFirstPic);
					_this.nolzw_etails = lzw_decompress(_this.res.actDetails);

				}else{
					layerMsg(response.statusText);
				}
			})
			.catch(function(error) {
				console.log(error);
			});
			
		},
		putActionInfo(){
			var _this = this;
			
			// 对文本数据进行压缩
			_this.res.actDetails = lzw_compress(editor_si.txt.html());
			// a获取活动id
			_this.res.aid = getQueryString('id');
			//添加新的图片数据
			_this.res.res_list.push(editor_si.upImgResList);
			gAxios.post('api/activities/putActionInfo.php', {
				token: localToken,
				data:_this.res
			})
			.then(function (response) {
				if(response.status==200){
					_this.res=response.data.data;
				}else{
					layerMsg(response.statusText);
				}
			})
			.catch(function(error) {
				console.log(error);
			});
		}
		
	}
})
