(function($) {
    var ACTIVE_CLS = 'folio-pane_active'
    function Folio(element) {
        this.slider = element.find('.folio-slider');
        this.navbar = element.find('.folio-nav');
        this.slides = element.find('.folio-pane');
        this.currentIndex=0;

        element.find('.folio-arrow-right').on('click', this.next.bind(this));
        element.find('.folio-arrow-left').on('click', this.previous.bind(this));
        this.slides.on('click', this.next.bind(this));
        this.navbar.on('click', function(event) {
            var slideIndex = this.getNearestSlide(
                (event.pageX-this.navbar.offset().left)/this.navbar.width()
            );
            this.selectSlide(slideIndex);
        }.bind(this));
        this.slider.on('mousedown', this.handleDragSlider.bind(this));

        this.updateSlider();
        this.slides.eq(this.currentIndex).addClass(ACTIVE_CLS);
    }
    Folio.prototype = {
        getNearestSlide: function  (point) {
            var nearestIndex, minDist;
            for(var index = 0; index < this.slides.length; index++) {
                var dist = Math.abs(this.getSliderPosition(index)-point);
                if(!minDist || dist < minDist) {
                    minDist = dist;
                    nearestIndex = index;
                }
            }
            return nearestIndex;
        },
        getSliderPosition: function  (index) {
            return index/(this.slides.length-1);
        },
        updateSlider: function  () {
            this.slider.css('left', this.getSliderPosition(this.currentIndex)*100+"%");
        },

        handleDragSlider: function() {
            function moveHandler(event) {
                var pos = (event.pageX-self.navbar.offset().left)/self.navbar.width(),
                    normedPos = Math.min(1, Math.max(0, pos));
                self.slider.css('left', normedPos*100+'%');
            }
            var self = this,
                $window = $(window),
                transition = PrefixFree.prefixCSS('transition:none').split(':');
            this.slider.css(transition[0], transition[1]);
            $window.on('mousemove', moveHandler);
            $window.one('mouseup', function() {
                var slideIndex = self.getNearestSlide(parseInt(self.slider.css('left'))/self.navbar.width());
                self.selectSlide(slideIndex);
                self.slider.css(transition[0], "");
                $window.off('mousemove', moveHandler)
            });
        },

        selectSlide: function(index) {
            if(index === this.currentIndex) {
                return;
            }
            if((index - this.currentIndex) > 0) {
                for(;this.currentIndex !== index;this.currentIndex++) {
                    this.slides.eq(this.currentIndex+1).addClass(ACTIVE_CLS);
                }
            }
            else {
                for(;this.currentIndex !== index;this.currentIndex--) {
                    this.slides.eq(this.currentIndex).removeClass(ACTIVE_CLS);
                }
            }
            this.updateSlider();
        },
        changeSlide: function  (direction) {
            var next = (this.slides.length + this.currentIndex + direction) % this.slides.length;
            this.selectSlide(next);
        },
        next: function  () {
            this.changeSlide(+1);
        },
        previous: function  () {
            this.changeSlide(-1);
        }
    };
    $.fn.folio = function() {
        this.each(function() {
            new Folio($(this));
        });
    };
})(jQuery);