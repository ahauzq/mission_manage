<table class="oas-grid-table">
    <colgroup>
      {{each headCenter}}	          
          <col width="{{if isStickWidth&&(!$value.isStickWidth)}}*{{else}}{{$value.width}}{{/if}}">
      {{/each}}
    </colgroup>
	<thead>
		<tr>
			{{each headCenter}}
				<th{{if $value.title}} title="{{$value.title}}"{{/if}}{{if   
				    $value.name}} name="{{$value.name}}"{{/if}}>
					<div class="oas-grid-th" style="min-width:{{$value.width}}px">{{#$value.label}}{{if $value.sort}}<a class="sort-icon oasicon oasicon-{{$value.sort}}" href="javascript:;"></a>{{/if}}</div>
				</th>
			{{/each}}
		</tr>
	</thead>
</table>