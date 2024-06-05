<?php

header("Content-type: application/json; charset=utf-8");
require_once("../server/mysqli.php");
$conn = apriConnessione("booking");

$username = getValidParameter("username", $conn);
$password = getValidParameter("password", $conn);

// Debug: stampa nome utente e password
error_log("Username: " . $username);
error_log("Password: " . $password);

// La condizione del WHERE è case insensitive, quindi non la applichiamo alla password
$sql = "SELECT * FROM utenti WHERE username = '$username'";
$data = eseguiQuery($conn, $sql);

if (count($data) == 0) {
    http_response_code(401);
    die("username non valido");
} else if ($data[0]["psw"] !== md5($password)) { 
    error_log("Password dal DB: " . $data[0]["psw"]);
    error_log("Password inserita (hashed): " . md5($password));

    http_response_code(401);
    die("password non valida");
}
http_response_code(200);
echo (json_encode($data[0])); // Restituisce solo il primo risultato

$conn->close();
?>