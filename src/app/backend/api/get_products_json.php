
<?php global $conn; ?>
<?php $sql = "SELECT * FROM `products`"; ?>
<?php $result = $conn->query($sql); ?>
<?php exit(json_encode($result->fetchall(PDO::FETCH_ASSOC))) ?>