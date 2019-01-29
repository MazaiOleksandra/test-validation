var _last_elem;

/*
*/

function _last()
{
    return _last_elem;
}

function _el(id)
{
    return document.getElementById(id);
}

function _doc()
{
    return document;
}

function _body()
{
    return document.body;
}

function _bytag(tagname)
{
    return document.getElementsByTagName(tagname);
}

/* create DOM element (v2.0) */
function _create(param_arr)
{
    var tagname = param_arr.tagname;
    var parent = param_arr.parent; parent = parent === undefined ? _body() : parent;
    var id = param_arr.id;
    var style_obj = param_arr.style;
    var className = param_arr.className;
    
    var ne = document.createElement(tagname);
    
    if(parent !== undefined)        parent.appendChild(ne);
    
    if(id!==undefined)              ne.id=id;
    
    if(style !== undefined)
    {
        for(var i in style)
        {
            var o = style[i];
            ne.style[i] = o;
        } 
    }
    if(className!==undefined)
    {
        ne.className = className;
    }
    _last_elem = ne;
    return ne;
}

function _remove(elem)
{
    if(elem == null) elem = _last_elem;
    elem.parentNode.removeChild(elem);
}

function _sethtml(elem, html)
{
    if(elem == null) elem = _last_elem;
    elem.innerHTML = html;
    _last_elem = elem;
    return elem;
}

function _style(elem, style)
{
    if(elem == null) elem = _last_elem;
    for(var i in style)
    {
        var o  = style[i];
        elem.style[i] = o;
    }
    _last_elem = elem;
    return elem;
}

/* create DOM button (v2.0) */
function _button(param_arr)
{
    //caption, onclick, parent, type
    var caption = param_arr.caption;
    var onclick_func = param_arr.onclick;
    var parent = param_arr.parent; parent = parent === undefined ? _body() : parent;
    var type = param_arr.type; if(type === undefined) type = 'button';
    
    var ne = document.createElement('button');
    ne.innerHTML = caption;
    ne.type = type;
    
    if(onclick_func!==undefined)
    {
        try
        {
            ne.onclick = onclick_func;
        }
        catch(e)
        {
            ne.click = onclick_func;
        }
    }
    
    if(parent!==undefined)
    {
        parent.appendChild(ne);
    }
    _last_elem = ne;
    return ne;
}

function _append(elem, parent)
{
    if(elem == null) elem = _last_elem;
    if(parent!==undefined)
    {
        parent.appendChild(elem);
    }
    return elem;
}

/* create DOM table (v2.0) */
function _table(param_arr)
{
    var rows = param_arr.rows; rows = rows === undefined ? 1 : rows;
    var cols = param_arr.cols; cols = cols === undefined ? 1 : cols;
    var style = param_arr.style;
    var id = param_arr.id; 
    var table_params = param_arr.table_params;
    var parent = param_arr.parent; parent = parent === undefined ? _body() : parent;
    var className = param_arr.className;
    
    var tbl = document.createElement('table');
    tbl.style.emptyCells = 'show';
    if(className!==undefined) tbl.className = className;
    if(id!==undefined) tbl.id = id;

    var thead = document.createElement('thead');
    tbl.appendChild(thead);

    var tbody = document.createElement('tbody');
    tbl.appendChild(tbody);

    var tfoot = document.createElement('tfoot');
    tbl.appendChild(tfoot);

    if(style!==undefined)
    {
        for(var i in style)
        {
            tbl.style[i] = style[i];
        }
    }
    
    if(table_params!==undefined)
    {
        for(var i in table_params)
        {
            var o = table_params[i];
            tbl[i] = o;
        }
    }
    
    for(var r = 0; r<rows; r++)
    {
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        for(var c = 0; c<cols; c++)
        {
            var td = document.createElement('td');
            td.innerHTML = '&nbsp;';
            tr.appendChild(td);
        }
    }
    if(parent!==undefined)
    {
        parent.appendChild(tbl);
    }
    _last_elem = tbl;
    return tbl;
}

