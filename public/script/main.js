$(".list-group-item").hover(function(){
    this.style.background = "rgba(171, 169, 169,0.)";
});

$("#side-menu .info-1").fadeIn(500);

$(".list-group-item").on("click", function(){
    // Set upper buttons
    $(".list-group").find("*").removeClass("active");
    $(this).toggleClass("active");

    // Set content
    var paragraph = $(this).attr("name");
    $("#side-menu *").fadeOut(200).promise().done(function(){
        $("#side-menu ." + paragraph).fadeIn(200);
    });
});