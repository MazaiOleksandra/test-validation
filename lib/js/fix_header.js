function fnFixHeader(table, pxHeight)
{
    var widths = new Array();
    
    var ttable = $("<table class='border1gr' rules='all' class='border1gr'>").attr({cellPadding: $(table).attr('cellPadding')});
    $('<div style="padding: 0px"></div>').insertBefore($(table)).html(ttable.append($(table).find('thead').clone()));
    var bodywrap = $('<div style="overflow: auto; display: block; height: '+pxHeight+';"></div>');
/*
        .scroll(function(evt){
            //alert('Scroll');
            document.title = 'layerY='+evt.layerY+'; offsetY='+evt.offsetY+'; pageY='+evt.pageY;
        }); 
*/
    $(table).wrap(bodywrap);
    
    $(ttable).find('th').each(function(){
        widths.push($(this).outerWidth());
    });
    
    $(table).find('tbody tr:first td').each(function(i, elem){
        if(widths[i]<$(this).outerWidth()) widths[i] = $(this).outerWidth();
    });
    
    $(ttable).find('th').each(function(index, elem){
        $(this).outerWidth(widths[index]);
    });
    $(table).find('tbody tr:first td').each(function(index, elem){
        $(this).outerWidth(widths[index]);
    });
}

function fnFixHeaderStyled(table, styleparams)
{
    var widths = new Array();
    
    var ttable = $("<table class='border1gr' rules='all' class='border1gr'>").attr({cellPadding: $(table).attr('cellPadding')});
    $('<div style="padding: 0px; opacity: 0.5"></div>').insertBefore($(table)).html(ttable.append($(table).find('thead').clone()));
    var bodywrap = $('<div style="overflow: auto; '+styleparams+'"></div>');

    $(table).wrap(bodywrap);
    
    $(ttable).find('th').each(function(){
        widths.push($(this).width());
    });
    
    $(table).find('tbody tr:first td').each(function(i, elem){
        if(widths[i]<$(this).width()) widths[i] = $(this).width();
    });
    
    $(ttable).find('th').each(function(index, elem){
        $(this).width(widths[index]);
    });
    $(table).find('tbody tr:first td').each(function(index, elem){
        $(this).width(widths[index]);
    });
}