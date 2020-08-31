<?php

include_once '../models/user.php';
include_once '../db.php';
include_once '../helpers/token.php';
include_once '../helpers/authorize.php';
include_once '../helpers/405_error.php';



if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // $user_id = (int) authorize();
  $user_id = true;
  if ($user_id) {
    http_response_code(200);
    echo json_encode(array(
      'message' => "Logout successful!", 'data' => array(
        'jwt' => null,
      ),
      'error' => false
    ));
    return true;
  }
} else {
  // sendError();
}
