<?php

include_once '../models/user.php';
include_once '../db.php';
include_once '../helpers/token.php';
include_once '../helpers/authorize.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  authorize();
}
