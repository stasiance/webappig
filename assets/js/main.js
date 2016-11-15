$(document).ready(function () {
    var sfield = $("#search-input");
    var container = $("#results");
	
	$('.results-preview').bind('focusout', function(e) {
		$(this).removeClass('show');
	});
    $(sfield).keyup(function () {
        $.ajax({
            url: "https://instagram.com/web/search/topsearch/?query=" + $(sfield).val(),
            //url: "https://api.instagram.com/v1/tags/search?q=" + $(sfield).val() + "&access_token=1120907162.52fc381.a9d3c8eb44b34c04adbcc34cdc2a03d9",
            //url: "https://api.instagram.com/v1/tags/" + $(sfield).val() + "/media/recent?access_token=1120907162.52fc381.a9d3c8eb44b34c04adbcc34cdc2a03d9",
            //url: "https://api.instagram.com/v1/tags/" + $(sfield).val() + "?access_token=1120907162.52fc381.a9d3c8eb44b34c04adbcc34cdc2a03d9",
            dataType: 'jsonp',
            jsonpCallback: 'callback',
            type: 'GET',
            beforeSend: function () {},
            success: function (r) {
                console.log(r);
            }
        });
    })
});