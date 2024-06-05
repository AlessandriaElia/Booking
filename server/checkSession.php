<?php
header("Content-type: application/json; charset=utf-8");
require_once("mysqli.php");

checkSession();
if(!isset($_SESSION["codUtente"])) {
    http_response_code(403);
    die("Inexisting session");

}
echo("sessione avviata");