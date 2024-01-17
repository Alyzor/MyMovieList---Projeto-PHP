<?php

include 'dbConnection.php';

$id = $_POST['id'];
$userID = $_POST['userID'];
$titulo = $_POST['titulo'];
$descricao = $_POST['descricao'];
$ano = $_POST['ano'];
$avaliacao = $_POST['avaliacao'];
$genero = $_POST['genero'];

$conn = getDatabaseConnection();

$sql = "UPDATE Movies SET titulo = '$titulo', descricao = '$descricao', ano = '$ano', avaliacao = '$avaliacao' WHERE id = '$id'";

try{
    $conn->exec($sql);
    $sql = "UPDATE Movies_Genres SET genre_id = '$genero' WHERE movie_id = '$id'";
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