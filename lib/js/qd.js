/* ==================
    QuickDOM library
   ================== */
   
/* *************************************************************************************************************
                                                                                    OBJECT CREATION
   ************************************************************************************************************* */   
   
function _input(param)
{
    var el = _new('input');
    for(var i in param)
    {
        if(i!='style' && i!='parent')
            el[i] = param[i];
        else if(i=='style')
            {
                for(var j in param.style)
                {
                    el.style[j] = param.style[j];
                }
            }
    }
    if(param.parent!==undefined)
    {
        parent.appendChild(el);
    }
    else
    {
        document.body.appendChild(el);
    }
    _qd_obj(el);
    _last_elem = el;
    return el; 
}

function _div(param)
{
    var el = _new('div');
    for(var i in param)
    {
        if(i!='style' && i!='parent')
            el[i] = param[i];
        else if(i=='style')
            {
                for(var j in param.style)
                {
                    el.style[j] = param.style[j];
                }
            }
    }
    if(param.parent!==undefined)
    {
        parent.appendChild(el);
    }
    else
    {
        document.body.appendChild(el);
    }
    _qd_obj(el);
    _last_elem = el;
    return el; 
    
}

function _span(param)
{
    var el = _new('span');
    for(var i in param)
    {
        if(i!='style' && i!='parent')
            el[i] = param[i];
        else if(i=='style')
            {
                for(var j in param.style)
                {
                    el.style[j] = param.style[j];
                }
            }
    }
    if(param.parent!==undefined)
    {
        parent.appendChild(el);
    }
    else
    {
        document.body.appendChild(el);
    }
    _qd_obj(el);
    _last_elem = el;
    return el; 

}

function _checkbox(param)
{
    var el = _new('input');
    el.type = 'checkbox';
    for(var i in param)
    {
        if(i!='style' && i!='parent')
            el[i] = param[i];
        else if(i=='style')
            {
                for(var j in param.style)
                {
                    el.style[j] = param.style[j];
                }
            }
    }
    if(param.parent!==undefined)
    {
        parent.appendChild(el);
    }
    else
    {
        document.body.appendChild(el);
    }
    _qd_obj(el);
    _last_elem = el;
    return el; 
    
}

function _select(param)
{
    var el = _new('select');
    for(var i in param)
    {
        if(i!='style' && i!='parent')
            el[i] = param[i];
        else if(i=='style')
            {
                for(var j in param.style)
                {
                    el.style[j] = param.style[j];
                }
            }
    }
    if(param.parent!==undefined)
    {
        parent.appendChild(el);
    }
    else
    {
        document.body.appendChild(el);
    }
    _qd_obj(el);
    _last_elem = el;
    return el; 
    
}

function _option(param)
{
    var el = _new('option');
    for(var i in param)
    {
        if(i!='style' && i!='parent')
            el[i] = param[i];
        else if(i=='style')
            {
                for(var j in param.style)
                {
                    el.style[j] = param.style[j];
                }
            }
    }
    if(param.parent!==undefined)
    {
        parent.appendChild(el);
    }
    else
    {
        document.body.appendChild(el);
    }
    _qd_obj(el);
    _last_elem = el;
    return el; 
}

function _button(param)
{
    var el = _new('button');
    for(var i in param)
    {
        if(i!='style' && i!='parent')
            el[i] = param[i];
        else if(i=='style')
            {
                for(var j in param.style)
                {
                    el.style[j] = param.style[j];
                }
            }
    }
    if(param.parent!==undefined)
    {
        parent.appendChild(el);
    }
    else
    {
        document.body.appendChild(el);
    }
    _qd_obj(el);
    _last_elem = el;
    return el; 
}

function _table(rows, cols, param)
{
    var el = _new('table');
    el.style.emptyCells = 'show';
    
    //append thead
    var thead = _new('thead');
    el._append(thead);

    //thead row
    var tr = _new('tr');
    thead._append(tr);
    for(var c = 0; c<cols; c++)
    {        
        tr._append(_new('th'));
    }

    //append tbody    
    var tbody = _new('tbody')
    el._append(tbody);
    
    //append body rows
    for(var r = 0; r<rows; r++)
    {
        var tr = _new('tr');
        tbody._append(tr);
        for(var c = 0; c<cols; c++)
        {        
            tr._append(_new('td'));
        }
    }
        
    var tfoot = _new('tfoot');
    el._append(tfoot);
    
    for(var i in param)
    {
        if(i!='style' && i!='parent')
            el[i] = param[i];
        else if(i=='style')
            {
                for(var j in param.style)
                {
                    el.style[j] = param.style[j];
                }
            }
    }
    if(param.parent!==undefined)
    {
        parent.appendChild(el);
    }
    else
    {
        document.body.appendChild(el);
    }
    _last_elem = el;
    el._cell = _cell;
    el._c = _c;
    el._appendRow = _appendRow;
    return el; 
}

