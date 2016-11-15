<?php
switch ($_POST['m']) {
    case 'search':
        $url = 'https://www.instagram.com/web/search/topsearch/?query=' . $_POST['q'] . '&callback=callback';
        $result = file_get_contents($url);
        echo $result;
        break;
}
