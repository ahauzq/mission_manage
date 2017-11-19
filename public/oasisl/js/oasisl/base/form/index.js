define(["util","oasEventAction","jquery","oasCalendar"],function(e,t){"use strict";var n=function(t){var n="yyyy-MM-dd";return e.dateFormat(t[0],n)+"  -  "+e.dateFormat(t[1],n)},r={365:function(){var t=e.time.getNearOneYear();return n(t)},180:function(){var t=e.time.getNearHalfYear();return n(t)},90:function(){var t=e.time.getNearThreeMonths();return n(t)},30:function(){var t=e.time.getNearOneMonth();return n(t)},7:function(){var t=e.time.getNearOneWeek();return n(t)},3:function(){var t=e.time.getNearThreeDays();return n(t)},"-365":function(){var t=e.time.getFutureOneYear();return n(t)},"-180":function(){var t=e.time.getFutureHalfYear();return n(t)},"-90":function(){var t=e.time.getFutureThreeMonths();return n(t)},"-30":function(){var t=e.time.getFutureOneMonth();return n(t)},"-7":function(){var t=e.time.getFutureOneWeek();return n(t)},"-3":function(){var t=e.time.getFutureThreeDays();return n(t)}};$(document).on("click","form .oas-single-select .oas-single-select-item",function(){var t=$(this).find("a"),n=$(this).data("time-range"),i=$(this).closest(".oas-single-select").find(".oas-user-define-range"),s=$(this).closest(".oas-single-select").find(".oas-user-define-text");t.hasClass("oas-user-define-time-range")?(i.css("display","inline"),s.css("display","none"),s.text(""),i.data("oasCalendar")||i.oasCalendar({type:"range"})):t.hasClass("oas-user-define-time-end")?(i.css("display","inline"),s.css("display","none"),s.text(""),i.data("oasCalendar")||i.find("input").oasCalendar({range:[new Date,new Date(2100,0,1)]}),i.find(".oas-user-define-range-start").text(e.dateFormat(new Date,"yyyy-MM-dd"))):n!=="infinite"&&n!==undefined?(i.css("display","none"),s.css("display","inline"),s.text(r[n]())):(i.css("display","none"),s.css("display","none"),s.text("")),$(this).siblings().find("a").removeClass("active"),t.addClass("active")}),$(document).on("click","form .oas-muti-select a",function(){var e=$(this);e.toggleClass("active")});var i='<a class="btn btn-default" data-action="clone-delete">删除</a>';t.add({"clone-add":function(){var e=$(this).closest(".oas-clone-input"),t,n,r='<div class="row"><a class="btn btn-default" data-action="clone-add">添加</a></div>',s;e.data("cloneStatus")||(e.data("cloneStatus",!0),n=e.find(".oas-clone-wrap").clone(),n.find("input[type='text']").val("").end().find("textarea").val("").end().find("input[type='checkbox']").prop("checked",!1),e.data("cloneDom",n)),t=e.data("cloneDom").clone(),s=$(r),s.find("a").before(t),e.find(".row").eq(0).find('a[data-action="clone-add"]').remove().end().find(".oas-clone-wrap").after(i).end().before(s)},"clone-delete":function(){var e=$(this).closest(".row");e.remove()}})});