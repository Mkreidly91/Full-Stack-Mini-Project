<?php
include('connection.php');

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$password = $data['password'];

$query = $mysqli->prepare('select email,password
from users 
where email=?');
$query->bind_param('s', $email);
$query->execute();
$query->store_result();
$query->bind_result( $email, $hashed_password);
$query->fetch();

$num_rows = $query->num_rows();
if ($num_rows == 0) {
    $response['status'] = "user not found";

} else {
    if (password_verify($password, $hashed_password)) {
        $response['status'] = 'logged in';
       
    } else {
        $response['status'] = "wrong password";
    }
}
echo json_encode($response);
