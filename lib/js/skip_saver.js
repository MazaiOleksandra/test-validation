var has_no_result = false;
var has_no_date = false;
var has_no_summ = false;
var has_bad_phones = false;
var one_phone_only = true;
var got_dop_phones = false;

var c_call_id = 0;

var global_saved = false;

function devlog(log_string) {
    try{
    $('#devlog_div').append("<div>"+log_string+"</div>");
    }catch(e){}
}
function yesno(value)
{
    return value ? 'YES' : 'NO';
}


function SaveGlobalData() {
    if(!global_saved)
    {
        devlog('Saving global data...');
        
        ins('main_client', idclient, 'ID основного клиента (по кому звоним)')
        ins('saver', saver, 'Модуль сохранения');
        ins('event_code', event_code, 'Код события')
        ins('unix_start', unix_time, 'Штамп времени начала отработки');
        ins('time_hold', time_hold, 'Время холда (сек)');
        ins('dialinglistid', dialinglistid, 'Dialed ListID');

        if(location.href.indexOf('mode=incoming')!=-1){
            ins('is_incoming', '1', 'Признак входящей линии');
        }

        global_saved = true;
    }
}

// есть ли доп.телефоны в очереди на дозвон
function HasDopPhones()
{
    for(var i in phones)
    {
        if(phones[i].isDopPhone && !phones[i].Processed)
        {
            return true;
        }
    }
    return false;
}


function press_goto_next() {
    var was_client = ($('#whois').val()=='1');
    var lph;
    var is_idlinked = $("#search_id").val()==idlinked ;
    devlog("was_client: " + yesno(was_client));
    devlog("is_idlinked: " + yesno(is_idlinked));
    
    if(SaveDialogData())
    {
        devlog("Dialog data saved successfully");
        
        devlog('is_idlinked: ' + yesno(is_idlinked));
        devlog('got_dop_phones: ' + yesno(got_dop_phones));
        devlog('was_client: ' + yesno(was_client));
        devlog('HasDopPhones: ' + yesno(HasDopPhones()));
        devlog('one_phone_only: ' + yesno(one_phone_only));
        
        if( /*is_idlinked                                             // если говорили с нужным связанным лицом
         ||*/ got_dop_phones                                          // если получили доп.телефон клиента
         || was_client                                              // если это был клиент
         || !HasDopPhones()                                         // если нет доп.телефонов в очереди на дозвон
         && (!LoadPhone() || (one_phone_only && mode!='MANUAL')))   // если нет телефонов в очереди или (звоним только на один телефон и режим - не ручной)
        {
            // goto save                                            // идём на сохранение
            devlog('Goto save...');
            $('.navTab').each(function(){
                $(this).click();
            }); 
            $('#postform_tab').show();
            devlog('------------ SAVE FINISHED -------------');
        }
        else
        {
            devlog('Resetting dialog');
            if(HasDopPhones())
            { 
                devlog('...loading dop.phone before that');
                LoadPhone();
            }
            ResetDialog();
            devlog('------------ SAVE FINISHED -------------');
        }
    }
}

function CheckPhone(phone)
{
    var res;
    
    var rUA = new RegExp('^\\+380[0-9]{9}$', 'g'); 
    var rRU = new RegExp('^\\+7[0-9]{10}$', 'g'); 
    var rGE = new RegExp('^\\+995[0-9]{9}$', 'g'); 
    var rLV = new RegExp('^\\+371[0-9]{9}$', 'g'); 
    var rPG = new RegExp('^\\+351[0-9]{9}$', 'g'); 
    var rGB = new RegExp('^\\+44[0-9]{10}$', 'g'); 
    
    res = rUA.test(phone) || rRU.test(phone) || rGE.test(phone) || rLV.test(phone) || rPG.test(phone) || rGB.test(phone);
    
    return res;
}

function hasReason(){
    //reason not to give client phone
    if ($('.select_reasons_not_give_number').val() == '') {
        return false;
    } else {
        return true;
    }
}

function hasAttitudes(){
    //attitudes with client
    if ($('.select_attitudes').val() == '') {
        return false;
    } else {
        return true;
    }
}

//add_phones