/* *************************************************************************************************************
                                                                                    MISC FUNCTIONS
   ************************************************************************************************************* */   
var _last_elem;

function _qd_obj(obj)
{
    obj._append = _append;
    obj._param = _param;
    obj._child = _child;
    obj._innerTag = _innerTag;
    obj._setClick = _setClick;
    obj._setChange = _setChange;
    obj._killChildren = _killChildren;
    obj._addRow = _addRow;
}

function _new(tag)
{
    var el = document.createElement(tag); 
    _qd_obj(el);
    _last_elem = el;
    return el;
}

function _g(id)
{
    var el = document.getElementById(id);
    _qd_obj(el);
    return el;
}

function _append(obj)
{
    if(typeof obj == 'string') obj = _g(obj);
    this.appendChild(obj);
    return this;
}

function _body()
{
    var el = document.body;
    _qd_obj(el);
    return el;
}

function _param(param)
{
    for(var i in param)
    {
        if(i!='style')
            this[i] = param[i];
        else 
            if(i=='style')
            {
                for(var j in param.style)
                {
                    this.style[j] = param.style[j];
                }
            }
    }
    return this;
}

function _child(idx)
{
    var el = this.childNodes[idx];
    if(el)
    {
        _qd_obj(el); 
        return el;
    }
    else
    {
        return undefined;
    }
}

function _innerTag(tag, idx)
{
    if(idx===undefined)idx=0;
    var el = this.getElementsByTagName(tag)[idx];
    if(el)
    {
        _qd_obj(el);
        return el;
    }
    else
    {
        return undefined;
    }
}

function _style(style)
{
    for(var i in style)
    {
        this.style[i] = style[i];
    }
    return this;
}

function _appendRow(area)
{
    if(area===undefined) area = 'tbody';
    
    var newcolcount = 0;
    
    if(this._innerTag('thead'))
    if(this._innerTag(area).childNodes.length>0)
    {
        newcolcount = this._innerTag(area, 0).childNodes[0].childNodes.length;
    }
    
    var tr = _new('tr');
    if(this.tagName.toUpperCase()=='TABLE')
    {
        this._innerTag(area, 0)._append(tr);
        for(var i = 0; i<maxcolcount; i++)
        {
            var td = _new('td');
            tr._append(td);
        }
    }
    else
    if(this.tagName.toUpperCase()=='TBODY' || this.tagName.toUpperCase()=='THEAD' || this.tagName.toUpperCase()=='TFOOT')
    {
        this._append(tr);
        for(var i = 0; i<this.childNodes[0].childNodes.length-1; i++)
        {
            var td = _new('td');
            tr._append(td);
        }
    }
    return tr;
}

function _addRow(cols)
{
    var tbd = this;
    var tr = _new('tr');
    for(var i=0; i<cols.length; i++)
    {
        var td = _new('td');
        td.innerHTML = cols[i];
        tr.appendChild(td);
    }
    tbd.appendChild(tr);
}

function _cell(r, c, area)
{
    if(area===undefined) area = 'tbody';
    return td = this._innerTag(area, 0)._innerTag('tr', r)._child(c);
}

function _c(r, c, area)
{
    if(area===undefined) area = 'tbody';
    return td = this._innerTag(area, 0)._innerTag('tr', r-1)._child(c-1);
}

function _setClick(listener)
{
    try{this.onclick = listener;}
    catch(e){this.click = listener;}
}

function _setChange(listener)
{
    try{this.onchange = listener;}
    catch(e){this.change = listener;}
}

function _eval(aajax)
{
    var rt = aajax.responseText;
    try{
    var dt = eval('('+rt+')');
    }catch(e){var dt = null;}
    return dt;
}

function _killChildren(tag)
{
    try{
    if(tag!==undefined)
    {
        var e = this.getElementsByTagName(tag);
    }
    else
    {
        var e = this.childNodes;
    }
    
    for(var i in e)
    {
        e[i].parentNode.removeChild(e[i])
    }
    }
    catch(e)
    {}
}
