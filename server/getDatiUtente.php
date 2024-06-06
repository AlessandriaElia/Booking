<?php
header("Content-type: application/json; charset=utf-8");
require_once("mysqli.php");

checkSession();
if(!isset($_SESSION["codUtente"])) {
    http_response_code(403);
    die("Inexisting session");
}

$conn = apriConnessione("booking");

$codUtente = $_SESSION["codUtente"];

$sql = "SELECT *
        FROM utenti
        where codUtente = $codUtente";
$data = eseguiQuery($conn, $sql);


$response = array("user"=>$data[0]["username"],
"img" => $data[0]["imgProfilo"]
);

http_response_code(200);
echo (json_encode($response));


$conn->close();