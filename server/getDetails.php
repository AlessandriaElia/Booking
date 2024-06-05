<?php
header("Content-type: application/json; charset=utf-8");
require_once("mysqli.php");
$conn = apriConnessione("booking");

$codHotel = getValidParameter("codHotel", $conn);

$sql = "SELECT * 
        FROM hotel
        WHERE codHotel = '$codHotel'";
$data = eseguiQuery($conn, $sql);

http_response_code(200);
echo (json_encode($data));

$conn->close();