function _matrix_table(param_arr, data_matrix)
{
    var id = param_arr.id;
    var className = param_arr.className; 
    var style = param_arr.style;
    var parent = param_arr.parent; parent = parent === undefined ? _body() : parent;
    var table_params = param_arr.table_params;
    var rules = param_arr.rules; rules = rules===undefined ? 'all' : rules;
    var cellPadding = param_arr.cellPadding; 
    var align = param_arr.align;
    
    var pm = data_matrix;
    var tbl = document.createElement('table');
    var tbody = document.createElement('tbody');
    tbody.id = id + '.tbody';
    tbl.appendChild(tbody);
    for(var y in pm)
    {
        var ln = pm[y];
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        for(var x in ln)
        {
            var cl = ln[x];
            var td = document.createElement('td');
            td.innerHTML = cl;
            td.id = id+'.cell.'+x;
            tr.appendChild(td);
        }
    }

    if(style!==undefined)
    {
        for(var i in style)
        {
            tbl.style[i] = style[i];
        }
    }
    
    tbl.rules = rules;
    if(cellPadding!==undefined) tbl.cellPadding = cellPadding;
    if(align!==undefined) tbl.align = align;
    
    if(table_params!==undefined)
    {
        for(var i in table_params)
        {
            tbl[i] = table_params[i];
        }
    }
    
    parent.appendChild(tbl);
    _last_elem = tbl;
    return tbl;
}

function _cell(table, row, col)
{
    if(table == null) table = _last_elem;
    return table.getElementsByTagName('tr')[row].getElementsByTagName('td')[col];
}

function _getcellhtml(table, row, col)
{
    if(table == null) table = _last_elem;
    return table.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].innerHTML;
}

function _setcellhtml(table, row, col, html)
{
    if(table == null) table = _last_elem;
    table.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].innerHTML = html;
    return table.getElementsByTagName('tr')[row].getElementsByTagName('td')[col];
}

function _move(elem, left, top)
{
    if(elem == null) elem = _last_elem;
    elem.style.position = 'absolute';
    elem.style.left = left;
    elem.style.top = top;
    return elem;
}

/* create DOM container (v2.0) */
function _div(param_arr)
{
    if(typeof param_arr == 'object')
    {
        var html = param_arr.html; if(html===undefined) html = param_arr.content;
        var id = param_arr.id;
        var className = param_arr.className;
        var style = param_arr.style;
        var parent = param_arr.parent; parent = parent === undefined ? _body() : parent;
        
        var ne = document.createElement('div');
        
        if(id!==undefined) ne.id = id;
        if(className!==undefined) ne.className = classname;
        if(style!==undefined)
        {
            for(var i in style)
            {
                var o = style[i];
                ne.style[i] = o;
            }
        }
        if(parent!==undefined) parent.appendChild(ne);
        _last_elem = ne;
        return ne;
    }
    else
    {
        var ne = document.createElement('div');
        div.innerHTML = param_arr;
        _last_elem = ne;
        return ne;
    }
}

function _param(elem, param_obj)
{
    if(elem==null) elem = _last_elem;
    if(param_obj!==undefined)
    {
        for(var i in param_obj)
        {
            var o = param_obj[i];
            elem[i] = o;
        }
    }
    return elem;
}

function _bodyrow(table, row)
{
    if(table == null) table = _last_elem;
    return table.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[row];
}

/* create input DOM element (v2.0) */
function _input(param_arr)
{
    var ne = document.createElement('input');
    
    if(param_arr.id!==undefined) ne.id = param_arr.id;
    if(param_arr.name!==undefined) ne.name = param_arr.name;
    if(param_arr.className!==undefined) ne.className = param_arr.className;
    if(param_arr.type!==undefined) ne.type = param_arr.type;
    if(param_arr.value!==undefined) ne.value = param_arr.value;
    if(param_arr.style!==undefined)
    {
        for(var i in param_arr.style)
        {
            ne.style[i] = param_arr.style[i];
        }
    }
    if(param_arr.parent!==undefined) parent.appendChild(ne); else _body().appendChild(ne);
    _last_elem = ne;
    return ne;
}

