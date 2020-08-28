<?php
include_once '../models/user.php';
include_once '../db.php';

$data = json_decode(file_get_contents("php://input"));
$db = new Database();
$conn = $db->connect();

$user = new User($conn, $data->email);
if ($user->getUser($boolean = true) &&   $user->checkPassword($data->password)) {
  http_response_code(200);
  $publicKey = '';
  $iat = time();
  $payload = array(
    'iss' => 'localhost:4000',
    'aud' => 'localhost:4200',
    'iat' => $iat,
    'nbf' => $iat + 10,
    'exp' => $iat + 30,
    'data' => array(
      'user' => $user->getUser()
    )
  );
  $jwt = '';
  echo json_encode((array('message' => "User was created!", 'data' => array('jwt' => $jwt, 'publicKey' => $publicKey, 'user' => $user->getUser()), 'error' => false)));
  return true;
}

if ($user->getUser($boolean = true)) {
  http_response_code(400);
  echo json_encode(array('message' => 'User already exists!', 'error' => true));
  return false;
}


if (
  !empty($user->firstname)
  &&
  !empty($user->lastname)
  &&
  !empty($user->email)
  &&
  $user->create()
) {
  http_response_code(201);
  $new_user = $user->getUser();
  echo json_encode((array('message' => "User was created!", 'user' => $new_user, 'error' => false)));
  return true;
} else {
  http_response_code(400);
  echo json_encode(array('message' => 'Unable to create user!', 'error' => true));
  return false;
}
