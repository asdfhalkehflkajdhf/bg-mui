
//打开窗口函数
function openSubWin(url, title, full){
	//多窗口模式，层叠置顶,
	if(!full){
		//是否全屏显示
		full=false
	}
	
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
		,title: title
		//,area: ['900px', '700px']
		,area: [ String(openMsgWinWidth)+'px', String(openMsgWinHeight)+'px' ]
		,shade: 0
		,maxmin: true //最大最小化
		,offset: 'auto'
		,content: url
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
	if(full){
		layer.full(index);
	}
	// layer.full(index);
}