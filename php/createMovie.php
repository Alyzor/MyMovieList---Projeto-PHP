<?php


    include 'dbConnection.php';
    include 'guid.php';
    $conn = getDatabaseConnection();

    $id = generateGUID();
    $userID = $_POST['userID'];
    $titulo = $_POST['titulo'];
    $descricao = $_POST['descricao'];
    $ano = $_POST['ano'];
    $avaliacao = $_POST['avaliacao'];
    $genero = $_POST['genero'];

    $titulo = htmlspecialchars($titulo);
    $descricao = htmlspecialchars($descricao);
    $ano = htmlspecialchars($ano);
    $avaliacao = htmlspecialchars($avaliacao);

    $sql = "INSERT INTO movies (id, userID, titulo, descricao, ano, avaliacao) 
            VALUES ('$id','$userID', '$titulo' , '$descricao', '$ano', '$avaliacao')";
    
    try{
        
        $conn->exec($sql);

        $sql = "INSERT INTO Movies_Genres (movie_id, genre_id) 
                VALUES ('$id', '$genero')";
        try{
            $conn->exec($sql);
            echo $genero;
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