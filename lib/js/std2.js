
var ajax;
var ajaxinprocess = false;

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
    var asajax;
    if(window.ActiveXObject) 
    {
        asajax = new ActiveXObject("Microsoft.XMLHTTP");
        asajax.onreadystatechange = function()
        {
    		callbackfunc(asajax);
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
            };
            asajax.open("GET", url, true);
            asajax.send(null);  
        }
    }   
}

function SendAsyncAjaxArr(url, param_arr, callbackfunc)
{
    var asajax;
    url += '?';
    for(var i in param_arr)
    {
        url += i + '=' + param_arr[i] + '&';
    }
    
    if(window.ActiveXObject) 
    {
        asajax = new ActiveXObject("Microsoft.XMLHTTP");
        asajax.onreadystatechange = function()
        {
    		callbackfunc(asajax);
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

function SendAsyncAjaxArrEx(url, param_arr, callbackfunc, params)
{
    var asajax;
    url += '?';
    for(var i in param_arr)
    {
        url += i + '=' + param_arr[i] + '&';
    }
    
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

function SendAsync(params)
{
    //url, param_arr, callbackfunc, params
    var url = params.url; url = url === undefined ? '?' : url + '?';
    var param_arr = params.params;
    var callbackfunc = params.ondata;
    var misc = params.misc;
    
    var asajax;
    if(param_arr !== undefined)
    {
        for(var i in param_arr)
        {
            url += i + '=' + param_arr[i] + '&';
        }
    }
    
    if(window.ActiveXObject) 
    {
        asajax = new ActiveXObject("Microsoft.XMLHTTP");
        asajax.onreadystatechange = function()
        {
    		callbackfunc(asajax);
        };
        if(!(misc===undefined))
        {
            asajax.misc = misc;
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
            if(!(misc===undefined))
            {
                asajax.misc = misc;
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