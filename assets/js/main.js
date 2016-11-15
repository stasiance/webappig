$(document).ready(function () {
    var sfield = $("#search-input");
    var formCnt = $("#search-form");
    var resultCnt = $(".results-preview");

    $(sfield).keyup(function () {
        $.ajax({
            url: "/assets/inc/ajax.php",

            //url: "https://www.instagram.com/web/search/topsearch/?query=" + $(sfield).val(),
            //url: "https://api.instagram.com/v1/tags/search?q=" + $(sfield).val() + "&access_token=1120907162.52fc381.a9d3c8eb44b34c04adbcc34cdc2a03d9",
            //url: "https://api.instagram.com/v1/tags/" + $(sfield).val() + "/media/recent?access_token=1120907162.52fc381.a9d3c8eb44b34c04adbcc34cdc2a03d9",
            //url: "https://api.instagram.com/v1/tags/" + $(sfield).val() + "?access_token=1120907162.52fc381.a9d3c8eb44b34c04adbcc34cdc2a03d9",


            type: 'POST',
            data: 'm=search&q=' + $(sfield).val(),
            beforeSend: function () {
                $(formCnt).addClass('searching');
            },
            success: function (r) {
                $(formCnt).removeClass('searching');
                $(resultCnt).addClass('show');
                console.log( r );
            }
        });
    })
});