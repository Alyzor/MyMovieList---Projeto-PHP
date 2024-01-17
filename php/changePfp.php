<?php

$id = $_POST['id'];

include 'dbConnection.php';

$file = $_FILES['file'];
$filename = $_FILES['file']['name'];
$fileTmpName = $_FILES['file']['tmp_name'];
$fileSize = $_FILES['file']['size'];
$fileError = $_FILES['file']['error'];
$fileType = $_FILES['file']['type'];

$fileExt = explode('.', $filename); // explode breaks up a string into an array
$fileActualExt = strtolower(end($fileExt)); // end() returns the last item in an array

$allowed = array('jpg', 'jpeg', 'png', 'gif');

if (in_array($fileActualExt, $allowed)) {
    if ($fileError === 0) {
        if ($fileSize < 1000000) {
            $fileNameNew = uniqid('', true) . "." . $fileActualExt;
            $fileDestination = '../images/' . $fileNameNew;
            try{
                move_uploaded_file($fileTmpName, $fileDestination);
                
                $conn = getDatabaseConnection();
                
                $sql = "UPDATE users SET foto_perfil = :profilePic WHERE id = :id";
                $stmt = $conn->prepare($sql);
                
                try{
                $stmt->execute(array(
                    ':profilePic' => $fileNameNew,
                    ':id' => $id
                ));
                echo $fileNameNew;
                echo HTTP_RESPONSE_CODE(200);
                }catch(Exception $e){
                    echo $e;
                    echo HTTP_RESPONSE_CODE(500);
                }

            } catch (Exception $e) {
                echo $e;
            }
        } else {
            echo "Your file is too big!";
        }
    } else {
        echo "There was an error uploading your file.";
    }
} else {
    echo "You cannot upload files of this type.";
}
?>