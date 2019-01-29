
var ajax;
var ajaxinprocess = false;

try{
    var ajax_w = document.createElement('img');
    ajax_w.src='/lemon/lib/img/mini_ajax.gif';
    ajax_w.alt = 'ajax...';
    ajax_w.title = 'Выполняется обращение к серверу в фоновом режиме...';
    ajax_w.style.opacity = 0.2;
    ajax_w.style.display = 'none';
    ajax_w.style.position = 'absolute';
    ajax_w.style.left = 0;
    ajax_w.style.top = 0;
    if(document.body)
        document.body.appendChild(ajax_w);
    else
    {
        setTimeout("document.body.appendChild(ajax_w)", 2000);
    }
}catch(e){}

function SendAjax(url, callbackfunc)
{
    while(ajaxinprocess); //try{}catch(e){};
    ajaxinprocess = true;
    if(window.ActiveXObject) 
    {
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
        ajax.onreadystatechange = function(){if(ajax.readyState==4)ajaxinprocess = false;  callbackfunc();};
        ajax.open("GET", url, true);
        ajax.send(null);  
    } 
    else 
    {
        if(window.XMLHttpRequest) 
        {
            ajax = new XMLHttpRequest(ajax);
            ajax.onreadystatechange = function(){if(ajax.readyState==4)ajaxinprocess = false;  callbackfunc();};
            ajax.open("GET", url, true);
            ajax.send(null);  
        }
    }   
}

function SendAsyncAjax(url, callbackfunc)
{
    ajax_w.style.display = 'block';
    var asajax;
    if(window.ActiveXObject) 
    {
        asajax = new ActiveXObject("Microsoft.XMLHTTP");
        asajax.onreadystatechange = function()
        {
    		callbackfunc(asajax);
            if(asajax.readyState==4)
            {
                ajax_w.style.display = 'none';
            }
        };
        asajax.open("GET", url, true);
        asajax.send(null);  
    } 
    else 
    {
        if(window.XMLHttpRequest) 
        {
            asajax = new XMLHttpRequest(asajax);
            asajax.onreadystatechange = function()
		    {
                callbackfunc(asajax);
                if(asajax.readyState==4)
                {
                    ajax_w.style.display = 'none';
                }
            };
            asajax.open("GET", url, true);
            asajax.send(null);  
        }
    }   
}

function SendAsyncAjaxEx(url, callbackfunc, params)
{
    var asajax;
    if(window.ActiveXObject) 
    {
        asajax = new ActiveXObject("Microsoft.XMLHTTP");
        asajax.onreadystatechange = function()
        {
    		callbackfunc(asajax);
        };
        if(!(params===undefined))
        {
            asajax.misc = params;
        }
        asajax.open("GET", url, true);
        asajax.send(null);  
    } 
    else 
    {
        if(window.XMLHttpRequest) 
        {
            asajax = new XMLHttpRequest(asajax);
            asajax.onreadystatechange = function()
		    {
                callbackfunc(asajax);
            };
            if(!(params===undefined))
            {
                asajax.misc = params;
            }
            asajax.open("GET", url, true);
            asajax.send(null);  
        }
    }   
}


    var postajax;
    var postajaxinprocess = false;
    
    function PostAjax(url, postdata, callbackfunc)
    {
        while(postajaxinprocess);
        postajaxinprocess = true;

        if(window.ActiveXObject) 
        {
            postajax = new ActiveXObject("Microsoft.XMLHTTP");
            postajax.open("POST", url, true);
            postajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            postajax.onreadystatechange = function(){if(postajax.readyState==4)postajaxinprocess = false; callbackfunc();};
            postajax.send(postdata);  
        } 
        else 
        {
            if(window.XMLHttpRequest) 
            {
                postajax = new XMLHttpRequest();
                postajax.open("POST", url, true);
                postajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                /*postajax.setRequestHeader("Content-length", postdata.length);
                postajax.setRequestHeader("Connection", "close");*/
                postajax.onreadystatechange = function(){if(postajax.readyState==4)postajaxinprocess = false; callbackfunc();};
                postajax.send(postdata);  
            }
        }   
    }   



function g(id)
{
	return document.getElementById(id);
}

function KillChildren(p)
{
    try{
        var cn = p.childNodes;
        for (i=cn.length; i>=0; i--)
        {
            try
            {
                p.removeChild(cn[i]);
            }
            catch(e)
            {
                ;
            }
        }
    }
    catch(e)
    {}

}


