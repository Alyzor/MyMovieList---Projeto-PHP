<?php

    $genre = file_get_contents('php://input');
    include 'guid.php';
    include 'dbConnection.php';
    $conn = getDatabaseConnection();
    $id = generateGUID();

    $sql = "SELECT nome FROM Genres WHERE nome = '$genre'";
    $result = $conn->query($sql);
    if ($result->rowCount() > 0) {
        echo HTTP_RESPONSE_CODE(409);
        exit();
    }else{
        $sql = "INSERT INTO Genres (id,nome) 
                VALUES ('$id','$genre')";
        
        
        try{
            $conn->exec($sql);
            echo $id;
            echo HTTP_RESPONSE_CODE(200);
        }catch(PDOException $e){
            echo HTTP_RESPONSE_CODE(500);
            echo $sql . "<br>" . $e->getMessage();
        }
    }

?>