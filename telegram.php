<?php
// error_reporting(0);
/* https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXXXX/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */


$_POST = json_decode(file_get_contents("php://input"), true);


$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];

$token = "2002947867:AAEaovKD_1FRGLn6LvffSw1uqGa-RxwNcIA";
$chat_id = "-723495742";
$to      = 'olya.bogoslovskaya@gmail.com';
$d = new DateTime('now');
$d->setTimezone(new DateTimeZone('Europe/Moscow'));

$arr = array(
  'Имя: ' => $name,
  'Телефон: ' => $phone,
  'Email' => $email,
  
  'Дата и время отправки формы' => $d->format('d-m-Y H:i:s')
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."\n";
  $mailMessage .= $key." ".$value."\n";
};

$subject = 'ataraxia. Заявка от '. $name;
$message = $mailMessage;
$headers = 
[
    'From' => 'Ataraxia',
    'Reply-To' => 'olya.bogoslovskaya@gmail.com',
    'X-Mailer' => 'PHP/' . phpversion()
];

mail($to, $subject, $message, $headers);

$txt=urlencode($txt);
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");


if ($sendToTelegram) {
  
  header("location:".$_SERVER['HTTP_REFERER']);
} else {
  echo "Error";
}
?>
