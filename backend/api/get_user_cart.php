<?php

include_once '../models/user.php';
include_once '../db.php';
include_once '../helpers/token.php';
include_once '../helpers/authorize.php';
include_once '../helpers/405_error.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $user_id = (int) authorize();
  if ($user_id) {
    $db = new Database();
    $conn = $db->connect();

    // $query = "SELECT * FROM `products` WHERE `id` IN (
    //   SELECT `product_id` FROM `cart` WHERE `user_id`= :user_id)";
    $query = "SELECT * FROM `cart` WHERE `user_id`= :user_id AND `product_id`= :product_id";
    $stmnt = $conn->prepare($query);
    $stmnt->bindParam(':user_id', $user_id);
    $stmnt->bindParam(':product_id', $_GET['product_id']);
    $stmnt->execute();

    http_response_code(200);
    echo json_encode($stmnt->fetchall(PDO::FETCH_OBJ));
  }
  return true;
} else {
  // sendError();
}
