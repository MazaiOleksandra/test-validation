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
$queryQuestion ="CREATE TABLE tQueueTasks (
  ID SERIAL
  ,Path2File VARCHAR(200)
  ,Category VARCHAR(20)
  ,Prior smallint
  ,idUser VARCHAR(100) null
  ,CreateDT timestamp(64)
  ,StartDT timestamp(64) null
  ,FinishDT timestamp(64) null
  ,isValid CHAR(64) null
)";

$queryInsert = "INSERT INTO tqueuetasks (id, path2file, category, prior, iduser, createdt, startdt, finishdt, isvalid) VALUES (1, 'usr/1.png', 'ClientPH', 1, 'A', '2018-12-01 15:12:01.000000', '2018-12-01 15:15:12.000000', '2018-12-01 15:20:06.000000', 'Y                                                               ');
INSERT INTO tqueuetasks (id, path2file, category, prior, iduser, createdt, startdt, finishdt, isvalid) VALUES (1, 'usr/1.png', 'ClientPH', 1, null, '2018-12-01 15:14:01.000000', null, null, null);
INSERT INTO tqueuetasks (id, path2file, category, prior, iduser, createdt, startdt, finishdt, isvalid) VALUES (2, 'usr/2.png', 'ClientPH', 1, null, '2018-12-01 15:15:01.000000', null, null, null);
INSERT INTO tqueuetasks (id, path2file, category, prior, iduser, createdt, startdt, finishdt, isvalid) VALUES (3, 'usr/3.png', 'ClientPH', 1, null, '2018-12-01 15:16:01.000000', null, null, null);
INSERT INTO tqueuetasks (id, path2file, category, prior, iduser, createdt, startdt, finishdt, isvalid) VALUES (4, 'usr/4.png', 'DOC', 2, null, '2018-12-01 15:17:01.000000', null, null, null);
INSERT INTO tqueuetasks (id, path2file, category, prior, iduser, createdt, startdt, finishdt, isvalid) VALUES (5, 'usr/5.png', 'PASSPORT', 2, null, '2018-12-01 15:17:01.000000', null, null, null);
INSERT INTO tqueuetasks (id, path2file, category, prior, iduser, createdt, startdt, finishdt, isvalid) VALUES (6, 'usr/6.png', 'PASSPORT', 2, null, '2018-12-01 15:17:01.000000', null, null, null);
INSERT INTO tqueuetasks (id, path2file, category, prior, iduser, createdt, startdt, finishdt, isvalid) VALUES (7, 'usr/7.png', 'PASSPORT', 2, null, '2018-12-01 15:17:01.000000', null, null, null);
INSERT INTO tqueuetasks (id, path2file, category, prior, iduser, createdt, startdt, finishdt, isvalid) VALUES (8, 'usr/8.png', 'PASSPORT', 2, null, '2018-12-01 15:17:01.000000', null, null, null);
INSERT INTO tqueuetasks (id, path2file, category, prior, iduser, createdt, startdt, finishdt, isvalid) VALUES (9, 'usr/9.png', 'PASSPORT', 2, null, '2018-12-01 15:17:01.000000', null, null, null);
INSERT INTO tqueuetasks (id, path2file, category, prior, iduser, createdt, startdt, finishdt, isvalid) VALUES (10, 'usr/10.png', 'PASSPORT', 2, null, '2018-12-01 15:17:01.000000', null, null, null);
INSERT INTO tqueuetasks (id, path2file, category, prior, iduser, createdt, startdt, finishdt, isvalid) VALUES (11, 'usr/11.png', 'PASSPORT', 2, null, '2018-12-01 15:17:01.000000', null, null, null);
INSERT INTO tqueuetasks (id, path2file, category, prior, iduser, createdt, startdt, finishdt, isvalid) VALUES (12, 'usr/12.png', 'PASSPORT', 2, null, '2018-12-01 15:17:01.000000', null, null, null);";
$conn = pg_connect("host=ec2-23-21-171-25.compute-1.amazonaws.com
 dbname=d4veaugad1osfk user=wklzxhhlnzvaqs password=8486dd5267e33b69124f5e83d9773d5d6e56a3455a5011036a0238d2f3f3c11a");
$result = pg_fetch_all(pg_query($conn, $queryQuestion));
$result = pg_fetch_all(pg_query($conn, $queryInsert));
$result2 = pg_fetch_all(pg_query($conn, 'select * from tqueuetasks'));
pg_close($conn);

echo $result;
var_dump( $result2);

$data = json_encode($data);
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


