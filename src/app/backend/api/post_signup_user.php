<?php
include_once '../models/user.php';
include_once '../db.php';
include_once '../helpers/405_error.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $data = json_decode(file_get_contents("php://input"));
  $db = new Database();
  $conn = $db->connect();

  $user = new User($conn, $data->email, $data->firstname, $data->lastname);

  $user->setPassword($data->password);

  if ($user->getUser($boolean = true)) {
    http_response_code(400);
    echo json_encode(array('message' => 'User already exists!', 'error' => true));
    return false;
  }


  if ($user->create()) {
    http_response_code(201);
    echo json_encode((array('message' => "User was created!", 'data' => array('user' => $user->getUser()), 'error' => false)));
    return true;
  } else {
    http_response_code(400);
    echo json_encode(array('message' => 'Unable to create user!', 'error' => true));
    return false;
  }
} else {
  sendError();
}
