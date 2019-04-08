var localToken = getLocalToken();

var $selectButton = $('#inputGroupSelect01')
$selectButton.on('change', function(){
	var _type = this.value;
	console.log(_type);
	// $("#msgTable").bootstrapTable('refresh')
	// var _params={search: undefined, sort: "time", order: "desc", msgType: "info"};
	// 这里设置不起作用,只好在queryParams里设置
	$("#msgTable").bootstrapTable('refreshOptions', {})
})

function queryParams(params){
	params['token']=localToken;
	params['msgType']=$('#inputGroupSelect01').val();
	// {search: undefined, sort: "time", order: "desc", msgType: "info"}
	console.log(params);
	return params
}

//打开窗口函数
function sendMsgFun123(user_id, friend_id){
	//多窗口模式，层叠置顶
	request_url = 'msgWin.html?user_id='+user_id+'&friend_id='+friend_id;
	// openMsgWinWidth=window.screen.availWidth;//window.screen.availHeight
	// openMsgWinHeight=window.screen.availHeight;//window.screen.availWidth
	openMsgWinWidth=document.documentElement.clientWidth;
	openMsgWinHeight=document.documentElement.clientHeight;
	if (openMsgWinWidth>900){
		openMsgWinWidth=900;
	}
	if (openMsgWinHeight>700){
		openMsgWinHeight=700;
	}

	var index = layer.open({
		type: 2 //此处以iframe举例
		,title: 'message'
		//,area: ['900px', '700px']
		,area: [ String(openMsgWinWidth)+'px', String(openMsgWinHeight)+'px' ]
		,shade: 0
		,maxmin: true //最大最小化
		,offset: 'auto'
		,content: request_url
// 				,btn: ['全部关闭', '全部关闭'] //只是为了演示  http://www.layui.com/doc/modules/layer.html#btn
// 				,yes: function(){       //第一个按钮,按钮1的回调是yes，而从按钮2开始，则回调为btn2: function(){}，以此类推。
// 					layer.msg('全部关闭');
// 					layer.closeAll();
// 				}
// 				,btn2: function(){
// 				  layer.closeAll();
// 				}
// 				,btnAlign: 'l' //按钮排列
// 
		,zIndex: layer.zIndex //重点1
		,success: function(layero){
		  layer.setTop(layero); //重点2
		}
	});
	// layer 弹出默认全屏
	// layer.full(index);
}


function blackListAdd(row){
	gAxios.post('api/friends/blackListAdd.php', {
		mid:row.id,
		token:localToken,
		buid:row.uid,
		uid:getLocalID(),
		unname:row.name
	})
	.then(function (response) {
		if(response.status==200){
			res=response.data;
			//解析结果
			if(res.code==0){
				parent.layer.msg('msg', {icon: 1});
				// 在页面删除
				$("#msgTable").bootstrapTable('remove', {
					field: 'id',
					values: [row.id]
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
		// parent.layer.msg(error);
	});

}

var  optEvent={
// event：jQuery事件。
// value：字段值。
// row：行记录数据。
// index：行索引
	'click .blacklist': function (e, value, row, index) {
		layer.confirm('您是否要把对方添加到黑名单？', 
			{
				title: false, //不显示标题栏,
				btn: ['是','不是'] //按钮
			}, function(){
				//按钮btn1
				
				// 发起请求
				layer.msg('msg', {icon: 1});
			}, function(){
				//按钮btn2
				layer.msg('保存冷静', {
					time: 2000, //2s后自动关闭
				});
			}	
		);
	},
	'click .remove': function (e, value, row, index) {
		// 在服务端删除
		
		// 在页面删除
		$("#msgTable").bootstrapTable('remove', {
			field: 'id',
			values: [row.id]
		});
	},
	'click .name': function (e, value, row, index) {
		console.log("打开msgWin",row, value);
		sendMsgFun123(row.uid, 0);

	},
	

}

function optFormatter(value, row, index, field){
// value：字段值。
// row：行记录数据 字典。
// index：行索引。
// field：行字段name。
// 			console.log(value);
// 			console.log(row);
// 			console.log(index);
// 			console.log(field);
	return [
	  '<a class="remove" href="javascript:void(0)" title="删除">',
	  '	<i class="fa fa-trash-o"></i>',
	  '</a>',
	  '&nbsp;&nbsp;&nbsp;&nbsp;',
	  '<a class="blacklist" href="javascript:void(0)" title="黑名单">',
	  '	<i class="fa fa-user-secret"></i>',
	  '</a>  '
	].join('')
}

function nameFormatter(value, row, index, field){
	return [
	  '<a class="name" href="javascript:void(0)" title="msg">',
		value,
		'<span class="badge badge-pill badge-danger">4</span>',
	  '</a> '
	].join('')
}

