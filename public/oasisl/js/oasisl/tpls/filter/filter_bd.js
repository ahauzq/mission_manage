define(["../template",""],function(e){return e("filter/filter_bd",function(e,t){"use strict";var n=this,r=n.$helpers,i=e.isOpen,s="";return s+='<dt class="search-box-hd "> <label>所有筛选</label> <i class="division"></i> <div class="search-term-wrap clearfix"></div> <a href="javascript:;" class="searchbox-toggle ',i||(s+="closed"),s+='">',i?s+="收起筛选":s+="展开筛选",s+='</a> </dt> <dd class="search-box-bd" ',i||(s+='style="display:none"'),s+="></dd>",new String(s)})});