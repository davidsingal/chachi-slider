#Chachi Slider v1.0

A responsive slider plugin to jQuery.

##How to use

Add files to your project

	<link rel="stylesheet" href="{css_folder_path}/chachi-slider.css">
	<script src="{js_folder_path}/jquery.chachi-slider.js"></script>

###Start plugin

	$('#slider').chachiSlider();

###Options

	$('#slider').chachiSlider({
		nextText: 'Siguiente',
		prevText: 'Anterior'
	});

###Methods

* next: Move to next slide
* prev: Move to previous slide

Example:

	// First create a slide
	var slider = $('#slider').chachiSlider(); 
	
	// To next slide
	slider.chachiSlider('next');
