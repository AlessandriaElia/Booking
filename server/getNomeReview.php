<?php
header("Content-type: application/json; charset=utf-8");
require_once("mysqli.php");
$conn = apriConnessione("booking");

$codUtente = getValidParameter("codUtente", $conn);

$sql = "SELECT *
        FROM utenti
        WHERE codUtente = $codUtente";
$data = eseguiQuery($conn, $sql);

http_response_code(200);
echo (json_encode($data));

$conn->close();