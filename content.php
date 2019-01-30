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


<div id="log">
    <div class="container-fluid">
        <div class="ptp_result requests_table" id="precalc_svc_requests_table"></div>
        <div class="ptp_result requests_table" id="full_svc_requests_table"></div>
    </div>
</div>


<div id="prof">
    <div class="container-fluid">
       профайл
    </div>
</div></div>

<div id="statistic">
    statistic
</div>

