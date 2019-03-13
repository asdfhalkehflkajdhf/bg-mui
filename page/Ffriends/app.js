

//瀑布图片展示初始化
document.querySelector('#sortable').sortablejs()


	
const lunBoTuVar = new Vue(
{
	el:"#lunBoTuDiv",
	data:{
		res:[
			{height:"200",width:"200",src:"/vue/res/img/hdp/3.jpg",alt:"alt",h5:"h5",p:"p"}
			,{height:"200",width:"200",src:"/vue/res/img/hdp/1.jpg",alt:"alt",h5:"h5",p:"p"}
			,{height:"200",width:"200",src:"/vue/res/img/hdp/2.jpg",alt:"alt",h5:"h5",p:"p"}

		],
	},
	created:function() {
		
		$('.carousel').carousel({
		  interval: 2000
		})
	},
	methods:{
		modActionStatus:function(navName, event){
			//切换标签状态
			// console.log(this.isActive);
			this.isActive[this.curActive]=false;
			this.isActive[navName]=true;
			this.curActive=navName;
			
			//加载子页面
			
		},
		
		login:function(){
			var res = {code:0,msg:"",token:""}
			//发请请求登陆
			
			//解析结果
			// 
			if(res.code == 0){
				// 保存状态
				localStorage.setItem('boyg_token', JSON.stringify(res.token));
				//修改导航栏状态
			}else{
				// 显示提示信息
				layer.msg(res.msg);
			}


		},
		logout:function(){
			//发送请求
			var info={token:""};
			info.token = JSON.parse(localStorage.getItem('boyg_token'));
			//解析结果
			localStorage.removeItem('boyg_token');
			var res = {code:0,msg:"",token:""}
			// {code:0,msg:""}
		},
		regist:function(){
			// {code:0,msg:"",data:{}}
		},
		mounted: function(){
			// showData('挂载到dom后',this);
			// 加载token查看是否在线
		},
	}
	
}
);

const imgListVar = new Vue({
	el:"#imgListDiv",
	data:{
		res2:[
			{height:"200",width:"200",src:"http://static.runoob.com/images/mix/img_avatar.png",alt:"alt",nickname:"",brief:"",online_state:true}
			,{height:"200",width:"200",src:"/vue/res/img/hdp/1.jpg",alt:"alt"}
			,{height:"200",width:"200",src:"/vue/res/img/hdp/2.jpg",alt:"alt"}
			,{height:"200",width:"200",src:"/vue/res/img/hdp/1.jpg",alt:"alt"}
			,{height:"200",width:"200",src:"/vue/res/img/hdp/2.jpg",alt:"alt"}
			,{height:"200",width:"200",src:"/vue/res/img/hdp/1.jpg",alt:"alt"}
			,{height:"200",width:"200",src:"/vue/res/img/hdp/2.jpg",alt:"alt"}
			,{height:"200",width:"200",src:"/vue/res/img/hdp/1.jpg",alt:"alt"}
			,{height:"200",width:"200",src:"/vue/res/img/hdp/2.jpg",alt:"alt"}
			,{height:"200",width:"200",src:"/vue/res/img/hdp/1.jpg",alt:"alt"}
			,{height:"200",width:"200",src:"/vue/res/img/hdp/2.jpg",alt:"alt"}
		]
	}
});