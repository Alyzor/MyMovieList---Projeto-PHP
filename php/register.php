<?php

$nome = $_POST['nome'];
$email = $_POST['email'];
$password = $_POST['password'];
$id = generateGUID();

include 'dbConnection.php';
include 'guid.php';
$conn = getDatabaseConnection();


$emailquery = "SELECT email FROM Users WHERE email = '$email'";
$emailresult = $conn->query($emailquery);

if($emailresult->rowCount() > 0){
    echo HTTP_RESPONSE_CODE(409);
}else{
    RegisterUser();
}



function RegisterUser(){

    global $conn, $nome, $email, $password, $id;

    $sql = "INSERT INTO Users (id, nome, email, password) VALUES ('$id','$nome', '$email', '$password')";

    try{
        $conn->exec($sql);
        echo HTTP_RESPONSE_CODE(200);
    }catch(PDOException $e){
        echo HTTP_RESPONSE_CODE(500);
        echo $sql . "<br>" . $e->getMessage();
    }
}
?>