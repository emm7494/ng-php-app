<?php
include_once '../models/user.php';
include_once '../db.php';
include_once '../helpers/token.php';
include_once '../helpers/405_error.php';

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
      'nbf' => $iat + 0,
      'exp' => $iat + 120,
      'data' => array(
        'user_id' => $user->getUser()->id
      )
    );
    $jwt = Token::encodePayload($payload);
    http_response_code(200);
    echo json_encode(
      array(
        'message' => "Login successful!",
        'data' => array(
          'payload' => $payload,
          'user' => $user->getUser(),
          'jwt' => $jwt,
          'publicKey' => 'Token::getPublicKey()',
        ),
        'error' => false
      )
    );
    return true;
  }

  http_response_code(400);
  echo json_encode(array('message' => 'Invalid credentials. Login failed!', 'error' => true));
  return false;
} else {
  sendError();
}
