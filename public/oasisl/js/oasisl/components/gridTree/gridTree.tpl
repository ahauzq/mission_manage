<tr tid="{{$data.node.id}}" tlevel="{{$data.node.level}}" pid="{{$data.node.pid}}" isparent="{{""+$data.node.isParent}}" class="{{if $data.node.isOpen}}open{{/if}}{{if $data.node.isHide}} tr-hide{{/if}}">
	{{each $data.data}}
		{{if $index == 0}}
			<td style="padding-left:{{($value.level + 1) * 15 + 10}}px" class="td-first">
				<a href="javascript:;">
					<i class="toggle-icon{{if !$value.isParent}} hide{{/if}}"></i>
					<i class="{{$value.icon}}" use="icon"></i>
					<span class="{{if $value.isParent == true}}deep{{/if}}">{{$value.label}}</span>
				</a>
			</td>	
		{{else}}
			<td>{{#$value}}</td>
		{{/if}}
	{{/each}}
</tr>