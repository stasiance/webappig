<?php

include __DIR__ . "/db.php";

$access_token = '1120907162.52fc381.a9d3c8eb44b34c04adbcc34cdc2a03d9';

// Insert into Database for Search Log
$mode = array('searchTag', 'searchUser', 'searchLocation');
if(in_array($_REQUEST['m'], $mode)) {
    $sql = 'INSERT INTO search (search_keyword, click_keyword) VALUES ("' . $_REQUEST['q'] . '", "' . $_REQUEST['q'] . '")';
    go_mysql($sql);
}

switch ($_REQUEST['m']) {
    case 'search':
        $url = 'https://www.instagram.com/web/search/topsearch/?context=blended&query=' . rawurlencode($_REQUEST['q']) . '&callback=callback';
        $result = file_get_contents($url);
        echo $result;
        break;

    case 'searchTag':
        $url = 'https://api.instagram.com/v1/tags/' . $_REQUEST['q'] . '/media/recent?access_token=' . $access_token;
        $result = file_get_contents($url);
        echo $result;
        break;

    case 'searchUser':
        $url = 'https://api.instagram.com/v1/users/' . $_REQUEST['q'] . '/media/recent/?access_token=' . $access_token;
        $result = file_get_contents($url);
        echo $result;
        break;
	
	case 'searchLocation':
		$url = 'https://api.instagram.com/v1/locations/' . $_REQUEST['q'] . '/media/recent/?access_token=' . $access_token;
		$result = file_get_contents($url);
		echo $result;
		break;

    default:
        break;
}
