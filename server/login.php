<?php
header("Content-type: application/json; charset=utf-8");
require_once("mysqli.php");
$conn = apriConnessione();

$username = getValidParameter("username", $conn);
$password = getValidParameter("password", $conn);

// La condizione del WHERE è case insensitive, quindi non la applichiamo alla password
$sql = "SELECT *
        FROM utenti
        WHERE username = '$username'";
$data = eseguiQuery($conn, $sql);
if (count($data) == 0) {
    http_response_code(401);
    die("username non valido");
} else if ($data[0]["psw"] != $password) { // Il controllo fatto da codice è case sensitive
    http_response_code(401);
    die("password non valida");
} else {
    createSession();
    $_SESSION["codUtente"] = $data[0]["codUtente"];
}

http_response_code(200);
echo (json_encode($data));

$conn->close();