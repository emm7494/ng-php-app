<?php
include_once '../models/user.php';
include_once '../db.php';
include_once '../helpers/token.php';
// $payload = array(
//   "iss" => "example.org",
//   "aud" => "example.com",
//   "iat" => 1356999524,
//   "nbf" => 1357000000
// );
// $jwt = Token::encodePayload($payload);
// echo "Encode:\n" . print_r($jwt, true) . "\n";

// $decoded = Token::decodeJWT($jwt);

// $decoded_array = (array) $decoded;
// echo "Decode:\n" . print_r($decoded_array, true) . "\n";
// return;
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
    // 'nbf' => $iat + 10,
    'exp' => $iat + 30,
    'data' => array(
      'user' => $user->getUser()
    )
  );
  $jwt = Token::encodePayload($payload);
  // echo "Encode:\n" . print_r($jwt, true) . "\n";

  $decoded = Token::decodeJWT($jwt);

  // $decoded_array = (array) $decoded;
  // echo "Decode:\n" . print_r($decoded_array, true) . "\n";
  // echo json_encode(array('message' => "User was created!", 'data' => array('jwt' => $jwt, 'publicKey' => Token::getPublicKey(), 'user' => $user->getUser()), 'error' => false));
  echo json_encode(array('message' => "Login successful!", 'data' => array('jwt' => $jwt, 'publicKey' => 'Token::getPublicKey()', 'user' => $user->getUser()), 'error' => false));
  // echo json_encode(Token::getPublicKey());
  return true;
}

http_response_code(400);
echo json_encode(array('message' => 'Invalid credentials. Login failed!', 'error' => true));
return false;
