  document.onselectstart = new Function('event.returnValue = false;');
  var dialogInstace , onMoveStartId;  //  用于记录当前可拖拽的对象

  // var zIndex = 9000;

  //  获取元素对象  
  function g(id){return document.getElementById(id);}

  //  自动居中元素（el = Element）
  function autoCenter( el ){
/*网页可视区域的宽高*/
    var bodyW = document.documentElement.clientWidth;
    var bodyH = document.documentElement.clientHeight;
/*元素的实际宽度*/
    var elW = el.offsetWidth;
    var elH = el.offsetHeight;

    el.style.left = (bodyW-elW)/2 + 'px';
    el.style.top = (bodyH-elH)/2 + 'px';
    
  }

  //  自动扩展元素到全部显示区域   自动全屏- 遮罩 的宽高= 可视区域的宽高
  function fillToBody( el ){
    el.style.width  = document.documentElement.clientWidth  +'px';
    el.style.height = document.documentElement.clientHeight + 'px';
  }

  //  Dialog实例化的方法
  /*鼠标事件1：鼠标在标题栏上按下时，要计算鼠标相对过拽元素的左上角的坐标，
  并且标记元素为可拖动
  鼠标事件2：鼠标开始移动，要检测登录浮层是否可标记为移动，
  如果是，则更新元素的位置到当前鼠标的位置（要减去第一步中获得的偏移）
  鼠标事件3：在鼠标松开的时候，标记元素为不可拖动状态*/

function Dialog( dragId , moveId ){

    var instace = {} ;

    instace.dragElement  = g(dragId); //  允许执行 拖拽操作 的元素
    instace.moveElement  = g(moveId); //  拖拽操作时，移动的元素

    instace.mouseOffsetLeft = 0;      //  拖拽操作时，移动元素的起始 X 点
    instace.mouseOffsetTop = 0;     //  拖拽操作时，移动元素的起始 Y 点

    instace.dragElement.onmousedown=function(e){

      var e = e || window.event;

      dialogInstace = instace;
      instace.mouseOffsetLeft = e.pageX - instace.moveElement.offsetLeft ;
      instace.mouseOffsetTop  = e.pageY - instace.moveElement.offsetTop ;
      
      // instace.moveElement.style.zIndex = zIndex ++;
    }

    return instace;
  }

  //  在页面中侦听 鼠标弹起事件
  document.onmouseup = function(e){
    
    dialogInstace = false;
    clearInterval();

  }

  //  在页面中侦听 鼠标移动事件
  document.onmousemove = function(e) {
    var e = e || window.event;
    var instace = dialogInstace;
      if (instace) {
        
        var maxX = document.documentElement.clientWidth -  instace.moveElement.offsetWidth;
        var maxY = document.documentElement.clientHeight - instace.moveElement.offsetHeight ;

      instace.moveElement.style.left = Math.min( Math.max( ( e.pageX - instace.mouseOffsetLeft) , 0 ) , maxX) + "px";
      instace.moveElement.style.top  = Math.min( Math.max( ( e.pageY - instace.mouseOffsetTop ) , 0 ) , maxY) + "px";
      }
    if(e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;

    }
  };

  //  拖拽对话框实例对象
  Dialog('dialogDrag','dialogMove');

//Dialog('Img_drag','Img_move');

  //  重新调整对话框的位置和遮罩，并且展现
  function showDialog(){
    g('dialogMove').style.display = 'block';
    g('masks').style.display = 'block';
    autoCenter( g('dialogMove') );
    fillToBody( g('masks') );
    //g('loginPage').style.display = 'none';
  //  g('mask').style.display = 'none';
  }
  

  function showChangeImg(){
    g('Img_move').style.display = 'block';
    g('Img_mask').style.display = 'block';
    autoCenter( g('Img_move') );
    fillToBody( g('Img_mask') );
    g('dialogMove').style.display = 'none';
    g('masks').style.display = 'none';
  }
  //  关闭对话框
  function hideDialog(){
    g('dialogMove').style.display = 'none';
    g('masks').style.display = 'none';
    g('Img_move').style.display = 'none';
    g('Img_mask').style.display = 'none';
    g('loginPage').style.display= 'none';
  }
window.onload=function(){
  g('masks').onclick=hideDialog;
  g('Img_mask').onclick=hideDialog;
  g('cancel').onclick=hideDialog;
  g('confirm').onclick=hideDialog;
}
  //  侦听浏览器窗口大小变化

  