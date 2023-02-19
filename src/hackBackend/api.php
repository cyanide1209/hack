<?php


if($_SERVER['REQUEST_METHOD'] == 'GET'){
    echo json_encode(); 
}else{
   http_response_code(405);
   echo json_encode(array('error' => 'Method not allowed'));
}
?>