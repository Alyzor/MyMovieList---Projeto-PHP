<?php

$id = file_get_contents('php://input');
include 'dbConnection.php';
$conn = getDatabaseConnection();

$sql = "DELETE FROM movies WHERE id = '$id'";

try{
    $conn->exec($sql);
    
    $sql = "DELETE FROM movies_genres WHERE movie_id = '$id'";
    try{
        $conn->exec($sql);
        echo HTTP_RESPONSE_CODE(200);
    }catch(PDOException $e){
        echo HTTP_RESPONSE_CODE(500);
        echo $sql . "<br>" . $e->getMessage();
    }
}catch(PDOException $e){
    echo HTTP_RESPONSE_CODE(500);
    echo $sql . "<br>" . $e->getMessage();
}

?>