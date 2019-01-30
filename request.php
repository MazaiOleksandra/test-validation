<?php
$type = $_REQUEST['type'];
error_reporting(E_ALL);

if ($type=='updateRes'){
    $id = $_REQUEST['id'];
    $isValid = $_REQUEST['res'];
    $queryUpdate = "update tQueueTasks set finishdt=now(),isvalid ='$isValid' where ID=$id";
    $conn = pg_connect("host=ec2-23-21-171-25.compute-1.amazonaws.com
 dbname=d4veaugad1osfk user=wklzxhhlnzvaqs password=8486dd5267e33b69124f5e83d9773d5d6e56a3455a5011036a0238d2f3f3c11a");
    $resultUpdate = pg_fetch_all(pg_query($conn, $queryUpdate));
    $result = 0;
    pg_close($conn);

}
else {
    $queryCnt = "select count(*) from tQueueTasks
                              where (StartDT is null or isvalid is null)
                              and Category='$type'";


    $queryQuestion = "select 
coalesce(Question ,'aren\'t question. foto valid?')as Question ,
ID,
Path2File,
coalesce(CorrectVariant,'1') as CorrectVariant
  from tQuestion a right join (select ID
                                ,Path2File
                                ,Category
                              from tQueueTasks
                              where (StartDT is null or isvalid is null)
                              and Category='$type'
                              order by CreateDT asc
                              LIMIT 1
    ) b on a.Category=b.Category";

    $conn = pg_connect("host=ec2-23-21-171-25.compute-1.amazonaws.com
 dbname=d4veaugad1osfk user=wklzxhhlnzvaqs password=8486dd5267e33b69124f5e83d9773d5d6e56a3455a5011036a0238d2f3f3c11a");
    $cnt = pg_fetch_all(pg_query($conn, $queryCnt));
              var_dump($cnt);

    if ($cnt[0]['count'] != 0) {
        $result = pg_fetch_all(pg_query($conn, $queryQuestion));
                      var_dump($result);


        $currTask = $result[0]['id'];
        $queryUpdate = "update tQueueTasks set StartDT=now() where ID=$currTask";
        $resultUpdate = pg_fetch_all(pg_query($conn, $queryUpdate));

    } else {
        $result = 0;

    }


//var_dump($cnt);
    pg_close($conn);
}

$data =$result;


$data = json_encode($data);
die($data);
