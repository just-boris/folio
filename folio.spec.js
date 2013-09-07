beforeEach(function() {
    "use strict";
    this.addMatchers({
        toHaveClass: function(cls) {
            this.message = function() {
                return "Expected element has " + (this.isNot ? "": "not ") + "class '" + cls + "'.";
            };
            return this.actual.hasClass(cls);
        }
    });
});
describe("single carousel case", function() {
    "use strict";
    var elm;
    function expectSlideSelected(selectedIndex) {
        elm.find('.folio-pane').each(function(index) {
            if(index <= selectedIndex) {
                expect($(this)).toHaveClass('folio-pane_active');
            }
            else {
                expect($(this)).not.toHaveClass('folio-pane_active');
            }
        });
    }

    beforeEach(function() {
        elm = $(
            '<div class="folio">' +
                '<div class="folio-arrow folio-arrow-left"><i class="icon-chevron-left"></i></div>' +
                '<div class="folio-pane"><p>first slide</p></div>' +
                '<div class="folio-pane"><p>second slide</p></div>'+
                '<div class="folio-pane"><p>an another one slide</p></div>' +
                '<div class="folio-arrow folio-arrow-right"><i class="icon-chevron-right"></i></div>'+
                '<div class="folio-nav">'+
                    '<div class="folio-rail"></div>'+
                    '<div class="folio-slider"></div>'+
                '</div>'+
            '</div>'
        ).folio();
    });
    it("should activate first slide after creation", function() {
        expectSlideSelected(0);
        expect(elm.find('.folio-slider').css("left")).toBe("0%");
    });
    it("should change slides with arrow buttons", function() {
        elm.find(".folio-arrow-right").click();
        expectSlideSelected(1);
        expect(elm.find('.folio-slider').css("left")).toBe("50%");
        elm.find(".folio-arrow-left").click();
        expectSlideSelected(0);
        expect(elm.find('.folio-slider').css("left")).toBe("0%");
    });

    it("should select first slide when click next on last slide", function() {
        var rightArrow = elm.find(".folio-arrow-right");
        rightArrow.click();
        rightArrow.click();
        expectSlideSelected(2);
        rightArrow.click();
        expectSlideSelected(0);
    });

    it("should select last slide when click next on first slide", function() {
        elm.find(".folio-arrow-left").click();
        expectSlideSelected(2);
    });

    it("should change slides on slide click", function() {
        elm.find(".folio-pane").eq(0).click();
        expectSlideSelected(1);
    });

    it("should work key navigation", function() {
        var event = new jQuery.Event("keydown");
        event.keyCode = 34;
        elm.trigger(event);
        expectSlideSelected(1);
        event = new jQuery.Event("keydown");
        event.keyCode = 33;
        elm.trigger(event);
        expectSlideSelected(0);
    });
});

describe("multiple carousels", function() {
    "use strict";
    var elm;
    beforeEach(function() {
        elm = $('<div>'+
            '<div class="folio first">' +
                '<div class="folio-arrow folio-arrow-left"><i class="icon-chevron-left"></i></div>' +
                '<div class="folio-pane"><p>first slide</p></div>' +
                '<div class="folio-pane"><p>second slide</p></div>'+
                '<div class="folio-arrow folio-arrow-right"><i class="icon-chevron-right"></i></div>'+
                '<div class="folio-nav">'+
                '<div class="folio-rail"></div>'+
                '<div class="folio-slider"></div>'+
                '</div>'+
            '</div>'+
            '<div class="folio second">' +
                '<div class="folio-arrow folio-arrow-left"><i class="icon-chevron-left"></i></div>' +
                '<div class="folio-pane"><p>first slide</p></div>' +
                '<div class="folio-pane"><p>second slide</p></div>'+
                '<div class="folio-arrow folio-arrow-right"><i class="icon-chevron-right"></i></div>'+
                '<div class="folio-nav">'+
                '<div class="folio-rail"></div>'+
                '<div class="folio-slider"></div>'+
                '</div>'+
            '</div>'+
        '</div>');
        elm.find('.folio').folio();
    });
    it("should any carousel works separately", function() {
        elm.find('.first .folio-arrow-right').click();
        expect(elm.find('.second .folio-pane').eq(1)).not.toHaveClass('folio-pane_active');
        elm.find('.second .folio-arrow-right').click();
        expect(elm.find('.second .folio-pane').eq(1)).toHaveClass('folio-pane_active');
    });
});