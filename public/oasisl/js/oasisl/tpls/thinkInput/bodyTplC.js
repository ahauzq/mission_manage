define(["../template",""],function(e){return e("thinkInput/bodyTplC",function(e){"use strict";var t=this,n=(t.$helpers,e.blankDom),r=t.$escape,i=e.nodataTip,s=t.$string,o="";return""==n?(o+=' <div class="ellipsis"> ',o+=r(i),o+=" </div> "):(o+=' <div class="ellipsis"> ',o+=r(i),o+=' </div> <div class="no-data-style"> ',o+=s(n),o+=" </div> "),new String(o)})});