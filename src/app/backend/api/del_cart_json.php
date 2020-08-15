<?php
global $conn;
// $sql = "SELECT * FROM `products` WHERE 1";
// $result = $conn->query($sql);
// exit(json_encode($result->fetchall(PDO::FETCH_ASSOC)))
// print_r($_GET['id']);
// print_r($_REQUEST);
// print_r($_SERVER);
// var_dump($_GET);
$sql = "DELETE FROM `cart` WHERE `item`={$_GET['id']}";
$result = $conn->exec($sql);
