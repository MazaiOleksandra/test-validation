function ValidateNum(num)
{
    var re = new RegExp('^[-]?[0-9]+(\.[0-9]{1,})?$');
    return re.test(num);
}

function ValidatePhone(num)
{
    var re = new RegExp('^[+](38[0-9]{10}|7[0-9]{10}|995[0-9]{9}|371[0-9]{8})$');
    return re.test(num);
}

function ValidateDate(date)
{
    var re = new RegExp('^[1-2][0-1][0-9]{2}\-[0-1][0-9]\-[0-3][0-9]$');
    return re.test(date);
}

function VisualValidate(field, num_phone_date)
{
    switch(num_phone_date)
    {
        case 'num':
            $(field).live('change', function(){
                if(this.value=='')
                {
                    $(this).css({borderColor: '#000000'});
                    return true;
                }
                if(!ValidateNum(this.value))
                    $(this).css({borderColor: '#ff0000'});
                else
                    $(this).css({borderColor: '#00ff00'});
            });
        break;
        
        case 'date':
            $(field).live('change', function(){
                if(this.value=='')
                {
                    $(this).css({borderColor: '#000000'});
                    return true;
                }
                if(!ValidateDate(this.value))
                    $(this).css({borderColor: '#ff0000'});
                else
                    $(this).css({borderColor: '#00ff00'});
            });
        break;

        case 'phone':
            $(field).live('change', function(){
                if(this.value=='')
                {
                    $(this).css({borderColor: '#000000'});
                    return true;
                }
                if(!ValidatePhone(this.value))
                    $(this).css({borderColor: '#ff0000'});
                else
                    $(this).css({borderColor: '#00ff00'});
            });
        break;
    }
    //$(field).keypress(function(){$(field).change()});
    $(field).keyup(function(){$(field).change()});
    $(function(){$(field).change();});
}
