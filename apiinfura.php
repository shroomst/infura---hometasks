<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Infura API</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <br><br><br><br>
  <form name="form1" id="mainForm" method="post" enctype="multipart/form-data" action="">
		<input name="val" type="text" placeholder="Введите кошелек" style="width:350px">	
		<input name="submit" type="submit" value="Check Balance"> 
    <input name="methods" type="submit" value="List Allowed Methods"> 
	</form>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>

<?php

if (isset($_POST['methods'])) {

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://api.infura.io/v1/jsonrpc/ropsten/methods");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

/*curl_setopt($ch, CURLOPT_POST, TRUE);

curl_setopt($ch, CURLOPT_POSTFIELDS, "{
  \"jsonrpc\": \"2.0\",
  \"id\": -29846618,
  \"method\": \"eth_getBalance\",
  \"params\": [$val, \"latest\"]
}");*/

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Content-Type: application/json",
  "Accept: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

echo "Allowed Methods: <pre>";
var_dump($response);
echo "</pre>";
}

if (isset($_POST['submit'])) {
  $val = trim($_POST['val']);
  echo "Checking $val</br>";
  $ch = curl_init();

  $json = array($val, "latest");

  curl_setopt($ch, CURLOPT_URL, "https://api.infura.io/v1/jsonrpc/ropsten/eth_getBalance?params=".json_encode($json));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  curl_setopt($ch, CURLOPT_HEADER, FALSE);

  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Content-Type: application/json",
  "Accept: application/json"
));

  $response = curl_exec($ch);
  curl_close($ch);

  $result = json_decode($response, true);
  if (isset($result['result']))
    echo "Баланс: ". hexdec($result['result']). " wei";
  else 
    echo "Неверный кошелек";

}
?>
  </body>
</html>