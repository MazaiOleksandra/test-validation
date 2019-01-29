function GetPhoneNum()
{
    var phnum = '';
    try{
        phnum = window.location.href.match(/&phone=68[0-9]{3}([0-9]+)\D?/i)[1];
        phnum = phnum.replace(/^900/, '+');
        phnum = phnum.replace(/^90/, '+380');
    }catch(e){
        try{
            phnum = window.location.href.match(/&phone=([0-9]{1,})\D?/i)[1];
            phnum = phnum.replace(/^900/, '+');
            phnum = phnum.replace(/^90/, '+380');
        }catch(e2){
            try{
                phnum = window.location.href.match(/phone=([0-9]{1,})\D?/i)[1];
                phnum = phnum.replace(/^900/, '+');
                phnum = phnum.replace(/^90/, '+380');
            }catch(e3){
                phnum = '';
            }
        }
    }
    return phnum;
}

function GetPhoneNumFromLink(){
    return GetPhoneNum();
}