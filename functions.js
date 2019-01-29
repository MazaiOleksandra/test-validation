var globalParams;

function Init(params) {
    console.log(params);


    $('#main_table').show();
    $('#prof').hide();
    $('#statistic').hide();


    globalParams = params;
    $(function () {
        $('.clientIdInput').attr({
            maxlength:   10,
            placeholder: "ID клиента"
        });
        $('.clientIdInput').css("height", "30px");
        $('.clientIdInput').keypress(function (e) {
            var a = [];
            var k = e.which;
            for (i = 48; i < 58; i++)
                a.push(i);
            a.push(0, 8, 99, 118);
            if (!(a.indexOf(k) >= 0))
                e.preventDefault();
        });

        $('.main_tabs').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
            switch ($(this).attr('id')) {
                case 'tab_main':
                    $("#main_table").show();
                    $('#validationQueue').hide();
                    $('#prof').hide();
                    $('#statistic').hide();

                    //getActiveTab();
                    break;
                case 'tab_prof':
                    $("#main_table").hide();
                    $('#validationQueue').hide();
                    $('#prof').show();
                    $('#statistic').hide();

                    break;
                case 'tab_statistic':
                    $("#main_table").hide();
                    $('#validationQueue').hide();
                    $('#prof').hide();
                    $('#statistic').show();
                    break;
            }
            return false;
        });
    });
}


function setActiveTab() {
    var activeTabs = $(".second_tabs").parent();
    activeTabs.each(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        }
    });
    if (globalParams.allowViewDeals != '') {
        $("#tab_deals_och_mr").parent().addClass("active");
        //$("#tab_deals_och_mr").click();
    }
}


function wait(tableId) {
    $('#' + tableId).empty();
    $('#' + tableId).append('<img id="global_loading" src="/lib/img/load.gif" style="width: 50px; margin-left: 25px; margin-top: 25px;" />');
}

function getUriParam(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
    else return null;
}

function replaceQueryParam(param, newval, search) {
    var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    var query = search.replace(regex, "$1").replace(/&$/, '');

    return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
}

function searchPTPAll() {
    var id         = 'main';
    var activeTabs = $(".main_tabs").parent();
    activeTabs.each(function () {
        if ($(this).hasClass("active")) {
            id = $(this).children().attr("id").replace("tab_", "");
        }
    });

    setActiveTab();

    if (id == 'main') {
        $("#och_mr_deals_table").empty();
        $("#cash_deals_table").empty();
        $("#odb_deals_table").empty();

        $("#reg_plan_table").empty();
        $('#reg_plan_caption').remove();
        searchPTPMain();
    } else if (id == 'log') {
        searchPTPLog('precalc');
        searchPTPLog('full');
    } else if (id == 'prof')
        searchPTPprofAll();

}

function searchPTPMain() {
    searchPTP('current');
    searchPTP('default');
}

function doPost() {
    $.ajax({
        url:         "http://www.example.com/api",
        beforeSend:  function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("username:password"));
        },
        type:        'POST',
        dataType:    'json',
        contentType: 'application/json',
        processData: false,
        data:        '{"foo":"bar"}',
        success:     function (data) {
            alert(JSON.stringify(data));
        },
        error:       function () {
            alert("Cannot get data");
        }
    });
}

