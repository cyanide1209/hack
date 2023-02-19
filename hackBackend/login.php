<?php
    $servername = "db";
    $database = "data";
    $username = "root";
    $password = "password";
    $port = "3306";

    $conn = new mysqli($servername, $username, $password,$database,$port);
    if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);
?>