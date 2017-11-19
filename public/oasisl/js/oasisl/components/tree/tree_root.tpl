{{if $data.hasRoot && !$data.nodata}}
<div class="oastree-root{{if $data.root.disabled == true}} node-disabled{{/if}}">
	<a href="javascript:;" class="{{if $data.root.selected}}current{{/if}}"> <i class="{{if $data.root.icon && $data.root.icon.length > 0}}{{$data.root.icon}}{{else}}oasicon oasicon-folder{{/if}}"></i> <span>{{$data.root.label}}</span></a>
	<span class="{{if $data.showLine}}show{{/if}}{{if $data.lg}} lg{{/if}}">{{if !$data.multiTop && $data.lg}}<i></i>{{/if}}</span>
</div>
{{/if}}
{{if $data.nodata}}
<div class="oas-no-data{{if $data.noDataStyle == 0}} oas-min-style{{/if}}"> <span class="oas-no-dataImg"></span><span class="oas-no-dataTip">对不起，暂无数据</span></div>
{{else}}
<ul class="oastree-nodes"></ul>
{{/if}}
