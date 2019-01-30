<div class="container-fluid" id="main_menu">
    <div class="nav" align="center">
        <button id="tab_main" class="main_tabs">
            Home
        </button>
        <button id="tab_prof" class="main_tabs">
            Profile
        </button>
        <button id="tab_statistic" class="main_tabs">
            Statistic
        </button>
    </div>

</div>


<div id="main_table" class="container-fluid">

    <?php


    $query = 'select count(*) as cnt
,Category from tQueueTasks
where FinishDT is null 
group by Category';
    $conn =pg_connect("host=ec2-23-21-171-25.compute-1.amazonaws.com
 dbname=d4veaugad1osfk user=wklzxhhlnzvaqs password=8486dd5267e33b69124f5e83d9773d5d6e56a3455a5011036a0238d2f3f3c11a");
    $result = pg_fetch_all(pg_query($conn, $query));
    pg_close($conn);

    if(isset($result[0])) {
        $i = 0;
        $ii = count($result);

    echo '<div class="block">';
    for ($i; $i < $ii; $i++) {
        $category = $result[$i]['category'];
        $cnt = $result[$i]['cnt'];

        echo '<div id="blocks_control_panel_params" class="control_panel">
    <table width="1000px" class="panel_table padding_less">
        <thead>
        <tr>
            <th colspan="2">' . $category . '</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>Очередь - ' . $cnt . '</td> 
            <td style="text-align: right">
                <button class="startBtn" id="clid_main_btn" onclick="startValidation(\'' . $category . '\')">
                    Start
                </button>
            </td>           
        </tr>
     
        </tbody>
    </table>
</div> ';

    }
    }
    else{
        echo '<div id="blocks_control_panel_params" class="control_panel">
    <table width="1000px" class="panel_table padding_less"> <thead><tr> <td>Очередь пустая, отдыхайте!</td></tr></thead></table></div>';
    }
    ?>

</div>
</div>



<div id="validationQueue" class="container-fluid">
    <div class="response_validation" id="main_table_pm"></div>
</div>




<div id="prof">
    <div class="container-fluid">
       профайл
    </div>
</div></div>

<div id="statistic">
    <?php
    $query = "select 
         sum(case when isvalid ='N'then 1 else 0 end) as notValid
        ,sum(case when isvalid ='Y'then 1 else 0 end) as Valid
        ,sum(case when isvalid is null then 1 else 0 end) as inQueue
        ,Category 
    from tQueueTasks
    group by Category";
    $conn = pg_connect("host=localhost dbname=mydb user=myuser password=123");
    $result = pg_fetch_all(pg_query($conn, $query));
    pg_close($conn);

    if(isset($result[0])) {
        $i = 0;
        $ii = count($result);

        echo '<div class="block">';
        for ($i; $i < $ii; $i++) {
            $category = $result[$i]['category'];
            $cntvalid = $result[$i]['valid'];
            $notValid = $result[$i]['notvalid'];
            $inQueue = $result[$i]['inqueue'];

            echo '<div id="blocks_control_panel_params" class="control_panel">
    <table width="1000px" class="panel_table padding_less">
        <thead>
        <tr>
            <th colspan="3">' . $category . '</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>Валиден - '. $cntvalid.' / Невалиден - '. $notValid. '</td> 
            <td >Очередь - ' . $inQueue. '   </td>           
        </tr>
     
        </tbody>
    </table>
</div> ';

        }
    }
    else{
        echo '<div id="blocks_control_panel_params" class="control_panel">
    <table width="1000px" class="panel_table padding_less"> <thead><tr> <td>Очередь пустая, отдыхайте!</td></tr></thead></table></div>';
    }
    ?>
</div>

