/*
 * jQuery mod Mod Slider v1.2
 * Free to use and abuse.
 * https://github.com/davidsingal/mod-slider
 */

(function($) {

	var opts = {};
	
	var counter = 1;
	
	var slider = {
		init: function(options) {
			var target = this,
				timer = null,
				interval = null;
			
			//Options
			var settings = $.extend({
				auto: true, //Autoslider with a timer
				pause: 3000, //Timer of autoslider
				velocity: 1000, //Velocity of transition
				pagination: true, //If pagination(1,2,3...)
				navigation: true, //If nav and prev navigation
				textPrev: "<", //Text of prev link
				textNext: ">" //Text of next link
			}, options);
			
			//Structure
			var panelsWrapper = $("<div class=\"mod-panels-wrapper\"></div>"),
				wrapper = $("<div class=\"mod-wrapper\"></div>"),
				panels = target.find(".mod-panel");
			
			target.append(wrapper);
			wrapper.append(panelsWrapper);
			panels.appendTo(panelsWrapper);
			target.show();
			
			//Size
			var panelWidth = target.width();
			function sliderSize() {
				panels.css({
					"width": panelWidth + "px",
					"margin-right": 20 + "px"
				});
				panelsWrapper.css("width", ((panelWidth + 20) * panels.length) + "px");
				opts.width = panelWidth;
			};
			
			sliderSize();
			
			//Pagination (1, 2, 3...)
			if (settings.pagination && panels.length > 1) {
				var pagination = $("<div class=\"mod-pag\"></div>"),
					htmlNav = "", links, t;
				
				target.append(pagination);
			
				for (var i = 1; i <= panels.length; i++) {
					htmlNav += "<li><a href=\"#panel" + i + "\">" + i + "</a></li>";
				}
				
				pagination.append("<ul>" + htmlNav + "</ul>");
				links = pagination.find("a");
				
				$(links[0]).addClass("current");
				
				$.each(links, function(index, Element) {
					$(Element).click(function(ev) {
						ev.preventDefault();
						
						if (settings.auto) clearInterval(timer);

						t = this.href.split("#panel");
						counter = parseInt(t[1]);
						
						slider.transition(counter);
						
						if (settings.auto) timer = setInterval(interval, settings.pause);
					});
				});
			}
			
			//Navigation
			var prev, next;
			if (settings.navigation) {
				var navigation = $("<div class=\"mod-nav\"></div>");
				prev = $("<a href=\"#\" class=\"prev\">" + settings.textPrev + "</a>");
				next = $("<a href=\"#\" class=\"next\">" + settings.textNext + "</a>");
					
				navigation.append(prev).append(next);
				
				target.append(navigation);
				
				(counter == 1)?prev.hide():prev.show();
				(counter == panels.length)?next.hide():next.show();
				
				prev.click(function(e) {
					e.preventDefault();
					counter--;
					if (settings.auto) clearInterval(timer);
					if (counter < 1) counter = panels.length - 1;
					slider.transition(counter);
					if (settings.auto) timer = setInterval(interval, settings.pause);
				});
				
				next.click(function(e) {
					e.preventDefault();
					counter++;
					if (settings.auto) clearInterval(timer);
					if (counter > panels.length) counter = 1;
					slider.transition(counter);
					if (settings.auto) timer = setInterval(interval, settings.pause);
				});
			}
			
			//Auto
			if (settings.auto) {
				interval = function() {
					counter++;
					if (counter > panels.length) counter = 1;
					slider.transition(counter);
				};
				
				timer = setInterval(interval, settings.pause);
				
				panels.hover(
					function() {
						clearInterval(timer);
					},
					function() {
						timer = setInterval(interval, settings.pause);
					}
				);
			}
			
			opts = {
				pagination: settings.pagination,
				links: links,
				wrapper: panelsWrapper,
				velocity: settings.velocity,
				width: panelWidth,
				prev: prev,
				next: next,
				panels: panels	
			};
			
			$(window).resize(function() {
				panelWidth = target.width();
				sliderSize();
			});
		},
		transition: function(x) {
			if (opts.pagination) $(opts.links).removeClass("current");
			opts.wrapper.stop().animate({
				"left": -(x-1) * (opts.width + 20)
			}, opts.velocity, function() {
				if (opts.pagination) $(opts.links[x]).addClass("current");
				(x == 1)?opts.prev.hide():opts.prev.show();
				(x == opts.panels.length)?opts.next.hide():opts.next.show();
			});
		},
		startAt: function(x) {
			counter = x;
			if (opts.pagination) $(opts.links).removeClass("current");
			opts.wrapper.css("left", -(x-1) * (opts.width + 20));
			if (opts.pagination) $(opts.links[x]).addClass("current");
			(x == 1)?opts.prev.hide():opts.prev.show();
			(x == opts.panels.length)?opts.next.hide():opts.next.show();
		}
	};
	

	$.fn.modSlider = function(method) {
		var self = this,
			_arguments = arguments;
		
		return self.each(function() {
			if (slider[method]) {
				return slider[method].apply(this, Array.prototype.slice.call(_arguments, 1));
			} else if (typeof method === "object" || !method) {
				slider.init.apply(self, _arguments);
			} else {
				$.error("No existe " + method +  " en modSlider.");
			}
		});
	};
})(jQuery);