$(function() {
	$.UISearch({articleID:'#main',placeholder:'Search'});

	$("#alarm-view").on("singletap", function() {
		$.UIGoToArticle("#alarm-stops");
	});
	
	$("#map-view").on("singletap", function() {
		$.UIGoToArticle("#main");
	});
	
	$("#sound").on("singletap", function() {
		$.UIGoToArticle("#customize");
	});
	
	$("#setringtone").on("singletap", function() {
		$.UIGoToArticle("#ringtone");
	});
	
	
	$('.segmented').UIPanelToggle('#toggle-panels', function(){});
	
	$('#stopslist').slideToggle();
	$('#alarmSwitch1').on('singletap swipeleft swiperight', function() {
		if (this.classList.contains('on')) {
			$('#stopslist').slideToggle();
		} else {
			$('#stopslist').slideToggle();
		}
	}); 
	
	$('#distlist').slideToggle();
	$('#alarmSwitch2').on('singletap swipeleft swiperight', function() {
		if (this.classList.contains('on')) {
			$('#distlist').slideToggle();
		} else {
			$('#distlist').slideToggle();
		}
	}); 
	
	$('#stops').UIStepper({ 
		start: 1,
		end: 8,
		defaultValue: 2
	});

	$('#rangeValue1').html($('#rangeControl1').val()+"m");
	$('#rangeControl1').on('change', function() {
		$('#rangeValue1').html($(this).val()+"m");
	});

	$('.list.select').UISelectList({
		selected: 0,
		callback: function() {
			$("#select-response").html($(this).text()); // display text
		}
	}); 
	
	$("#openPopup").on("singletap", function() {
		console.log("lol");
		var mess = "Enable Stops alarm or Distance alarm to test!";
		if ($('#alarmSwitch1').hasClass('on')) {
			mess = 'Alight in '+ $(".stepper label").html() + ' stops!';
		} 
		if ($('#alarmSwitch2').hasClass('on')) {
			mess = 'Alight in '+ $('#rangeValue1').html()+'!';
		}
		$.UIPopup({
			id: "Alarm",
			title: 'Attention!', 
			message: mess, 
			continueButton: 'Dismiss', 
			callback: function() {
			}
		});
	});

	$('#soundSwitch').on('singletap swipeleft swiperight', function() {
		if (this.classList.contains('on')) {
			$('#select-response').fadeToggle();
		} else {
			$('#select-response').fadeToggle();
		}
	}); 
	
	$('#save').on("singletap", function(e) {
		e.preventDefault();
		$.UIPopup({empty: true}); // display an empty popup component
		// select the popup component and add Busy indicator
		$('.popup').UIBusy()
		// close popup after 5s
		setTimeout(function() {
			$('.popup').UIPopupClose();
			$.UIGoToArticle("#main");
		},1000);
	});
});