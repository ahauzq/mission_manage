define(["../template",""],function(e){return e("gridTree/gridTree",function(e){"use strict";var t=this,n=(t.$helpers,t.$escape),r=t.$each,i=(e.$value,e.$index,t.$string),s="";return s+='<tr tid="',s+=n(e.node.id),s+='" tlevel="',s+=n(e.node.level),s+='" pid="',s+=n(e.node.pid),s+='" isparent="',s+=n(""+e.node.isParent),s+='" class="',e.node.isOpen&&(s+="open"),e.node.isHide&&(s+=" tr-hide"),s+='"> ',r(e.data,function(e,t){s+=" ",0==t?(s+=' <td style="padding-left:',s+=n(15*(e.level+1)+10),s+='px" class="td-first"> <a href="javascript:;"> <i class="toggle-icon',e.isParent||(s+=" hide"),s+='"></i> <i class="',s+=n(e.icon),s+='" use="icon"></i> <span class="',1==e.isParent&&(s+="deep"),s+='">',s+=n(e.label),s+="</span> </a> </td> "):(s+=" <td>",s+=i(e),s+="</td> "),s+=" "}),s+=" </tr>",new String(s)})});