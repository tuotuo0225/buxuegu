
//定义模块
define(['jquery','cookie','bootstrap'],function($){
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});
	//登录功能
	$("#loginForm").submit(function(){
		var formData=$(this).serialize();
		console.log(formData);
		$.ajax({
			type:'post',
			url:'/api/login',
			data:formData,
			dataType:'json',
			success:function(data){
				//console.log(data);
				if(data.code==200){
					//console.log(data.result);
					//cookie可以跨页面获取数据，在浏览器不关闭的情况下，可以多个页面获取数据
					var loginInfo=JSON.stringify(data.result);
					//console.log(loginInfo);
					//把cookie设置在根路径下---方便其他页面获取到---cookie值为字符串
					$.cookie('loginInfo',loginInfo,{path:'./'});
					location.href='/index/index';
				}
			},
			error:function(data){
				console.log(data);
			}
		});
		return false; //阻止表单提交默认行为
	});
	//console.log($.cookie('loginInfo'));
	var obj=JSON.parse($.cookie('loginInfo'));
	$(".aside .profile img").attr('src',obj.tc_avatar);
	$(".aside .profile h4").html(obj.tc_name);
	//退出功能
	$('#logout').click(function(){
		$.ajax({
			url:'/api/logout',
			dataType:'json',
			type:'post',
			success:function(data){
				if(data.code==200){
					location.href='/login'
				}
			}
		});
	});
});
