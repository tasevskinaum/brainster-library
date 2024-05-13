$(document).ready(function () {
    setBodyPaddingTop();
    setHeaderHeight();
});

$(window).on("resize", function () {
    setBodyPaddingTop();
    setHeaderHeight();
});

function setBodyPaddingTop() {
    $("#index-body").css("padding-top", $(".navbar").innerHeight() + 'px');
}

function setHeaderHeight() {
    const headerHeight = $(window).innerHeight() - $(".navbar").innerHeight();

    $("#index-header").css("height", headerHeight + 'px');
}
