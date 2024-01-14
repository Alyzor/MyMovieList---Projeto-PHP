<?php

// id do filme, enviado como unico header no front-end
$id = file_get_contents('php://input');

include 'dbConnection.php';
$conn = getDatabaseConnection();

    try {
        $sql = "Select Genres.nome From Genres INNER JOIN Movies_Genres ON Genres.id = Movies_Genres.genre_id WHERE Movies_Genres.movie_id = '$id'";
        $result = $conn->query($sql);
    }catch (PDOException $e) {
        echo HTTP_RESPONSE_CODE(500);
        echo $sql . "<br>" . $e->getMessage();
    }

    if ($result->rowCount() > 0) {
        echo json_encode($result->fetchAll(PDO::FETCH_ASSOC));
        echo HTTP_RESPONSE_CODE(200);
    } else {
        echo HTTP_RESPONSE_CODE(500);
    }
?>