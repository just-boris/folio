$.fn.folio = function() {
    function selectSlide(index) {
        if(index === currentIndex) {
            return;
        }
        if((index - currentIndex) > 0) {
            for(;currentIndex !== index;currentIndex++) {
                slides.eq(currentIndex+1).addClass(ACTIVE_CLS);
            }
        }
        else {
            for(;currentIndex !== index;currentIndex--) {
                slides.eq(currentIndex).removeClass(ACTIVE_CLS);
            }
        }
        updateSlider();
    }
    function changeSlide(direction) {
        var next = (slides.length + currentIndex + direction) % slides.length;
        selectSlide(next);
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

    var ACTIVE_CLS = 'folio-pane_active',
        currentIndex=0,
        slider = this.find('.folio-slider'),
        navbar = this.find('.folio-nav'),
        slides = this.find('.folio-pane');

    slides.on('click', next);
    this.find('.folio-arrow-right').on('click', next);
    this.find('.folio-arrow-left').on('click', previous);
    navbar.on('click', function(event) {
        selectSlide(getNearestSlide((event.pageX-navbar.offset().left)/navbar.width()));
    });
    slider.on('mousedown', function() {
        function moveHandler(event) {
            var pos = (event.clientX-navbar.offset().left)/navbar.width(),
                normedPos = Math.min(1, Math.max(0, pos));
            slider.css('left', normedPos*100+'%');
        }
        var $window = $(window),
            transition = PrefixFree.prefixCSS('transition:none').split(':');
        slider.css(transition[0], transition[1]);
        $window.on('mousemove', moveHandler);
        $window.one('mouseup', function() {
            selectSlide(getNearestSlide(parseInt(slider.css('left'))/navbar.width()));
            slider.css(transition[0], "");
            $window.off('mousemove', moveHandler)
        });

    });

    updateSlider();
    slides.eq(currentIndex).addClass(ACTIVE_CLS);
};