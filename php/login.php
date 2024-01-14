<?php

    include 'dbConnection.php';
    $conn = getDatabaseConnection();

    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT id, nome, email, foto_perfil FROM Users WHERE email = '$email' AND password = '$password' AND active = 1";
    $result = $conn->query($sql);

    if($result->rowCount() > 0){
        echo json_encode($result->fetchAll(PDO::FETCH_ASSOC));
        echo HTTP_RESPONSE_CODE(200);
    }else{
        echo HTTP_RESPONSE_CODE(401);
    }

?>