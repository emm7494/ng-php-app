<?php
// Init
require_once '../config.php';
require_once '../db.php';
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$db = new Database();
$conn = $db->connect();
if ('/api/get_products_json' === $uri) {
  require_once '../api/get_products_json.php';
} elseif ('/api/get_cart_json' === $uri) {
  require_once '../api/get_cart_json.php';
} elseif ('/api/set_cart_json' === $uri) {
  require_once '../api/set_cart_json.php';
} elseif ('/api/del_cart_json' === $uri) {
  require_once '../api/del_cart_json.php';
} else {
  header('HTTP/1.1 404 Not Found');
}

$conn = null;
