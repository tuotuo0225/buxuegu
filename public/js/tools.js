/**
 * Created by hasee on 2017/4/4.
 */
define(['jquery'],function($){
    return {
        setMenu:function(pathname){
            $(".navs a[href='"+pathname+"']").addClass("active");
        }
    }
});