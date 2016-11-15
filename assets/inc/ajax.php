<?php
header('Content-type: application/json');

$access_token = "1120907162.52fc381.a9d3c8eb44b34c04adbcc34cdc2a03d9";
$query = $_POST['q'];
//$api = "https://api.instagram.com/v1/tags/".$query."/media/recent?access_token=".$access_token;
$api = "https://instagram.com/web/search/topsearch/?query=" . $query;


$response = file_get_contents($api);

//$response = get_curl($api);

echo '<pre>';
print_r($response);
exit;


$images = array();

if($response){
    foreach(json_decode($response)->data as $item){
        $src = $item->images->standard_resolution->url;
        $thumb = $item->images->thumbnail->url;
        $url = $item->link;

        $images[] = array(
            "src" => htmlspecialchars($src),
            "thumb" => htmlspecialchars($thumb),
            "url" => htmlspecialchars($url)
        );

    }
}
print_r(str_replace('\\/', '/', json_encode($images)));
die();


function get_curl($url) {
    if(function_exists('curl_init')) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $output = curl_exec($ch);
        echo curl_error($ch);
        curl_close($ch);
        return $output;
    } else{
        return file_get_contents($url);
    }
}