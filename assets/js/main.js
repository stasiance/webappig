$(document).ready(function () {
	var sfield = $("#search-input");
	var formCnt = $("#search-form");
	var resultCnt = $(".results-preview");

	resultCnt.bind('focusout', function() {
	 	setTimeout(function() {
	 		resultCnt.removeClass('show');
	 	}, 600);
	});
	
	$('#search-form').bind('submit', function(e) {
		e.preventDefault();
		return false;
	});

	var timer = null;
	var numberWithCommas = function(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		;}
	var sortArrayData = function(property) {
		var sortOrder = 1;
		if(property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a,b) {
			var result = (a[property] < b[property]) ? 1 : (a[property] > b[property]) ? -1 : 0;
			return result * sortOrder;
		}
	};
	var timerFc = function(encodeTxt) {
		var encodeTxt = encodeURIComponent($(sfield).val());
		$.ajax({
			url: "assets/inc/ajax.php",
			type: 'GET',
			data: 'm=search&q=' + encodeTxt,
			beforeSend: function () {
				formCnt.addClass('searching');
			},
			success: function (r) {
				var rj = jQuery.parseJSON(r);
				var output = "";
				var datatable = [];
				var tableindex = 0;
				var hashtagsData = [];
				var placesData = [];
				var usersData = [];
			
				for (var x in rj.hashtags) {
					hashtagsData[tableindex] = {
						'category' : 'hashtag',
						'type' : '#',
						'user' : rj.hashtags[x].hashtag.name,
						'byline' : numberWithCommas(rj.hashtags[x].hashtag.media_count) + ' posts',
						'link' : 'http://www.instagram.com/' + rj.hashtags[x].hashtag.name + '/',
						'id' : rj.hashtags[x].hashtag.name,
						'sortkey' : rj.hashtags[x].hashtag.media_count
					};
					tableindex++;
				}
				tableindex = 0;
				for (var x in rj.places) {
					placesData[tableindex] = {
						'category' : 'location',
						'type' : '@',
						'user' : rj.places[x].place.title,
						'byline' : rj.places[x].place.subtitle,
						'link' : 'http://www.instagram.com/explore/locations/' + rj.places[x].place.location.pk + '/' + rj.places[x].place.slug + '/',
						'id' : rj.places[x].place.location.pk,
						'sortkey' : rj.places[x].place.location.pk
					};
					tableindex++;
				}
				tableindex = 0;
				for (var x in rj.users) {
					usersData[tableindex] = {
						'category' : 'user',
						'type' : '<img src="' + rj.users[x].user.profile_pic_url + '" alt="">',
						'user' : rj.users[x].user.username,
						'byline' : rj.users[x].user.full_name,
						'link' : 'http://www.instagram.com/' + rj.users[x].user.username + '/',
						'id' : rj.users[x].user.pk,
						'sortkey' : rj.users[x].user.follower_count
					};
					tableindex++;
				}
				
				if (sortArrayData.length > 0) hashtagsData.sort(sortArrayData('sortkey'));
				if (placesData.length > 0) placesData.sort(sortArrayData('sortkey'));
				if (usersData.length > 0) usersData.sort(sortArrayData('sortkey'));
				
				Array.prototype.push.apply(datatable, hashtagsData);
				Array.prototype.push.apply(datatable, placesData);
				Array.prototype.push.apply(datatable, usersData);
				
				for (var x in datatable) {
					output += '<li class="list-item" data-type="' + datatable[x].category + '" data-id="' + datatable[x].id + '" data-name="' + datatable[x].user + '">' +
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

				resultCnt.find('.list-item').bind('click', function (e) {
					e.preventDefault();

					$('#results').addClass('searching').html('');

					var searchType = 'searchTag';
					switch($(this).attr('data-type')) {
						case 'hashtag' :
							searchType = 'searchTag';
							break;

						case 'location' :
							searchType = 'searchLocation';
							break;

						case 'user' :
							searchType = 'searchUser';
							break;
					}

					$.ajax({
						url: "assets/inc/ajax.php",
						type: 'GET',
						data: 'm=' + searchType +
							'&sk=' + encodeURIComponent($(sfield).val()) +
							'&ck=' + $(this).attr('data-name') +
							'&q=' + $(this).attr('data-id'),
						beforeSend: function () {},
						success: function (r) {
							var rj = jQuery.parseJSON(r);

							if (rj.data.length <= 0) { return false; }

							var output = '<div class="top"><div class="image"><img src="' + rj.data[0].user.profile_picture + '" alt=""></div>' +
								'<div class="info">' +
								'<div class="name"><a href="http://www.instagram.com/' + rj.data[0].user.username + '" target="_blank">' + rj.data[0].user.full_name + '</a></div>' +
								'</div></div>' +
								'<ul class="list">';

							for (var x in rj.data) {
								output += '<li class="list-item">' +
									'<div class="image">' +
									'<a href="' + rj.data[x].link + '" class="post-link" target="_blank">' +
									'<img src="' + rj.data[x].images.standard_resolution.url + '" alt="">' +
									'</a>' +
									'</div>' +
									'</li>';
							}
							output += '</ul>';
							$('#results').removeClass('searching').html(output);

						}
					});

					return false;
				});
			}
		});
	};
	sfield.keyup(function () {
		clearTimeout(timer);
		timer = setTimeout(function() { timerFc(sfield.val()); }, 500);
	});

});