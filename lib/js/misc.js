function SortSelect(elem_id) 
{
    var lb = document.getElementById(elem_id);
    arrTexts = new Array();

    for(i=0; i<lb.length; i++)  
    {
        arrTexts[i] = lb.options[i].text;
    }

    arrTexts.sort();

    for(i=0; i<lb.length; i++)  
    {
        lb.options[i].text = arrTexts[i];
        lb.options[i].value = arrTexts[i];
    }
}
