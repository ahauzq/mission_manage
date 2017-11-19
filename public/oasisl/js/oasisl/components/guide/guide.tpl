<ul class="clearfix">
	{{each data}}
	<li class="{{if $index == current-1}}oas-guide-active {{/if}}{{if $index == current -2}}guide-active-prev {{/if}} {{if $index < current -1}}oas-guide-complete {{/if}}{{if $index == data.length-1}}last{{/if}}" title="{{$value.title}}">
		<span class="guide-number">
			<span>{{$index+1}}</span>
			<i class="oasicon oasicon-succeed"></i>
		</span>
		<span class="guide-text">{{$value.label}}</span>
	</li>
	{{/each}}
</ul>