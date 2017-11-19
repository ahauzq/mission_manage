<table class="oas-calendar-year-table">
	<tbody>
		</tr>
		{{each arr as yearObj index}}
		{{if index%4==0}}
		<tr>
		{{/if}}
			<td class="table-year-item {{if yearObj.disableState===false}}disable-item{{/if}}" data-year={{yearObj.year}}>
				<div>{{yearObj.year}}</div>
			</td>
		{{if index%4==3}}
		</tr>
		{{/if}}
		{{/each}}
	</tbody>
</table>