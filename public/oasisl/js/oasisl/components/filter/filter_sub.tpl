<div class="oas-connection-item">
	<span class="labels"><i class="oasicon oasicon-swerve"></i></span>
	{{each list}}
	<label class="oas-choose-btn" data-id="{{$value.id}}" data-name="{{$value.name}}"><input type="checkbox">{{$value.label}}</label>
	{{/each}}
	<button class="btn btn-default btn-sm mixchoose-btn"><i class="glyphicon glyphicon-plus"></i>多选</button>
	<a href="javascript:;" class="mixchoose-quit">[退出多选]</a>
	<button class="btn btn-default btn-sm mixchoose-confirm">确定</button>
</div>