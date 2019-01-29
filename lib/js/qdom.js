var _last_elem;

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

function _create(tagname, parent, id, style_obj, classname)
{
    if(parent === undefined) parent = null;
    var ne = document.createElement(tagname);
    if(parent!=null)
    {
        parent.appendChild(ne);
    }
    if(id!==undefined)ne.id=id;
    if(style_obj!==undefined)
    {
        for(var i in style_obj)
        {
            var o = style_obj[i];
            ne.style[i] = o;
        } 
    }
    if(classname!==undefined)
    {
        ne.className = classname;
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

function _style(elem, style_obj)
{
    if(elem == null) elem = _last_elem;
    for(var i in style_obj)
    {
        var o  = style_obj[i];
        elem.style[i] = o;
    }
    _last_elem = elem;
    return elem;
}

function _button(caption, onclick_func, parent)
{
    var ne = document.createElement('button');
    ne.innerHTML = caption;
    try
    {
        ne.onclick = onclick_func;
    }
    catch(e)
    {
        ne.click = onclick_func;
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

function _table(rows, cols, style_obj, table_params, parent)
{
    var tbl = document.createElement('table');
    tbl.style.emptyCells = 'show';
    tbl.style.borderCollapse = 'collapse';

    var thead = document.createElement('thead');
    tbl.appendChild(thead);

    var tbody = document.createElement('tbody');
    tbl.appendChild(tbody);

    var tfoot = document.createElement('tfoot');
    tbl.appendChild(tfoot);

    if(style_obj!==undefined)
    {
        for(var i in style_obj)
        {
            tbl.style[i] = style_obj[i];
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

function _div(html, id, classname, style_obj)
{
    var ne = document.createElement('div');
    if(id!==undefined) ne.id = id;
    if(classname!==undefined) ne.className = classname;
    if(style_obj!==undefined)
    {
        for(var i in style_obj)
        {
            var o = style_obj[i];
            ne.style[i] = o;
        }
    }
    _last_elem = ne;
    return ne;
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