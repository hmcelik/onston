var countup;
var countCurrent = false;
$(window).on('load', function(){
    var winST = $(window).scrollTop();
    var winH = $(window).height();
    $('body').addClass('load-end');

    if($('.main-container').length > 0){
        $('.section').each(function(){
            var ot = $(this).offset().top;
            if(winST+(winH/3*2) > ot){
                $(this).addClass('active');
            }
        });
    }

    $('.splash').fadeOut(300);
});

$(window).resize(function(){resizeYoutube();});
$(function(){resizeYoutube();});
function resizeYoutube(){ $("iframe").each(function(){ if( /^https?:\/\/www.youtube.com\/embed\//g.test($(this).attr("src")) ){ $(this).css("width","100%"); $(this).css("height",Math.ceil( parseInt($(this).css("width")) * 480 / 854 ) + "px");} }); }



$(function(){
    scrollDesign();
    selectEvent();
    toggleSwitch();
    menuToggle();
});

$(window).on('scroll', function(){
    var winST = $(window).scrollTop();
    var winSL = $(window).scrollLeft();
    var winH = $(window).height();

    if(winST > 0){
        $('body').addClass('scrolled');
    } else {
        $('body').removeClass('scrolled');
    }

    if($('.main-container').length > 0){
        var sec1H = $('.section1').outerHeight(true);
        var sec3H = $('.section3').outerHeight(true);
        var sec1OT = $('.section1').offset().top;
        var sec3OT = $('.section3').offset().top;
        var headerH = $('#header').outerHeight(true);

        $('.section').each(function(){
           var ot = $(this).offset().top;
           var Idx = $(this).index();
           if(winST+(winH/3*2) > ot){
               $(this).addClass('active');
               $('.floating-navigation').find('a').removeClass('on');
               $('.floating-navigation').find('a').eq(Idx-1).addClass('on');
           }
        });

        if(winST > (sec1OT+(sec1H/3*2))-headerH){
            $('.floating-navigation').not(":animated").fadeIn(300);
        } else {
            $('.floating-navigation').not(":animated").fadeOut(300);
        }

        if(winST > (sec3OT-(sec3H/3*2))-headerH){
            if(countCurrent == false){
                countUp();
                countCurrent = true;
            }
        }
    }

    $('#header').css({'left': -winSL});
});

$(window).on('resize', function(){

});

function countUp(id, start, end, radix, time){
    $('.counter').each(function(){
        id = $(this).attr('id');
        start = 0;
        end = $(this).attr('data-count');
        radix = $(this).attr('data-radix');
        var options = {
            useEasing : true,
            useGrouping : true,
            separator : ',',
            decimal : '.',
            prefix : '',
            suffix : ''
        };

        /**
         [0] count ID
         [1] start count
         [2] end count
         [3] point
         [4] time
         [5] option
         */
        countup = new CountUp(id, start, end, radix, 3, options);
        countup.start();
    });
}

function popupOpen(target){
    $('body').addClass('scroll-fixed');
    $(target).stop().fadeIn(300, function(){
        $('.js-scroll').getNiceScroll().resize();
    });
}

function popupClose(target){
    $(target).stop().fadeOut(300);
    $('body').removeClass('scroll-fixed');
}

function scrollDesign(){
    $('.js-scroll').niceScroll({
        cursorcolor : "rgba(0, 0, 0, 0.3)",
        cursorborder: 'none',
        autohidemode: false
    });
}

function selectEvent(){
    $('.js-select .selected').on('click', function(){
        if(!$(this).parent().hasClass('on')){
            $(this).parent().addClass('on');
            $('.js-scroll').getNiceScroll().resize();
        } else {
            $(this).parent().removeClass('on');
            $('.js-scroll').getNiceScroll().resize();
        }
    });

    $('.js-select .select-list li').on('click', function(){
        var txt = $(this).html();
        $(this).closest('.js-select').find('.selected').html(txt);
        $(this).closest('.js-select').removeClass('on');
        $('.js-scroll').getNiceScroll().resize();
    });

    $('html').on('click', function(e){
        if(!$(e.target).is('.js-select, .js-select *')){
            $('.layer-connect-wallet').removeClass('on');
            $('.js-select').removeClass('on');
            $('.js-scroll').getNiceScroll().resize();
        }
    });
}

function toggleSwitch(){
    $('.js-toggle').on('click', function(){
       if(!$(this).hasClass('on')){
           $(this).addClass('on');
       } else {
           $(this).removeClass('on');
       }
    });
}

function scrollAni(obj){
    var objT = $(obj).offset().top;
    var headerH = $("#header").outerHeight(true);
    $("html, body").stop().animate({scrollTop: objT-headerH}, 600);
}

function menuToggle(){
    $('.btn-gnb-toggle').on('click', function(){
        if(!$(this).hasClass('on')){
            $(this).addClass('on');
            $('.gnb').stop().fadeIn(300);
        } else {
            $(this).removeClass('on');
            $('.gnb').stop().fadeOut(300);
        }
    })
}