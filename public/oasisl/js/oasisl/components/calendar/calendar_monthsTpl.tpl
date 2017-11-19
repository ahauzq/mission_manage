<table class="oas-calendar-month-table">
	<tbody>
		</tr>
		{{each arr as monthObj index}}
		{{if index%4==0}}
		<tr>
		{{/if}}
			<td class="table-month-item {{if monthObj.disableState===false}}disable-item{{/if}}" data-month={{monthObj.month}} data-year={{monthObj.year}}>
				<div>{{monthObj.name}}</div>
			</td>
		{{if index%4==3}}
		</tr>
		{{/if}}
		{{/each}}
	</tbody>
</table>