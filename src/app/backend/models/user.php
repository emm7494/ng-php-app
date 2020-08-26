<?php
class User
{
  private $conn;
  private $table_name = "users";
  public $id;
  public $firstname;
  public $lastname;
  public $email;
  private $password;

  public function __construct($conn)
  {
    $this->conn = $conn;
  }

  function getUser()
  {
    $query = "SELECT * FROM " . $this->table_name . " WHERE email = :email";
    $stmnt = $this->conn->prepare($query);
    $stmnt->bindParam(':email', $this->email);
    $stmnt->execute();
  }

  function create()
  {
    $query = "INSERT INTO " . $this->table_name . "
    SET
      firstname = :firstname,
      lastname =  :lastname,
      email = :email,
      password = :password
    ";
    $stmnt = $this->conn->prepare($query);
    $stmnt->bindParam(':firstname', $this->firstname);
    $stmnt->bindParam(':lastname', $this->lastname);
    $stmnt->bindParam(':email', $this->email);
    $stmnt->bindParam(':password', $this->password);

    if ($stmnt->execute()) {
      return true;
    }
    return false;
  }

  public function setPassword()
  {
    $this->password = password_hash($this->password, PASSWORD_BCRYPT);
  }
}
