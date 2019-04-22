parent.navMenuRight.upLoginStatus();
var localToken = getLocalToken();

function queryParams(params){

	// 添加消息类型
	// params['msgType']=$('#inputGroupSelect01').val();
	params['token']=localToken;
	return params
}

  function ajaxRequest(params) {
	gAxios.post('api/friends/blackListGet.php', params.data)
	.then(function (response) {
		if(response.status==200){
			res=response.data;
			//解析结果
			if(res.code==0){
				params.success({
				  rows: res.data
				})
			}else{
				layerMsg(res.msg, res.code);
			}
			
		}else{
			layerMsg(response.statusText);
		}
	})
	.catch(function (error) {
		console.log(error);
		
	});

    // params data you need
    console.log(params)
    // here we just use setTimeout
    setTimeout(function () {

    }, 1000)
}

function sendDelReq(row){
	gAxios.post('api/friends/blackListDel.php', {
		token:localToken,
		id:row.id,
	})
	.then(function (response) {
		if(response.status==200){
			res=response.data;
			//解析结果
			if(res.code==0){
				
				// 在页面删除
				$("#msgTable").bootstrapTable('remove', {
					field: 'id',
					values: [row.id]
				});
			}
			layerMsg(res.msg, res.code);
			
		}else{
			layerMsg(response.statusText);
		}
	})
	.catch(function (error) {
		console.log(error);
		
	});
}

var  optEvent={
// event：jQuery事件。
// value：字段值。
// row：行记录数据。
// index：行索引

	'click .remove': function (e, value, row, index) {
		// 在服务端删除
		parent.layer.confirm('您是否要把对方从黑名单移除？', 
			{
				title: false, //不显示标题栏,
				btn: ['是','不是'] //按钮
			}, function(){
				//按钮btn1
				// 发起请求
				sendDelReq(row);
				
			}, function(){
				//按钮btn2
			}	
		);		

	},
	'click .name': function (e, value, row, index) {
		request_url = '../PersonalInfo/view.html?fid='+row.black_uid;
		openSubWin(request_url, row.name, true);
	},
	'click .uid': function (e, value, row, index) {
		request_url = '../PersonalInfo/view.html?fid='+row.black_uid;
		openSubWin(request_url, row.name, true);
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
	  '</a>'
	].join('')
}

function nameFormatter(value, row, index, field){
	return [
	  '<a class="name" href="javascript:void(0)" title="msg">',
		value,
	  '</a> '
	].join('')
}
function uidFormatter(value, row, index, field){
	return [
	  '<a class="uid" href="javascript:void(0)" title="uid">',
		value,
	  '</a> '
	].join('')
}	
