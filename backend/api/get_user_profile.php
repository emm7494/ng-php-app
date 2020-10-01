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

    $query = "SELECT * FROM `users` WHERE `id`= :id";
    $stmnt = $conn->prepare($query);
    $stmnt->bindParam(':id', $user_id);
    $stmnt->execute();

    http_response_code(200);
    echo json_encode($stmnt->fetch(PDO::FETCH_OBJ));
  }
} else {
  // sendError();
}
