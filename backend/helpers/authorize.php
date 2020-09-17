<?php

function authorize()
{
  if (isset($_SERVER['HTTP_AUTHORIZATION']) && preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
    $jwt = $matches[1];
    try {
      Token::decodeJWT($jwt);
      // return $decoded->data->user_id;
      return true;
    } catch (UnexpectedValueException $e) {
      return false;
    } catch (Exception $e) {
      // echo json_encode(array(
      //   'message' => $e->getMessage(),
      //   'error' => true
      // ));
      return false;
    }
  }
  return false;
}
