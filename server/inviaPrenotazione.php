<?php
header("Content-type: application/json; charset=utf-8");
require_once("mysqli.php");
$conn = apriConnessione("booking");

$codHotel = getValidParameter("codHotel", $conn);
$codUtente = getValidParameter("codUtente", $conn);
$dataInizio = getValidParameter("dataInizio", $conn);
$dataFine = getValidParameter("dataFine", $conn);
$nPersone = getValidParameter("nPersone", $conn);
$prezzoPerPersona = getValidParameter("prezzoPerPersona", $conn);
$tipoStanza = getValidParameter("tipoStanza", $conn);

$sql = "INSERT INTO prenotazioni 
        (id, codHotel, codUtente, dataInizio, dataFine, nPersone, prezzoPerPersona, tipoStanza)
        VALUES (NULL, '$codHotel', '$codUtente', '$dataInizio', '$dataFine', '$nPersone', '$prezzoPerPersona', '$tipoStanza')";

$data = eseguiQuery($conn, $sql);

http_response_code(200);
echo("prenotazione inviata");

$conn->close();