<div class="associate-arrow top-arrow">
</div>
<div class="associate-bd oas-scroll-webkit {{if isNoData == true}}no-bottom{{/if}}">
	{{if isNoData == true}}
		{{if blankDom == ""}}
			<div class="ellipsis">
			    {{nodataTip}}
            </div>   
        {{else}}  
        	<div class="ellipsis">
				{{nodataTip}}
            </div>   
        	<div class="no-data-style">
				{{#blankDom}}
            </div>  
        {{/if}}
	{{else}}
		<div>
			<ul>
				{{each list}}
					<li class="associate-item" index={{$index}} title="{{$value.title}}">{{#$value.label}}</li>
				{{/each}}
			</ul>
		</div>
	{{/if}}
</div>
<div class="associate-ft {{if isNoData == true}}hide{{/if}}">
	<div class="associate-pagin" data-oas-pagin-type="simple" data-oaspagin-skipto="false" data-oaspagin-size="sm">
	</div>
</div>
<div class="associate-loading">
	<div class="oas-local-loading clearfx">
	     <span class="loading"></span>
	     <span class="loading-text">数据读取中....</span>
	</div>
</div>