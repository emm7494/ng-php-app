<?php
include_once '../models/user.php';
include_once '../db.php';
include_once '../helpers/token.php';
include_once '../helpers/authorize.php';
include_once '../helpers/405_error.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $user_id = (int) authorize();
  if ($user_id) {
    echo json_encode($user_id);
  }
} else {
  // sendError();
}