function searchPTP(type) {
    var request_uri = window.location.search;
    request_uri     = replaceQueryParam('clid', $("#clid_main").val(), request_uri);
    prof.pushState('data', '', request_uri);

    var clid = $.trim($('#clid_main').val());
    //$(".caption_div").empty();

    var tableID = 'main_table_' + type;
    var caption = '';
    switch (type) {
        case 'default' :
            caption = 'Лимиты клиента ';
            if (globalParams.allowViewLog == '1')
                caption += '<button class="btn btnTable" id="" onclick="recalcLim()">Пересчитать лимит</button>';
            break;
        case 'syst' :
            caption = 'Лимит на Оплату частями <span class="function" onclick="showSysCorps()">(Системные партнеры)</span>';
            break;
        case 'nsyst' :
            caption = 'Лимит на Оплату частями/Мгновенную рассрочку (несистемные партнеры)';
            break;
        case 'mr' :
            caption = 'Лимит на Мгновенную рассрочку <span class="function" onclick="showSysCorps()">(Системные партнеры)</span>';
            break;
        case 'pm' :
            caption = 'Лимит на Оплату частями (ПриватМаркет)';
            break;
        case 'current' :
            caption = 'Текущее состояние сделок клиента';
            break;
    }

    $('#recomm_table').hide('slow');
    $('#deals_table').empty();
    $('#reg_plan_caption').remove();

    wait(tableID);

    if (!$('#clid_main').val()) {
        alert('ID введен некорректно!');
        return false;
    }
    $.getJSON(
        'request.php', {
            act:  'get_main_ptp',
            clid: clid,
            type: type
        },
        function (json) {
            //if (type == 'default') {
            //    $('<div class="caption caption_div">' + caption + '</div>').insertBefore("#" + tableID);
            //}
            appendTable(tableID, json, caption);
            if (globalParams.allowViewDeals != '') {
                if (type == 'default') {
                    $('#all_deals').show();
                    searchPTPDeals("och_mr");
                }
            }
        });
}

function recalcLim() {
    var clid = $.trim($('#clid_main').val());

    $.getJSON(
        'request.php', {
            act:  'recalc_lim',
            clid: clid
        },
        function (json) {
            searchPTPMain();
        });
}

function searchPTPDeals(type) {
    var clid    = $.trim($('#clid_main').val());
    var tableID = type + '_deals_table';
    wait(tableID);

    $.getJSON(
        'request.php', {
            act:  'get_deals_ptp',
            clid: clid,
            type: type
        },
        function (json) {
            //$('<div class="caption caption_div">Данные по запросам клиента на оформление сделок по ОЧ</div>').insertBefore("#" + tableID);
            $('#deals').show();
            appendTable(tableID, json['table'], '');
        });
}

function searchPTPprofAll() {
    searchPTPprof('prof');
    searchPTPprof('prof_trig');
}

function searchPTPprof(type) {
    var request_uri = window.location.search;
    request_uri     = replaceQueryParam('clid', $("#clid_main").val(), request_uri);
    prof.pushState('data', '', request_uri);

    var clid    = $.trim($('#clid_main').val());
    var tableID = type + '_table';
    wait(tableID);
    $(".caption_div").empty();

    if (!$('#clid_main').val()) {
        alert('ID введен некорректно!');
        return false;
    }

    var caption = 'История изменения лимита по ОЧ';
    if (type == 'prof_trig')
        caption += ' (Триггеры)';

    $.getJSON(
        'request.php', {
            act:  'get_prof_ptp',
            clid: clid,
            type: type
        },
        function (json) {
            $(".hist_hr").show("slow");
            if (!json.descr) {
                if (json.table == '') {
                    $('#' + type + '_table').empty();
                } else {
                    $('<div class="caption caption_div">' + caption + '</div>').insertBefore("#" + tableID);
                    appendTable(type + '_table', json.table, '');
                }
            } else alert(json.descr);
        });
}

function searchPTPLog(type) {

    var request_uri = window.location.search;
    request_uri     = replaceQueryParam('clid', $("#clid_main").val(), request_uri);
    prof.pushState('data', '', request_uri);

    var clid = $.trim($('#clid_main').val());
    $(".caption_div").empty();
    var tableID = type + '_svc_requests_table';

    wait(tableID);

    if (!$('#clid_main').val()) {
        alert('ID введен некорректно!');
        return false;
    }

    var captions = {
        precalc: '<div class="caption caption_div">Запросы на предрасчитанный лимит</div>',
        full:    '<div class="caption caption_div">Запросы на принятие решения ' +
        '<span class="ui-icon ui-icon-circle-plus" onclick="toggleHelp()"></span>' +
        '</div><div id="ptp_full_help">' + buildHelp() + "</div>"
    };

    $.getJSON(
        'request.php', {
            act:  'get_requests',
            clid: clid,
            type: type
        },
        function (json) {
            appendTable(tableID, json);
            $('<div class="caption caption_div">' + captions[type] + '</div>').insertBefore("#" + tableID);
        });
}

