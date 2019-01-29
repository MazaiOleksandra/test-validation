var check_reglam_timeout_ms = 10000;

if(typeof $ == 'undefined'){
    var jq = document.createElement('script');
    jq.src = '/lemon/lib/js/jquery.min.js';
    if(isNull(document.body) || typeof document.body == 'undefined'){
        var body = document.createElement('body');
        document.body = body;
    }
    document.body.appendChild(jq);
}

function SpyReglam(){
    $.getJSON('/tools/reglamspy/', {act: 'check_reglams'}, function(json, status, ajax){
        if(json.status=='OK'){
            var txt = '';
            if(json.result.length>0) {
                for(var i in json.result) {
                    var o = json.result[i];
                    txt += '- ' + o + '\n';
                }
                var pauseon = prompt('Проблемы с регламентами: \n\n' + txt + '\n\n Через сколько минут продолжить проверку?', 5, 'Проверка регламентов');
            } 
            if(pauseon!='' && pauseon!=null ) {
                setTimeout(SpyReglam, parseInt(pauseon) * 1000 * 60);
            }
            else {
                setTimeout(SpyReglam, check_reglam_timeout_ms);
            }
        }
    });
}

setTimeout(SpyReglam, 1000);
