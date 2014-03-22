
$(document).ready(function(e) {
	$('.with-hover-text, .regular-link').click(function(e){
		e.stopPropagation();
	});
	
	/***************
	* = Hover text *
	* Hover text for the last slide
	***************/
	$('.with-hover-text').hover(
		function(e) {
			$(this).css('overflow', 'visible');
			$(this).find('.hover-text')
				.show()
				.css('opacity', 0)
				.delay(200)
				.animate(
					{
						paddingTop: '25px',
						opacity: 1
					},
					'fast',
					'linear'
				);
		},
		function(e) {
			var obj = $(this);
			$(this).find('.hover-text')
				.animate(
					{
						paddingTop: '0',
						opacity: 0
					},
					'fast',
					'linear',
					function() {
						$(this).hide();
						$( obj ).css('overflow', 'hidden');
					}
				);
		}
	);
	
	var img_loaded = 0;
	var j_images = [];
	
	/*************************
	* = Controls active menu *
	* Hover text for the last slide
	*************************/
	$('#slide-3 img').each(function(index, element) {
		var time = new Date().getTime();
		var oldHref = $(this).attr('src');
		var myImg = $('<img />').attr('src', oldHref + '?' + time );
		
		myImg.load(function(e) {
			img_loaded += 1;;
			if ( img_loaded == $('#slide-3 img').length ) {
				$(function() {
					
					var pause = 10;
					$(document).scroll(function(e) {
						delay(function() {
							
							var tops = [];
							
							$('.story').each(function(index, element) {
								tops.push( $(element).offset().top - 200 );
							});
				
							var scroll_top = $(this).scrollTop();
							
							var lis = $('.nav > li');
							
							for ( var i=tops.length-1; i>=0; i-- ) {
								if ( scroll_top >= tops[i] ) {
									menu_focus( lis[i], i+1 );
									break;
								}
							}
						},
						pause);
					});
					$(document).scroll();
				});
			}
		});
	});
	
});

/******************
* = Gallery width *
******************/
$(function() {
	var pause = 50; // will only process code within delay(function() { ... }) every 100ms.
	$(window).resize(function() {
		delay(function() {
				var gallery_images = $('#slide-3 img');
				
				var images_per_row = 0;
				if ( gallery_images.length % 2 == 0 ) {
					images_per_row = gallery_images.length / 2;
				} else {
					images_per_row = gallery_images.length / 2 + 1;
				}
				
				var gallery_width = $('#slide-3 img').width() * $('#slide-3 img').length;
				gallery_width /= 2;
				if ( $('#slide-3 img').length % 2 != 0 ) {
					gallery_width += $('#slide-3 img').width();
				}
				
				$('#slide-3 .row').css('width', gallery_width );
				
				var left_pos = $('#slide-3 .row').width() - $('body').width();
				left_pos /= -2;
				
				$('#slide-3 .row').css('left', left_pos);
			
			},
			pause
		);
	});
	$(window).resize();
});

var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();

function menu_focus( element, i ) {
	if ( $(element).hasClass('active') ) {
		if ( i == 6 ) {
			if ( $('.navbar').hasClass('inv') == false )
				return;
		} else {
			return;
		}
	}
	
	enable_arrows( i );
		
	if ( i == 1 || i == 6 )
		$('.navbar').removeClass('inv');
	else
		$('.navbar').addClass('inv');
	
	$('.nav > li').removeClass('active');
	$(element).addClass('active');
	
	var icon = $(element).find('.icon');
	
	var left_pos = icon.offset().left - $('.nav').offset().left;
	var el_width = icon.width() + $(element).find('.text').width() + 10;
	
	$('.active-menu').stop(false, false).animate(
		{
			left: left_pos,
			width: el_width
		},
		1500,
		'easeInOutQuart'
	);
}

function enable_arrows( dataslide ) {
	$('#arrows div').addClass('disabled');
	if ( dataslide != 1 ) {
		$('#arrow-up').removeClass('disabled');
	}
	if ( dataslide != 6 ) {
		$('#arrow-down').removeClass('disabled');
	}
	if ( dataslide == 3 ) {
		$('#arrow-left').removeClass('disabled');
		$('#arrow-right').removeClass('disabled');
	}
}

/*************
* = Parallax *
*************/
jQuery(document).ready(function ($) {
	//Cache some variables
	var links = $('.nav').find('li');
	slide = $('.slide');
	button = $('.button');
	mywindow = $(window);
	htmlbody = $('html,body');
	
	//Create a function that will be passed a slide number and then will scroll to that slide using jquerys animate. The Jquery
	//easing plugin is also used, so we passed in the easing method of 'easeInOutQuint' which is available throught the plugin.
	function goToByScroll(dataslide) {
		var offset_top = ( dataslide == 1 ) ? '0px' : $('.slide[data-slide="' + dataslide + '"]').offset().top;
		
		htmlbody.stop(false, false).animate({
			scrollTop: offset_top
		}, 1500, 'easeInOutQuart');
	}
	
	//When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
	links.click(function (e) {
		e.preventDefault();
		dataslide = $(this).attr('data-slide');
		goToByScroll(dataslide);
		$(".nav-collapse").collapse('hide');
	});
	
	//When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
	$('.navigation-slide').click(function (e) {
		e.preventDefault();
		dataslide = $(this).attr('data-slide');
		goToByScroll(dataslide);
		$(".nav-collapse").collapse('hide');
	});
});