function toggleHelp() {
    $("#ptp_full_help").slideToggle();
}

function buildHelp() {
    /*return "<span>pan_credit</span>: " +
     "Номер кредитной карты (если найден), на которую клиенту предлагается оформить сделку, в случае, если передана КДВ, а не кредитка<br>" +
     "<span>CLIENT_CRED_SUMM_OLD</span>:" +
     " Исходная сумма, запрошенная клиентом, в случае удорожания по МР (Т.е. CALC_MAX_SUMM в данном случае расчитана с удорожанием)<br>" +
     "<span>CHARGE_AMM</span>:" +
     " Необходимая сумма пополнения карты, в случае, если баланса на карте не хватает на первый платеж";*/
    return "<span>№ КК</span>: " +
        "Номер кредитной карты (если найден), на которую клиенту предлагается оформить сделку, в случае, если передана КДВ, а не кредитка<br>" +
        "<span>Исходная сумма сделки</span>:" +
        " Исходная сумма, запрошенная клиентом, в случае удорожания по МР (Т.е. CALC_MAX_SUMM в данном случае расчитана с удорожанием)<br>" +
        "<span>Смма пополнения</span>:" +
        " Необходимая сумма пополнения карты, в случае, если баланса на карте не хватает на первый платеж";
}

function showRegpaymentPlan(id, amount) {
    var tableID = 'reg_plan_table';

    if ($('#' + tableID).hasClass(id)) {
        if ($('#' + tableID).is(":visible")) {
            $('#reg_plan_caption').hide('slow');
            $('#' + tableID).hide('slow');
        } else {
            $('#reg_plan_caption').show('slow');
            $('#' + tableID).show('slow');
        }
        $("html, body").animate({scrollTop: $(document).height()}, 1000);
        return;
    }
    $('#reg_plan_caption').remove();
    $('#' + tableID).attr("class", 'ptp_result');

    wait(tableID);

    $.getJSON(
        'request.php', {
            act: 'get_regpayment_plan',
            id:  id
        },
        function (json) {
            if (json == '') {
                $('#' + tableID).load('График платежей пуст');
                return;
            }
            $('<div ' +
                'class="caption caption_div" ' +
                'id="' + tableID.replace("table", "caption") + '">График платежей (По договору ' + id + ', на сумму: ' + amount + ' грн.)</div>')
                .insertBefore("#" + tableID);
            appendTable(tableID, json);
            $('#' + tableID).addClass(id);
            $("html, body").animate({scrollTop: $(document).height()}, 1000);

        });
}

