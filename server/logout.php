<?php
header("Content-type: application/json; charset=utf-8");
session_unset();
session_destroy();

http_response_code(200);
echo("OK");