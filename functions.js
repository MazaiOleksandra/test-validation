var globalParams;

function Init(params) {
    console.log(params);


    $('#main_table').show();
    $('#prof').hide();
    $('#statistic').hide();


    globalParams = params;
    $(function () {
        $('.clientIdInput').attr({
            maxlength:   10,
            placeholder: "ID клиента"
        });
        $('.clientIdInput').css("height", "30px");
        $('.clientIdInput').keypress(function (e) {
            var a = [];
            var k = e.which;
            for (i = 48; i < 58; i++)
                a.push(i);
            a.push(0, 8, 99, 118);
            if (!(a.indexOf(k) >= 0))
                e.preventDefault();
        });

        $('.main_tabs').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
            switch ($(this).attr('id')) {
                case 'tab_main':
                    $("#main_table").show();
                    $('#validationQueue').hide();
                    $('#prof').hide();
                    $('#statistic').hide();

                    //getActiveTab();
                    break;
                case 'tab_prof':
                    $("#main_table").hide();
                    $('#validationQueue').hide();
                    $('#prof').show();
                    $('#statistic').hide();

                    break;
                case 'tab_statistic':
                    $("#main_table").hide();
                    $('#validationQueue').hide();
                    $('#prof').hide();
                    $('#statistic').show();
                    break;
            }
            return false;
        });
    });
}


function doPost() {
    $.ajax({
        url:         "http://www.example.com/api",
        beforeSend:  function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("username:password"));
        },
        type:        'POST',
        dataType:    'json',
        contentType: 'application/json',
        processData: false,
        data:        '{"foo":"bar"}',
        success:     function (data) {
            alert(JSON.stringify(data));
        },
        error:       function () {
            alert("Cannot get data");
        }
    });
}



function startValidation(type) {
    var result='';
    var question='';
    var taskID='';
    var correctvariant;
    $("#main_table").hide();
    $('.response_validation').empty();
    $("#validationQueue").show();

    $.getJSON(
            'request.php', {
                type: type
            },
            function (data) {
                if (data!=0) {
                    result+='<div  align="center"><img src="'+data[0].path2file+'" width="300px"></div><div> <table>';
                    for(var i = 0;i<data.length;i++){
                        question=data[i].question;
                        correctvariant=parseInt(data[i].correctvariant);
                        result += ' <form id="question'+i+'"><tr><td style="padding:5%"><label><strong>'+(i+1)+')'+question+'</strong></label></td> ';
                        result +='<td><input type="radio" id="contactChoice1"name="question'+i+'" value="'+(1-correctvariant)+'">  да</br>';
                        result +='<input type="radio" id="contactChoice2" name="question'+i+'" value="'+(0+correctvariant)+'"> нет</td> </tr></form> ';
                    }
                    taskID=data[0]['id'];
                    result+='</table> </div>';
                    result+='<div style="margin:auto; display:block;" align="center"><button class="main_tabs" onclick="resultValidation('+i+','+taskID+',\''+type+'\')">Next </button></div>';
                    console.log(result);
                    document.querySelector('.response_validation').innerHTML = result;
                } else {
                    location.reload();
                    //$("#main_table").show();
                    //$("#validationQueue").hide();
                }
            });
}

function resultValidation(lng,taskID,type){
    var form,isValid;
    var res = 0;

    for (var i=0;i<lng;i++){
       form = document.getElementsByName('question'+i);
       for(var j=0;j<2;j++){
           if(document.getElementsByName('question'+i)[j].checked==true){
               res+=parseInt(document.getElementsByName('question'+i)[j].value);
           }
       }
    }
    isValid = res == 0 ? 'Y' : 'N';

    $.getJSON(
        'request.php', {
            type: 'updateRes',
            id: taskID,
            res: isValid
        },
        function (json) {
            if (data==0) {
                console.log('ebebebe');

            } else {
                startValidation(type);
                appendTable(tableId, json);
                $('#' + tableId).show('slow');
            }
        });
    startValidation(type);

    return true
}

