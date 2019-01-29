<?php
$type = $_REQUEST['type'];
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
$queryUpdate="update ";
$conn = pg_connect("host=ec2-23-21-171-25.compute-1.amazonaws.com
 dbname=d4veaugad1osfk user=wklzxhhlnzvaqs password=8486dd5267e33b69124f5e83d9773d5d6e56a3455a5011036a0238d2f3f3c11a");
$result = pg_fetch_all(pg_query($conn, $queryQuestion));
pg_close($conn);

$data =$result;


/*
function getTrigQuery($server, $clid) {
    $scheme = '';
    $dt = "str_replace(convert(CHAR(19), dt, 23), 'T', ' ') AS dt";
    $DateAct = "convert(CHAR(10), DateAct, 23) AS DateAct";
    $dtCompare = "convert(CHAR(10), dt, 23) = convert(CHAR(10), getdate(), 23)";

    if ($server == 'rims') {
        $scheme = 'RM.';
        $dt = "dateformat(dt, 'yyyy-mm-dd HH:mm:ss')      AS dt";
        $DateAct = "dateformat(DateAct, 'yyyy-mm-dd')  AS DateAct";
        $dtCompare = "cast(dt AS DATE ) <> cast(getdate() AS DATE )";
    }

    $query = "SELECT $dt, clid, refcontract, gr, MaxSum, MaxPay, bank, id_type, pan, MaxKOlPP, SumAct, Pay, KolAct, $DateAct,
                  RealSum, RealPay, RealKol, isnull(descr, '-') as descr, MaxSumPM, MaxPayPM, RealSumPM, RealPayPM
                FROM {$scheme}tPaysToPiesAllTrigAggr a LEFT JOIN {$scheme}tChannelDescr b ON a.channel = b.channel
                WHERE clid = $clid AND $dtCompare
                ORDER BY dt DESC";

    return $query;
}

function getptpjson($params) {
    sleep(1);

    $url = URL_RMSVC . "/service/PaysToPiesPrecalc/?type=conv";
    $request = json_encode($params);
    $content_type = "application/json";

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Content-Type: $content_type",
        'Content-Length: ' . strlen($request)
    ));
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $request);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $curlResult = curl_exec($ch);
    $result = json_decode($curlResult, true);
//    print_r($result);

    if (curl_error($ch) || curl_errno($ch) || !isset($result[0]['res'])) {

        $rmase = new dbRMASE('ptp_web', DB_RMASE_LIMIT_LG, DB_RMASE_LIMIT_PS);
        $query = "SELECT
                    'ok' as res,
                    convert(varchar, dateODb, 110) as dateODB, clid,
                    ltrim(rtrim(refcontract)) as refcontract, MaxSum, MaxPay, a.id_type,
                    isnull(MaxKOlPP, 0) as MaxKOlPP, rtrim(b.comm) as id_types
                  from tPaysToPiesAll a
                  left join tRefTypeCommentSystem b on a.id_type = b.id_type
                  WHERE clid = {$params['clid']}";

        $resultErr = array(
            "res" => 'error',
            "id_type" => 'E125',
            "id_types" => 'Повторите попытку через 15 минут'
        );
        if ($rmase->query($query)) {
            $result = $rmase->getResult();
            if (count($result) == 0) {
                $result[] = $resultErr;
            }
        } else {
            $result[] = $resultErr;
        }
    }
    curl_close($ch);

    $unwantedAttrs = array(
        'res', 'bank', 'pan', 'DateAct', 'kolPPactAPR', 'status', 'KolAct', 'query_time', 'query_time',
        'MaxKOlPP', 'task_id', 'precalcLim', 'precalcPay', 'PayAct'
    );

    for ($i = 0; $i < count($result); $i++) {
        $res = $result[$i]['res'];
        $id_type = isset($result[$i]['id_type']) ? $result[$i]['id_type'] : 'V136';
        $id_types = isset($result[$i]['id_types']) ? $result[$i]['id_types'] : 'Шановний клієнте, ця послуга Вам недоступна';
        if ($res != 'empty' && $id_type != 'A101') {
            $id_types = "<span style='color: red; font-weight: bold'>ОТКАЗ!</span> $id_types";
            $result[$i]['MaxSum'] = 0;
            $result[$i]['MaxKOlPP'] = 0;
            $result[$i]['MaxPay'] = 0;
        }
        foreach ($result[$i] as $key => $val) {
            if ($key == 'dateODB')
                $result[$i][$key] = substr($result[$i][$key], 0, 10);
            if (isset($result[$i]['dateODB']))
                $result[$i]['dateODB'] = substr($result[$i]['dateODB'], 0, 10);
            else
                $result[$i]['dateODB'] = date("Y-m-d");


            if (in_array($key, $unwantedAttrs)) {
                unset($result[$i][$key]);
            }
        }
        unset($result[$i]['id_type']);
        unset($result[$i]['id_types']);
        $result[$i]['id_type'] = $id_type;
        $result[$i]['id_types'] = $id_types;
    }

    return $result;
}

function getPaysToPiesCurr($clientID) {
    $dbRMASE = new dbRMASE('ptp_web', DB_RMASE_LIMIT_LG, DB_RMASE_LIMIT_PS);
    $query = "EXECUTE getPaysToPiesCurr $clientID";
    if ($dbRMASE->query($query)) {
        $result = $dbRMASE->getResult();
    } else {
        $result = array(
            "res" => 'error',
            "query" => $query,
            "decription" => $dbRMASE->getDescription()
        );
    }
    return $result;
}

function recalcLim($clientID) {
    $dbRMASE = new dbRMASE('ptp_web', DB_RMASE_LIMIT_LG, DB_RMASE_LIMIT_PS);
    $query = "EXECUTE recalcPaysToPiesLim $clientID";
    if (!$dbRMASE->query($query))
        return array(
            "res" => 'error',
            "query" => $query,
            "decription" => $dbRMASE->getDescription()
        );
    return $dbRMASE->getResult();
    return $result;
}

function getComments() {
    $rims = new dbRIMS();
    $query = "SELECT
                  id_type,
                  trim(comm) AS comm_,
                  trim(comm_client) AS comm_client,
                  trim(comm_client_rus) as comm_client_rus,
                  trim(comm_client_eng) as comm_client_eng
                FROM REF.treftypeCommentSystem
                WHERE PTP = 'Y'
                ORDER BY comm";

    if ($rims->query($query)) {
        $result = $rims->getResult();
        $result = HTMLTools::convertEncoding($result);
    } else $result[] = array(
        "res" => "error"
    );
    return $result;
}

function updateComment($params) {
    $id_type = $params['id_type'];
    $newvalue = iconv('utf-8', 'cp1251', $params['newvalue']);
    $comm=$params['langComm'];

    $rims = new dbRIMS();
    $query = "UPDATE REF.treftypeCommentSystem
                SET $comm = '$newvalue'
                WHERE id_type = '$id_type'";

    if ($rims->query($query)) {
        $result = array("res" => "ok");
        $result['log'] = writeLog($id_type, $newvalue);

    } else $result[] = array(
        "res" => "error",
        "descr" => $rims->getDescription()
    );
    return $result;
}

function getRegpaymentPlan($id) {
    $db = new dbRMASE('ptp_web', DB_RMASE_LIMIT_LG, DB_RMASE_LIMIT_PS);
    $query = "EXECUTE getRegpaymentPlan $id";
    if (!$db->query($query))
        return array(
            "res" => 'error',
            "query" => $query,
            "decription" => $db->getDescription()
        );
    $result = $db->getResult();

    if (count($result) == 0)
        return array(
            ['res' => 'По данной график платежей пуст']
        );
    HTMLTools::numberFormat($result, ['reg_amount', 'fee']);
    return $result;
}

function getRequests($params) {
    if (!isset($params['clid']))
        return array("error" => 'no clientID');
    if (!isset($params['type']))
        return array("error" => 'type');

    $clid = $params['clid'];
    $type = $params['type'];

    $queries = array(
        "precalc" => "SELECT
                  req_ip,
                  dateformat(req_date, 'yyyy-mm-dd') AS req_date,
                  clid,
                  str_replace(substring(request, charindex('?', request) + 1, 500), '&', '; ') as request,
                  str_replace(answer, ',', ', ') as answer
                FROM SERVICELIM.rmsvc_services_logs
                WHERE lower(service_name) like '%paystopies%' AND clid = $clid
                ORDER BY req_date DESC",

        "full" => "EXECUTE getPaysToPiesFullLog $clid"
    );

    $db = $type == 'precalc'
        ? new dbRIMS()
        : new dbRMASE("prp_reqs", DB_RMASE_LIMIT_LG, DB_RMASE_LIMIT_PS);

    if (!$db->query($queries[$type])) {
        return array(
            "status" => "error",
            "query" => $queries[$type],
            "description" => $db->getDescription()
        );
    }
    $result = $db->getResult();
    HTMLTools::numberFormat($result, ["CHARGE_AMM", 'PAN_BAL']);

    if ($type == 'precalc') $result = HTMLTools::convertEncoding($result);
    if (count($result) == 0)
        return array(array("result" => "nothing found"));
    return $result;
}

function writeLog($id_type, $newvalue) {
    $ldap = SESSION::get('ldap');

    $rims = new dbRIMS();
    $query = "INSERT INTO WEB.tPaysToPiesChCommLog values (getdate(), '$ldap', '$id_type', '$newvalue')";

    if ($rims->query($query)) {
        $result = array("res" => "ok");
    } else $result[] = array(
        "res" => "error",
        "descr" => $rims->getDescription()
    );
    return $result;
}

function getLog() {

    $rims = new dbRIMS();
    $query = "SELECT TOP 1000
                  dateformat(req_date, 'yyyy-mm-dd HH:mm:ss') AS req_date,
                  trim(ldap)                         AS ldap,
                  id_type,
                  trim(newvalue) AS newvalue
                FROM WEB.tPaysToPiesChCommLog
                ORDER BY req_date DESC";

    if ($rims->query($query)) {
        $result = $rims->getResult();
        $result = HTMLTools::convertEncoding($result);
        if (count($result) == 0) {
            $result[] = array("log" => "empty");
        }
    } else $result[] = array(
        "res" => "error",
        "descr" => $rims->getDescription()
    );
    return $result;
}

$clid = isset($_REQUEST['clid']) ? $_REQUEST['clid'] : '';
$type = isset($_REQUEST['type']) ? $_REQUEST['type'] : '';
$ref = isset($_REQUEST['ref']) ? $_REQUEST['ref'] : '';
$id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';

if ($_REQUEST['act'] == 'get_main_ptp') {
    $limAccess = new CheckLimSvcAccess();
    $apiLogin = 'nrm_conveyor';
    $apiSecret = $limAccess->GetAccessDetails("PaysToPies", $apiLogin)[0]['api_secret'];
    $signature = sha1("clid=$clid&bank=$apiLogin$apiSecret");
    $apiLogin = base64_encode($apiLogin);

    $corpid = '-1';
    $version = '1';

    if ($type == 'default') {

        $params = array(
            "clid" => $clid,
            "api_login" => $apiLogin,
            "signature" => $signature,
            "corpid" => $corpid,
            "version" => $version
        );

        $responses = getptpjson($params);
        foreach ($responses as $key => $response) {
            $responses[$key][''] = '<b>Лимит на ОЧ</b>';
//            $responses[$key] = array('' => $responses[$key]['']) + $responses;
        }
        $data1 = $responses;

        $params['corpid'] = '-1';
        $params['version'] = '99';

        $responses = getptpjson($params);

        foreach ($responses as $key => $response) {
            $responses[$key][''] = '<b>Лимит на ПриватМаркет</b>';
//            $responses[$key] = array('' => $responses[$key]['']) + $responses;
        }
//        print_r($responses);
        $data2 = $responses;
        //  $data = array_merge($data1, $data2);


        $params['corpid'] = '9';
        $params['version'] = '199';

        $responses = getptpjson($params);

        foreach ($responses as $key => $response) {
            $responses[$key][''] = '<b>Лимит на Мгновенную рассрочку(кеш-кредит на карту)</b>';
//            $responses[$key] = array('' => $responses[$key]['']) + $responses;
        }
//        print_r($responses);
        $data3 = $responses;
        $data = array_merge($data1, $data2, $data3);


        foreach ($data as $key => $item) {
            $data[$key] = array('' => $data[$key]['']) + $data[$key];
        }

    } else {
        $data = getPaysToPiesCurr($clid);
    }

} elseif ($_REQUEST['act'] == 'get_deals_ptp') {
    $type = strtoupper($type);
    $query = "EXECUTE get{$type}Deals $clid";

    if ($rmase->query($query)) {
        $result = $rmase->getResult();
        HTMLTools::numberFormat($result, ['amount', 'first_pay_amount']);
        if (count($result) > 0) {
            //for ($i = 0; $i < count($result); $i++) {
            //    $result[$i]['add_info'] = iconv('cp1251', 'utf-8', $result[$i]['add_info']);
             //   $result[$i]['description'] = iconv('cp1251', 'utf-8', $result[$i]['description']);
           // }
        } else $result[] = array('res' => 'По данному клиенту активных сделок не найдено');

    } else $data['descr'] = $rmase->getDescription();

    $data['table'] = $result;

} elseif ($_REQUEST['act'] == 'get_history_ptp') {

    if ($type == 'history') {
        $db = $rims;
        $query = "SELECT
                cast(DateODB as char) as dateodb, ClientID as clid, trim(RefContract) as refcontract,
                MaxSum, MaxPay, MaxObuch as MAX_OBUCH, ID_Type, MaxKOlPP, isnull(Type_Client, '-') as Type_Client
              from RM.tPaysToPiesAggr
              WHERE ClientID = $clid
              order by dateodb desc";

        if ($db->query($query)) {
            $result = $db->getResult();

        } else {
            $data['descr'] = $db->getDescription();
            LinuxLogger::log(basename(__DIR__), "error.txt", "query: $query; descr: {$data['descr']}");
        }

    } else { //TODO Тригерры по клиенту

        $db = $rmase;
        $query = getTrigQuery("rmase", $clid);
        if ($db->query($query)) {
            $result1 = $db->getResult();
        } else {
            $data['descr'] = $db->getDescription();
            LinuxLogger::log(basename(__DIR__), "error.txt", "query: $query; descr: {$data['descr']}");
        }

        $db = $rims;
        $query = getTrigQuery("rims", $clid);

        if ($db->query($query)) {
            $result2 = $db->getResult();
            $result2 = HTMLTools::convertEncoding($result2);
        } else {
            $data['descr'] = $db->getDescription();
            LinuxLogger::log(basename(__DIR__), "error.txt", "query: $query; descr: {$data['descr']}");
        }

        $result = array_merge($result1, $result2);
        HTMLTools::numberFormat($result, ["MaxSum", 'MaxPay', 'SumAct', 'Pay', 'RealSum', 'RealPay', 'MaxSumPM', 'MaxPayPM', 'RealSumPM', "RealPayPM"]);
    }

    if (count($result) == 0)
        $result[] = array('res' => 'Данных не найдено');

    $data['table'] = $result;

} elseif ($_REQUEST['act'] == 'get_log_ptp') {

    $query = "SELECT
                  req_ip,
                  dateformat(req_date, 'yyyy-mm-dd') AS req_date,
                  clid,
                  str_replace(substring(request, charindex('?', request) + 1, 500), '&', '; ') as request,
                  str_replace(answer, ',', ', ') as answer
                FROM SERVICELIM.rmsvc_services_logs
                WHERE lower(service_name) like 'paystopies' AND clid = $clid
                ORDER BY req_date DESC";

    if ($rims->query($query)) {
        $result = HTMLTools::convertEncoding($rims->getResult());

    } else $data['descr'] = $rims->getDescription();

    $data['table'] = $result;

} elseif ($_REQUEST['act'] == 'get_ref_recomm') {

    $query = "select clientid + 0 as clid, rtrim(ltrim(refcontract)) as refcontract, b.[message] as message
              from tRefPtPRecomm a left join tRefRecommStop b on a.code=b.code
              where a.refcontract='$ref'";

    if ($rmase->query($query)) {
        $result = $rmase->getResult();
    } else $result = $rmase->getDescription();

    $data['table'] = $result;

} elseif ($_REQUEST['act'] == 'get_corps') {
    $query = "SELECT corpid, corpname, dateformat(date_ins, 'yyyy-mm-dd') AS date_ins FROM RM.SysCorps ORDER BY 1";

    if ($rims->query($query)) {
        $result = $rims->getResult();
        for ($i = 0; $i < count($result); $i++) {
            $result[$i]['corpname'] = iconv("cp1251", 'utf8', $result[$i]['corpname']);
        }
    } else $result['descr'] = $rims->getDescription();

    $data['table'] = $result;
    $data['query'] = $query;

} elseif ($_REQUEST['act'] == 'get_comments') {
    $data = getComments();

} elseif ($_REQUEST['act'] == 'update_comment') {
    $data = updateComment($_REQUEST);

} elseif ($_REQUEST['act'] == 'get_comments_log') {
    $data = getLog();

} elseif ($_REQUEST['act'] == 'recalc_lim') {
    $data = recalcLim($clid);

} elseif ($_REQUEST['act'] == 'get_regpayment_plan') {
    $data = getRegpaymentPlan($id);

} elseif ($_REQUEST['act'] == 'get_requests') {
    $data = getRequests($_REQUEST);
}
*/
$data = json_encode($data);
die($data);