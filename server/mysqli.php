<?php

$SCADENZA = 300;

function apriConnessione($DBName) {
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

function eseguiQuery($conn, $sql) {
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

function getValidParameter($parameter, $conn) {
    if(isset($_REQUEST[$parameter]) && $_REQUEST[$parameter] != null) {
        return $_REQUEST[$parameter];
    }
    else{
        http_response_code(400);
        $conn->close();
        die("Missing parameter: $parameter");
    }
}