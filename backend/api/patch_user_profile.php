<?php
include_once '../models/user.php';
include_once '../db.php';
include_once '../helpers/token.php';
include_once '../helpers/authorize.php';
include_once '../helpers/405_error.php';

if ($_SERVER['REQUEST_METHOD'] == 'PATCH') {
  $user_id = (int) authorize();
  if ($user_id) {
    $db = new Database();
    $conn = $db->connect();

    $data = json_decode(file_get_contents("php://input"));
    // echo json_encode($data);
    // return;
    // $query = "SELECT * FROM `users` WHERE `id`= :id";
    // $stmnt = $conn->prepare($query);
    // $stmnt->bindParam(':id', $user_id);
    // $stmnt->execute();

    // http_response_code(200);
    // echo json_encode($stmnt->fetch(PDO::FETCH_OBJ));
    $insert_query = "UPDATE `users`
                SET
                  `firstname` = :firstname,
                  `lastname` = :lastname
                WHERE
                  `id`= :id";
    $stmnt = $conn->prepare($insert_query);
    $stmnt->bindParam(':id', $user_id);
    $stmnt->bindParam(':firstname', $data->firstname);
    $stmnt->bindParam(':lastname', $data->lastname);
    $stmnt->execute();
    http_response_code(200);
    echo json_encode($data);
  }
} else {
  // sendError();
}
