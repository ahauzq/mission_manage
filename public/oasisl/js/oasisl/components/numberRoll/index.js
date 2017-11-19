define(["tpl/numberRoll/numroll_digit","tpl/numberRoll/numroll_number","tpl/numberRoll/numroll_point","tpl/numberRoll/numroll_value","oasisUf"],function(e,t,n,r){"use strict";$.oasUiFactory("oasNumberRoll",{options:{initNum:0,comma:!0,digit:!1},_create:function(){var e=this.options.initNum-0;this.currentNum=e,this._createDom(),e!==0&&this._moveTo(0,e)},_createDom:function(){var e=this.$el,n=r(),i=t({type:"integer"});e.addClass("oas-number-roll"),e.append(n),e.find(".oas-number-roll-val").before(i),this.numHeight=parseInt(e.find(".oas-number-content").css("font-size"))||e.find(".oas-number-content").height()},_moveTo:function(t,n){var r=this.options.digit,n=r?n/r.unitNum:n,n=r.formatter?r.formatter(n):n,i=[].reverse.call(this.$el.find(".oas-integer-number")),s=this.$el.find(".oas-float-number"),o=this._compare(t,n),u=o.itgChangeObj,a=o.flChangeObj,f=Math.max(i.length,u.length),l=Math.max(s.length,a.length),c=0,h=0;for(;c<f;c++)(function(e,t){var n=i.eq(e),r=u[e];r.index!=undefined&&(n.length==0?t._mvUnToNum.call(t,undefined,r.to):r.to?t._mvNumToNum.call(t,r.from,r.to,i.eq(c)):t._mvNumToUn.call(t,r.from,undefined,i.eq(c)))})(c,this);a.length!==0&&a[0].to===undefined?this._deleteAllFl():a.length!==0&&s.length===0&&this._addFloatPoint();for(;h<l;h++)(function(e,t){var n=s.eq(e),r=a[e],i=r.to==undefined?"0":"1",o=n.length===0?"0":"1",u=i+o;switch(u){case"00":break;case"01":t._mvNumToUn.call(t,r.from,undefined,n);break;case"10":t._mvUnToNum.call(t,undefined,r.to,"float");break;case"11":t._mvNumToNum.call(t,r.from,r.to,n)}})(h,this);r&&this.$el.find(".oas-digit-number").length===0&&this.$el.find(".oas-number-roll-val").after(e({type:"digit",name:r.unit})),this._setCurrentNum(n)},_deleteAllFl:function(){this.$el.find(".oas-float-number").remove(),this.$el.find(".oas-fl-point-number").remove()},_addFloatPoint:function(){var e=n({type:"fl-point"});this.$el.find(".oas-number-roll-val").before(e)},_mvNumToNum:function(e,t,n){var r=e-0,i=0-t,s=this.numHeight;if(e===t){n.find(".oas-number-content").removeClass("hide");return}n.find(".oas-other").removeClass("hide"),n.find(".oas-number-content").addClass("hide"),n.find(".oas-other").animate({top:this.numHeight*i},function(){n.find(".oas-number-content").text(-i),n.find(".oas-number-content").removeClass("hide"),n.find(".oas-other").addClass("hide")})},_mvUnToNum:function(e,n,r){var i=this.$el,r=r||"integer",s=$(t({type:r}));r==="integer"?i.find(".oas-number").eq(0).before(s):i.find(".oas-number-roll-val").before(s),i.find(".oas-other").removeClass("hide");if(n!==","){var o=0-n;s.find(".oas-other").animate({top:this.numHeight*o},function(){s.find(".oas-number-content").text(-o||n),s.find(".oas-number-content").removeClass("hide"),i.find(".oas-other").addClass("hide")})}else s.addClass("oas-number-comma"),s.find(".oas-other").css("top",-this.numHeight*10),s.find(".oas-number-content").text(-o||n),s.find(".oas-number-content").removeClass("hide"),i.find(".oas-other").addClass("hide")},_mvNumToUn:function(e,t,n){n.remove()},_compare:function(e,t){var n=this._numberToObj(e),r=n.flArr,i=n.itgArr,s=this._numberToObj(t),o=s.flArr,u=s.itgArr,a=0,f=0,l=[],c=[],h=Math.max(i.length,u.length),p=Math.max(r.length,o.length),d=this._getCompareObj(i,u,h),v=this._getCompareObj(r,o,p);return{itgChangeObj:d,flChangeObj:v}},_getCompareObj:function(e,t,n){var r=0,i=[];for(;r<n;r++){if(r===e){for(;r<t.lenth;r++)i.push({index:r,from:undefined,to:endObjItgArr[r]});break}if(r===t){for(;r<e.lenth;r++)i.push({index:r,from:e[r],to:undefined});break}i.push(this._computeChange(e[r],t[r],r))}return i},_numberToObj:function(e){var t=String(e),n=t.split("."),r=n.length===2?n[1]:"",i=this._isNeedComma()?this._addComma(n[0]):this._reverseString(n[0]);return{flArr:this._stringToArr(r),itgArr:this._stringToArr(i)}},_reverseString:function(e){return e.split("").reverse().join("")},_isNeedComma:function(){return this.options.comma},_addComma:function(e){var t=this._stringToArr(e).reverse(),n="";for(var r=0,i=t.length;r<i;r++)r!==0&&r%3==0&&(n+=","),n+=t[r];return n},_computeChange:function(e,t,n){return{index:n,from:e,to:t}},_stringToArr:function(e){return e.split("")},_getCurrentNum:function(){return this.currentNum||0},_setCurrentNum:function(e){this.currentNum=e,this.$el.find(".oas-number-roll-val").val(e)},invoke:{setNumber:function(e){this._moveTo(this.currentNum,e)},getNumber:function(){return this._getCurrentNum()}}})});