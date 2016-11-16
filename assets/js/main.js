$(document).ready(function () {
    var sfield = $("#search-input");
    var formCnt = $("#search-form");
    var resultCnt = $(".results-preview");

	resultCnt.bind('focusout', function() {
		$(this).removeClass('show');
	});
	
	var timer = null;
    var timerFc = function() {
		$.ajax({
			url: "assets/inc/ajax.php",
			type: 'POST',
			data: 'm=search&q=' + sfield.val(),
			beforeSend: function () {
				formCnt.addClass('searching');
			},
			success: function (r) {
				formCnt.removeClass('searching');
				resultCnt.addClass('show').focus();
				resultCnt.trigger('focusin');
				var rj = jQuery.parseJSON(r);
				var output = "";
				console.log(rj);
				for (var x in rj.users) {
					output += '<li class="list-item search-result">' +
								'<a class="result-link" target="_blank">' +
									'<span class="type">' +
										
									'</span>' +
									'<span class="info">' +
										'<span class="nickname">' +
											rj.users[x].user.username + 
										'</span>' +
										'<span class="figure">' +
											rj.users[x].user.byline + 
										'</span>' +
									'</span>' +
								'</a>' + 
							'</li>';					 
				}
				resultCnt.find('.results .list').html(output);


                $('.search-result').click(function () {
                    $.ajax({
                        url: "assets/inc/ajax.php",
                        type: 'POST',
                        data: 'm=searchTag&q=' + sfield.val(),
                        beforeSend: function () {
                        },
                        success: function (r) {
                            console.log( r );
                        }
                    });
                });


			}
		});
	};
	sfield.keyup(function () {
		clearTimeout(timer);
		timer = setTimeout(function() { timerFc(); }, 250);
    });







});