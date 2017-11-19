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