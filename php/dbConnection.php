<?php

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "projetoPHP";

    // Create connection
    function getDatabaseConnection() {
        global $servername, $username, $password, $dbname;
        $dbConn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $dbConn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
        return $dbConn;
    }

?>