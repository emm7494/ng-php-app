
<?php global $conn; ?>
<?php $sql = "SELECT * FROM `products` WHERE id={$_GET['product-id']}"; ?>
<?php $result = $conn->query($sql); ?>
<?php exit(json_encode($result->fetch(PDO::FETCH_ASSOC))) ?>