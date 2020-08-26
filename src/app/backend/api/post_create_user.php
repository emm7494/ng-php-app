<?php
include_once '../models/user.php';
include_once '../db.php';

$data = json_decode(file_get_contents("php://input"));
echo json_encode($data);

// $db = new Database();
// $conn = $db->connect();

// $user = new User($conn);
// $user->firstname = $data->firstname;
// $user->lastname = $data->lastname;
// $user->email = $data->email;
// $user->setPassword($data->password);

// if (
//   !empty($user->firstname)
//   &&
//   !empty($user->lastname)
//   &&
//   !empty($user->email)
//   &&
//   $user->create()
// ) {
//   http_response_code(200);
//   echo json_encode((array('message' => 'User was created!')));
// } else {
//   http_response_code(400);
//   echo json_encode(array('message' => 'Unable to create user!'));
// }


// echo json_encode($user);
