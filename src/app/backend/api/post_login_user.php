<?php
include_once '../models/user.php';
include_once '../db.php';
include_once '../helpers/token.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $data = json_decode(file_get_contents("php://input"));
  $db = new Database();
  $conn = $db->connect();

  $user = new User($conn, $data->email);

  if ($user->getUser($boolean = true) &&   $user->checkPassword($data->password)) {
    http_response_code(200);

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
    $jwt = Token::encodePayload($payload);
    echo json_encode(array('message' => "Login successful!", 'data' => array('jwt' => $jwt, 'publicKey' => 'Token::getPublicKey()', 'user' => $user->getUser()), 'error' => false));
    return true;
  }

  http_response_code(400);
  echo json_encode(array('message' => 'Invalid credentials. Login failed!', 'error' => true));
  return false;
}
