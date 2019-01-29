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

function wait(tableID) {
    $('#' + tableID).empty();
    $('#' + tableID).append('<img id="global_loading" src="/lib/img/load.gif" style="width: 50px; margin-left: 25px; margin-top: 25px;" />');
}

function lockScreen(text) {
    if (!text)
        text = 'Обновляю, подождите...';
    $.blockUI({
        message:    '<p class="blockUI"><img src="/lib/img/load.gif"/>' + text + '</p>',
        css:        {
            backgroundColor: 'transparent',
            border:          'none',
            color:           '#fff'
        },
        overlayCSS: {
            opacity: 0.85,
        },
    });
}

function unlockScreen() {
    $.unblockUI();
}

function showDialog(params) {
    var functionOk = params.ok;
    var funcParams = params.params;
    if (!params.title)
        params.title = 'Полученный ответ';
    if (!params.maxWidth)
        params.maxWidth = '500px';

    $('<div></div>').appendTo('body')
        .html('<div style="' + params.maxWidth + '">' + params.result + '</div>')
        .dialog({
            modal:     true,
            title:     params.title,
            width:     'auto',
            resizable: false,
            buttons:   {
                Ok:    function () {
                    if (functionOk)
                        functionOk(funcParams);
                    $(this).dialog("close");

                },
                close: function (event, ui) {
                    $(this).remove();
                }
            }
        });
}

function fillBanks(type) {
    var select = $('#' + type + "_bank");
    select.empty();

    $.getJSON(
        '/lib/request.php', {act: 'get_banks'},
        function (data) {
            $.each(data, function (key, arr) {
                select.append($("<option></option>").attr("value", arr.bank).text(arr.bank_descr));
            });
            select.selectpicker('refresh');
        });
}

function getColumnName(name) {
    switch (name) {
        case 'bank' :
            return 'Банк';
        case 'id' :
            return 'ID роли';
        case 'subsystemId' :
            return 'ID подсистемы';
        case 'name' :
            return 'Описание роли';
        case 'state' :
            return 'Статус роли';
        case 'default' :
            return 'Выдается по умолчанию';
        case 'canDelegate' :
            return 'Делегируется?';
        default:
            return name;
    }
}