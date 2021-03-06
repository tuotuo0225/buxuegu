/**
 * Created by hasee on 2017/4/3.
 */
require.config({
    baseUrl:'/public',
    paths:{
        jquery:'assets/jquery/jquery.min',
        cookie:'assets/jquery-cookie/jquery.cookie',
        echarts:'assets/echarts/echarts.min',
        template:'assets/artTemplate/template',
        bootstrap:'assets/bootstrap/js/bootstrap',
        datepicker:'assets/bootstrap-datepicker/js/bootstrap-datepicker.min',
        language:'assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        validate:'assets/validate/jquery-validate',
        uploadify:'assets/uploadify/jquery.uploadify',
        region:'assets/jquery-region/jquery.region',
        ckeditor:'assets/ckeditor/ckeditor',
        form:'assets/jquery-form/jquery.form',
        tools:'js/tools'
    },
    shim:{
        bootstrap:{
            //把 bootstrap转成标准模块
            deps:['jquery']
        },
        language:{
            deps:['jquery','datepicker']
        },
        validate:{
            deps:['jquery']
        },
        uploadify:{
            deps:['jquery']
        },
        ckeditor:{
            exports:"CKEDITOR",
            deps:['jquery']
        }
    }
});