function SaveDialogData(){
    devlog('-------------- Begin data saving ------------------');
    SaveGlobalData();

    var status_phone_id = $('#status_phone').val();
    var whois_id = $('#whois').val();
    var result_id = $('#result').val();
    
    devlog('Status_Phone_ID: '+ status_phone_id);
    devlog("Whois_ID: " + whois_id);
    devlog("Result_ID: " + result_id);
    
    var has_no_result = false;

    if(c_idclient==0)
        c_idclient=idclient;
    
    if(c_idlinked==0)
        c_idlinked=idlinked;
        
    devlog("c_idclient: " + c_idclient);
    devlog("c_idlinked: " + c_idlinked);
    devlog("idclient: " + idclient);
    devlog("idlinked: " + idlinked);

    // если не указан статус телефона
    if(status_phone_id=='')
    {
        alert('Не выбран статус по телефону!');
        return false;
    }

    // если дозвон и не указан тип конт.лица - ошибка
    devlog('Checking status_phone_id && whois_id');
    if( (status_phone_id=='1' || status_phone_id=='2' || status_phone_id=='3') && (whois_id=='' || typeof whois_id == 'undefined') )
    {
        alert('Статус телефона - ДОЗВОН, но не выбрано контактное лицо!');
        return false;
    }
    
    // если установлено конт.лицо, проверяем результат по каждому активу.
    devlog("Checking results by each asset");
    if(whois_id!='')
    {
        //проверка результатов по активам
        has_no_result = false;
        $('.asset_ref_result').each(function(index, elem){
            devlog("Checking reference element...");
            if(elem.value=='')
            {
                devlog("Element '#"+elem.id+"' (result select) has no value!");
                has_no_result = true;
                return false;
            }
        });
        
        if(has_no_result)
        {
            alert('Не указан результат по одному из активов!');
            return false;
        }
    }
    
    // проверка дат и сумм по активам, где это обусловлено результатом
    has_no_date = false;
    has_no_summ = false;

    // сначала проверяем, есть ли вообще в диалоге блок с результатами - tr.promiserow
    devlog('Checking tr.promise_row presence');
    if((status_phone_id == '1' || status_phone_id == '2' || status_phone_id == '3') && 
       $('.promise_row').length == 0)
    {
        devlog('Unable to save: no results (no tr.promise_row in DOM)');
        alert('Невозможно сохранить! Не установлены результаты разговора!');
        return false;
    }
    
    //проверка доп. телефонов
    has_bad_phones = false;
    $('.add_phone_row').each(function(index, elem){
        var new_phone_num = $(elem).find('.add_phone_num').val();
        var new_phone_type = $(elem).find('.add_phone_type').val();
        if(new_phone_num=='' || new_phone_type=='' || new_phone_type=='10' || !CheckPhone(new_phone_num))
        {
            has_bad_phones = true;
        }
    });
    
    if(has_bad_phones)
    {
        alert('Проверьте доп.телефоны! Возможно для одного из доп.телефонов:\n- не указан номер\n- не указан тип телефона\n- номер указан некорректно:\n   * присутствует нецифровой символ \n   * пробел в начале или в конце \n   * отсутствует + в начале \n   * введено неправильное кол-во цифр\n   * код страны введён неправильно');
        return false;
    }
    
    // перебираем все строки с обещаниями    
    $('.promise_row').each(function(index, elem){
        devlog('Checking promise['+index+']: ' + elem.id);
        var c_result_id = $(elem).find('.asset_ref_result').val();
        var c_date_obesh = $(elem).find('.asset_date_obesh').val();
        var c_summ_obesh = $(elem).find('.asset_sum_obesh').val();
        
        devlog("c_result_id: " + c_result_id);
        devlog("c_date_obesh: " + c_date_obesh);
        devlog("c_summ_obesh: " + c_summ_obesh);
        
        if(c_result_id=='1' || c_result_id=='2')
        {
            devlog("result: PAY / PARTIAL");
            if(c_date_obesh=='')
            {
                devlog("No date!");
                has_no_date = true;
            }
            else
            {
                if(!UniCheckDate(c_date_obesh, {cFormat: true, alerts: true}))
                {
                    devlog('UniCheckDate failed!');
                    has_no_date = true;
                    return false;
                } 
            }
            
            if(c_summ_obesh=='')
            {
                devlog('No summ!');
                has_no_summ = true;
                return false;
            }
            
            if(!CheckNumField(c_summ_obesh))
            {
                devlog('Bad summ!');
                has_no_summ = true;
                return false;
            }
        }
    });
    
    // проверка добавленных связей клиентов        
    devlog('Checking one_links');
    if($('.one_link').length > 0)
    {
        var has_bad_links = false;
        var has_bad_ml_dop_phones = false;
        
        devlog('Each .one_link...');
        $('.one_link').each(function(index, elem){
            devlog('Processing ['+index+']: '+elem.className);
            
            var id1 = $(elem).find('.id_1').val();
            var id2 = $(elem).find('.id_2').val();
            var fio2 = $(elem).find('.fio_2').val();
            var linktype = $(elem).find('.linktype').val();
            
            devlog("id1: " + id1);
            devlog("id2: " + id2);
            devlog("fio2: " + fio2);
            devlog("LinkType: " + linktype);
            
            if(id1=='' || (id2=='' && fio2=='') || linktype=='')
            {
                devlog("Missing non-optional parameter!");
                
                alert('Указаны не все параметры одной или нескольких связей. \nПроверьте, что для всех связей заполнены: IDклиента1, ФИОклиента2/IDклиента2, тип связи.');
                has_bad_links = true;
                return false;
            }
            
            var d_ph_dom = $(elem).find('.ml_dop_phones');
            devlog("Type of D_PH_DOM: " + typeof d_ph_dom);
            devlog("d_ph_dom.ml_dop_phone.lemgth: "+d_ph_dom.find('.ml_dop_phone').length);
            
            if(d_ph_dom.find('.ml_dop_phone').length==0 && id2=='')
            {
                devlog("Missing dop_phones for one of the unidentified link!");
                alert('Отсутствуют доп.телефоны для одной из связей! Добавление связи в таком случае невозможно!');
                has_bad_links = true;
                return false;
            }
            
            devlog("Processing .ml_dop_phone's");
            d_ph_dom.find('.ml_dop_phone').each(function(index, elem){
                devlog('Processing['+index+']: '+elem.className);
                
                var c_ml_dop_phone_number = $(elem).find('.ml_dop_phone_number').val();
                var c_ml_dop_phone_type = $(elem).find('.ml_dop_phone_type').val();
                var c_ml_dop_phone_remark = $(elem).find('.ml_dop_phone_remark').val();
                
                devlog("c_ml_dop_phone_number: " + c_ml_dop_phone_number);
                devlog("c_ml_dop_phone_type: " + c_ml_dop_phone_type);
                devlog("c_ml_dop_phone_remark: " + c_ml_dop_phone_remark);
                
                if(c_ml_dop_phone_number=='')
                {
                    devlog("No number for one of the links");
                    alert('Не указан один из номеров доп.телефонов!');
                    has_bad_ml_dop_phones = true;
                    return false;
                } 
            });
        });
        if(has_bad_links)
        {
            return false;
        }
        if(has_bad_ml_dop_phones)
        {
            return false;
        }
    }
    
    //проверка доп. телефонов клиентов
    has_bad_phones = false;
    devlog("Checking add_phone_row's...");
    $('.add_phone_row').each( function(index, elem) {
        devlog('processing['+index+']: '+elem.className);
        
        var new_phone_num = $(elem).find('.add_phone_num').val();
        var new_phone_type = $(elem).find('.add_phone_type').val();
        devlog('new_phone_num: ' + new_phone_num);
        devlog('new_phone_type: ' + new_phone_type);
        if(new_phone_num=='' || new_phone_type=='' || new_phone_type=='10')
        {
            devlog('No number or phone type...');
            has_bad_phones = true;
            return false;
        }
    });
    if(has_bad_phones)
    {
        alert('Не указан номер или тип по одному из доп.телефонов клиента!');
        return false;
    }
    
    has_bad_phones = false;
    devlog('Checking linked phones...');
    $('.linked_phone_row').each( function(index, elem) {
        devlog('Processing['+index+']: '+ elem.className);
        
        var new_phone_num = $(elem).find('.linked_phone_num').val();
        var new_phone_type = $(elem).find('.linked_phone_type').val();
        
        devlog('new_phone_num: ' + new_phone_num);
        devlog('new_phone_type: ' + new_phone_type);
        
        if(new_phone_num=='' || new_phone_type=='' || new_phone_type=='10')
        {
            devlog('No number or phone type for one of linked phones!');
            has_bad_phones = true;
            return false;
        }
    });

    if(has_bad_phones)
    {
        alert('Не указан номер или тип по одному из доп.телефонов связанного лица!');
        return false;
    }
    
    $('.add_phone_row').each(function(index, elem){
        got_dop_phones = true;
    });
    
    if (!got_dop_phones && $('.select_reasons_not_give_number').val() == '') {
        alert('Укажите причину, по которой связанное лицо не предоставило номер талефона клиента!');
        return false;
    }
    
    if ($('.select_attitudes').val() == '') {
        alert('Укажите тип отношений между клинетом и связанным лицом!');
        return false;
    }

    // ========================================================================================================================
    // ==============
    // ==============    ЗАПИСЬ ДАННЫХ ИЗ ДИАЛОГА
    // ==============
    // ========================================================================================================================

        insdiv();

        devlog('Begin insert...');

        //сохранение общих данных
        ins('process['+c_call_id+'][idclient]', c_idlinked, 'Client ID');
        ins('process['+c_call_id+'][phone]', $('#phone_number').val(), 'Phone');
        if($('#source_number').length>0)
        {
            ins('process['+c_call_id+'][source_phone]', $('#source_phone').val(), 'Source Phone');
        }

        ins('process['+c_call_id+'][status_phone]', $('#status_phone').val(), 'Phone Status ID');
        ins('process['+c_call_id+'][whois]', $('#whois').val(), 'Whois ID');
        ins('process['+c_call_id+'][cause]', $('#cause').val(), 'Cause ID');
        ins('process['+c_call_id+'][result]', $('#result').val(), 'Result ID');
        
        if($('#whois').val()=='1')
        {
            ins('process['+c_call_id+'][contact_fio]', client_fio, 'Contact FIO');
            ins('process['+c_call_id+'][contact_db]', client_db, 'Contact Birth Date');
            ins('process['+c_call_id+'][contact_id]', idclient, 'Contact EKB ID');
        }
        else
        {
            ins('process['+c_call_id+'][contact_fio]', $('.whois_sel_fio').val(), 'Contact FIO');
            ins('process['+c_call_id+'][contact_db]', $('.whois_sel_db').val(), 'Contact Birth Date');
            ins('process['+c_call_id+'][contact_id]', $('.whois_sel_id').val(), 'Contact EKB ID');
        }


        //collecting asset results
        $('.asset_table').each(function(index, elem){
            var c_ref = $(elem).find('.asset_refcontract').text();
            var c_result_id = $(elem).find('.asset_ref_result').val();
            var c_date_obesh = $(elem).find('.asset_date_obesh').val();
            var c_sum_obesh = $(elem).find('.asset_sum_obesh').val();
            var c_comment = $(elem).find('.asset_comment').val();
            
            ins('process['+c_call_id+'][assets]['+c_ref+'][ref]', c_ref, 'Deal Reference');
            ins('process['+c_call_id+'][assets]['+c_ref+'][result_id]', c_result_id, 'Asset Result');
            ins('process['+c_call_id+'][assets]['+c_ref+'][date_obesh]', c_date_obesh, 'Asset Promise Date');
            ins('process['+c_call_id+'][assets]['+c_ref+'][sum_obesh]', c_sum_obesh, 'Asset Promise Summ');
            ins('process['+c_call_id+'][assets]['+c_ref+'][comment]', c_comment, 'Asset Comment');
        });

        //collecting add phones
        $('.add_phone_row').each(function(index, elem){
            var c_phone = $(elem).find('.add_phone_num').val();
            var c_type = $(elem).find('.add_phone_type').val();
            var c_remark = $(elem).find('.add_phone_remark').val();
            
            ins('process['+c_call_id+'][add_phones]['+index+'][number]', c_phone, 'New Phone Number');
            ins('process['+c_call_id+'][add_phones]['+index+'][type]', c_type, 'New Phone Type ID');
            ins('process['+c_call_id+'][add_phones]['+index+'][remark]', c_remark, 'New Phone Remark');
            
            // adding to call list 
            var new_phone_object = new Object();
            new_phone_object.Type = c_type;
            new_phone_object.VerifyCode = 0;
            new_phone_object.Number = c_phone;
            new_phone_object.Remark = c_remark;
            new_phone_object.isDopPhone = true;
            
            got_dop_phones = true;
            
            //if($('.whois_sel_id').val()!=idlinked)
            //    phones[c_phone] = new_phone_object;
        });
        
        ins('process['+c_call_id+'][reason]', $('.select_reasons_not_give_number').val(), 'Reason');
        ins('process['+c_call_id+'][attitude]', $('.select_attitudes').val(), 'Attitude');
        
        //collecting add phones
        $('.linked_phone_row').each(function(index, elem){
            var c_phone = $(elem).find('.linked_phone_num').val();
            var c_type = $(elem).find('.linked_phone_type').val();
            var c_remark = $(elem).find('.linked_phone_remark').val();
            
            ins('process['+c_call_id+'][linked_phones]['+index+'][number]', c_phone, 'New Linked Phone Number');
            ins('process['+c_call_id+'][linked_phones]['+index+'][type]', c_type, 'New Linked Phone Type ID');
            ins('process['+c_call_id+'][linked_phones]['+index+'][remark]', c_remark, 'New Linked Phone Remark');
            
            // adding to call list
            /* 
            var new_phone_object = new Object();
            new_phone_object.Type = c_type;
            new_phone_object.VerifyCode = 0;
            new_phone_object.Number = c_phone;
            new_phone_object.Remark = c_remark;
            new_phone_object.isDopPhone = true;
            
            phones[c_phone] = new_phone_object;
            */
        });


        // добавление связей клиентов
        devlog('Adding one-links');        
        if($('.one_link').length>0)
        {
            $('.one_link').each(function(index, elem){
                devlog('Processing['+index+']: '+ elem.className);
                
                var id1 = $(elem).find('.id_1').val();
                var id2 = $(elem).find('.id_2').val();
                var fio2 = $(elem).find('.fio_2').val();
                var linktype = $(elem).find('.linktype').val();
                
                devlog('id1: ' + id1);
                devlog('id2: ' + id2);
                devlog('fio2: ' + fio2);
                devlog('linktype: ' + linktype);
                
                ins('process['+c_call_id+'][links]['+index+'][id1]', id1, 'ClientID #1');
                ins('process['+c_call_id+'][links]['+index+'][id2]', id2, 'ClientID #2');
                ins('process['+c_call_id+'][links]['+index+'][fio2]', fio2, 'Client FIO #2');
                ins('process['+c_call_id+'][links]['+index+'][linktype]', linktype, 'Link Type');
                
                devlog('4 parameters inserted...');
                
                var d_ph_dom = $(elem).find('.ml_dop_phones');
                devlog("D_PH_DOM.ml_dop_phones.length: " + d_ph_dom.find('.ml_dop_phone').length);
                
                d_ph_dom.find('.ml_dop_phone').each(function(jindex, elem2){
                    devlog('Processing['+jindex+']: ' + elem2.className);
                    
                    var c_ml_dop_phone_number = $(elem2).find('.ml_dop_phone_number').val();
                    var c_ml_dop_phone_type = $(elem2).find('.ml_dop_phone_type').val();
                    var c_ml_dop_phone_remark = $(elem2).find('.ml_dop_phone_remark').val();
                    devlog('c_ml_dop_phone_number: ' + c_ml_dop_phone_number);
                    devlog('c_ml_dop_phone_type: ' + c_ml_dop_phone_type);
                    devlog('c_ml_dop_phone_remark: ' + c_ml_dop_phone_remark);
                    
                    ins('process['+c_call_id+'][links]['+index+'][ml_dop_phones]['+jindex+'][number]', c_ml_dop_phone_number, 'Link Client #2 AddPhoneNumber');
                    ins('process['+c_call_id+'][links]['+index+'][ml_dop_phones]['+jindex+'][type]', c_ml_dop_phone_type, 'Link Client #2 AddPhoneType');
                    ins('process['+c_call_id+'][links]['+index+'][ml_dop_phones]['+jindex+'][remark]', c_ml_dop_phone_remark, 'Link Client #2 AddPhoneRemark');
                    
                    devlog('Inserted...');
                });
            });
        }

        //collecting misc dialog params
        ins('process['+c_call_id+'][climate]', $('#atm').val(), 'Conversation Climate');
        ins('process['+c_call_id+'][pressure1]', $('#press1').val(), 'Pressure #1 ID' );
        ins('process['+c_call_id+'][pressure2]', $('#press2').val(), 'Pressure #2 ID' );
        devlog('Climate & pressures inserted');
                
        //счётчик диалогов
        c_call_id++;
        
        devlog('Successfully inserted');
        
        //alert('Successfully saved!');
        if(!document.getElementById('notify_window'))
        {
            var ni = $('<div/>')
                .attr({id: 'notify_window'})
                .addClass('padnorm absolute txtbig txtbold')
                .css({display: 'block', border: '3px solid #000000', color: '#000000', left: '30px', top: '80px', backgroundColor: '#B8FFB1'})
                .html('Сохранено')
                .appendTo('#topinfo');
            ni.fadeIn(200);
            setTimeout(function(){
                $('#notify_window').fadeOut(200);
            }, 1500);
        }
        else
        {
            $('#notify_window')
                .css({color: '#000000'})
                .html('Сохранено')
                .fadeIn(200);
                
            setTimeout(function(){
                $('#notify_window').fadeOut(200);
            }, 1500);
        }
        
        devlog('resetting dialog');
        ResetDialog();
        
        devlog('returning...');
        return true;

}