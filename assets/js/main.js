$(document).ready(function() {
	$('.results-preview').bind('focusout', function(e) {
		$(this).removeClass('show');
	});
});