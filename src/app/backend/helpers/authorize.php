<?php

function authorize()
{
  if (isset($_SERVER['HTTP_AUTHORIZATION']) && preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
    $jwt = $matches[1];
    try {
      $decoded = Token::decodeJWT($jwt);
      http_response_code(200);
      echo json_encode($decoded);
      return true;
    } catch (Exception $e) {
      http_response_code(401);
      echo json_encode(array(
        'message' => $e->getMessage(),
        'error' => true
      ));
      return false;
    }
  }
  http_response_code(401);
  echo json_encode(array('message' => 'Please authenticate!', 'error' => true));
  return false;
}
