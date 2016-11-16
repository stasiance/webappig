$(document).ready(function () {
	var sfield = $("#search-input");
	var formCnt = $("#search-form");
	var resultCnt = $(".results-preview");

	resultCnt.bind('focusout', function() {
		$(this).removeClass('show');
	});

	var timer = null;
	var numberWithCommas = function(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		;}
	var timerFc = function() {
		$.ajax({
			url: "assets/inc/ajax.php",
			type: 'GET',
			data: 'm=search&q=' + encodeURIComponent(sfield.val()),
			beforeSend: function () {
				formCnt.addClass('searching');
			},
			success: function (r) {
				var rj = jQuery.parseJSON(r);
				var output = "";
				var datatable = [];
				for (var x in rj.hashtags) {
					datatable[rj.hashtags[x].position] = {
						'type' : '#',
						'user' : rj.hashtags[x].hashtag.name,
						'byline' : numberWithCommas(rj.hashtags[x].hashtag.media_count) + ' posts',
						'link' : 'http://www.instagram.com/' + rj.hashtags[x].hashtag.name + '/'
					};
				}
				for (var x in rj.places) {
					datatable[rj.places[x].position] = {
						'type' : '@',
						'user' : rj.places[x].place.title,
						'byline' : rj.places[x].place.subtitle,
						'link' : 'http://www.instagram.com/explore/locations/' + rj.places[x].place.location.pk + '/' + rj.places[x].place.slug + '/'
					};
				}
				for (var x in rj.users) {
					datatable[rj.users[x].position] = {
						'type' : '<img src="' + rj.users[x].user.profile_pic_url + '" alt="">',
						'user' : rj.users[x].user.username,
						'byline' : rj.users[x].user.full_name,
						'link' : 'http://www.instagram.com/' + rj.users[x].user.username + '/'
					};
				}

				for (var x in rj.users) {
					output += '<li class="list-item">' +
						'<a href="' + datatable[x].link + '" class="result-link" target="_blank">' +
						'<span class="type">' +
						datatable[x].type +
						'</span>' +
						'<span class="info">' +
						'<span class="nickname">' +
						datatable[x].user +
						'</span>' +
						'<span class="figure">' +
						datatable[x].byline +
						'</span>' +
						'</span>' +
						'</a>' +
						'</li>';
				}
				resultCnt.find('.results .list').html(output);
				formCnt.removeClass('searching');
				resultCnt.addClass('show').focus();



				$('.search-result').click(function () {
					$.ajax({
						url: "assets/inc/ajax.php",
						type: 'GET',
						data: 'm=searchTag&q=' + sfield.val(),
						data: 'https://api.instagram.com/v1/tags/' + sfield.val() + '/media/recent?access_token=1120907162.52fc381.a9d3c8eb44b34c04adbcc34cdc2a03d9',
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
		timer = setTimeout(function() { timerFc(); }, 500);
	})
});