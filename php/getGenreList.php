<?php

    include 'dbConnection.php';
    $conn = getDatabaseConnection();
    
    $sql = "SELECT * FROM Genres ORDER BY nome ASC";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($records);
?>