function objAjax()
{
   //---------------------
   // Private Declarations
   //---------------------
   var _request = null;
   var _this = null;
       
   //--------------------
   // Public Declarations
   //--------------------
   this.GetResponseXML = function()
   {
      return (_request) ? _request.responseXML : null;
   }
       
   this.GetResponseText = function()
   {
      return (_request) ? _request.responseText : null;
   }
       
   this.GetRequestObject = function()
   {
      return _request;
   }
       
   this.InitializeRequest = function(Method, Uri)
   {
      _InitializeRequest();
      _this = this;
               
      switch (arguments.length)
      {
         case 2:
            _request.open(Method, Uri);
            break;
                               
         case 3:
            _request.open(Method, Uri, arguments[2]);
            break;
      }
               
      if (arguments.length >= 4) _request.open(Method, Uri, arguments[2], arguments[3]);
      this.SetRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
   }
       
   this.SetRequestHeader = function(Field, Value)
   {
      if (_request) _request.setRequestHeader(Field, Value);
   }
       
   this.Commit = function(Data)
   {
      if (_request) _request.send(Data);
   }
       
   this.Close = function()
   {
      if (_request) _request.abort();
   }
       
   //---------------------------
   // Public Event Declarations.
   //---------------------------
   this.OnUninitialize = function() { };
   this.OnLoading = function() { };
   this.OnLoaded = function() { };
   this.OnInteractive = function() { };
   this.OnSuccess = function() { };
   this.OnFailure = function() { };
       
   //---------------------------
   // Private Event Declarations
   //---------------------------
   function _OnUninitialize() { _this.OnUninitialize(); };
   function _OnLoading() { _this.OnLoading(); };
   function _OnLoaded() { _this.OnLoaded(); };
   function _OnInteractive() { _this.OnInteractive(); };
   function _OnSuccess() { _this.OnSuccess(); };
   function _OnFailure() { _this.OnFailure(); };

   //------------------
   // Private Functions
   //------------------
   function _InitializeRequest()
   {
      _request = _GetRequest();
      _request.onreadystatechange = _StateHandler;
   }
       
   function _StateHandler()
   {
      switch (_request.readyState)
      {
         case 0:
            window.setTimeout("void(0)", 100);
            _OnUninitialize();
            break;
                               
         case 1:
            window.setTimeout("void(0)", 100);
            _OnLoading();
            break;
                               
         case 2:
            window.setTimeout("void(0)", 100);
            _OnLoaded();
            break;
                       
         case 3:
            window.setTimeout("void(0)", 100);
            _OnInteractive();
            break;
                               
         case 4:
            if (_request.status == 200)
               _OnSuccess();
            else
               _OnFailure();
                                       
            return;
            break;
      }
   }
       
   function _GetRequest()
   {
      var obj;
               
      try
      {
         obj = new XMLHttpRequest();
      }
      catch (error)
      {
         try
         {
            obj = new ActiveXObject("Microsoft.XMLHTTP");
         }
         catch (error)
         {
            return null;
         }
      }
               
      return obj;
   }
}



function getElemPos(elem)
{
    //var elem = document.getElementById(elemId);
    
    /*var w = elem.offsetWidth;
    var h = elem.offsetHeight;
    
    var l = 0;
    var t = 0;
    
    while (elem)
    {
        l += elem.offsetLeft;
        t += elem.offsetTop;
        elem = elem.offsetParent;
    }

    return {'left': l, 'top' : t};*/
    
    var br = elem.getBoundingClientRect();

    return {"left":br.left, "top":br.top, "width": br.right-br.left, "height":br.bottom-br.top};
}

	var apar;
	function ParseParams()
	{
		var pstri = window.location.href.indexOf("#");
		if(pstr!=-1)
		{
			var pstr = window.location.href.substr(pstri+1);
			var all_params = pstr.split("&");
			apar = new Array();
			for(var p in all_params)
			{
				var pp = all_params[p];
				var pp0 = pp.split("=");
				apar[pp0[0]] = pp0[1];
			}
		}
	} 

function parseDate(date)
{
    if(date==null || date=='')return '';
    var y0 = date.substr(0, 4);
    var m0 = date.substr(5, 2); if(m0.substr(0,1)=='0')m0 = m0.substr(1);
    var d0 = date.substr(8, 2); if(d0.substr(0,1)=='0')d0 = d0.substr(1);

    var y = parseInt(y0);
    var m = parseInt(m0);
    var d = parseInt(d0);
    
    var mn = date.substr(5, 2);
    switch(m)
    {
        case 1: mn = 'января'; break;
        case 2: mn = 'февраля'; break;
        case 3: mn = 'марта'; break;
        case 4: mn = 'апреля'; break;
        case 5: mn = 'мая'; break;
        case 6: mn = 'июня'; break;
        case 7: mn = 'июля'; break;
        case 8: mn = 'августа'; break;
        case 9: mn = 'сентября'; break;
        case 10: mn = 'октября'; break;
        case 11: mn = 'ноября'; break;
        case 12: mn = 'декабря'; break;
    }
    return d+' '+mn+' '+y;
}