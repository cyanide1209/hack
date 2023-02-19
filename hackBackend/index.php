<?php
    include_once("login.php");
    header('Access-Control-Allow-Origin: *');    
    header('Access-Control-Allow-Headers:  *');
    header('Access-Control-Allow-Methods:  *');

    $sort = "ASC";
    $left = 0;
    $restraint = "";
    if(!empty($_GET["DESC"])) $sort = "DESC";
    if(!empty($_GET["PAGE"])) $left = $_GET["PAGE"];
    if(!empty($_GET["SEARCH"])) $restraint = " WHERE charityName LIKE '".$_GET["SEARCH"]."%' ";
    
    $que = "SELECT * FROM charityInfo ".$restraint."
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
