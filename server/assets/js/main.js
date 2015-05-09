// app
var app = angular.module('myFm', []);

resize();
$(window).resize(function() {
	resize();
});

// img 
$(".cover").error().attr( "src", "../images/wallhaven-1.jpg" );

$("#Menu").click(function() {
    $("#ConList").animate({
        top: 0
    }, 500);
});

function resize() {
    var height = $(window).height();
    if (height > 650) {
        var mt = (height - 600) / 2 + "px";
        $(".wrapper").css("margin-top", mt);
    } else {
        $(".wrapper").css("margin-top", "30px");
        $(".menu,.about").css("margin-top", "60px");
    }
}

$(".page-close").click(function() {
    $("#ConList").animate({
        top: -999
    }, 500);
});
