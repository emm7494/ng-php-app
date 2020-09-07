<?php

class Product
{
  private $conn;
  private $table_name = "products";
  public $id;
  public $name;
  public $price;
  public $image;
  public $description;
  public $created;
  public $modified;

  public function __construct($conn, $name = null, $price = null, $image = null, $description = null)
  {
    $this->conn = $conn;
    $this->name = $name;
    $this->price = $price;
    $this->image = $image;
    $this->description = $description;
  }

  public function create()
  {
    $query = "INSERT INTO " . $this->table_name . "
    SET
      name = :name,
      price = :price,
      image = :image,
      description = :description,
    ";
    $stmnt = $this->conn->prepare($query);
    $stmnt->bindParam(':name', $this->name);
    $stmnt->bindParam(':price', $this->price);
    $stmnt->bindParam(':image', $this->image);
    $stmnt->bindParam(':description', $this->description);

    if ($stmnt->execute()) {
      return true;
    }
    return false;
  }

  public function getProduct($boolean = false, $byId = true)
  {
    if (!$byId) {
      $query = "SELECT * FROM " . $this->table_name . " WHERE name = :name";
      $stmnt = $this->conn->prepare($query);
      $stmnt->bindParam(':name', $this->name);
    } else {
      $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id";
      $stmnt = $this->conn->prepare($query);
      $stmnt->bindParam(':id', $this->id);
    }
    $stmnt->execute();
    $product = $stmnt->fetch(PDO::FETCH_OBJ);
    if ($boolean) {
      $count = $stmnt->rowCount();
      if ($count > 0) {
        $this->mountData($product);
        return true;
      }
      $this->mountData($product);
      return false;
    }
    $this->mountData($product);
    return $product;
  }

  private function mountData($product)
  {
    if ($product) {
      $this->id = $product->id;
      $this->name = $product->name;
      $this->price = $product->price;
      $this->image = $product->image;
      $this->description = $product->description;
      $this->created = $product->created;
      $this->modified = $product->modified;
    }
  }
}