function appendTable(divID, tablearray, caption) {
    var tableID = divID + "_table";
    var table   = '<table id="' + tableID + '" class="nrm_table">';
    if (caption)
        table += '<caption class="caption">' + caption + '</caption>';

    var colors = {
        '-1': 'LightGray',
        '99': 'PaleGreen',
        '0':  'LightGray',
        '1':  'PaleGreen',
        '2':  'LightSalmon',
        '3':  'LightGray',
        '4':  'LightGray',
        '5':  'PaleGreen',
        '6':  'LightGray',
        '7':  'LightGray',
        '8':  'LightGray',
        '9':  'LightGray',
        '10': 'LightGray',
        '11': 'LightGray',
    }

    var rowspan = 0;
    if (divID == 'main_table_default') {
        $.each(tablearray, function (i, array) {
            $.each(array, function (key, value) {
                if (value.toString().toLowerCase().indexOf("лимит на оч") != -1)
                    rowspan += 1;
            });
        });
    }

    var headerArr = Object.keys(tablearray[0]).filter(function (key) {
        return divID != '' && key != 'status' && key.indexOf('comm') == -1;
    });

    if (divID == 'och_mr_deals_table') {
        table += '<colgroup class="colgroup">';
        $.each(headerArr, function (key) {
            if (key != 'status')
                table += '<col class="' + key + '">';
        });
        table += '</colgroup>';
    }

    table += '<thead><tr>';
    $.each(headerArr, function (cellIdx, cellName) {
        table += '<th class="' + cellName + '" >' + getName(cellName) + '</th>';
    });

    table += '</tr>';
    table += '<tr>';
    /*for (row in tablearray) {
     if (i == 0) {
     table += '<thead><tr class="">';
     for (cell in tablearray[row]) {
     if (divID != '' && cell != 'status' || (divID == 'och_mr_deals_table' && cell.indexOf('comm') == -1)) {
     table += '<th class="sorter-false">';
     table += getName(cell);
     table += '</th>';
     }
     }
     table += '</tr></thead><tbody id = "' + divID + '_body"><tr">';
     }
     }*/

    for (row in tablearray) {
        for (cell in tablearray[row]) {

            if (divID == 'comments_table') {

                var fw         = cell == 'id_type' ? 'bold' : 'normal';
                var background = cell.indexOf('comm_client') !==-1 ? '#d8ceaf' : 'white';

                table += '<td class="' + cell + ' ' + tablearray[row]['id_type'] +
                    '" style="text-align: left; font-size: 11pt; ' +
                    'background: ' + background + '; font-weight: ' + fw + ';">';

                table += tablearray[row][cell];
            } else if (divID == 'och_mr_deals_table') {
                if (cell.indexOf("comm") == -1) {
                    if (cell == 'status') {
                        color = colors[cell];
                    } else if (cell == 'credit_info_status' && tablearray[row][cell] != '0') {
                        var dataPopover = '<span>Внутренний: </span>' + tablearray[row]['comm'] +
                            '<br><span>Клиентский: </span>' + tablearray[row]['comm_client'];

                        table += '<td class="' + cell + '" style="background: ' + color + '">';
                        table += '<span ' +
                            'data-popover="' + dataPopover + '" ' +
                            'class="span_popover ' + cell + '" ' +
                            'id="popover_' + tablearray[row][cell] + '">' + tablearray[row][cell] + '</span>';

                    } else if (cell == 'id' && [1, 3, 4, 7, 10, 11].indexOf(parseInt(tablearray[row]['status'])) != -1) {
                        var color = colors[tablearray[row]['status']];

                        table += '<td class="' + cell + ' function orange" ' +
                            'onclick="showRegpaymentPlan($(this).text(), ' + tablearray[row]['amount'] + ')" ' +
                            'style="text-align: left; background:' + color + '">';

                        table += tablearray[row][cell];
                    } else {
                        var color = colors[tablearray[row]['status']];
                        table += '<td class="' + cell + '" style="text-align: left; background:' + color + '">';
                        table += tablearray[row][cell];
                    }
                }

            } else if (divID == 'reg_plan_table') {

                if (cell == 'status') {
                    color = colors[cell];
                } else {
                    var color = colors[tablearray[row]['status']];
                    table += '<td class="' + cell + '" style="text-align: left; background:' + color + '">';
                    table += tablearray[row][cell];
                }

            } else if (divID == 'cash_deals_table') {
                var color = 'PaleGreen';
                if (tablearray[row]['part_pay_contract_id'] != -1)
                    color = 'LightGray';
                table += '<td class="' + cell + '" style="text-align: left; background:' + color + '">';
                table += tablearray[row][cell];

            } else {
                if (cell == 'corpname') {
                    table += '<td style="text-align: left">';
                } else if (cell == 'id_types') {
                    table += '<td style="text-align: left">';
                } else if (cell == 'id_types') {
                    table += '<td style="text-align: left">';
                } else if (cell == 'refcontract' && divID.indexOf('main_table') != -1) {
                    table += '<td class="function reff_' + divID + '" id="reff" onclick="getRefs($(this).text())">';
                } else if (cell == 'dt') {
                    table += '<td class="' + cell + '">';
                } else {
                    table += '<td class="' + cell + '">';
                }
                table += tablearray[row][cell];
                if (cell == 'request')
                    table += '</a>';
            }

            table += '</td>';
        }
        table += '</tr>';
    }
    table += '</table>';

    if (divID != 'corps') {
        $('#' + divID).empty();
        $('#' + divID).append(table);
    }

    if (tableID == 'och_mr_deals_table_table') {
        $("#" + tableID).addClass("tablesorter");
        showCommPreview();
    }

    var userInfo = window.navigator.userAgent;
    if (userInfo.indexOf("Firefox") > 0 && (divID == 'och_mr_deals_table'))
        $("#" + tableID).css("table-layout", "fixed");

    if (divID == 'och_mr_deals_table') {
        $('#' + tableID).tablesorter({
            //sortList: sortList/*[[0,1]]*/,
            headers:       {
                15: {sorter: 'titleParser'}
            },
            widgets:       ['stickyHeaders', 'scroller'],
            widgetOptions: {
                stickyHeaders_attachTo: '#' + divID,
                scroller_height:        300,
                // scroll tbody to top after sorting
                scroller_upAfterSort:   true,
                // pop table header into view while scrolling up the page
                scroller_jumpToHeader:  true,
                // In tablesorter v2.19.0 the scroll bar width is auto-detected
                // add a value here to override the auto-detected setting
                scroller_barWidth:      null
                // scroll_idPrefix was removed in v2.18.0
                // scroller_idPrefix : 's_'
            }
        });
    }

    if (divID == 'comments_table') {
        $("#comments_table td.comm_client").dblclick(function () {
            EditTable(this, divID,'comm_client');
        });
        $("#comments_table td.comm_client_rus").dblclick(function () {
            EditTable(this, divID,'comm_client_rus');
        });
        $("#comments_table td.comm_client_eng").dblclick(function () {
            EditTable(this, divID,'comm_client_eng');
        });
    }


    var seen = {};
    if (divID == 'main_table_default') {
        $('#main_table_default_table td').each(function () {
            var $this = $(this);
            var index = $this.index();
            var txt   = $this.text();
            if ((txt.indexOf("Лимит на ОЧ") != -1 || txt.indexOf("Лимит на ПриватМаркет") != -1 || txt.indexOf("Лимит на Мгновенную") != -1) && seen[index] === txt) {
                $($this.parent().prev().children()[index]).attr('rowspan', rowspan);
                $this.hide();
            }
            else {
                seen[index] = txt;
            }
        });
    }

    if (tablearray.length == 1 && tablearray[0].res && tablearray[0].res.indexOf('не найдено') != -1) {
        $("#" + tableID).css("width", '15%');
        //$("#" + divID).removeClass('ptp_result');
        $("#" + divID).removeClass('deals_table');
    } else {
        if (divID.indexOf("deals") != -1 || divID.indexOf("prof") != -1) {
            $("#" + tableID).css("width", '100%');
            $("#" + divID).addClass('ptp_result');
            $("#" + divID).addClass('deals_table');
        }
    }

    return table;
}

