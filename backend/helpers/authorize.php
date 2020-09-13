<?php

function authorize()
{
  if (isset($_SERVER['HTTP_AUTHORIZATION']) && preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
    $jwt = $matches[1];
    try {
      $decoded = Token::decodeJWT($jwt);
      http_response_code(200);
      return $decoded->data->user_id;
    } catch (UnexpectedValueException $e) {
      http_response_code(401);
      echo json_encode(array(
        'message' => 'Invalid login token!',
        'error' => true
      ));
      return false;
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
