<?php


///////////////////////////////////////////
//change username and password to database login
$servername = "localhost:3307";
$username = "dev";
$password = "";
$dbname = "rainmanland";
//$dbname = "testemployees";
////////////////////////////////////////////

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT * FROM user;");
    $stmt->execute();

    // set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    // foreach (new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k => $v) {
    //echo $k;
    // print($k);
    // }

    $temp = 0;

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        //    printf("%s\n",$row['id']);
        //    printf("%s\n",$row['title']);
        //    printf("%s\n",$row['author']);
        //    printf("%s\n",$row['publishDate']);
        //    printf("%s\n",$row['source']);
        //    printf("%s\n",$row['body']);

        //$articleArray[$temp] = new ArticleBlock( $row['id'], $row['title'], $row['author'],  $row['publishDate'], $row['source'], $row['showAward'],  $row['body'] );

       // printf(( $row['name'] ));

        echo json_encode( $row );
        echo '
';

        $temp ++;
//    printf("%d\n", $temp);

    }



} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}


// printf( json_encode($articleArray[1]));

//echo json_encode($articleArray);
// echo json_encode('hi');

// echo json_encode(array_values($articleArray));

// echo "<script> console.log('$tes')</script>";


$conn = null;


?>