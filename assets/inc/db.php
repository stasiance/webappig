<?php
function go_mysql($query) {
    global $db;

    if (!$db) {
        $host = $_SERVER['HTTP_HOST'];
        if($host === 'localhost') {
            $db = @mysql_connect("localhost", "root", "") or die(mysql_error());
            @mysql_select_db("appig") or die(mysql_error());
        }
        else {
            $db = @mysql_connect("ap-cdbr-azure-southeast-b.cloudapp.net", "be7a756e526e2a", "eb0e82fa") or die(mysql_error());
            @mysql_select_db("database_appig") or die(mysql_error());
        }
        @mysql_query("SET NAMES 'utf8'");
        @mysql_query("set character_set_client='utf8'");
        @mysql_query("set character_set_results='utf8'");
        @mysql_query("set collation_connection='utf8'");
    }

    $result = @mysql_query($query);
    if ($result) {
        return $result;
    }
    else {
        echo "Database Error: " . mysql_error()."<br><b>$query</b>";
        die();
    }
}