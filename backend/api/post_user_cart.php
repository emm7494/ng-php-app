<?php

include_once '../models/user.php';
include_once '../db.php';
include_once '../helpers/token.php';
include_once '../helpers/authorize.php';
include_once '../helpers/405_error.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $user_id = (int) authorize();
  if ($user_id) {
    $data = json_decode(file_get_contents("php://input"));
    $db = new Database();
    $conn = $db->connect();
    foreach ($data->cart as $item) {
      $select_query = "SELECT *
              FROM `cart`
              WHERE `user_id`= :user_id AND `product_id` = :product_id";
      $stmnt = $conn->prepare($select_query);
      $stmnt->bindParam(':user_id', $user_id);
      $stmnt->bindParam(':product_id', $item->product_id);
      $stmnt->execute();

      if ($stmnt->rowCount()) {
        $update_query = "UPDATE `cart`
                SET
                  quantity = :quantity
                WHERE `user_id`= :user_id AND `product_id` = :product_id
               ";
        $stmnt = $conn->prepare($update_query);
        $stmnt->bindParam(':user_id', $user_id);
        $stmnt->bindParam(':product_id', $item->product_id);
        $stmnt->bindParam(':quantity', $item->quantity);
        $stmnt->execute();
      } else {

        $insert_query = "INSERT INTO `cart`
                SET
                  user_id = :user_id,
                  product_id = :product_id,
                 quantity = :quantity
                ";
        $stmnt = $conn->prepare($insert_query);
        $stmnt->bindParam(':user_id', $user_id);
        $stmnt->bindParam(':product_id', $item->product_id);
        $stmnt->bindParam(':quantity', $item->quantity);
        $stmnt->execute();
      }
    }
    http_response_code(200);
    echo json_encode($data->cart);
    return true;
  }
  return false;
} else {
  // sendError();
}
