<?php
    include 'dbConnection.php';

    $id = $_POST['id'];
    $conn = getDatabaseConnection();

    try{
        $sql = "SELECT * FROM Movies WHERE id = '$id'";
        $result1 = $conn->query($sql);
        $movie = $result1->fetchAll(PDO::FETCH_ASSOC);
        try{
            $sql = "SELECT genre_id FROM Movies_Genres WHERE movie_id = '$id'";
            $result2 = $conn->query($sql);
            $genre= $result2->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(array($movie, $genre));
        }catch(PDOException $e){
            echo $sql . "<br>" . $e->getMessage();
            echo HTTP_RESPONSE_CODE(500);
        }
    }catch(PDOException $e){
        echo $sql . "<br>" . $e->getMessage();
        echo HTTP_RESPONSE_CODE(500);
    }
?>