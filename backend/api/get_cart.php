<?php global $conn; ?>
<?php $sql = "SELECT * FROM `products` WHERE `id` IN (SELECT `item` FROM `cart`)"; ?>
<?php $result = $conn->query($sql); ?>
<?php exit(json_encode($result->fetchall(PDO::FETCH_ASSOC))) ?>