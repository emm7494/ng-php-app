<?php
// global $conn;
// // $sql = "SELECT * FROM `products` WHERE 1";
// // $result = $conn->query($sql);
// // exit(json_encode($result->fetchall(PDO::FETCH_ASSOC)))
// // print_r($_GET['id']);
// // print_r($_REQUEST);
// // print_r($_SERVER);
// // var_dump($_GET);
// $sql = "DELETE FROM `cart` WHERE `item`={$_GET['id']}";
// $result = $conn->exec($sql);

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
