		$(function(){
			$('.link .button').hover(function(){
				var title=$(this).attr('data');
					/*测试：document.title=title;*/
					$('.tip em').text(title);
					var pos=$(this).position().left+10;
					/*position().left 获取一个盒子相对于他加了定位的父盒子之间的左边的距离*/
					/*测试 document.title=pos;*/
					/*加10是因为前面的button有padding-left: 20px; 这样才能左对齐*/
					var dis=($('.tip').outerWidth()-$(this).outerWidth())/2;
					/*用outerWidth不用width因为要把padding-left的值算进去*/
					var l=pos-dis;
					/*提示按钮还要向左移动的距离*/



					$('.tip').css({'left':l+'px'}).animate({'top':80,'opacity':1},300);
			},function(){
				/*加If判断是为了频繁移动不会出现错误*/
				if(!$('.tip').is(':animated')){
					$('.tip').animate({'top':40,'opacity':0},500);
				}

				
			})
		})