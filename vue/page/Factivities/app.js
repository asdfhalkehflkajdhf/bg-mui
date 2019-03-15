

// 加载轮播图数据
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
			axios.get('lunBoTuTest.json', {
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

// 更新数据，并追加到masonry容器中
const imgListVar = new Vue({
	el:"#imgListDiv",
	data:{
		res:[]
	},
	created:function(){
		var _this = this;
		// 生成 card
		console.log("created");
	},
	mounted:function(){
        var _this = this;
        this.$nextTick(function(){
	        // _this.getImgList();
			this.reloadGridItem();
	
        });
		console.log("mounted");
    },
	watch:{
		// 监听到了 res 数据发生变化执行arr方法
		res: function() {
			this.$nextTick(function(){
				// this.reloadGridItem();
				
				/*现在数据已经渲染完毕*/
					// // jQuery方式。重新布局，添加元素，另一种方式添加元素，重新布局
				// https://segmentfault.com/a/1190000007316788
				var $container = $('#imgListDiv');
				$container.imagesLoaded( function() {
					// new Masonry( document.getElementById('container'),{itemSelector:'.item'} );
					$container.masonry();			
				});
			})
			console.log("wathc");
		}
    },
    methods:{
        getImgList:function(){
            var _this = this;
        },
		reloadGridItem:function(){
            var _this = this;
		
			// post 本地json会失败
			axios.get('imgtest.json', {
				firstName: 'Fred',
				lastName: 'Flintstone'
			})
			.then(function (response) {
				if(response.status==200){
					_this.res=response.data;
					console.log(_this.res);
				}else{
					console.log(response.statusText);
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

