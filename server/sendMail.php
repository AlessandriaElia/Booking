<?php
header("content-type:application/json; charset=utf-8");
require("PHPMailer.php");
require("SMTP.php");
require("environment.php");
require_once("mysqli.php");


$indirizzoDestinatario = getValidParameter("mail");

$newPassword=rand(10000000,99999999);

$mailer= new PHPMailer\PHPMailer\PHPMailer();
//abilita protocollo smtp
$mailer->isSMTP();
//abilita visualizzazione di messaggi di stato 0 disabilita
$mailer->SMTPDebug=1;

// Accesso al server SMTP
$mailer->Host="smtp.gmail.com";
$mailer->SMTPSecure="tls";
$mailer->Port=587;
$mailer->SMTPAuth=true;
$mailer->Username=GMAIL_ADDRESS;
$mailer->Password=GMAIL_PASSWORD;

// Impotazione della mail
$mailer->setFrom("pippo@pluto.com");
$mailer->addAddress($indirizzoDestinatario);
$mailer->addCC(GMAIL_ADDRESS);

$mailer->Subject="New password";
$body = leggiFile("./message.html");
if($body != "")
	$body=str_replace("__password", $newPassword, $body);
else	
	$body = "this is your new password:<b>$newPassword</b>"; 

$mailer->isHTML(true);
$mailer->Body= $body;
$mailer->addAttachment("./qrCode.png");

// invio
if($mailer->send()) {
	http_response_code(200);	
	echo(json_encode("ok"));	
}
else{
	http_response_code(550);
	echo(json_encode("errore invio mail ". $mailer->ErrorInfo));	
}

function leggiFile($filename){
	$fh=fopen($filename, "r");
	$body="";
	if($fh){
		$body=fread($fh, filesize($filename));
		fclose($fh);
	}	
	return $body;
}
?>