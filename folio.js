(function($) {
    "use strict";
    /**
     * StyleFix 1.0.3 & PrefixFree 1.0.7
     * @author Lea Verou
     * MIT license
     */(function(){function t(e,t){return[].slice.call((t||document).querySelectorAll(e))}if(!window.addEventListener)return;var e=window.StyleFix={link:function(t){try{if(t.rel!=="stylesheet"||t.hasAttribute("data-noprefix"))return}catch(n){return}var r=t.href||t.getAttribute("data-href"),i=r.replace(/[^\/]+$/,""),s=(/^[a-z]{3,10}:/.exec(i)||[""])[0],o=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(i)||[""])[0],u=/^([^?]*)\??/.exec(r)[1],a=t.parentNode,f=new XMLHttpRequest,l;f.onreadystatechange=function(){f.readyState===4&&l()};l=function(){var n=f.responseText;if(n&&t.parentNode&&(!f.status||f.status<400||f.status>600)){n=e.fix(n,!0,t);if(i){n=n.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(e,t,n){return/^([a-z]{3,10}:|#)/i.test(n)?e:/^\/\//.test(n)?'url("'+s+n+'")':/^\//.test(n)?'url("'+o+n+'")':/^\?/.test(n)?'url("'+u+n+'")':'url("'+i+n+'")'});var r=i.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1");n=n.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+r,"gi"),"$1")}var l=document.createElement("style");l.textContent=n;l.media=t.media;l.disabled=t.disabled;l.setAttribute("data-href",t.getAttribute("href"));a.insertBefore(l,t);a.removeChild(t);l.media=t.media}};try{f.open("GET",r);f.send(null)}catch(n){if(typeof XDomainRequest!="undefined"){f=new XDomainRequest;f.onerror=f.onprogress=function(){};f.onload=l;f.open("GET",r);f.send(null)}}t.setAttribute("data-inprogress","")},styleElement:function(t){if(t.hasAttribute("data-noprefix"))return;var n=t.disabled;t.textContent=e.fix(t.textContent,!0,t);t.disabled=n},styleAttribute:function(t){var n=t.getAttribute("style");n=e.fix(n,!1,t);t.setAttribute("style",n)},process:function(){t('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);t("style").forEach(StyleFix.styleElement);t("[style]").forEach(StyleFix.styleAttribute)},register:function(t,n){(e.fixers=e.fixers||[]).splice(n===undefined?e.fixers.length:n,0,t)},fix:function(t,n,r){for(var i=0;i<e.fixers.length;i++)t=e.fixers[i](t,n,r)||t;return t},camelCase:function(e){return e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()}).replace("-","")},deCamelCase:function(e){return e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()})}};(function(){setTimeout(function(){t('link[rel="stylesheet"]').forEach(StyleFix.link)},10);document.addEventListener("DOMContentLoaded",StyleFix.process,!1)})()})();(function(e){function t(e,t,r,i,s){e=n[e];if(e.length){var o=RegExp(t+"("+e.join("|")+")"+r,"gi");s=s.replace(o,i)}return s}if(!window.StyleFix||!window.getComputedStyle)return;var n=window.PrefixFree={prefixCSS:function(e,r,i){var s=n.prefix;n.functions.indexOf("linear-gradient")>-1&&(e=e.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig,function(e,t,n,r){return t+(n||"")+"linear-gradient("+(90-r)+"deg"}));e=t("functions","(\\s|:|,)","\\s*\\(","$1"+s+"$2(",e);e=t("keywords","(\\s|:)","(\\s|;|\\}|$)","$1"+s+"$2$3",e);e=t("properties","(^|\\{|\\s|;)","\\s*:","$1"+s+"$2:",e);if(n.properties.length){var o=RegExp("\\b("+n.properties.join("|")+")(?!:)","gi");e=t("valueProperties","\\b",":(.+?);",function(e){return e.replace(o,s+"$1")},e)}if(r){e=t("selectors","","\\b",n.prefixSelector,e);e=t("atrules","@","\\b","@"+s+"$1",e)}e=e.replace(RegExp("-"+s,"g"),"-");e=e.replace(/-\*-(?=[a-z]+)/gi,n.prefix);return e},property:function(e){return(n.properties.indexOf(e)?n.prefix:"")+e},value:function(e,r){e=t("functions","(^|\\s|,)","\\s*\\(","$1"+n.prefix+"$2(",e);e=t("keywords","(^|\\s)","(\\s|$)","$1"+n.prefix+"$2$3",e);return e},prefixSelector:function(e){return e.replace(/^:{1,2}/,function(e){return e+n.prefix})},prefixProperty:function(e,t){var r=n.prefix+e;return t?StyleFix.camelCase(r):r}};(function(){var e={},t=[],r={},i=getComputedStyle(document.documentElement,null),s=document.createElement("div").style,o=function(n){if(n.charAt(0)==="-"){t.push(n);var r=n.split("-"),i=r[1];e[i]=++e[i]||1;while(r.length>3){r.pop();var s=r.join("-");u(s)&&t.indexOf(s)===-1&&t.push(s)}}},u=function(e){return StyleFix.camelCase(e)in s};if(i.length>0)for(var a=0;a<i.length;a++)o(i[a]);else for(var f in i)o(StyleFix.deCamelCase(f));var l={uses:0};for(var c in e){var h=e[c];l.uses<h&&(l={prefix:c,uses:h})}n.prefix="-"+l.prefix+"-";n.Prefix=StyleFix.camelCase(n.prefix);n.properties=[];for(var a=0;a<t.length;a++){var f=t[a];if(f.indexOf(n.prefix)===0){var p=f.slice(n.prefix.length);u(p)||n.properties.push(p)}}n.Prefix=="Ms"&&!("transform"in s)&&!("MsTransform"in s)&&"msTransform"in s&&n.properties.push("transform","transform-origin");n.properties.sort()})();(function(){function i(e,t){r[t]="";r[t]=e;return!!r[t]}var e={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};e["repeating-linear-gradient"]=e["repeating-radial-gradient"]=e["radial-gradient"]=e["linear-gradient"];var t={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display",grid:"display","inline-grid":"display","min-content":"width"};n.functions=[];n.keywords=[];var r=document.createElement("div").style;for(var s in e){var o=e[s],u=o.property,a=s+"("+o.params+")";!i(a,u)&&i(n.prefix+a,u)&&n.functions.push(s)}for(var f in t){var u=t[f];!i(f,u)&&i(n.prefix+f,u)&&n.keywords.push(f)}})();(function(){function s(e){i.textContent=e+"{}";return!!i.sheet.cssRules.length}var t={":read-only":null,":read-write":null,":any-link":null,"::selection":null},r={keyframes:"name",viewport:null,document:'regexp(".")'};n.selectors=[];n.atrules=[];var i=e.appendChild(document.createElement("style"));for(var o in t){var u=o+(t[o]?"("+t[o]+")":"");!s(u)&&s(n.prefixSelector(u))&&n.selectors.push(o)}for(var a in r){var u=a+" "+(r[a]||"");!s("@"+u)&&s("@"+n.prefix+u)&&n.atrules.push(a)}e.removeChild(i)})();n.valueProperties=["transition","transition-property"];e.className+=" "+n.prefix;StyleFix.register(n.prefixCSS)})(document.documentElement);

    var ACTIVE_CLS = 'folio-pane_active',
        SLIDING_CLS = 'folio-pane_sliding',
        transitionEndEvent = (function getTransitionEvent(){
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
    function keepClassWhileAnimate(elm, cls) {
        if(transitionEndEvent) {
            elm.addClass(cls);
            elm.one(transitionEndEvent, function() {
                elm.removeClass(cls);
            })
        }
    }
    function Folio(element) {
        this.slider = element.find('.folio-slider');
        this.navbar = element.find('.folio-nav');
        this.slides = element.find('.folio-pane');
        this.currentIndex=0;

        element.find('.folio-arrow-right').on('click', this.next.bind(this));
        element.find('.folio-arrow-left').on('click', this.previous.bind(this));
        element.on('keydown', this.onKeydown.bind(this));
        this.slides.on('click', this.next.bind(this));
        this.navbar.on('click', function(event) {
            var slideIndex = this.getNearestSlide(
                (event.pageX-this.navbar.offset().left)/this.navbar.width()
            );
            this.selectSlide(slideIndex);
        }.bind(this));
        this.slider.on('mousedown', this.onDragSlider.bind(this));

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

        onKeydown: function(event) {
            var keysToLeft = [33, 37, 38],
                keysToRight = [34, 39, 40];
            if(keysToLeft.indexOf(event.keyCode) !== -1) {
                this.previous();
                event.preventDefault();
                return false;
            }
            else if(keysToRight.indexOf(event.keyCode) != -1) {
                this.next();
                event.preventDefault();
                return false;
            }
            return true;
        },

        onDragSlider: function() {
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
            var slide;
            if((index - this.currentIndex) > 0) {
                for(;this.currentIndex !== index;this.currentIndex++) {
                    slide = this.slides.eq(this.currentIndex+1);
                    slide.addClass(ACTIVE_CLS);
                    keepClassWhileAnimate(slide, SLIDING_CLS);
                }
            }
            else {
                for(;this.currentIndex !== index;this.currentIndex--) {
                    slide = this.slides.eq(this.currentIndex);
                    slide.removeClass(ACTIVE_CLS);
                    keepClassWhileAnimate(slide, SLIDING_CLS);
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
        return this;
    };
})(jQuery);