/*
 * jQuery Chachi Slider v2.1.0
 * Free to use and abuse.
 * https://github.com/davidsingal/chachi-slider
 */

(function($, window, document, undefined) {

  'use strict';

  var defaults = {
    navigation: true, // show next and prev navigation
    manualAdvance: false, // force manual transitions
    pauseTime: 5000, // how long each slide will show,
    carousel: true, // at end, show the first slide again,
    startAt: 0, // slide position to start,
    height: 'auto' // force height or not
  };

  var ChachiSlider = function(element, options) {
    this.el = element;
    this.$el = $(element);
    this.settings = $.extend({}, defaults, options);

    this.init();
  };

  ChachiSlider.prototype = {

    init: function() {
      this.current = this.settings.startAt || 0;

      this.createSlider();

      if (!this.settings.manualAdvance) {
        this.setTimer();
      }
    },

    createSlider: function() {
      var items = this.$el.find('.chachi-item');

      this.len = items.length;

      this.$el.html('');

      if (this.settings.height !== 'auto') {
        this.$el
          .height(this.settings.height)
          .css('overflow', 'hidden');
      }

      items.each($.proxy(function(index, item) {
        var slideHTML = document.createElement('DIV');

        slideHTML.className = 'chachi-slide-item';

        if (item.tagName === 'IMG') {
          item.className = item.className + ' is-chachi-image';
          slideHTML.style['background-image'] = 'url(' + item.src + ')';
          slideHTML.innerHTML = item.outerHTML;
          // TODO: Add captions
        } else {
          slideHTML.innerHTML = item.innerHTML;
        }

        if (index === 0) {
          slideHTML.className = slideHTML.className + ' is-chachi-current';
        }

        this.$el.append(slideHTML);
      }, this));

      if (this.settings.navigation) {
        this.createNavigation();
      }

      this.$slides = this.$el.find('.chachi-slide-item');
    },

    createNavigation: function() {
      var current = this.current;
      var $prev = $('<button class="chachi-slide-prev">&lt;</button>');
      var $next = $('<button class="chachi-slide-next">&gt;</button>');

      var onNavigate = function() {
        this.removeTimer();
        this.current = current;
        this.checkCurrent();
        this.transition();
        this.setTimer();
      };

      $prev.on('click', $.proxy(function() {
        current = this.current - 1;
        onNavigate.call(this);
      }, this));

      $next.on('click', $.proxy(function() {
        current = this.current + 1;
        onNavigate.call(this);
      }, this));

      this.$el.append($prev).append($next);
    },

    transition: function() {
      this.$slides.removeClass('is-chachi-current');
      $(this.$slides[this.current]).addClass('is-chachi-current');
    },

    setTimer: function() {
      this.timer = setInterval($.proxy(function() {
        this.current = this.current + 1;
        this.checkCurrent();
        this.transition();
      }, this), this.settings.pauseTime);
    },

    removeTimer: function() {
      clearInterval(this.timer);
    },

    checkCurrent: function() {
      if (this.settings.carousel) {
        if (this.current === this.len) {
          this.current = 0;
        } else if (this.current === -1) {
          this.current = this.len -1;
        }
      } else {
        // TODO: no carrousel
      }
    }

  };

  $.fn.chachiSlider = function(options) {
    return this.each(function() {
      if (!$.data(this, 'chachiSlider')) {
        $.data(this, 'chachiSlider', new ChachiSlider(this, options));
      }
    });
  };

})(jQuery, window, document);
