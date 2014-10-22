define([], function () {
    "use strict";
    var slimScrollInit=function (cmp, ht, wheelStp) {
        
        /*==Slim Scroll ==*/
        if ($.fn.slimScroll) {
            $(cmp).slimscroll({
                height: ht+'px',
                wheelStep: wheelStp
            });
        }
    }

    return slimScrollInit;


});