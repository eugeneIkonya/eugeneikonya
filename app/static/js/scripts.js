

$(window).scroll(function() {
    toggleNavbar();
});

function toggleNavbar() {
    if ($(this).scrollTop() > 50) {
        $('.navbar').addClass('shadow shadow-sm bg-primary');
        $('.navbar-brand').addClass('text-white');
        $('.nav-link').addClass('text-white');
        $('.navbar-toggler').addClass('text-white');
    } else {
        $('.navbar').removeClass('shadow shadow-sm bg-primary');
        $('.navbar-brand').removeClass('text-white');
        $('.nav-link').removeClass('text-white');
    }
}