function showCommPreview() {
    $('.span_popover').popover({
        title:     function () {
            return 'Комментарий отказа';
        },
        content:   function () {
            return $(this).attr("data-popover");
        },
        html:      true,
        placement: 'top',
        trigger:   'hover'
    }).popover();

}

function transposeTable(tableId) {
    var tbl       = $('#' + tableId);
    var tbody     = tbl.find('tbody');
    var oldWidth  = tbody.find('tr:first td').length;
    var oldHeight = tbody.find('tr').length;
    var newWidth  = oldHeight;
    var newHeight = oldWidth;

    var jqOldCells = tbody.find('td');

    var newTbody = $("<tbody></tbody>");
    for (var y = 0; y < newHeight; y++) {
        var newRow = $("<tr></tr>");
        for (var x = 0; x < newWidth; x++) {
            newRow.append(jqOldCells.eq((oldWidth * x) + y));
        }
        newTbody.append(newRow);
    }
    tbody.replaceWith(newTbody);
}

function EditTable(param, tableid,langComm) {
    var oldContent = $(param).text();
    var data       = $(param).attr("class") /*+ " " + tableid*/;
    console.log(data);

    $(param).addClass("cellEditing");

    $(param).html("<input type='text' id='content' style='margin-right: 7px; width: 100%' value='" + oldContent + "' />");

    $("body").on('focus', "#content", function () {
        $(this).select();
    });

    $(param).children().first().focus();

    $(param).children().first().on('keypress blur', function (e) {
        if (e.which == 13 || e.type == 'blur') {
            var newContent = $(this).val();
            var elem       = $(this).parent();
            elem.text(newContent);
            elem.removeClass("cellEditing");
            if (newContent != oldContent) {

                $('<div id="dialog"></div>')
                    .appendTo('body')
                    .html('<div style="max-width: 500px; line-height: 1.2"><h5>Вы действительно хотите обновить комментарий отказа: <b>' +
                        data.split(' ')[1] + '</b><br> с текста: <i>' +
                        oldContent + '</i><br>на текст: <b>' +
                        newContent + '</b>?</h5></div>')
                    .dialog({
                        modal:     true,
                        title:     'Подтверждение действия',
                        width:     'auto',
                        resizable: false,
                        buttons:   {
                            Yes: function () {
                                $(param).addClass("edited");
                                $(param).css("background", "greenYellow");
                                SaveNewValues(data, newContent,langComm,oldContent);
                                getComments();
                                $(this).dialog("close");
                            },
                            No:  function (event, ui) {
                                getComments();
                                $(this).remove();
                            }
                        },

                    });

                /*$(param).addClass("edited");
                 $(param).css("background", "greenYellow");
                 SaveNewValues(data, newContent, oldContent);*/
            }
        }
    });
}

