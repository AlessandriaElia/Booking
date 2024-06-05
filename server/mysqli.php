<?php
define("SCADENZA", 300);

function apriConnessione($DBName)
{
    define("DB_HOST", "localhost");
    define("DB_USER", "root");
    define("DB_PASS", "");
    define("DB_NAME", "4b_$DBName");

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    try {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        $conn->set_charset("utf8");
        return $conn;
    } catch (mysqli_sql_exception $ex) {
        http_response_code(503);
        die("Errore connessione al Data Base\n" . $ex->getMessage());
    }
}

function eseguiQuery($conn, $sql)
{
    try {
        $rs = $conn->query($sql);
        if (!is_bool($rs)) {
            //Questa riga partendo da $rs restituisce un vettore enumerativo di JSON
            $data = $rs->fetch_all(MYSQLI_ASSOC);
        } else {
            $data = $rs;
        }
        return $data;
    } catch (mysqli_sql_exception $ex) {
        $conn->close();
        http_response_code(500);
        die("Errore esecuzione query\n" . $ex->getMessage());
    }
}

function getValidParameter($parameter, $conn = null)
{
    if (isset($_REQUEST[$parameter]) && $_REQUEST[$parameter] != null) {
        return $_REQUEST[$parameter];
    } else {
        http_response_code(400);
        if($conn) {
            $conn->close();
        }
        die("Missing parameter: $parameter");
    }
}

function checkSession() {
    // Se il session id ricevuto tramite cookie esiste viene agganciato, altrimenti viene creato
    session_start();
    if (!isset($_SESSION["scadenza"]) || time() > $_SESSION["scadenza"]) {
        session_unset(); // Rimuove tutte le variabili di sessione
        session_destroy();
        http_response_code(403);
        die("Expired session");
    }
    $_SESSION["scadenza"] = time() + SCADENZA;
    setcookie(session_name(), session_id(), $_SESSION["scadenza"], "/");
}

function createSession() {
    session_start();
    $_SESSION["scadenza"] = time() + SCADENZA;
    setcookie(session_name(), session_id(), $_SESSION["scadenza"], "/");
}