<?php

include_once '../models/user.php';
include_once '../db.php';
include_once '../helpers/token.php';
include_once '../helpers/authorize.php';
include_once '../helpers/405_error.php';

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
  $user_id = (int) authorize();
  if ($user_id) {
    $query = "DELETE FROM `cart` WHERE `user_id`={$user_id} AND `product_id`={$_GET['product_id']}";
    $stmnt = $conn->exec($query);
    http_response_code(200);
    echo json_encode($_GET['product_id']);
  }
} else {
  // sendError();
}