/***************
* = Menu hover *
***************/
jQuery(document).ready(function ($) {
	//Cache some variables
	var menu_item = $('.nav').find('li');
	
	menu_item.hover(
		function(e) {
			var icon = $(this).find('.icon');
			
			var left_pos = icon.offset().left - $('.nav').offset().left;
			var el_width = icon.width() + $(this).find('.text').width() + 10;
			
			var hover_bar = $('<div class="active-menu special-active-menu"></div>')
				.css('left', left_pos)
				.css('width', el_width)
				.attr('id', 'special-active-menu-' + $(this).data('slide') );
			
			$('.active-menu').after( hover_bar );
		},
		function(e) {
			$('.special-active-menu').remove();
		}
	);
});

/******************
* = Gallery hover *
******************/
jQuery(document).ready(function ($) {
	//Cache some variables
	var images = $('#slide-3 a');
	
	images.hover(
		function(e) {
			var asta = $(this).find('img');
			$('#slide-3 img').not( asta ).stop(false, false).animate(
				{
					opacity: .5
				},
				'fast',
				'linear'
			);
			var zoom = $('<div class="zoom"></div>');
			if ( $(this).hasClass('video') ) {
				zoom.addClass('video');
			}
			$(this).prepend(zoom);
		},
		function(e) {
			$('#slide-3 img').stop(false, false).animate(
				{
					opacity: 1
				},
				'fast',
				'linear'
			);
			$('.zoom').remove();
		}
	);
});

/******************
* = Arrows click  *
******************/
jQuery(document).ready(function ($) {
	//Cache some variables
	var arrows = $('#arrows div');
	
	arrows.click(function(e) {
		e.preventDefault();
		
		if ( $(this).hasClass('disabled') )
			return;
		
		var slide = null;
		var datasheet = $('.nav > li.active').data('slide');
		var offset_top = false;
		var offset_left = false;
		
		
		switch( $(this).attr('id') ) {
			case 'arrow-up':
				offset_top = ( datasheet - 1 == 1 ) ? '0px' : $('.slide[data-slide="' + (datasheet-1) + '"]').offset().top;
				break;
			case 'arrow-down':
				offset_top = $('.slide[data-slide="' + (datasheet+1) + '"]').offset().top;
				break;
			case 'arrow-left':
				offset_left = $('#slide-3 .row').offset().left + 452;
				if ( offset_left > 0 ) {
					offset_left = '0px';
				}
				break;
			case 'arrow-right':
				offset_left = $('#slide-3 .row').offset().left - 452;
				if ( offset_left < $('body').width() - $('#slide-3 .row').width() ) {
					offset_left = $('body').width() - $('#slide-3 .row').width();
				}
				break;
		}
		
		if ( offset_top != false ) {
			htmlbody.stop(false, false).animate({
				scrollTop: offset_top
			}, 1500, 'easeInOutQuart');
		}
		
		if ( offset_left != false ) {
			if ( $('#slide-3 .row').width() != $('body').width() ) {
				$('#slide-3 .row').stop(false, false).animate({
					left: offset_left
				}, 1500, 'easeInOutQuart');
			}
		}
	});
});

//fancybox init
$(document).ready(function(e) {
	var lis = $('.nav > li');
	menu_focus( lis[0], 1 );

	$(".fancybox").fancybox({
		padding: 10,
		helpers: {
			overlay: {
				locked: false
			}
		}
	});

});

function IsEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

$("#thanks").fadeToggle();
var retard = false;
var hobo = false;
var dome = false;
$("#submitBtn").on("click", function(){
	if ($("#inputName").val().length <= 0) {
		$("#labelName").fadeToggle(400,"",function(){
			$("#labelName").html("STATE THY NAME!");
		});
		$("#labelName").fadeToggle(400);
		retard = true;
	}
	else if ($("#inputName").val().length > 0 && retard == true) {
		$("#labelName").fadeToggle(400,"",function(){
			$("#labelName").html("Name");
		});
		$("#labelName").fadeToggle(400);
		retard = false;
	}
	
	if ($("#inputEmail").val().length <= 0) {
		$("#labelEmail").fadeToggle(400,"",function(){
			$("#labelEmail").html("DON'T YOU HAVE AN EMAIL?");
		});
		$("#labelEmail").fadeToggle(400);
		hobo = true;
	} else if (!(IsEmail($("#inputEmail").val()))) {
		$("#labelEmail").fadeToggle(400,"",function(){
			$("#labelEmail").html("DO NOT LIE TO THE HELIX!");
		});
		$("#labelEmail").fadeToggle(400);
		hobo = true;
	} else if ($("#inputEmail").val().length > 0 && hobo == true) {
		$("#labelEmail").fadeToggle(400,"",function(){
			$("#labelEmail").html("Email");
		});
		$("#labelEmail").fadeToggle(400);
		hobo = false;
	}
	
	if ($("#inputFeedback").val().length <= 0) {
		$("#labelFeedback").fadeToggle(400,"",function(){
			$("#labelFeedback").html("WHAT DO YOU SEEK FROM THE HELIX?");
		});
		$("#labelFeedback").fadeToggle(400);
		dome = true;
	} else if ($("#inputFeedback").val().length > 0 && dome == true) {
		$("#labelFeedback").fadeToggle(400,"",function(){
			$("#labelFeedback").html("Feedback");
		});
		$("#labelFeedback").fadeToggle(400);
		dome = false;
	}
	
	if ($("#inputName").val().length > 0 && $("#inputEmail").val().length > 0 && $("#inputFeedback").val().length > 0 && IsEmail($("#inputEmail").val())) {
		$("#slideout").slideToggle();
		$("#thanks").fadeToggle();
	}
});

$("#thanks").on("click", function(){
	$("#inputName").val("");
	$("#inputEmail").val("");
	$("#inputFeedback").val("");
	$("#thanks").fadeToggle();
	$("#slideout").slideToggle();
});