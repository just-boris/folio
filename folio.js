$.fn.folio = function(config) {
    var transitionEndEvent = (function getTransitionEvent(){
        var el = document.createElement('fakeelement'),
            transitions = {
            'transition':'transitionend',
            'OTransition':'oTransitionEnd',
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        },
        t;
        for(t in transitions){
            if( el.style[t] !== undefined ){
                return transitions[t];
            }
        }
    })();
    function animCallback(elm, callback) {
        if(!transitionEndEvent) {
            callback();
        }
        else {
            elm.one(transitionEndEvent, callback)
        }
    }
    function selectSilde(index) {
        if(index === currentIndex) {
            return;
        }
        var nextSlide = slides.eq(index),
            currentSlide = slides.eq(currentIndex);
        currentIndex = index;
        nextSlide.addClass(ACTIVE_CLS);
        nextSlide.addClass(COMING_CLS);
        updateSlider();
        animCallback(nextSlide, function() {
            currentSlide.removeClass(ACTIVE_CLS);
            animCallback(currentSlide, function() {
                nextSlide.removeClass(COMING_CLS);
            });
        });
    }
    function changeSlide(direction) {
        var next = (currentIndex + direction) % slides.length;
        selectSilde(next);
    }
    function next() {
        changeSlide(+1);
    }
    function previous() {
        changeSlide(-1);
    }

    function getNearestSlide(point) {
        var nearestIndex, minDist;
        for(var index = 0; index < slides.length; index++) {
            var dist = Math.abs(getSliderPosition(index)-point);
            if(!minDist || dist < minDist) {
                minDist = dist;
                nearestIndex = index;
            }
        }
        return nearestIndex;
    }

    function getSliderPosition(index) {
        return index/(slides.length-1);
    }
    function updateSlider() {
        slider.css('left', getSliderPosition(currentIndex)*100+"%");
    }

    var COMING_CLS = 'folio-pane_coming',
        ACTIVE_CLS = 'folio-pane_active',
        currentIndex=0,
        slider = this.find('.folio-slider'),
        navbar = this.find('.folio-nav'),
        slides = this.find('.folio-pane');
    config = config || {};
    if(config.verticalSlide) {
        this.addClass('folio-vertical')
    }


    slides.on('click', next);
    this.find('.folio-arrow-right').on('click', next);
    this.find('.folio-arrow-left').on('click', previous);
    navbar.on('click', function(event) {
        selectSilde(getNearestSlide(event.offsetX/navbar.width()));
    });
    slider.on('mousedown', function() {
        function moveHandler(event) {
            var pos = Math.min(1, Math.max(0, (event.clientX-navbar.offset().left)/navbar.width()));
            slider.css('left', pos*100+'%')
        }
        var $window = $(window);
        $window.on('mousemove', moveHandler);
        $window.one('mouseup', function(event) {
            selectSilde(getNearestSlide(parseInt(slider.css('left'))/navbar.width()));
            $window.off('mousemove', moveHandler)
        })

    });

    updateSlider();
    slides.eq(currentIndex).addClass(ACTIVE_CLS);
};