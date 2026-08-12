console.log("Orders frontend javascript file");

$(function () {
  $(".order-row").on("click", function () {
    $(this).toggleClass("open");
    $(this).next(".items-row").find(".items-wrap").slideToggle(200);
  });
});
