define(["oasDialog"],function(e){var t={openMap:function(t){var t=t||{},n=t.width||"100%",r=t.height||"100%",i=window.oasisl_path||"";e.open({title:"地图",type:2,html:!0,maxmin:!0,area:[n,r],content:i+"/oasisl/js/plugins/oasis-map/map.html",success:function(e){var n=$(e).find("iframe")[0].contentWindow,r=n.document;$(r).ready(function(){var e=r.createElement("script");r.body.appendChild(e),e.src=t.gis+"?async=yes"||"http://172.16.29.61:9150/FHGis/api/js?async=yes",n.innerFunction(t)})}})}};return t});