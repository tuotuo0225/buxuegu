/**
 * Created by hasee on 2017/4/3.
 */
define(['jquery','template','tools','bootstrap'],function($,template,tools){
    //菜单选中功能
    tools.setMenu(location.pathname);
    $.ajax({
        url:'/api/teacher',
        type:'get',
        dataType:'json',
        success:function(data){
            console.log(data);
            //模板引擎---渲染讲师列表
            var html=template('teacherTpl',{list:data.result});
            $("#teacherList").html(html);

            //查看讲师功能
            $(".lookBtn").find("a:eq(0)").click(function(){
                //先查询当前讲师对应的信息----得到对应的tc-id
                var tc_id=$(this).parent().attr('data-tcid');
                //alert(tc_id);
                $.ajax({
                    url:'/api/teacher/view',
                    type:'get',
                    dataType:'json',
                    data:{tc_id:tc_id},
                    success:function(data){
                        if(data.code==200){
                            console.log(data);
                            data.result.tc_hometown=data.result.tc_hometown.replace(/\|/g,' ');
                            var html = template('teacherTpl1',data.result);
                            $("#teacherInfo").html(html);
                            //处理弹窗
                            $("#teacherModal").modal();
                        }

                    }
                });

            });
            //启用和禁用讲师功能
            $(".lookBtn").find("a:eq(2)").click(function(){
                //console.log('点击');
                var tc_id = $(this).parent().attr("data-tcid");
                var tc_status = $(this).parent().attr('data-status');
                console.log(tc_status);
                var that=this;
                $.ajax({
                    url:'/api/teacher/handle',
                    type:'post',
                    dataType:'json',
                    data:{
                        tc_id:tc_id,
                        tc_status:tc_status
                    },
                    success:function(data){
                       // console.log(data);
                        if(data.result.tc_status==0){
                            $(that).html('禁用');
                        }else{
                            $(that).html('启用');
                        }
                        //将tc_status状态值重置给data-status 属性
                        $(that).parent().attr('data-status',data.result.tc_status);
                    }
                });
            });
        }
    });


});