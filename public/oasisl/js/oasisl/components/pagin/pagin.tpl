{{if type == "normal"}}
<ul class="pagination">
  <li class="pagin-btn prev{{if current === 1}} disabled{{/if}}"><a href="javascript:;">上一页</a></li>
  {{each list}}
  	{{if $value === current}}
  	<li class="active pagin-no"><a href="javascript:;">{{$value}}<span class="sr-only">(current)</span></a></li>
  	{{else if $value == '...'}}
  	<li><span class="ellipsis">...</span></li>
  	{{else}}
  	<li class="pagin-no"><a href="javascript:;">{{$value}}</a></li>
  	{{/if}}
  {{/each}}
  {{if skipto === true}}
  <li><input type="text" class="page-go form-control" placeholder="{{current}}/{{totalPages}}页"></li>
  {{/if}}
  <li class="pagin-btn next{{if current === totalPages}} disabled{{/if}}"><a href="javascript:;">下一页</a></li>
</ul>
{{if showMsg}}
<div class="pagin-text">
	共&nbsp;<span>{{total}}</span>&nbsp;条记录，当前显示&nbsp;<span>{{startItems}}-{{if endItems > total}}{{total}}{{else}}{{endItems}}{{/if}}</span>&nbsp;条
</div>
{{/if}}
{{if setPageItems === true}}
<div class="btn-group dropdown">
  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="oasDropdown">
    每页&nbsp;{{pageItems}}&nbsp;条 <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" role="menu">
    {{each customPageItems}}
    <li><a href="javascript:;">每页&nbsp;{{$value}}&nbsp;条</a></li>
    {{/each}}
  </ul>
</div>
{{/if}}
{{else}}
<ul class="pagination ">
  <li class="pagin-btn prev{{if current === 1}} disabled{{/if}}"><a href="javascript:;"><i class="glyphicon glyphicon-chevron-left"></i></a></li>
  <li><input type="text" class="page-go form-control" placeholder="{{current}}/{{totalPages}}页"></li>
  <li class="pagin-btn next{{if current === totalPages}} disabled{{/if}}"><a href="javascript:;"><i class="glyphicon glyphicon-chevron-right"></i></a></li>
</ul>
{{/if}}