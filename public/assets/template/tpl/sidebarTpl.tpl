{{each data}}
	<li class="{{if thisUser == $value.uid}}curr-user{{/if}}" data-uid="{{$value.uid}}" data-rname="{{$value.rname}}" 
	data-action="editSbd"
	title="{{$value.rname}}"
	>{{$value.rname}}</li>
{{/each}}