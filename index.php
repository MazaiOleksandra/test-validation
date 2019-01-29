<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>VALIDATION</title>
    <link href="style.css" rel="stylesheet">
    <script src="function.js"></script>

</head>
<body>


<div id="header">

<?php
/*$type = $_REQUEST['type'];
error_reporting(E_ALL);
$queryCnt="select count(*) from tQueueTasks
                              where StartDT is null
                              and Category='$type'";

$queryQuestion = "select Question,ID,Path2File,CorrectVariant
  from tQuestion a right join (select ID
                                ,Path2File
                                ,Category
                              from tQueueTasks
                              where StartDT is null
                              and Category='$type'
                              order by CreateDT asc
                              LIMIT 1
    ) b on a.Category=b.Category";
$queryUpdate="update ";*/

$conn = pg_connect("host=ec2-23-21-171-25.compute-1.amazonaws.com
 dbname=d4veaugad1osfk user=wklzxhhlnzvaqs password=8486dd5267e33b69124f5e83d9773d5d6e56a3455a5011036a0238d2f3f3c11a");


if (!$conn) {
    echo "Произошла ошибка.\n";
    exit;
}

if (!pg_ping($conn))
    die("Соединение нарушено\n");

die($data);
?>
</div>
<div id="home">


</div>
<div id="profile" align="center">

</div>
<div id="statistic">


</div>

</div>


</body>
</html>