function SaveNewValues(params, newvalue,langComm) {
    params = params.split(' ');

    $.getJSON(
        'request.php', {
            act:      'update_comment',
            id_type:  params[1],
            newvalue: newvalue,
            langComm:langComm
        },
        function (json) {
            if (json.res == 'ok') {
                alert('Обновление успешно!');
                getComments();
                if (params.allowViewLog == '1') getLog();
            } else {
                alert('Ошибка обновления! ' + json.descr);
            }
        });
}



function startValidation(type) {
    var result='';
    var question='';
    var correctvariant;
    console.log(type);
    $("#main_table").hide();
    $("#validationQueue").show();
        $.getJSON(
            'request.php', {
                act: 'get_ptp_full',
                type: type
            },
            function (data) {
                //console.log(data.query);
                $("body").css("cursor", "default");
                if (data) {
                    result+='<div  align="center"><img src="'+data[0].path2file+'" width="300px"></div><div> <table>';
                    for(var i = 0;i<data.length;i++){
                        question=data[i].question;
                        correctvariant=parseInt(data[i].correctvariant);
                        result += ' <tr><td style="padding:5%"><strong>'+(i+1)+')'+question+'</strong></td> ';
                        result +='<td><input type="radio" id="contactChoice1"name="question'+i+'" value="'+(1-correctvariant)+'">  <label for="contactChoice1">да</label></br>';
                        result +='<input type="radio" id="contactChoice2" name="question'+i+'" value="'+(0+correctvariant)+'"> <label for="contactChoice2">нет</label></td> </tr> ';
                    }
                    result+='</table> </div>';
                    result+='<div style="margin:auto; display:block;" align="center"><button class="main_tabs">Next </button></div>';
                    console.log(result);
                    document.querySelector('.response_validation').innerHTML = result;
                } else {
                    $('#main_table_' + type).empty();
                    alert('По выбранным параметрам заявок не найдено!');
                }
            });


}


/*
 <div> <table> <tr><td>1)есть вопросы</td> <td>
 <input type="radio" id="contactChoice1"
 name="question1" value="1">
 <label for="contactChoice1">да</label></br>
 <input type="radio" id="contactChoice2"
 name="question1" value="2">
 <label for="contactChoice2">нет</label>
 </td> </tr> </table>
 </div>
 */