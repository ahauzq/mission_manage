<table class="oas-calendar-day-table">
	<thead>
		{{each week as weekObj index}}
		<th class="week-name">{{weekObj.weekName}}</th>
		{{/each}}
	</thead>
	<tbody>
		</tr>
		{{each arr as dayObj index}}
		{{if index%7==0}}
		<tr>
		{{/if}}
			<td class="{{dayObj.type}}-month-day {{if dayObj.disableState===false}}disable-item{{/if}}" data-year="{{dayObj.year}}" data-month="{{dayObj.month}}" data-date="{{dayObj.date}}">
				<div>{{dayObj.date}}</div>
			</td>
		{{if index%7==6}}
		</tr>
		{{/if}}
		{{/each}}
	</tbody>
</table>