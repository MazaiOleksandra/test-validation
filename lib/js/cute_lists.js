function EnvValueList(obj, max_shown)
{
    if(typeof obj=='string') obj=$('#'+obj);
    if(typeof max_shown=='undefined')max_shown=5;
    
    var n_link = $('<a href="#" class="linknorm block txtnorm" onclick="return false">выбрать</a>')
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
    if(typeof obj=='string') obj=$('#'+obj);
    if(typeof max_shown=='undefined')max_shown=5;
    
    var n_link = $('<a href="#" class="linknorm block txtmed txtbold" onclick="return false">выбрать</a>')
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
        .change(function(){
            $(this).data('q_link').html(q_option_text(this)); 
        })
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


