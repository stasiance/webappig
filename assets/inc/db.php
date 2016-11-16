<?php
function go_mysql($query) {
    global $db;

    if (!$db) {
        $db = mysql_connect("localhost", "root", "") or die(mysql_error());
        mysql_select_db("appig") or die(mysql_error());
        mysql_query("SET NAMES 'utf8'");
        mysql_query("set character_set_client='utf8'");
        mysql_query("set character_set_results='utf8'");
        mysql_query("set collation_connection='utf8'");
    }

    $result = mysql_query($query);
    if ($result) {
        return $result;
    }
    else {
        echo "Database Error: " . mysql_error()."<br><b>$query</b>";
        die();
    }
}