{{each list}}
<div class="seachbox-item">
	<div class="oas-connection-item" data-name="{{$value.name}}" data-id="{{$value.id}}">
		<span class="labels">{{$value.label}}：</span>
		{{each $value.children}}
		<label class="oas-choose-btn" data-id="{{$value.id}}" data-name="{{$value.name}}"><input type="checkbox">{{$value.label}}</label>
		{{/each}}
		<button class="btn btn-default btn-sm mixchoose-btn"><i class="glyphicon glyphicon-plus"></i>多选</button>
		<a href="javascript:;" class="mixchoose-quit">[退出多选]</a>
		<button class="btn btn-default btn-sm mixchoose-confirm">确定</button>
	</div>
</div>
{{/each}}