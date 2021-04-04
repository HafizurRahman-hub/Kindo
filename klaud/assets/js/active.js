(function($) {
    "use strict";
    $(document).on('ready', function() {
        $(window).on('load', function() {
            $(".pre-loader").delay(500).fadeOut();
        });
        var placehoder = document.querySelector('.search-box-inner input');
        var pText = placehoder.placeholder;
        const sp = superplaceholder({
            el: placehoder,
            sentences: [pText],
            options: {
                loop: true
            }
        });
        sp.start();
        AOS.init();
        $('.package-control li').on('click', function() {
            $(".package-control li").removeClass('active');
            $(this).addClass('active');
        });
        $('.card-header .btn').on('click', function() {
            $(".accordion-wrap .card").not($(this).closest('.card')).removeClass('cbg');
            $(this).closest('.card').toggleClass('cbg');
        });
        $('.hero-slider-active').slick({
            slidesToShow: 1,
            dots: true,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 5000,
        });
        $('.testimonial-list').slick({
            slidesToShow: 3,
            dots: true,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            centerPadding: '0px',
            autoplaySpeed: 3000,
            centerMode: true,
            responsive: [{
                breakpoint: 1191,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        $(".popup-link").magnificPopup({
            type: 'image',
            fixedContentPos: false
        });
        $(".popup-gallery").magnificPopup({
            type: 'image',
            gallery: {
                enabled: true,
                fixedContentPos: false
            },
        });
        $(".popup-video, .popup-vimeo, .popup-gmaps").magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
        $('#responsive-menu').meanmenu({
            meanMenuContainer: '.responsive-menu',
            meanScreenWidth: "991"
        });
        $.scrollUp({
            scrollName: 'scrollUp',
            topDistance: '1110',
            topSpeed: 2000,
            animation: 'slide',
            animationInSpeed: 300,
            animationOutSpeed: 300,
            scrollText: '<i class="fal fa-angle-up"></i>',
            activeOverlay: false,
        });
        $("[data-background]").each(function() {
            $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
        });
        $('#responsive-menu a').on('click', function(event) {
            var $anchor = $(this);
            var headerH = '85';
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
            }, 1000, 'easeInOutExpo');
            event.preventDefault();
        });
        $(window).scroll(function() {
            var Width = $(document).width();
            if ($("body").scrollTop() > 100 || $("html").scrollTop() > 100) {
                if (Width > 767) {
                    $("header").addClass("sticky");
                }
            } else {
                $("header").removeClass("sticky");
            }
        });
        $('.price span').each(function() {
            var size = $(this).text().split(".")[1] ? $(this).text().split(".")[1].length : 0;
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 3000,
                step: function(func) {
                    $(this).text(parseFloat(func).toFixed(size));
                }
            });
        });
        $('select').each(function() {
            var $this = $(this),
                numberOfOptions = $(this).children('option').length;
            var overflow = numberOfOptions > 5 ? 'overflow-y' : '';
            $this.addClass('select-hidden');
            $this.wrap('<div class="select"></div>');
            $this.after('<div class="select-styled"></div>');
            var $styledSelect = $this.next('div.select-styled');
            $styledSelect.text($this.children('option').eq(0).text());
            var $list = $('<ul />', {
                'class': 'select-options'
            }).insertAfter($styledSelect);
            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $this.children('option').eq(i).val()
                }).appendTo($list);
            }
            var $listItems = $list.children('li');
            $styledSelect.click(function(e) {
                e.stopPropagation();
                $('div.select-styled.active').not(this).each(function() {
                    $(this).removeClass('active').next('ul.select-options').hide();
                });
                $(this).toggleClass('active').next('ul.select-options').addClass(overflow).toggle();
            });
            $listItems.click(function(e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel'));
                $('select option').removeAttr('selected');
                $('select option[value="' + $(this).attr('rel') + '"]').attr('selected', 'selected');
                if ($this.hasClass('orderby')) {
                    $(this).closest('form').submit();
                }
                $list.hide();
            });
            $(document).click(function() {
                $styledSelect.removeClass('active');
                $list.hide();
            });
        });
    });
})(jQuery);