function _checkbox(param_arr)
{
    var ne = document.createElement('input');
    
    if(param_arr.id!==undefined) ne.id = param_arr.id;
    if(param_arr.name!==undefined) ne.name = param_arr.name;
    if(param_arr.className!==undefined) ne.className = param_arr.className;
    ne.type = 'checkbox';
    if(param_arr.value!==undefined) ne.value = param_arr.value;
    if(param_arr.title!==undefined) ne.title = param_arr.title;
    if(param_arr.label!==undefined && param_arr.id!=undefined) 
    {
        var lbl = document.createElement('label');
        ne.label = lbl;
        lbl.htmlFor = ne.id;
        lbl.innerHTML = param_arr.label;
    }
    if(param_arr.style!==undefined)
    {
        for(var i in param_arr.style)
        {
            ne.style[i] = param_arr.style[i];
        }
    }
    if(param_arr.parent!==undefined) 
    {
            parent.appendChild(ne); 
            parent.appendChild(lbl);
    }
    else 
    {
        _body().appendChild(ne);
        _body().appendChild(lbl); 
    };
    
    _last_elem = ne;
    return ne;
}

/* create select DOM element (v2.0) */
function _select(param_arr)
{
    var ne = document.createElement('select');
    
    if(param_arr.size!==undefined) ne.size = param_arr.size;
    if(param_arr.name!==undefined) ne.name = param_arr.name;
    if(param_arr.id!==undefined) ne.id = param_arr.id;
    if(param_arr.className!==undefined) ne.className = param_arr.className;
    if(param_arr.multiple!==undefined) ne.multiple = 'multiple';
    if(param_arr.style!==undefined) 
    {
        for(var i in param_arr.style)
        {
            ne.style[i] = param_arr.style[i];
        }
    }
    
    if(param_arr.parent!==undefined) parent.appendChild(ne); else _body().appendChild(ne);
    _last_elem = ne;
    return ne;
}

function _addoption(select, text, value)
{
    if(select == null) select = _last_elem;
    var ne = document.createElement('option');
    ne.innerHTML = text;
    if(value!==undefined) ne.value = value;
    select.appendChild(ne);
    _last_elem = ne;
    return ne;
}

function _setoption(select, sel_param)
{
    for(var i in select.options)
    {
        var o = select.options[i];
        if(sel_param.value!==undefined)
        {
            if(o.value == sel_param.value)
            {
                select.selectedIndex = i;
                return select;
            }
        }
        if(sel_param.text !== undefined)
        {
            if(o.innerHTML == sel_param.text)
            {
                select.selectedIndex = i;
                return select;
            }
        }
    }
    return select;
}

function _getoption(select, return_text)
{
    if(return_text===undefined) return_text = false;
    if(!return_text)
        return select.options[select.selectedIndex].value;
    else
        return select.options[select.selectedIndex].innerHTML;
}

function _setclick(elem, listener)
{
    try
    {
        elem.onclick = listener;
    }
    catch(e)
    {
        elem.click = listener;
    }
}

function _setchange(elem, listener)
{
    try
    {
        elem.onchange = listener;
    }
    catch(e)
    {
        elem.change = listener;
    }
}

function _insbodyrow(table)
{
    if(table===undefined || table==null) table = _last_elem;
    var tr = _doc().createElement('tr');
    
    if(table.getElementsByTagName!==undefined && table.getElementsByTagName('tbody').length>0)
        table.getElementsByTagName('tbody')[0].appendChild(tr);
    else
        table.appendChild(tr);
    return tr;
}

function _inscol(row, text, id)
{
    var td = _doc().createElement('td');
    if(id!==undefined) td.id = id;
    if(typeof text == 'string')
        td.innerHTML = text;
    else if(typeof text == 'object')
        td.appendChild(text);
    row.appendChild(td);
    return td;
}

function _eval(aajax)
{
    var rt = aajax.responseText;
    var dt = eval('('+rt+')');
    return dt;
}

function _span(param)
{
    var ne = _doc().createElement('span');
    _last_elem = ne;
    if(typeof param == 'string')
    {
        ne.innerHTML = param;
        return ne;
    }
    else
    {
        var html = param.content;
        if(html === undefined) html = param.html;
        ne.innerHTML = html;
        if(param.style!==undefined)
        {
            for(var i in param.style)
            {
                ne.style[i] = param.style[i];
            }
        }
        if(param.parent!==undefined) parent.appendChild(ne);
        if(param.className!==undefined) ne.className = className;
        return ne;      
    }
}