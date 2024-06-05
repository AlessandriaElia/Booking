<?php
header("Content-type: application/json; charset=utf-8");
require_once("mysqli.php");

// Se il session id ricevuto tramite cookie esiste viene agganciato, altrimenti viene creato
session_start();
if(!isset($_SESSION["cCorrentista"])) {
    http_response_code(403);
    die("Sessione inesistente");
}
else if(!isset($_SESSION["scadenza"]) || time() > $_SESSION["scadenza"]) {
    session_unset(); // Rimuove tutte le variabili di sessione
    session_destroy();
    http_response_code(403);
    die("Sessione scaduta");
}
$_SESSION["scadenza"] = time() + $SCADENZA;
setcookie(session_name(), session_id(), $_SESSION["scadenza"], "/");

$conn = apriConnessione("booking");

$sql = "SELECT *
        FROM correntisti
        WHERE cCorrentista = $cCorrentista";
$correntista = eseguiQuery($conn, $sql);

$response = array("user"=>$correntista[0]["NomeCognome"], "filiali"=>$data);

http_response_code(200);
echo (json_encode($response));

$conn->close();

?>