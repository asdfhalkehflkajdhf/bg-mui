(function ($) {
	$.extend({
		tipsBox: function (options) {
			options = $.extend({
				obj: null,  //jq对象，要在那个html标签上显示
				str: "+1",  //字符串，要显示的内容;也可以传一段html，如: "<b style='font-family:Microsoft YaHei;'>+1</b>"
				startSize: "12px",  //动画开始的文字大小
				endSize: "30px",    //动画结束的文字大小
				interval: 600,  //动画时间间隔
				color: "red",    //文字颜色
				callback: function () { }    //回调函数
			}, options);
			$("body").append("<span class='num'>" + options.str + "</span>");
			var box = $(".num");
			var left = options.obj.offset().left + options.obj.width() / 2;
			var top = options.obj.offset().top - options.obj.height();
			box.css({
				"position": "absolute",
				"left": left + "px",
				"top": top + "px",
				"z-index": 9999,
				"font-size": options.startSize,
				"line-height": options.endSize,
				"color": options.color
			});
			box.animate({
				"font-size": options.endSize,
				"opacity": "0",
				"top": top - parseInt(options.endSize) + "px"
			}, options.interval, function () {
				box.remove();
				options.callback();
			});
		}
	});
})(jQuery);

function niceIn(prop){
	prop.find('i').addClass('niceIn');
	setTimeout(function(){
		prop.find('i').removeClass('niceIn');
	},1000);
}

$(function() {

    $(document).on('click', ".up_btn", {function: upCallBackFunction}, function(_json){
        var ubBtn = $(this);
        if(_json.data!=null && typeof _json.data.function=='function'){
            _json.data.function(ubBtn);
        }
        //发起更新请求，在up_btn上设置更新参数

        $.tipsBox({
            obj: ubBtn,
            str: "+1",
            callback: function () {
            }
        });
        niceIn(ubBtn);
    });

    // 这种情况对用js动态添加的元素 是无效的，即没有绑定单击事件，所以对于动态添加的标签需要用on()来绑定事件
    // https://www.cnblogs.com/linJie1930906722/p/5232959.html
	// $(".up_btn").click({function: upCallBackFunction}, function(_json){
    //     if(_json.data!=null && typeof _json.data.function=='function'){
    //         _json.data.function($(this));
    //     }
    //     //发起更新请求，在up_btn上设置更新参数
    //
	// 	$.tipsBox({
	// 		obj: $(this),
	// 		str: "+1",
	// 		callback: function () {
	// 		}
	// 	});
	// 	niceIn($(this));
	// });
});
