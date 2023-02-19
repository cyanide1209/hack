<?php
    include_once("login.php");
    header('Access-Control-Allow-Origin: *');    
    header('Access-Control-Allow-Headers:  *');
    header('Access-Control-Allow-Methods:  *');

    $sort = "ASC";
    $left = 0;
    if(!empty($_GET["DESC"])) $sort = "DESC";
    if(!empty($_GET["PAGE"])) $left = $_GET["PAGE"];

    $que = "SELECT * FROM charityInfo 
            ORDER BY RATIO $sort
            LIMIT 100 OFFSET ".($left * 100);
    $res = $conn->query($que);
    $arr = array();
                   
    if(!empty($res) && $res->num_rows > 0){    
        while($row = $res->fetch_assoc()){   
            $arr[] = $row;                   
        }                                 
    }                                     
    $jsonArr = json_encode($arr);
    echo $jsonArr; 
?>
