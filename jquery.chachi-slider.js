/*
 * jQuery Chachi Slider v1.0
 * Free to use and abuse.
 * https://github.com/davidsingal/chachi-slider
 */

(function($, window, undefined) {
	
	var Slider = function(element, options) {
		var opts = $.extend($.fn.chachiSlider.defaults, options);
		
		var slider = {
			init: function() {
				var self = this;

				this.$el = $(element);
				this.$panels = this.$el.find('.chachi-panel');
				this.$wrapper = $('<div class="chachi-wrapper"></div>');
				this.$slice = $('<div class="chachi-slice"></div>');
				this.$prev = $('<a href="#prev" class="chachi-prev">' + opts.prevText + '</a>');
				this.$next = $('<a href="#next" class="chachi-next">' + opts.nextText + '</a>');

				this.len = this.$panels.length;
				this.current = 0;
				this.w = this.$el.width();

				this.$el
					.append(this.$wrapper)
					.append(this.$prev)
					.append(this.$next);
				this.$wrapper.append(this.$slice);
				this.$panels.appendTo(this.$slice)
					.width(this.w);

				this.$slice.width(this.w * this.len);

				//Events
				this.$prev.on('click', function(e) {
					e.preventDefault();
					self.prev();
				});

				this.$next.on('click', function(e) {
					e.preventDefault();
					self.next();
				});

				if (this.len > 0) this.$next.show();
			},
			next: function() {
				slider.current++;
				slider.move();
			},
			prev: function() {
				slider.current--;
				slider.move();
			},
			move: function() {
				if (slider.current <= 0) {
					slider.current = 0;
					slider.$prev.fadeOut('fast');
				} else {
					slider.$prev.fadeIn('fast');
				}
				if (slider.current >= slider.len -1) {
					slider.current = slider.len -1;
					slider.$next.fadeOut('fast');
				} else {
					slider.$next.fadeIn('fast');
				}
				slider.$slice.css('left', -this.current * this.w);
			}
		};

		// Initializer
		slider.init();

		// Public API
		return {
			next: slider.next,
			prev: slider.prev
		}
	};

	$.fn.chachiSlider = function(options) {
		var $el = $(this);

		if (typeof options === 'string') {
			var methods = $el.data('chachiSlider');
			if (!$el.data('chachiSlider')) {
				return $.error('First, you must create a slider');
			}
			if (methods[options]) {
				methods[options]();
				return this;
			} else {
				$.error('No exist "' + options + '" method in $.fn.chachiSlider');
			}
		} else {
			return this.each(function() {				
				if ($el.data('chachiSlider')) {
					return $el.data('chachiSlider');
				}
				var chachiSlider = new Slider(this, options);
				$el.data('chachiSlider', chachiSlider);
			});
		}
	};

	$.fn.chachiSlider.defaults = {
		nextText: 'Next',
		prevText: 'Prev'
	};

})(jQuery, window);