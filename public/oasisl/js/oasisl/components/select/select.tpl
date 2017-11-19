<div class="select-hd{{if disabled}} disabled{{/if}}{{if chosen}} selected{{/if}}" role="button" data-target="#">
	{{if chosen}}
		{{if chosen.renderData}}
			{{#chosen.renderData}}
		{{else}}
			<span class="select-value">{{chosen.text}}</span>
			<span class="select-comment">{{chosen.comment}}</span>
		{{/if}}
	{{else}}
		{{placeholder}}
	{{/if}}
	<a class ="oasicon oasicon-desc"></a>
</div>
<div class="oas-select-bd dropdown-menu" role="menu">
	<ul class="select-bd">
		{{each list}}
			{{if $value.children}}
				<li class="select-optgroup-li">
					<strong class="group-value">{{$value.text}}</strong>
					<ul>
						{{each $value.children}}
							<li class="select-bd-li{{if $value.selected}} focus{{/if}}{{if $value.disabled}} disabled{{/if}}" {{if $value.disabled}} disabled{{/if}}>	
								{{if $value.renderData}}
									{{#$value.renderData}}
								{{else}}
									<span class="option-value{{if $value.disabled}} oas-text-disable{{/if}}>">{{$value.text}}</span>
									<span class="option-comment">{{$value.comment}}</span>
								{{/if}}
							</li>
						{{/each}}
					</ul>
				</li>
			{{else}}
				<li class="select-bd-li{{if $value.selected}} focus{{/if}}{{if $value.disabled}} disabled{{/if}}" {{if $value.disabled}} disabled{{/if}}>	
					{{if $value.renderData}}
						{{#$value.renderData}}
					{{else}}
						<span class="option-value{{if $value.disabled}} oas-text-disable{{/if}}>">{{$value.text}}</span>
						<span class="option-comment">{{$value.comment}}</span>
					{{/if}}
				</li>
			{{/if}}
		{{/each}}
	</ul>
</div>