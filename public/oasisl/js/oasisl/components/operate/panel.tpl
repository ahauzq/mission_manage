{{if level == 0}}
   <div class="operate-arrow top-arrow"></div>
{{/if}}
<ul class="{{if level == 1}}second-menu oas-operate open{{/if}}{{if level == 0}}first-menu{{/if}}{{if level == 2}}third-menu oas-operate open{{/if}} {{if layout.horizontal == "right"}} to-right{{/if}}{{if layout.horizontal == "left"}} to-left{{/if}}{{if layout.vertical == "bottom"}} to-bottom{{/if}}{{if layout.vertical == "top"}} to-top{{/if}}">
	{{each list}}
		{{if level != 0}}
			{{if $value.hasChild != true}}
				<li index={{$index}} id="{{$value.id}}" class="{{if $value.disable == true}} oas-disable{{/if}}" {{if $value.title != null}}title="{{$value.title}}"{{/if}}><a href="javascript:;" class="oasicon {{$value.iconClass}}"></a><a href="javascript:;">{{$value.text}}</a></li>
			{{else}}
				<li index={{$index}} id="{{$value.id}}" class="{{if $value.disable == true}} oas-disable{{/if}}" {{if $value.title != null}}title="{{$value.title}}"{{/if}}><a href="javascript:;" class="oasicon {{$value.iconClass}}"></a><a href="javascript:;">{{$value.text}}</a><a href="javascript:;" class="oasicon oasicon-arrow-right"></a></li>
			{{/if}}
		{{else}}
			{{if $value.hasChild != true}}
				<li index={{$index}} {{if $value.copyContent != null}}copycontent="{{$value.copyContent}}"{{/if}} id="{{$value.id}}" class="{{if $value.disable == true}} oas-disable{{/if}}" {{if $value.title != null}}title="{{$value.title}}"{{/if}}><a href="javascript:;" class="oasicon {{$value.iconClass}}"></a><a href="javascript:;">{{$value.text}}</a></li>
			{{/if}}
		{{/if}}
	{{/each}}
</ul>
{{if hasChild == true && level == 0}}
	<ul class="{{if level == 0}}expand-menu{{/if}}">
	{{each list}}
		{{if $value.hasChild == true}}
			<li index={{$index}} id="{{$value.id}}" class="{{if $value.disable == true}} oas-disable{{/if}}" {{if $value.title != null}}title="{{$value.title}}"{{/if}}>
				<a href="javascript:;" class="oasicon {{$value.iconClass}}"></a>
				<a href="javascript:;">{{$value.text}}</a>
				<a href="javascript:;" class="oasicon oasicon-arrow-right"></a>
			</li>
		{{/if}}
	{{/each}}
	</ul>
{{/if}}