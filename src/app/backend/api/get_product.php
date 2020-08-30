<?php
include_once '../models/product.php';
include_once '../db.php';
include_once '../helpers/405_error.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  if (isset($_GET['id'])) {
    $db = new Database();
    $conn = $db->connect();
    $product = new Product($conn);
    $product->id = $_GET['id'];
    echo json_encode($product->getProduct($boolean = false, $byId = true));
  }
} else {
  sendError();
}
