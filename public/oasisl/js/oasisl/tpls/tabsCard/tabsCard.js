define(["../template",""],function(e){return e("tabsCard/tabsCard",function(e,t){"use strict";var n=this,r=n.$helpers,i=e.data,s=n.$escape,o=n.$string,u=n.$each,a=e.$value,f=e.$index,l="";return l+=" ",i.tabsCardHead&&(l+=' <div class="oas-tabsCard-title"> ',i.tabsCardHead.isCloseBtn&&(l+='<a href="javascript:;" class="oasicon oasicon-delete title-btn delete-btn"></a>'),l+=" ",i.tabsCardHead.isCopyBtn&&(l+='<a href="javascript:;" class="oasicon oasicon-copy title-btn copy-btn"></a>'),l+=" <h3>",l+=s(i.tabsCardHead.title),l+="</h3> </div> "),l+=' <div class="oas-tabsCard-content"> ',i.tabsCardBody?(l+=" ",i.tabsCardBody.content?(l+=" ",l+=o(i.tabsCardBody.content),l+=" "):i.tabsCardBody.tabs&&(l+=' <div class="oas-tabsCard-tabs"> <div class="oas-tabs-hd"> <ul> ',u(i.tabsCardBody.tabs,function(e,t){l+=' <li><a href="javascript:;">',l+=s(e.title),l+="</a></li> "}),l+=' </ul> </div> <div class="oas-tabs-bd">  </div> </div> '),l+=" "):l+=' <div class="tabsCard-loading"></div> ',l+=" </div> ",i.tabsCardFooter&&(l+=' <div class="oas-tabsCard-footer"> ',u(i.tabsCardFooter.btns,function(e,t){l+=' <button class="btn ',e.recommend?l+="btn-primary":l+="btn-default",l+=" btn-sm ",e.disable&&(l+="disabled"),l+='">',e.icon&&(l+='<i class="',l+=s(e.icon),l+='"></i>'),e.text&&(l+="<span>",l+=s(e.text),l+="</span>"),l+="</button> "}),l+=" </div> "),new String(l)})});