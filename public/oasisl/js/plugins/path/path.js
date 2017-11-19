(function(e){var t={version:"0.9",map:function(e){var n=t._pathToString(e);return t.routes.defined.hasOwnProperty(n)?t.routes.defined[n]:new t.core.route(e)},root:function(e){t.routes.root=e},rescue:function(e){t.routes.rescue=e},history:{initial:{},pushState:function(n,r,i){t.history.supported?t.dispatch(i)&&e.history.pushState(n,r,i):t.history.fallback&&(e.location.hash="#"+i)},popState:function(n){var r=!t.history.initial.popped&&e.location.href==t.history.initial.URL;t.history.initial.popped=!0;if(r)return;t.dispatch(document.location.pathname)},listen:function(n){t.history.supported=!!e.history&&!!e.history.pushState,t.history.fallback=n;if(t.history.supported)t.history.initial.popped="state"in e.history,t.history.initial.URL=e.location.href,e.onpopstate=t.history.popState;else if(t.history.fallback){for(route in t.routes.defined)route.charAt(0)!="#"&&(t.routes.defined["#"+route]=t.routes.defined[route],t.routes.defined["#"+route].path="#"+route);t.listen()}}},match:function(e,n){var r=null;for(var i in t.routes.defined){r=t.routes.defined[i];if(r&&r.match(e,n))return r}return null},dispatch:function(e){var n,r;if(t.routes.current!==e){t.routes.previous=t.routes.current,t.routes.current=e,r=t.match(e,!0),t.routes.previous&&(n=t.match(t.routes.previous),n!==null&&typeof n.do_exit=="function"&&n.do_exit());if(r!==null)return r.run(),!0;t.routes.rescue!==null&&t.routes.rescue()}},listen:function(n){t._hackLegacyIE();var r=function(){t.dispatch(e.location.hash),n&&n()};e.location.hash===""&&t.routes.root!==null&&(e.location.hash=t.routes.root),"onhashchange"in e&&(!document.documentMode||document.documentMode>=8)?e.onhashchange=r:setInterval(r,50),e.location.hash!==""&&t.dispatch(e.location.hash)},core:{route:function(e){this.path=t._pathToString(e),this.pathKeys=[],this.pathRegExp=t._pathRegExp(e,this.pathKeys,!1,!1),this.action=null,this.do_enter=[],this.do_exit=null,this.params={},t.routes.defined[t._pathToString(e)]=this}},routes:{current:null,root:null,rescue:null,previous:null,defined:{}},_pathToString:function(e){return Object.prototype.toString.call(e)==="[object Array]"?"["+e.join(",")+"]":e.toString()},_pathRegExp:function(e,t,n,r){if(Object.prototype.toString.call(e)==="[object RegExp]")return e;Object.prototype.toString.call(e)==="[object Array]"&&(e="("+e.join("|")+")");var i=[];e=e.concat(r?"":"/?").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g,function(e,t,n,r,s,o,u){return i.push({name:r,optional:!!o}),t=t||"",""+(o?"":t)+"(?:"+(o?t:"")+(n||"")+(s||n&&"([^/.]+?)"||"([^/]+?)")+")"+(o||"")+(u?"(/*)?":"")}).replace(/([\/.])/g,"\\$1").replace(/\*/g,"(.*)");if(Object.prototype.toString.call(t)==="[object Array]"&&i.length>0){var s=[],o=[],u=[];for(var a=0,f=e.length;a<f;++a){var l=e.charAt(a),c=e.charAt(a-1)!=="\\";l==="("&&c?(s.push(l),o.push(l)):l===")"&&c?(s.pop(),o.push(l),s.length==0&&(u.push(o.join("").indexOf("?:")!=-1?1:0),o=[])):s.length>0&&o.push(l)}if(s.length>0)throw new Error("The Path regexp <"+e+"> has unmatched group!");var h=i.slice(0),l=0;for(var p=0,f=u.length;p<f;++p)t.push(u[p]==1&&l<h.length?h[l++]:!1)}return new RegExp("^"+e+"$",n?"":"i")},_decode:function(e){try{return decodeURIComponent(e)}catch(t){return e}},_ieFrame:null,_hackLegacyIE:function(){if(t._ieFrame)return;var n=!1;if(!n)return;var r=document.createElement("iframe");r.src="about:blank",r.style.display="none",r.setAttribute("tabindex","-1"),r.attachEvent("onload",function(){t._ieFrame.frameHash&&t._ieFrame.frameHash!=e.location.hash&&(e.location.hash=t._ieFrame.frameHash)}),document.body.appendChild(r),t._ieFrame=r.contentWindow,r=null}};t.core.route.prototype={to:function(e){return this.action=e,this},enter:function(e){return e instanceof Array?this.do_enter=this.do_enter.concat(e):this.do_enter.push(e),this},exit:function(e){return this.do_exit=e,this},partition:function(){var e=[],t=[],n=/\(([^}]+?)\)/g,r,i;while(r=n.exec(this.path))e.push(r[1]);t.push(this.path.split("(")[0]);for(i=0;i<e.length;i++)t.push(t[t.length-1]+e[i]);return t},run:function(){var n=!1,r,i,s;if(t.routes.defined[this.path].hasOwnProperty("do_enter")&&t.routes.defined[this.path].do_enter.length>0)for(r=0;r<t.routes.defined[this.path].do_enter.length;r++){i=t.routes.defined[this.path].do_enter[r].call(this);if(i===!1){n=!0;break}}n||t.routes.defined[this.path].action();if(t._ieFrame){var o=e.location.hash;if(o!=t._ieFrame.frameHash){o=o.replace(/"/g,'\\"');var u=t._ieFrame.document;u.open(),u.write("<html><head><title>"+document.title+'</title><script type="text/javascript">var frameHash="'+o+'";</script></head><body>&nbsp;</body></html>'),u.close()}}},match:function(e,n){var r=this.pathRegExp.exec(e);if(!r)return!1;if(n){var i=this.pathKeys,s=i.length,o,u,a=[];for(var f=1,l=r.length;f<l;++f)o=s>=f?i[f-1]:null,u="string"==typeof r[f]?t._decode(r[f]):r[f],o&&o.name?a[o.name]=u:a.push(u);this.params=a}return!0}},!this.Path&&(this.Path=t)})(window);