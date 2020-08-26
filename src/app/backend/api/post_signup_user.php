<?php
include_once '../models/user.php';
include_once '../db.php';

$data = json_decode(file_get_contents("php://input"));
$db = new Database();
$conn = $db->connect();

$user = new User($conn);
$user->firstname = $data->firstname;
$user->lastname = $data->lastname;
$user->email = $data->email;
$user->setPassword($data->password);

if (
  !empty($user->firstname)
  &&
  !empty($user->lastname)
  &&
  !empty($user->email)
  &&
  $user->create()
) {
  http_response_code(200);
  $new_user = $user->getUser();
  echo json_encode((array('message' => "User was created!", 'user' => $new_user, 'error' => false)));
} else {
  http_response_code(400);
  echo json_encode(array('message' => 'Unable to create user!', 'error' => true));
}
