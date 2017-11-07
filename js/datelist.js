    //通用函数
    //获取某个元素对象的方法
    var g= function (id){
      return document.getElementById(id);
    }
    //获取模板字符串
    var g_class=function(className){
      return document.getElementsByClassName(className);
    }
    var g_tpl= function(id){
      return g('tpl_'+ id ).innerHTML;
    }
    // var get_body_w=function(){
    //   return document.window.offsetWidth;
    // }
    var get_body_h=function(){
      return document.body.offsetHeight;
    }
    
    //格式化数据
/*  {
    2014:{
      2:[
        {
          date:'2014-2-28',
          year:'2014',
          month:'2',
          ...
        }
        ...//一个月内若干个日志
      ]
      3:[]
      ...//一年内若干个月份
    }
    2013：{}
    ...//若干个年
  }*/
  //放入数据
    var list = {};
    for (var i=0;i<data.length;i++){
      var date = new Date(data[i].date);
      var year =date.getFullYear();
      var month =date.getMonth() + 1; 
      var lunar =GetLunarDateString(date);

   //如果没有年份 则赋一个初始值  
      if(!list[year]){list[year] ={} }
      if(!list[year][month]){list[year][month]=[]}
      var item =data[i];
    item.lunar = lunar[0]+ '<br>&nbsp;&nbsp;&nbsp;' + lunar[1];
    item.year =year;
    item.month =month;
    //多少人觉得赞 小于1万则保留字符串 大于则变成小数
    item.like_format = item.like<10000? item.like : (item.like / 10000).toFixed(1) +'万';
    //toFixed(1) 四舍五入成只有一位小数
    list[year][month].push(item);
    }; 
//时序菜单HTML生成 左边
  var html_scrubber_list =[];
  var tpl_year = g_tpl("scrubber_year");
  var tpl_month = g_tpl("scrubber_month");
   //遍历数组对象的方法
   //y是list里面的每一个2013 2014...
  for( y in list){
    var html_year = tpl_year.replace(/\{year\}/g,y);
    var html_month =[];
    for(m in list[y]){
      //unshift()倒序插入
      html_month.unshift(tpl_month.replace(/\{month\}/g,m).replace(/\{year\}/g,y));
    }
    html_year=html_year.replace(/\{list\}/g,html_month.join(''));
    html_scrubber_list.unshift( html_year);
  }
  g('scrubber').innerHTML ='<a href="javascript:;" onclick="scroll_top(0)">现在</a>'+html_scrubber_list.join('')+'<a href="javascript:;" onclick="scroll_top(get_body_h() )">出生</a>';
