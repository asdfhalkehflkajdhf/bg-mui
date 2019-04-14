var localToken = getLocalToken();


$('#inputGroupSelect01').on('change', function(){
	// var _type = this.value;
	// console.log(_type);
	// $("#msgTable").bootstrapTable('refresh')
	// var _params={search: undefined, sort: "time", order: "desc", msgType: "info"};
	// 这里设置不起作用,只好在queryParams里设置
	$("#msgTable").bootstrapTable('refreshOptions', {})
})




function removeRecard(row){
	gAxios.post('api/news/delUserMsg.php', {
		token:localToken,
		uid:row.uid,
		type:'info'
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
	'click .uid': function (e, value, row, index) {
		// console.log("打开msgWin",row, value);
			
		request_url = '../PersonalInfo/view.html?fid='+row.uid;
		openSubWin(request_url, row.name, true);
	},
	'click .name': function (e, value, row, index) {
		// console.log("打开msgWin",row, value);
		request_url = 'msgWin.html?fid='+row.uid;
		openSubWin(request_url, row.name );
	},
	'click .blacklist': function (e, value, row, index) {
		layer.confirm('您是否要把对方添加到黑名单？', 
			{
				title: false, //不显示标题栏,
				btn: ['是','不是'] //按钮
			}, function(){
				//按钮btn1
				// 发起请求
				// 在服务端删除
				removeRecard(row);
				// 在服务端添加黑名单
				blackListAdd(row);
				
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
		removeRecard(row);
	},

	

}

function uidFormatter(value, row, index, field){
	return [
	  '<a class="uid" href="javascript:void(0)" title="用户唯一id">',
		value,
	  '</a> '
	].join('')
}
function nameFormatter(value, row, index, field){
	return [
	  '<a class="name" href="javascript:void(0)" title="用户名，消息数">',
		value,
		'<span class="badge badge-pill badge-danger">'+row.noRead+'</span>',
	  '</a> '
	].join('')
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

function queryParams(params){

	// 添加消息类型
	params['type']=$('#inputGroupSelect01').val();
	params['token']=localToken;
	// console.log(params);
	return params
}

function ajaxRequest(params) {
	gAxios.post('api/news/getUserMsgList.php', params.data)
	.then(function (response) {
		if(response.status==200){
			res=response.data;
			//解析结果
			if(res.code==0){
				params.success({
				  rows: res.data
				})
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

//     // params data you need
//     console.log(params)
//     // here we just use setTimeout
//     setTimeout(function () {
// 
//     }, 1000)
  }


