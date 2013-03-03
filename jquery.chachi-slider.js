/*
 * jQuery chachi chachi Slider v1.0
 * Free to use and abuse.
 * https://github.com/davidsingal/chachi-slider
 */

(function($, window, undefined) {
	
	var slider = {
		init: function(element, settings) {
			var self = this;
			this.el = element;
			this.$el = $(element);
			this.opts = settings;
			this.counter = 0;
			this.w = this.$el.width();

			this.createSlider();

			this.$prev.on('click', function(e) {
				e.preventDefault();
				self.counter--;
				self.animation();
			});

			this.$next.on('click', function(e) {
				e.preventDefault();
				self.counter++;
				self.animation();
			});
		},
		createSlider: function() {
			var panels = this.$el.find('div.chachi-panel'),
				wrapper = $('<div class="chachi-wrapper"></div>'),
				slice = $('<div class="chachi-slice"></div>');

			this.$el.append('<a href="#next" class="chachi-next">Next</a><a href="#prev" class="chachi-prev">Prev</a>')
				.append(wrapper);
			wrapper.append(slice);
            panels.appendTo(slice)
            	.width(this.w)
            	.show();

            this.$prev = this.$el.find('a.chachi-prev');
            this.$next = this.$el.find('a.chachi-next');
            this.$slice = slice;
            this.$panels = panels;

            slice.width(this.w * panels.length);

            if (panels.length > 1) this.$next.show();
		},
		animation: function() {
			if (this.counter <= 0) {
				this.counter = 0;
				this.$prev.hide();
			} else {
				this.$prev.show();
			}

			if (this.counter === this.$panels.length - 1) {
				this.counter = this.$panels.length - 1;
				this.$next.hide();
			} else {
				this.$next.show();
			}

			this.$slice.css({
				'left': -this.counter * this.w
			});
		}
	};
	

	$.fn.chachiSlider = function(options) {
		var settings = $.extend($.fn.chachiSlider.defauls, options);
		return slider.init(this, settings);
	};

	$.fn.chachiSlider.defauls = {
		
	};

})(jQuery, window);