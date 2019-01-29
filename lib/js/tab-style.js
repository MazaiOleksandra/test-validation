/*

    Красивые табы
    
    Шаблон структуры HTML-страницы:
    
    <div class="tabbed">
        <div class="tabs"></div>
        <div class="containers">
            <div class="tab-content" id="id-of-tab-content-1" title="Вкладка №1">...</div>
            <div class="tab-content" id="id-of-tab-content-2" title="Вкладка №2">...</div>
            <div class="tab-content" id="id-of-tab-content-3" title="Вкладка №3">...</div>
        </div>    
    </div>

*/

function tab_addStyles(){
    if(typeof window.tab_styled_define == 'undefined'){
        window.tab_styled_define = true;
        $('<style>'+
            '.tabbed {display: inline-block;}'+
            '.tabs{padding-left: 5px;padding-right: 30px;}'+
            '.tab-content {border: 1px solid #999;font-size: 10pt;font-family: Arial;padding: 10px;background-color: white;border-radius: 0px 0px 5px 5px;}'+
            '.one-tab {border-radius: 5px 5px 0px 0px;border-color: #999999;border-width: 1px 1px 0px 1px;padding: 5px;'+
            '    display: inline-block;font-size: 10pt;font-family: Arial;font-weight: bold;text-decoration: none;color: #777 !important;'+
            '    border-style: solid;margin-left: 5px;background-color: #dddddd;}'+
            '.one-tab:hover {z-index: 1000;border-radius: 5px 5px 0px 0px;background-color: #eeeeee;}'+
            '.one-tab-sel {background-color: #383;color: white !important;text-shadow: 1px 1px #000;}'+
            '.one-tab-sel:hover {background-color: #383;}'+
            '.containers {border-top: 4px solid #383;}</style>')
        .appendTo(document.body);
    }
}

function tab_stylize(general_container) {
    $(general_container).each(function(gc_index, gcelem){
        var gc = $(gcelem);
        gc.find('.tab-content').each(function(index, elem){
            $(elem).hide();
            var caption = $(elem).attr('title');
            $('<a href="#" class="one-tab" onclick="return false">'+caption+'</div>')
                .data({container: $(elem)})
                .click(function(){
                    $(this).closest('.tabbed').find('.tab-content').hide();
                    $(this).data('container').show();
                    
                    $(this).closest('.tabs').find('.one-tab').removeClass('one-tab-sel');
                    $(this).addClass('one-tab-sel');
                })
                .appendTo(gc.find('.tabs').first());
        });
        
        gc.find('.tabs').find('.one-tab').first().click();
    });
}

function tab_autoTabStyle(){
    tab_stylize('.tabbed');
    tab_addStyles();
}

$(tab_autoTabStyle);
