<?php
header("Content-type: application/json; charset=utf-8");
require_once("mysqli.php");
$conn = apriConnessione("booking");

$username = getValidParameter("username", $conn);
$psw = getValidParameter("psw", $conn);
$imgProfilo = getValidParameter("imgProfilo", $conn);
$citta= getValidParameter("citta", $conn);


$sql = "INSERT INTO utenti
        (username, psw, imgProfilo, citta)
        VALUES ('$username', '$psw', '$imgProfilo', '$citta')";

$data = eseguiQuery($conn, $sql);

http_response_code(200);
echo("Registrazione effettuata");

$conn->close();