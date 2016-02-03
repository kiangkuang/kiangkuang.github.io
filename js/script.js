/*!
 * Start Bootstrap - Agency Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutQuart');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

var fancyBoxOpened = false;

$(document).keyup(function(e) {
  if (e.keyCode == 27) {
    if (fancyBoxOpened) {
      $.fancybox.close();
    } else {
    	$('.modal').modal('hide');
    }
  }
});

$(document).ready(function() {
  $('.fancybox').fancybox({
    beforeLoad: function() {
      fancyBoxOpened = true;
    },
    afterClose: function() {
      fancyBoxOpened = false;
    },
    helpers: {
      title: {
        type: 'inside'
      }
    }
  });
});
