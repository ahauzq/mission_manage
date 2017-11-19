<div class="date-wrap clearfix">
	{{each $data.month as month index}}
	<div class="month">
		<div class="month-header">{{month}}月 / {{year[index]}}</div>
		<div class="month-date">
			<ul class="clearfix">{{$data.dateNum[index]}}</ul>
		</div>
		
	</div>
	{{/each}}
</div>
<div class="task-wrap clearfix">
	{{each $data.month as month index}}
	<div class="month">
		<div class="month-details">
			{{each $data.tasks}}
			<div class="person-details" data-uid="{{$value.uid}}">
				<ul classs="clearfix"></ul>
			</div>
			{{/each}}
		</div>
	</div>
	{{/each}}
</div>

