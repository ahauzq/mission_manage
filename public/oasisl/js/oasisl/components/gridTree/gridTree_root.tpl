<table class="oasGridTree">
	<thead>
		<tr>
			{{each $data.head}}
				<th>{{#$value.label}}</th>
			{{/each}}
		</tr>
	</thead>
	<tbody>
		{{if $data.hasRoot && !$data.nodata}}
		<tr class="gridTree-root open">
			{{each $data.head}}
				{{if $index == 0}}
					<td class="td-root">
						<a href="javascript:;">
							<i class="toggle-icon toggle"></i>
							<i class="{{$data.root.icon}}" use="icon"></i>
							<span>{{$data.root.label}}</span>
						</a>
					</td>
				{{else}}
					<td>{{$data.root[$value.name]}}</td>
				{{/if}}
			{{/each}}
		</tr>
		{{/if}}
		{{if $data.nodata}}
			<tr>
				<td colspan="{{$data.head.length}}"><div class="oas-no-data{{if $data.noDataStyle == 0}} oas-min-style{{/if}}"><span class="oas-no-dataImg"></span><span class="oas-no-dataTip">对不起，暂无数据</span></div></td>
			</tr>
		{{/if}}
	</tbody>
</table>