var rurl = apphost+"/index.php?g=logistics&m=user&a=register";
var lurl = apphost+"/index.php?g=logistics&m=user&a=do_login";
$(function(){
	$("#submit").click(function(event){
		$.post(rurl,{
			username: $("#user_name").val(),
			useremail: $("#user_email").val(),
			phone: $("#phone").val(),
			password: $("#password").val()
		},function(data){
			if(data.success){
				location.href = "menu.html";
			}else{
				alert("注册不成功");
			}
			
		},
		"json")
	})
})
$(function(){
	$("#button").click(function(event){
		$.post(lurl,{
			username: $("#login_user_name").val(),
			password: $("#login_password").val()
		},function(data){
			if (data.success) {
				location.href = "menu.html"
			}
			else{
				alert("登录不成功");
			}
				
		},
		"json")
	})
})