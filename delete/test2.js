
$(function(){
   	backToTOP();
   	sideBarClose();
  /* 	login();*/
 	
});

function backToTOP(){
	$("#backtop").on("click",move);
	$(window).on("scroll",function(){
		checkPosition($(window).height());
	});
	checkPosition($(window).height());
	/*加载时就判断是否到了第二屏*/
	function move(){
		$("html,body").animate({scrollTop:0},800);
	}
/*	function go(){
		$("html,body").scrollTop(0);
	}*//*迅速回到顶部 并把$("#backtop").on("click",move)
	改为$("#backtop").on("click",go);*/
	function checkPosition(pos){
		if($(window).scrollTop() > pos){
			$("#backtop").fadeIn();
		}else{
			$("#backtop").fadeOut();
		}
	}
	

}


function sideBarClose(){
	$("#closeBar").click(function(){
  			$("#sidebar").fadeToggle();
  			$("#closeBar").toggleClass("rotate");


  	});
}

/*登录*/
/*function login(){
 
		var btn=document.getElementById("login");
		btn.onclick=open;
return false;
	}
	
	function open(){
		
		var omask=document.createElement("div");
		omask.id="mask";
		
		document.body.appendChild(omask);
		var ologin =document.createElement("div");
		ologin.id="loginPage";
		document.body.appendChild(ologin);
		ologin.innerHTML="<div id='titBox'><span id='login-title'>JOY</span></div><a id='close' href='javascript:;' class='ui-dialog-closebutton'></a><form  id='loginForm' method='post' action=''><div class='contentBox'><div class='col clear'><div class='txt'>账号:</div><input type='text'  name='loginID' id='loginID' class='box' placeholder='请输入账号' required></div><div class='col clear'><div class='txt' >密码:</div><input type='password' name='loginPSW' id='loginPSW' class='box' placeholder='请输入密码' required></div><input type='submit' class='login-btn' value='登录'/></form><div class='other'><a href='' class='forget'>忘记密码</a><a href='javascript:showDialog();' class='register' >注册</a></form></div></div>";
		
		var sHeight= document.body.scrollHeight;
		var cHeight= document.body.clientHeight;
		var cWidth= document.body.clientWidth;
		var oHeight= document.body.offsetHeight;
		var oLHeight=ologin.offsetHeight;
		var oLWidth=ologin.offsetWidth;
		var wHeight=document.documentElement.clientHeight;

	  	ologin.style.left=(cWidth-oLWidth) / 2+'px';
	  	ologin.style.top=(wHeight-oLHeight) / 2+'px';
	  	var closeBtn= document.getElementById("close");
	  	omask.onclick=closeBtn.onclick=function(){
	  		close();
	  	}
	  	function close(){
			document.body.removeChild(omask);
		  	document.body.removeChild(ologin);
		  	
		}

Dialog('titBox','loginPage');
}*/

	$.validator.setDefaults({

    submitHandler: function(form) {
  /* confirm("单击“确定”提交");*/
  alert("注册成功！");
   form.close();
    }
});


$(document).ready(function() {

	$("#loginForm").validate({

		errorClass:"wrong",
    	validClass:"right",
    	success:function(label){
    		label.addClass("right").removeClass("wrong")
    	},
    	highlight:function(element,errorClass,validClass){
    		
    		$(element).fadeOut().fadeIn();
    		$(element).css("border","1px solid #f00");
    	},
    	unhighlight:function(element,errorClass,validClass){
    		
    		
    		$(element).css("border","1px solid #fff");
    	},
    
    


    	rules:{
    		loginID:{
    			required:true
    			
    		},
    		loginPSW:{
    			required:true
    			
    		}
    	
    		
    	},
    	messages:{
	    		
	    		loginID:{
	    			required:"请输入用户名"
	    		
	    		},
	    		loginPSW:{
	    			required:"请输入密码"
	    			
	    		}
	    		
	    	}

    	
  
	});
    $("#registerForm").validate({
   
    
    	errorClass:"wrong",
    	validClass:"right",
    	success:function(label){
    		label.addClass("right").removeClass("wrong")
    	},
    	highlight:function(element,errorClass,validClass){
    		
    		$(element).fadeOut().fadeIn();
    		$(element).css("border","1px solid #f00");
    	},
    	unhighlight:function(element,errorClass,validClass){
    		
    		
    		$(element).css("border","1px solid #fff");
    	},
    
    

    
    

    	rules:{
    		id:{
    			required:true,
    			rangelength:[3,12]
    		},
    		psw:{
    			required:true,
    			rangelength:[6,12]
    		},
    		rpsw:{
    			required:true,
    			rangelength:[6,12],
    			equalTo:"#psw"
    		},
    		email:{
    			required:true,
    			email: true
    		}
    	},
    	messages:{
	    		
	    		id:{
	    			required:"必填",
	    			rangelength:"用户名为2-12位字符"
	    		},
	    		psw:{
	    			required:"必填",
	    			rangelength:"密码为6-12位字符"
	    		},
	    		rpsw:{
	    			required:"必填",
	    			rangelength:"用户名为6-12位字符",
	    			equalTo:"密码不一致"
	    		},
	    		email:{
	    			required:"必填",
	    			email: "请输入正确的邮箱"
	    		}
	    	}

    	
    });
});