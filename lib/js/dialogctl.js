var dialog_html;
function LoadTemplateFromBlock(obj)
{
    obj = (typeof obj == 'string' ? document.getElementById(obj) : obj);
    
    dialog_html = $(obj).clone();
    $(obj).empty();
}
function setStatusPhone(id){$('#status_phone').val(id).change();}
    function статус_телефона(id){setStatusPhone(id);}
function setWhois(id){$('#whois').val(id).change();}
    function конт_лицо(id){setWhois(id)};
function setResult(id){$('#result').val(id).change();}
    function результат(id){setResult(id);}
function append(id){$(dialog_html).find('div#'+id).clone().appendTo('#dialog').show();}
    function переход(id){append(id);}
function happend(id){$(dialog_html).find('div#'+id).clone().css({display: 'none'}).appendTo('#dialog');}
    function скрытый_блок(id){happend(id);}

function ResetDialog()
{
    //window.idlinked = undefined;
    $('#dialog').empty();
    if(dialog_html.find('#recall_box').length>0 && window.location.href.indexOf('mode=manual')==-1)
        append('recall_box');
        
    if(typeof event_code=='undefined' || event_code!=='001576')
        append('sys_credits_info');
        
    append('status_phone_box');
    //append('go_next_phone');
    //$('#go_next_phone').hide();
    append('welcome');
    $('#btnLoadLinked').click();
    //setTimeout(function(){try{dialogSearchWhoisPhone($('#phone_number').val());}catch(e){}}, 2000);
}
