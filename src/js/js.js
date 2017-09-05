var app;

app = {
    general: {

    }
};

/* <editor-fold desc="Dom ready functions"> */
$(document).ready(function(){
    $('.partner-section_carusel').owlCarousel({
        loop:true,
        margin:20,
        nav:true,
        items:5,
        navText: ['','']
    });

    $('.home-section .owl-carousel').owlCarousel({
        loop:false,
        margin:0,
        dots:true,
        items:1,
        navText: ['',''],
        dotsContainer: '.info-section_dots-block'
    });
    $('.home-section .owl-carousel').on('changed.owl.carousel', function(event) {
        setTimeout(function(){
            $('.home-section_bg')
                .addClass('home-section_bg--animated')
                .css('background-image','url('+ $(".home-section .active .info-section-item").attr('data-bg')+')');
            setTimeout(function(){
                $('.home-section_bg')
                    .removeClass('home-section_bg--animated');
            },300);
        },10);
    })
});
/* </editor-fold> */


/* <editor-fold desc="New component"> */

/* </editor-fold> */

