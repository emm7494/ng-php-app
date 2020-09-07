<?php
include_once '../models/product.php';
include_once '../db.php';
include_once '../helpers/405_error.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $db = new Database();
  $conn = $db->connect();
  $query = "SELECT * FROM `products`";
  $stmnt = $conn->query($query);
  http_response_code(200);
  echo json_encode($stmnt->fetchall(PDO::FETCH_OBJ));
  return true;
} else {
  // sendError();
}