// 日志列表的HTML生成  右边
  var html_content_list =[];
  var tpl_year = g_tpl("content_year");
  var tpl_month = g_tpl("content_month");
  var tpl_item = g_tpl("content_item");
  for( y in list){
    var html_year = tpl_year.replace(/\{year\}/g,y);
    var html_month =[];
    for(m in list[y]){
      //unshift()倒序插入
      var html_item=[];
      //判断是否为第一条
      var isFirst_at_month=true;
      for(i in list[y][m]){
        var item_data=list[y][m][i];
        var item_html=tpl_item
        .replace(/\{date\}/g,item_data.date)
        .replace(/\{lunar\}/g,item_data.lunar)
        .replace(/\{intro\}/g,item_data.intro)
        .replace(/\{media\}/g,item_data.media)
        .replace(/\{like\}/g,item_data.like)
        .replace(/\{like_format\}/g,item_data.like_format)
        .replace(/\{position\}/g,i%2?'right':'left')
        .replace(/\{isFirst\}/g,isFirst_at_month?'first':'')
        .replace(/\{comment\}/g,item_data.comment);
        html_item.push(item_html);
        isFirst_at_month=false;
      }
      html_month.unshift(tpl_month.replace(/\{year\}/g,y).replace(/\{month\}/g,m).replace(/\{list\}/g,html_item.join('')));
    }
    html_year=html_year.replace(/\{list\}/g,html_month.join(''));
    html_content_list.unshift( html_year);
  }
  g('content').innerHTML = html_content_list.join("")+'<div class="content_year" id="content_month_0_0"> </div>';
  //获得元素的高度
  var get_top =function(el){
    return el.offsetTop ;
  }
  //滚动页面到
  var scroll_top =function(to){
    var start=document.body.scrollTop;
    fx(function(now){
      window.scroll(0,now);

    },start,to);
    

  }
  //年份月份点击处理
  var show_year=function( year){
    var c_year=g('content_year_'+year);
    var top= get_top(c_year);
    scroll_top(top);
    highlight_month(g('scrubber_month_'+year+'_'+month));
    expand_year(year,g('scrubber_year_'+year)); 
    
  }
  var show_month=function(year,month){
    var c_month=g('content_month_'+year+'_'+month);
    var top= get_top(c_month);
    scroll_top(top);
    highlight_month(g('scrubber_month_'+year+'_'+month));
    expand_year(year,g('scrubber_year_'+year));

  }

  //高亮处理  - 月份
  var highlight_month =function(element){
    var months=g_class('scrubber_month');
    for(var i=months.length-1;i>=0;i--){
      months[i].className=months[i].className.replace(/current/g,'');
      
    };

    element.className = element.className+'  current';
    //要加空格
  }
  //年份点击展开
  var expand_year=function(year,element){
    var months=g_class('scrubber_month');
    var show_month=g_class('scrubber_month_in_'+year);
    var years=g_class('scrubber_year');
    for(var i=months.length-1;i>=0;i--){
      months[i].style.display='none';
    };
    for(var i=show_month.length-1;i>=0;i--){
      show_month[i].style.display='block';
    };
    for(var i=years.length-1;i>=0;i--){
      years[i].className=years[i].className.replace(/current/g,'');
    };

    element.className = element.className+' current';
  }
var update_scrubber_year =function(top){
  //top是滚动的高度 tops是年标签的高度
    var years=g('content').getElementsByClassName('content_year');
    var tops=[];//时间标签的高度
    for(var i=0;i<years.length;i++){
      tops.push(years[i].offsetTop);
    }
    //判断是否大于年份的第一个标签 大于则高亮
    for(var i=1;i<tops.length;i++){
      //滚动高度大于某一个标签如2014 并且小于下一个2013 则高亮2014
      //因为i从1开始，所以tops[i-1]和years[i-1]
      if(top>tops[i-1]&& top<tops[i])
      {
        var year=years[i-1].innerHTML;
        var s_year=g('scrubber_year_'+year);
        expand_year(year,s_year);
      }
    };
  }
  var update_scrubber_month=function(top){
    //日志列表中所有的月份标签
    var months=g('content').getElementsByClassName('content_month');
    var tops=[];
    for(var i=0;i<months.length;i++){
      tops.push(months[i].offsetTop);
    }
    //定位top在窗口的哪个月份区间
    for(var i=1;i<tops.length;i++){
      if(top>tops[i-1]&& top<tops[i])
      {
        var id=months[i-1].id;
        //高亮月份
        highlight_month(g(id.replace('content','scrubber')) );
      }
    };
  }
  
  //页面滚动处理，固定时序菜单的位置、自动展开时序菜单
  window.onscroll=function(){
    var top =document.body.scrollTop;
    var scrubber =g('scrubber');
    if(top>500){
      scrubber.style.position="fixed";
      scrubber.style.top='50px';
    //  scrubber.style.left=(get_body_w()*0.2) +'px';

    }
    //滚动回上面时 不固定
    else{
      scrubber.style.position="";
      scrubber.style.top='';
      scrubber.style.left='';
    }
    //自动展开时序
    update_scrubber_year(top);
    update_scrubber_month(top);
  }