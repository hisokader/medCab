define([], function () {
    
    var panelSlideInit=function () {
		$('.panel .tools .fa').click(function () {
		    var el = $(this).parents(".panel").children(".panel-body");
		    if ($(this).hasClass("fa-chevron-down")) {
		        $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
		        el.slideUp(200);
		    } else {
		        $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
		        el.slideDown(200); }
		});
	}

	return panelSlideInit;

});