/*
 * jQuery mod Mod Slider v1.0
 * Free to use and abuse.
 * https://github.com/davidsingal/mod-slider
 */

(function($) {
	$.fn.modSlider = function(options) {
		
		var settings = $.extend({
			velocity: 1000,
			showNav: true
		}, options);
		
		var target = this,
			panelWidth;
		
		var slider = {
			vars: {
				panels: target.find(".mod-panel"),
				panelsWrapper: $("<div class=\"mod-panels-wrapper\"></div>"),
				navigation: $("<div class=\"mod-nav\"></div>")
			},
			init: function() {
				var self = this,
					wrapper = $("<div class=\"mod-wrapper\"></div>"),
					navHtml = "";				
				
				if (settings.showNav) {
					target.append(self.vars.navigation);
					
					for (var i = 0; i < self.vars.panels.length; i++) {
						navHtml += "<li><a href=\"#panel" + i + "\">" + (i+1) + "</a></li>";
					}
					
					self.vars.navigation.append("<ul>" + navHtml + "</ul>");
				}			
				
				target.append(wrapper);
				
				wrapper.append(self.vars.panelsWrapper);
				
				self.vars.panels.appendTo(self.vars.panelsWrapper);
				
				self.size();
				
				self.nav();
			},
			size: function() {
				var self = this;
				panelWidth = $(target).width();
				
				self.vars.panels.css("width", panelWidth + "px");
				self.vars.panelsWrapper.css("width", (panelWidth * self.vars.panels.length) + "px");
			},
			nav: function() {
				var self = this,
					links = self.vars.navigation.find("a"), t;
				
				$(links[0]).addClass("current");
				
				$.each(links, function(index, Element) {
					$(Element).click(function(ev) {
						ev.preventDefault();
						
						$(links).removeClass("current");
						
						t = this.href.split("#panel");
						
						self.vars.panelsWrapper.stop().animate({
							"left": -t[1] * panelWidth
						}, settings.velocity, function() {
							$(Element).addClass("current");
						});
					});
				});
			}
		};
		
		$(window).resize(function() {
			slider.size();
			console.log();
		});
		
		return target.each(function() {
			slider.init();
		});
		
	};
})(jQuery);