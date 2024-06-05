<?php
header("Content-type: application/json; charset=utf-8");
require_once("mysqli.php");
$conn = apriConnessione("booking");

$codHotel = getValidParameter("codHotel", $conn);
$codUtente = getValidParameter("codUtente", $conn);
$stelle = getValidParameter("stelle", $conn);
$testoRecensione= getValidParameter("testoRecensione", $conn);
$data = getValidParameter("data", $conn);


$sql = "INSERT INTO recensioni
        (id, codHotel, codUtente, stelle, testoRecensione, data)
        VALUES (NULL, $codHotel, $codUtente, $stelle, '$testoRecensione', '$data')";

$data = eseguiQuery($conn, $sql);

http_response_code(200);
echo("prenotazione inviata");

$conn->close();