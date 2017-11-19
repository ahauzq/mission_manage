<div>
	<ul>
		{{each list}}
			<li class="associate-item" index={{$index}} title="{{$value.title}}">{{#$value.label}}</li>
		{{/each}}
	</ul>
</div>