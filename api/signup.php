<?php
include("connection.php");

$email = $_POST['email'];
$password = $_POST['password'];

$check_email = $mysqli -> prepare('select email from users where email=?');
$check_email -> bind_param('s',$email);
$check_email -> execute();
$check_email -> store_result();

$email_exists = $check_email -> num_rows();
echo($email_exists);
if($email_exists == 0){
  
  $hashed_password = password_hash($password, PASSWORD_BCRYPT);
  $query = $mysqli -> prepare('insert into users(email,password) values(?,?)');
  $query -> bind_param('ss',$email,$hashed_password);
  $query -> execute();
   
  $response['status'] = "success";
  $response['message'] = "Sign up successful";
} else {
  $response['status'] = "failed";
  $response['message'] = "Failed to sign up";
}

echo json_encode($response);
