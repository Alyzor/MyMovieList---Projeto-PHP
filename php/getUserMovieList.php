<?php

// id do utilizador, enviado como unico header no front-end
$id = file_get_contents('php://input');

include 'dbConnection.php';
$conn = getDatabaseConnection();

try{
    $sql = "SELECT * FROM Movies WHERE userID = '$id'";
    $result = $conn->query($sql);
    $result = $result->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    echo HTTP_RESPONSE_CODE(200);
}catch(PDOException $e){
    echo HTTP_RESPONSE_CODE(500);
    echo $sql . "<br>" . $e->getMessage();
}

?>