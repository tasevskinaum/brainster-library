// Execute the following code once the document is fully loaded and ready
$(document).ready(function () {
    // Call the function to set the initial top position of the menu wrapper
    setMenuWrapperTopPosition();
});

// Attach an event listener for window resize events
$(window).resize(function () {
    // Call the function to update the top position of the menu wrapper when the window is resized
    setMenuWrapperTopPosition();
});

// Attach a click event listener to the element with the class "navbar-toggler"
$(".navbar-toggler").on("click", function () {
    // Toggle the "active" class on the navbar, menu wrapper, and the clicked element
    $(".navbar").toggleClass("active");
    $(".navbar .menu-wrapper").toggleClass("active");
    $(this).toggleClass("active");
});

// Attach a click event listener to the element with the ID "spc"
$("#spc").click(function () {
    // Toggle the visibility of the dropdown menu
    $(".dropdown").slideToggle();
});

// Function to set the top position of the menu wrapper based on the navbar's outer height
function setMenuWrapperTopPosition() {
    // Get the outer height of the navbar, including its margin
    const navbarHeight = $(".navbar").outerHeight(true);

    // Set the top position of the menu wrapper to the navbar's height
    $(".navbar .menu-wrapper").css("top", navbarHeight + "px");
}
