<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

use PHPMailer\PHPMailer\PHPMailer;

require './library/phpmailer/src/PHPMailer.php';
require './library/phpmailer/src/Exception.php';
require './library/phpmailer/src/SMTP.php';

$mail = new PHPMailer(true);
$mail->IsSMTP();
$mail->Host = "smtp.mail.ru";
$mail->SMTPAuth = true;
$mail->Port = 465;
$mail->Username = "akitainu99@mail.ru";
$mail->Password = "10203040!";
$mail->SMTPSecure = 'ssl';
$mail->CharSet = 'UTF-8';
$mail->setFrom('akitainu99@mail.ru');
$mail->isHTML(true);
$mail->addAddress('akitainu99@mail.ru');
$mail->Subject = 'Notification';
$mail->Body = 'Name: ' . $_POST['name'] . '<br>' . 'Email: ' . $_POST['email'];
$mail->send();
