$(function () {
	// 高亮当前页菜单
	updateLeftMenu();

	// 菜单展开功能
	$(".side-menu > li").on("click", function () {
        $(".side-menu > li > ul > li").removeClass("active");
		if($(this).hasClass("active")) {
			$(this).removeClass("active");
		} else {
			$(this).addClass("active");
			$(this).parent().show();
		}
    });

    $(".side-menu > li > ul").on("click", function (e) {
        e.stopPropagation();
    });

    function updateLeftMenu() {
        $(".side-menu > li").removeClass("active");

        var page = location.hash.split("#").pop().substring(1).split("?")[0];
        var pageName = page ? page.split("/")[0] : settings.default_page;
        $("."+pageName).parent().children().removeClass("active");
        $("."+pageName).addClass("active");
        $("."+pageName).parent().parent().addClass("active");

        $(".right_col").css({
			//minHeight: $(".left_col").height() - $("footer").height() +"px",
            minHeight: $(document).height() - $("footer").height() +"px",
		});
    }

    window.onhashchange = updateLeftMenu;
});

