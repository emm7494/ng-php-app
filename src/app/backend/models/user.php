<?php
class User
{
  private $conn;
  private $password;
  private $table_name = "users";
  public $id;
  public $email;
  public $firstname;
  public $lastname;

  public function __construct($conn, $email,  $firstname = null, $lastname = null)
  {
    $this->conn = $conn;
    $this->email = $email;
    $this->firstname = $firstname;
    $this->lastname = $lastname;
  }

  public function create()
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

  public function getUser($boolean = false)
  {
    $query = "SELECT * FROM " . $this->table_name . " WHERE email = :email";
    $stmnt = $this->conn->prepare($query);
    $stmnt->bindParam(':email', $this->email);
    $stmnt->execute();
    $user = $stmnt->fetch(PDO::FETCH_OBJ);
    if ($boolean) {
      $count = $stmnt->rowCount();
      if ($count > 0) {
        $this->mountData($user);
        return true;
      }
      $this->mountData($user);
      return false;
    }
    $this->mountData($user);
    unset($user->password);
    return $user;
  }

  private function mountData($user)
  {
    if ($user) {
      $this->id = $user->id;
      $this->email = $user->email;
      $this->password = $user->password;
      $this->firstname = $user->firstname;
      $this->lastname = $user->lastname;
    }
  }

  public function setPassword($password)
  {
    $this->password = password_hash($password, PASSWORD_BCRYPT);
  }
  public function checkPassword($password)
  {

    return password_verify($password, $this->password);
  }
}
