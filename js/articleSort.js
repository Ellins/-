 /*  $(document).ready(function(){
           console.log("eee");
        
         
          $('#sort').click(function(){
            console.log("aaa");
            var element = this;
            $(element).style
            var alertsort=$(".alertsort");
           alertsort.style.display="block";
          })
        })
        */
       /* var hide=function(){
          var close= getElementsByClassName("close");
          for(var i=0;i<close.length;i++){
              close[i].onclick=function(oEvent){
               oEvent=oEvent||event;
                document.getElementById("alertsort"+this.id).style.display='none';
              }
          
          }
        }*/
        $(".table").on('click','a',function(event){
        event.preventDefault;
        var td=$(this).parent();

        //var first_td=td.children("a .first_td");
        //console.log(first_tr);
        var tr=$(this).parents(".tr");
       var first_td=$(this).parents(".tr").children(".first_td");
     var first_top=$(this).parent().children(".top");
      //console.log(first_tr);
        var table=$(this).parents(".table");
        if ($(this).is('.top')&&tr.index()==0){
          alert("已经是顶部了！");
          return false;
        }
        switch(true){
          case $(this).is('.top'):
          table.prepend(tr);
         first_td.prepend("<span class='top_color'>[置顶]</span>");
         first_top.remove();
         td.prepend("<a href='#'  class='cancletop'>取消置顶</a><span class='tab-space top'>|</span>");

          break;
         
        }

      })
     window.onload=function(){
      

     var close=document.getElementsByClassName("close");
          for(var i=0;i<close.length;i++){
              close[i].onclick=function(oEvent){
               oEvent=oEvent||event;
                document.getElementById("alertsort"+this.id).style.display='none';
              }
            }

      var closeBtn=document.getElementsByClassName("btn");
          for(var i=0;i<closeBtn.length;i++){
              closeBtn[i].onclick=function(oEvent){
               oEvent=oEvent||event;
                document.getElementById("alertsort"+this.id).style.display='none';
              }
            }
         var a=document.getElementsByClassName("sort");
         for(var i=0;i<a.length;i++){
          a[i].onclick=function(oEvent){
              oEvent=oEvent||event;
            
              document.getElementById("alertsort"+this.id).style.display='block';
          }
         }
       }
 
        /*   $(".sort").click(function(){
            var alertsort= $(".sort").siblings(".alertsort");
           alertsort.show();
          });
          $(".close").click(function(){
              console.log("aa");
             var alertsort= $(".sort").siblings(".alertsort");
            alertsort.hide();
          })
        })*/

          function alertDelete(){
            confirm("删除文章将不可恢复，是否继续");
           }
          /* var i;
          
           function alertSort(){
             var  alertsort=document.getElementsByClassName("alertsort");
             console.log(alertsort);
             for(var i=0;i<alertsort.length;i++){
              alertsort[i].style.display="block";
             }
            
           }*/

      