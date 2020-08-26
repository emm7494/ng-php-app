<?php
$_POST = json_decode(file_get_contents('php://input'));
echo json_encode($_POST);
