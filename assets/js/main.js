(function($){
    "use strict"; // Start of use strict

    /* --------------------------------------------
     Mobile detect
     --------------------------------------------- */
    var ktmobile;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        ktmobile = true;
        $("html").addClass("mobile");
    }
    else {
        ktmobile = false;
        $("html").addClass("no-mobile");
    }

    /* ---------------------------------------------
     Scripts initialization
     --------------------------------------------- */

    $(window).load(function(){

        // Page loader
        $("body").imagesLoaded(function(){
            $(".page-loader").fadeOut("slow",function(){
                init_wow();
            });
        });

        $(window).trigger("scroll");
        $(window).trigger("resize");

    });

    /* ---------------------------------------------
     Scripts resize
     --------------------------------------------- */
    $(window).resize(function(){
        init_dataWidth();
        init_js_height();
    });

    /* ---------------------------------------------
     Scripts ready
     --------------------------------------------- */
    $(document).ready(function(){


        $('body')
            .on('click','.nav-bar-leftbar',function(e){
                e.preventDefault();
                $('body').addClass('open-leftbar');
            })
            .on('click','#nav-leftbar-close',function(e){
                e.preventDefault();
                $('body').removeClass('open-leftbar');
            })
            .on('click','#nav-mobile-sidebar',function(e){
                e.preventDefault();
                $('body').addClass('open-mobile-sidebar');
            })
            .on('click','#nav-mobile-close',function(e){
                e.preventDefault();
                $('body').removeClass('open-mobile-sidebar');
            })
            .on('click','#nav-nobile-sidebar',function(e){
                e.preventDefault();
                $('body').removeClass('open-leftbar');
            });


        init_dataWidth();
        init_videoBg();
        init_Instafeed();
        init_scrolling();
        init_portfolioCarousel();

        setInterval(init_packery, 200);


    });


    /* ==============================================
     Portfolio Carousel
     =============================================== */
    function init_portfolioCarousel(){

        var sync1 = $("#portfolio-gallery-content");
        var sync2 = $("#portfolio-gallery-images");

        sync1.owlCarousel({
            singleItem : true,
            navigation: false,
            pagination:false,
            autoHeight: true,
            afterAction : function(){
                var current = this.currentItem;
                if(sync2.data("owlCarousel") !== undefined){
                    sync2.trigger("owl.goTo", current);
                }
            }
        });

        sync2.owlCarousel({
            singleItem : true,
            navigation: false,
            pagination:false,
            afterAction : function(){
                var current = this.currentItem;
                if(sync1.data("owlCarousel") !== undefined){
                    sync1.trigger("owl.goTo", current);
                }
            }
        });

        // Custom Navigation Events

        $('body')
            .on('click', '.portfolio-navigation .nav-previous', function (e) {
                e.preventDefault();
                sync1.trigger('owl.prev');
            });

        $('body')
            .on('click', '.portfolio-navigation .nav-next', function (e) {
                e.preventDefault();
                sync1.trigger('owl.next');
            });

    }



    /* ==============================================
     Add data width to body Script
     =============================================== */
    function init_dataWidth(){
        var InitStr = $(window).width();
        $('body').attr('data-width',InitStr);
    }

    /* ==============================================
     Packery Script
     =============================================== */
    function init_packery(){
        var $container = $('.portfolio-items');
        $container.imagesLoaded(function () {
            $container.packery({
                itemSelector: '.portfolio-item',
                gutter: 0
            });
        });
    }

    /* ==============================================
     Video Script
     =============================================== */
    function init_videoBg(){

        if( ktmobile ){
            $('.player.video-container').each(function(){
                var $that = $(this);
                $that.addClass('video-mobile-bg');
                if( $that.data('background') ){
                    $that.css('background-image', 'url(' + $(this).data('background') + ')' );
                }
            });
        }else{
            $('.player').each(function(){
                $(this).mb_YTPlayer();
            });
        }
    }

    /* ---------------------------------------------
     Height 100%
     --------------------------------------------- */
    function init_js_height(){

        $(".item-height-window").css('height', $(window).height());
        $(".item-height-parent").each(function(){
            $(this).height($(this).parent().first().height());
        });

    }

    /* ---------------------------------------------
     Instafeed Script
     --------------------------------------------- */
    function init_Instafeed(){
        var feed = new Instafeed({
            get: 'user',
            userId: 174010674,
            accessToken: '174010674.1677ed0.c34d5b2fe9874e1ea4462a664384eb3e',
            template: '<li><a href="{{link}}"><img src="{{image}}" alt="" /></a></li>',
            resolution: 'standard_resolution',
            limit: 4
        });
        feed.run();
    }

    /* ---------------------------------------------
     WOW animations
     --------------------------------------------- */

    function init_wow(){

        var wow = new WOW({
            mobile: false
        });

        if ($("body").hasClass("appear-animate")){
            wow.init();
        }

    }

    /* ---------------------------------------------
     Smooth Scrolling
     --------------------------------------------- */
    function init_scrolling() {

        $('body')
            .on('click', 'a[href*=#]:not([href=#])', function (e) {
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 2000);
                        return false;
                    }
                }
            }).on('click', 'a:not([href*=mailto],[href*=tel],[href*=#])', function (e) {
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') || location.hostname === this.hostname) {
                    $(".page-loader").fadeIn("slow");
                    var href = $(this).attr("href");
                    $("#page").fadeOut("slow", function () {
                        window.location = href;
                    });
                    return false;
                }
            });

    }



})(jQuery); // End of use strict