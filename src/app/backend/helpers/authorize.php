<?php

function authorize()
{
  if (isset($_SERVER['HTTP_AUTHORIZATION']) && preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
    $jwt = $matches[1];
  }
  try {
    $decoded = Token::decodeJWT($jwt);
    echo json_encode($decoded);
  } catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
      'message' => $e->getMessage(),
      'error' => true
    ));
  }
}
