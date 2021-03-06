<?php
// ini_set('memory_limit', '512M');
ini_set('display_errors', 'On');
ini_set('display_startup_errors', 'On');
ini_set('track_errors', 'On');
ini_set('xmlrpc_errors', 'On');
putenv('mouse=99');

define("DB_ENGINE", 'mysql');
define("DB_HOST", "localhost:3306");
define("DB_USER", "root");
define("DB_PASS", "password");
define("DB_NAME", "shop");
define("DB_CHARSET", 'utf8');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
