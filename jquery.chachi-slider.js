/*
 * jQuery Chachi Slider v2.0.0
 * Free to use and abuse.
 * https://github.com/davidsingal/chachi-slider
 */

(function($, window, document, undefined) {

  var ChachiSlider = function(element, options) {

    this.el = element;
    this.$el = $(element);

    this.settings = $.extend($.fn.chachiSlider.defaults, options);

    this.init();

  };

  ChachiSlider.prototype = {

    init: function() {

      this.current = 0;

      this.createSlider();

      if (this.settings.navigation) {
        this.createNavigation();
      }

    },

    createSlider: function() {

      function eachSlide(i, slide) {
        var slideHtml = $('<div class="chachi-slide-item"></div>'),
          captionHtml = $('<div class="chachi-slide-caption"></div>'),
          $slide = $(slide),
          $caption = $($slide.data('caption'));

        captionHtml = captionHtml.append($caption.html());

        slideHtml
          .css('background-image', 'url(' + $slide.attr('src') + ')')
          .append(captionHtml);

        if (i === 0) {
          slideHtml.addClass('current');
        }

        $slide
          .after(slideHtml)
          .remove();
      };

      this.$el.find('img').each(eachSlide);
      this.$slides = this.$el.find('.chachi-slide-item');

    },

    createNavigation: function() {

      var self = this;
      this.next = $('<a href="#next" class="chachi-slide-next">&gt;</a>');
      this.prev = $('<a href="#prev" class="chachi-slide-prev">&lt;</a>');

      this.$el
        .append(this.next)
        .append(this.prev);

      this.prev.hide();

      this.prev.on('click', function(e) {
        e.preventDefault();
        self.transition(-1);
      });

      this.next.on('click', function(e) {
        e.preventDefault();
        self.transition(1);
      });

    },

    transition: function(t) {
      var len = this.$slides.length;

      this.current = this.current + t;

      if (this.current === len -1) {
        this.next.hide();
        this.prev.fadeIn('fast');
      } else if (this.current === 0) {
        this.prev.hide();
        this.next.fadeIn('fast');
      } else {
        this.next.fadeIn('fast');
        this.prev.fadeIn('fast');
      }

      this.$slides.removeClass('current');
      $(this.$slides[this.current]).addClass('current');
    }

  };

  $.fn.chachiSlider = function(options) {

    return this.each(function() {

      if (!$.data(this, "chachiSlider")) {

        $.data(this, "chachiSlider", new ChachiSlider(this, options));

      }

    });

  };

  $.fn.chachiSlider.defaults = {
    navigation: true
  };

})(jQuery, window, document);
