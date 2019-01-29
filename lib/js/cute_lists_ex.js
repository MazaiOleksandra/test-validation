
function EnvTextListEx(list_selector, max_shown, show_multiple_hint)
{
    
    if(typeof max_shown == 'undefined') max_shown = 5;
    if(typeof show_multiple_hint == 'undefined') show_multiple_hint = false;

    // new link
    var n_link = $('<a href="#" class="linknorm block txtmed txtbold" onclick="return false">выбрать</a>')
    var n_container = $('<div style="position: absolute; display: none" class="whiteback border1 shadow padmin"></div>');
    var obj = $(list_selector);
    
    n_link
        .data({n_container: n_container, obj: obj, n_link: n_link})
        .insertBefore(obj)
        .click(function(){
            $(this).data().n_container.position({
                left: $(this).position().left, 
                top: $(this).position().top
            })
            $(this).data().n_container.toggle();
        });
        
    n_container
            .data({n_link: n_link, obj: obj, n_container: n_container})
            .insertBefore(obj)
            .append(
                $('<button type="button" style="width: 100%">ОК</button>')
                    .click(function(){
                        //OK click
                        $(this.parentNode).data().n_link.html(q_option_text($(this.parentNode).data().obj));
                        $(this.parentNode).data().n_container.hide(); 
                    })
            )
            .prepend(obj);

    if(show_multiple_hint) n_container.append("<center style='font-size: 8pt; margin: 5px;'>Удерживайте Ctrl для выбора нескольких пунктов</center>")
    
    obj
        .data({n_link: n_link, n_container: n_container, obj: obj, max_shown: max_shown})
        .css('width', '100%')
        .attr('size', max_shown)
        .change(function(){
            $(this).data().n_link.html(q_option_text(this)); 
        })
        .click(function(){$(this).change()})
        .keydown(function(evt){
            if(evt.which==13){
                $(this).data().n_link.html(q_option_text($(this.parentNode).data().obj));
                $(this).data().n_container.hide(); 
            }
        });
}

function q_option_text(src_obj)
{
    var txtTemp = '';
    var idx = 0;
    var max_shown = $(src_obj).data('max_shown');
    $(src_obj).find('option:selected').each(function(){
        if(++idx<=max_shown)
        {
            txtTemp+= (txtTemp != '' ? ', ' : '') + $(this).html();
        }
        if(idx==max_shown+1)
        {
            txtTemp+= ', ...';
            return false;
        }
    });
    if(txtTemp=='')txtTemp = 'выбрать';
    return txtTemp;
}

function q_option_value(src_obj)
{
    var txtTemp = '';
    var idx = 0;
    var max_shown = $(src_obj).data('max_shown');
    $(src_obj).find('option:selected').each(function(){
        if(++idx<=max_shown)
        {
            txtTemp+= (txtTemp != '' ? ', ' : '') + $(this).val();
        }
        if(idx==max_shown+1)
        {
            txtTemp+= ', ...';
            return false;
        }
    });
    if(txtTemp=='')txtTemp = 'выбрать';
    return txtTemp;
}

// ==================================================================================

function EnvValueList(list_selector, max_shown)
{
    var obj = list_selector;
    if(typeof list_selector=='string') obj=$(list_selector);
    if(typeof max_shown=='undefined')max_shown=5;
    
    var n_link = $('<a href="#" class="linknorm txtbold block txtmed" onclick="return false">выбрать</a>')
        .data({q_list: obj})
        .click(function(){
            if($(this).data('q_list').css('display')!='none')
            {
                $(this).data('q_list').hide();
            }
            else
            {
                $(this).data('q_list').show();
            }
        })
        .insertBefore(obj);
    
    try{
    obj
        .data({
            q_link: n_link,
            max_shown: max_shown
        })
        .keydown(function(evt){
            if(evt.which==13)
            {
                $(this).hide(); 
                $(this).data('q_link').show();
                return false;
            }
        })
        /*.mouseleave(function(){
            $(this).hide(); 
            $(this).data('q_link').show();
        })*/
//        .mouseleave(function(){
//            //$(this).hide(); 
//            $(this).data('q_link').show();
//        })
        .change(function(){
            $(this).data('q_link').html(q_option_value(this)); 
            $(this).hide(); 
            $(this).data('q_link').show();
        })
        .click(function(){
           $(this).change();
        })
        .css({
            position: 'absolute',
            display: 'none',
            width: 'auto',
            minWidth: '100px'
        })
        .position({
            left: $(this).data('q_link').position().left, 
            top: $(this).data('q_link').position().top
        });
    }
    catch(e){}
}

function EnvTextList(obj,max_shown)
{
    if(typeof obj=='string') 
        obj=$('#'+obj);
        
    if(typeof max_shown=='undefined')
        max_shown=5;
    
    var n_link = $('<a href="#" class="linknorm block txtmed txtbold" onclick="return false">выбрать</a>')
        .data({q_list: obj})
        .click(function(){
            if($(this).data('q_list').css('display')!='none')
            {
                $(this).data('q_list').hide();
                $(this).html(q_option_text(obj));
            }
            else
            {
                $(this).data('q_list').show();
                $(this).html('ГОТОВО');
            }
        })
        .insertBefore(obj);
    
    try{
    obj
        .data({
            q_link: n_link,
            max_shown: max_shown
        })
        .keydown(function(evt){
            if(evt.which==13)
            {
                $(this).hide(); 
                $(this).data('q_link').show();
                $(this).data('q_link').html(q_option_text(this));
                return false;
            }
        })
        /*.mouseleave(function(){
            $(this).hide(); 
            $(this).data('q_link').show();
        })*/
        //.change(function(){
            //$(this).data('q_link').html(q_option_text(this)); 
        //})
        .css({
            position: 'absolute',
            display: 'none',
            padding: '4px',
            '-moz-box-shadow': '2px 2px 2px 2px #999',
            width: 'auto',
            minWidth: '100px'
        })
        .addClass('txtmed')
        .position({
            left: $(this).data('q_link').position().left, 
            top: $(this).data('q_link').position().top
        });
    }
    catch(e){}
}


