
(function(){
    var hintText={user_email:{hint:"鈿狅笍閭鏄偍鐧诲綍鐨勫敮涓€璐﹀彿锛岃璋ㄦ厧濉啓",right:"鈭氶偖绠辨牸寮忔纭�",wrong:"脳閭鏍煎紡鏈夎锛岃閲嶆柊杈撳叆"},
            user_name:{hint:"鈿狅笍璇疯緭鍏�3-12涓瓧绗︾殑鐢ㄦ埛鍚嶏紙鍖呮嫭瀛楁瘝/鏁板瓧/涓嬪垝绾匡級",right:"鈭氱敤鎴峰悕鏍煎紡姝ｇ‘",wrong:"脳鐢ㄦ埛鍚嶆牸寮忔湁璇紝璇烽噸鏂拌緭鍏�"},
            name:{hint:"鈿狅笍璇疯緭鍏�3-12濮撳悕",right:"鈭氬鍚嶈緭鍏ユ纭�",wrong:"脳濮撳悕杈撳叆鏈夎锛岃閲嶆柊杈撳叆"},
            address:{hint:"鈿狅笍璇疯緭鍏ユ纭湴鍧€",right:"鈭氬湴鍧€杈撳叆姝ｇ‘",wrong:"脳鍦板潃杈撳叆鏈夎锛岃閲嶆柊杈撳叆"},
            weight:{hint:"鈿狅笍璇疯緭鍏ョ墿鍝佽川閲�",right:"鈭氱墿鍝佽川閲忓凡杈撳叆杈撳叆",wrong:"脳鐗╁搧璐ㄩ噺杈撳叆鏈夎锛岃閲嶆柊杈撳叆"},
            phone:{hint:"鈿狅笍璇疯緭鍏�11浣嶇數璇濆彿鐮�",right:"鈭氱數璇濆彿鐮佽緭鍏ユ纭�",wrong:"脳鐢佃瘽鍙风爜杈撳叆鏈夎锛岃閲嶆柊杈撳叆"},
            id_card:{hint:"鈿狅笍璇疯緭鍏�18浣嶈韩浠借瘉鍙风爜",right:"鈭氳韩浠借瘉鍙风爜杈撳叆姝ｇ‘",wrong:"脳韬唤璇佸彿鐮佽緭鍏ユ湁璇紝璇烽噸鏂拌緭鍏�"},
            password:{hint:"鈿狅笍璇疯緭鍏�6浣嶄互涓婂瘑鐮�",right:"鈭氬瘑鐮佹牸寮忔纭�",wrong:"脳璇疯緭鍏ョ鍚堟牸寮忕殑瀵嗙爜"},
            repassword:{hint:"鈿狅笍璇峰啀娆¤緭鍏ュ瘑鐮�",right:"鈭氬啀娆¤緭鍏ュ瘑鐮佹纭�",wrong:"脳涓ゆ杈撳叆涓嶄竴鑷存垨瀵嗙爜鏍煎紡涓嶆纭紝璇烽噸鏂拌緭鍏ユ垨瀵嗙爜鏍煎紡涓嶆纭�"}};
    var regEvent=function(node, event, func){
        if (node.addEventListener)
            node.addEventListener(event, func);
        else if (node.attachEvent)
            node.attachEvent("on" + event, func);
        else
            node["on" + event] = func;
    };
    function regValue(id,i){
        var flag=false,
        input=document.getElementById(id),
        value=input.value;
        switch (id){
            case "user_name":
            case "login_user_name":
            case "info_user_name":
                flag=/^[a-zA-Z0-9_]{4,16}$/.test(value.replace(/[\u0391-\uFFE5]/g,"nn"));
                id="user_name";
                break;
            case "name":
            case "send_to_name":
            case "send_from_name":
                flag=/^[a-zA-Z ]{1,20}$/.test(value.replace(/[\u0391-\uFFE5]/g,"nn"));
                id="name";
                break;
            case "send_from_address":
            case "send_to_address":
                flag=/^\S{6,16}$/.test(value.replace(/[\u0391-\uFFE5]/g,"nn"));
                id="address";
                break;
            case "password":
            case "login_password":
            case "info_password":
                flag=/^\S{6,16}$/.test(value);
                id="password";
                break;
            case "repassword":
                flag=document.getElementById("password").value==value && value !="" && value !=null && (/^\S{6,16}$/.test(value));
                break;
            case "info_repassword":
                flag=document.getElementById("info_password").value==value && value !="" && value !=null && (/^\S{6,16}$/.test(value));
                id="repassword";
                break;
            case "user_email":
            case "forget_user_email":
            case "info_user_email":
                flag=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/.test(value);
                id="user_email";
                break;
            case "phone":
            case "info_phone":
            case "send_to_phone":
            case "send_from_phone":
                flag=/^((\(\d{2,3}\))|(\d{3}\-))?1[3,8,5]{1}\d{9}$/.test(value);
                id="phone";
                break;
            case "id_card":
                flag=/^\S{18}$/.test(value);
                break;
            case "weight":
                flag=/^\d{1,4}$/.test(value);
                break;
            default:
                break;
        }
        if(flag) {
            index=0;
            input.className="right input";
            hint[i].className="hint hint_right";
            hint[i].innerHTML=hintText[id].right;
        }else{
            input.className="wrong input";
            hint[i].className="hint hint_wrong";
            hint[i].innerHTML=hintText[id].wrong;
            index=1;
        }
    };
    var inputs=document.getElementsByClassName("input"),
    id,
    hint=document.getElementsByClassName("hint"),
    index=0;
    for(var j=0;j<inputs.length;j++){
        (function(i){
            regEvent(inputs[i],"focus",function(){
                hint[i].style.visibility="visible";
                id=inputs[i].id;
            });
            regEvent(inputs[i],"blur",function(){
               regValue(id,i);
            });
        })(j)
    }
    regEvent(document.getElementById("submit"),"click",function(e){
        if(index!==0){
            alert(index)
            e.preventDefault();
            alert("");
            return false;
        }  
    });  
    regEvent(document.getElementById("button"),"click",function(e){
        if(index!==0){
            e.preventDefault();
            alert("");
            return false;
        }  
    });  
})();