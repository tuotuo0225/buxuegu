/**
 * Created by hasee on 2017/4/4.
 */
define(['jquery','template','tools','datepicker','language','validate','form'],function($,template,tools){
    //菜单选中功能
    tools.setMenu('/teacher/list');
    //编辑讲师---先查询填充数据
    //获取当前讲师的tc_id---地址栏中获取
    var pname=location.search; //?tc_id=2
    //console.log(location);
    var pname=pname.slice(1);
    var tc_id=0;
    if(pname){
        var arr=pname.split('&'); //tc_id=2&name=12
        for(var i=0; i<arr.length; i++){
            var kv=arr[i].split("=");
            if(kv[0]=='tc_id'){
                tc_id=kv[1];
                break;
            }
        }
    }
    //alert(tc_id);
    //如果tc_id存在是编辑讲师---否则是添加讲师
    if(tc_id){
        //编辑讲师---发送请求填充数据
        $.ajax({
            url:'/api/teacher/edit',
            type:'get',
            dataType:'json',
            data:{tc_id:tc_id},
            success:function(data){
                console.log(data);
                data.result.tInfo="编辑讲师";
                //模板渲染
                var html=template('teacherEdit',data.result);
                $('#teacherInfo').html(html);
                checkForm('/api/teacher/update');
            }
        });

    }else{
        //添加讲师
        //模板渲染
        var html=template('teacherEdit',{
            tInfo:'添加讲师'
        });
        $('#teacherInfo').html(html);
        checkForm('/api/teacher/add');
    }
    //提交表单方法
    function checkForm(url){
        $('#teacherForm').validate({
            sendForm : false,
            valid : function(){
                // 提交表单
                $(this).ajaxSubmit({
                    type : 'post',
                    url : url,
                    dataType : 'json',
                    success : function(data){
                        if(data.code == 200){
                            location.href = '/teacher/list';
                        }
                    }
                });
            },
            eachInvalidField : function(){
                $(this).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            eachValidField : function(){
                $(this).closest('.form-group').removeClass('has-error').addClass('has-success');
            },
            description : {
                tcName : {
                    required : '用户名不能为空'
                },
                tcPass : {
                    required : '密码不能为空',
                    pattern : '只能是六位数字'
                },
                joinDate : {
                    required : '入职日期不能为空'
                }
            }
        });
    }
});