$(document).ready(function () {

    var sfield = $("#search-input");
    var container = $("#results");

    $(sfield).keyup(function () {
        //console.log($('.search').val());

        // <div class="_pnwyi _jf5s3"></div>

        // $.ajax({
        //     type: "POST",
        //     url: "//api.instagram.com/v1/tags/search?access_token=646191610.e029fea.516b109430104ecca9b8287bfaea56a4&q=" + $('.search').val(),
        //     jsonp: "callback",
        //     dataType: "jsonp",
        //     success: function (result) {
        //         console.log( result );
        //     }
        // });



        $.ajax({
            type: "POST",
            url: "//instagram.com/web/search/topsearch/?query=" + $(sfield).val(),
            //url: "//api.instagram.com/v1/tags/search?access_token=646191610.e029fea.516b109430104ecca9b8287bfaea56a4&q=" + $('.search').val(),
            jsonp: "callback",
            dataType: "jsonp",
            success: function (r) {
                console.log( r );
            }
        });





    })
});





// $(document).ready(function () {
//     var sfield = $("#search-input");
//     var container = $("#results");
//     var timer;
//     /**
//      * keycode glossary
//      * 32 = SPACE
//      * 188 = COMMA
//      * 189 = DASH
//      * 190 = PERIOD
//      * 191 = BACKSLASH
//      * 13 = ENTER
//      * 219 = LEFT BRACKET
//      * 220 = FORWARD SLASH
//      * 221 = RIGHT BRACKET
//      */
//     $(sfield).keydown(function(e){
//         if(e.keyCode == '32' || e.keyCode == '188' || e.keyCode == '189' || e.keyCode == '13' || e.keyCode == '190' || e.keyCode == '219' || e.keyCode == '221' || e.keyCode == '191' || e.keyCode == '220') {
//             e.preventDefault();
//         } else {
//             clearTimeout(timer);
//
//             timer = setTimeout(function() {
//                 instaSearch();
//             }, 900);
//         }
//     });
//
// });
//
// function instaSearch() {
//     var sfield = $("#search-input");
//     var container = $("#results");
//     $(sfield).addClass("loading");
//     $(container).empty();
//     var q = $(sfield).val();
//
//     $.ajax({
//         type: 'POST',
//         // url: '/assets/inc/ajax.php',
//         url: "//instagram.com/web/search/topsearch/",
//         data: "query="+q,
//         jsonp: "callback",
//         dataType: "jsonp",
//         success: function(data){
//             $(sfield).removeClass("loading");
//
//
//             console.log( data );
//
//             // $.each(data, function(i, item) {
//             //     var ncode = '<div class="p"><a rel="external" href="'+data[i].src+'" class="fullsize" target="_blank"><img src="img/full-image.png" alt="fullsize"></a> <a rel="external" href="'+data[i].url+'" target="_blank"><img src="'+data[i].thumb+'"></a></div>';
//             //     $(container).append(ncode);
//             // });
//
//
//
//
//         },
//         error: function(xhr, type, exception) {
//             $(sfield).removeClass("loading");
//             $(container).html("Error: " + type);
//         }
//     });
// }