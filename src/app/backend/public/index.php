<?php
// Init
require_once '../config.php';
require_once '../db.php';
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$db = new Database();
$conn = $db->connect();

if ('/api/get_products' === $uri) {
  require_once '../api/get_products.php';
} elseif ('/api/get_product' === $uri) {
  require_once '../api/get_product.php';
} elseif ('/api/get_cart' === $uri) {
  require_once '../api/get_cart.php';
} elseif ('/api/set_cart' === $uri) {
  require_once '../api/set_cart.php';
} elseif ('/api/del_cart' === $uri) {
  require_once '../api/del_cart.php';
} elseif ('/api/post_signup_user' === $uri) {
  require_once '../api/post_signup_user.php';
} elseif ('/api/post_login_user' === $uri) {
  require_once '../api/post_login_user.php';
} elseif ('/api/post_logout_user' === $uri) {
  require_once '../api/post_logout_user.php';
} elseif ('/api/get_user_profile' === $uri) {
  require_once '../api/get_user_profile.php';
} else {
  header('HTTP/1.1 404 Not Found');
}

$conn = null;
