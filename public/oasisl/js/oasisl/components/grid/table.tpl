<div class="oas-grid">
   <!-- 表格顶部操作区域 -->

  <!-- 现在就只有一个定制按钮，后面的功能 -->
  {{if opts!== null || settings.filter}}
   <div class="oas-grid-head">
        <div class="oas-grid-optBar clearfix">
          {{if opts !== null}}
    				<div class="oas-grid-option">
    					{{each opts}}
    					    <a class="btn btn-sm btn-default{{if $value.className}} {{$value.className}}{{/if}} oas-grid-opt-btn{{if $value.disable}} disabled{{/if}}"{{if $value.id}} id="{{$value.id}}"{{/if}}{{if $value.title}} title="{{$value.title}}"{{/if}} href="{{if $value.href}}{{$value.href}}{{else}}javascript:;{{/if}}">
    								<i class="{{$value.icon}}"></i>
    								<span class="btn-text">{{$value.label}}</span>
    					    </a>
    					{{/each}}
    				</div>
    			{{/if}}
          {{if settings.filter}}
            <div class="oas-grid-setting clearfix">
               {{if settings.filter === true}}
                  <div class="form-inline">
                     <div class="oas-grid-search">
                        <div class="form-group">
                            <div class="input-group">
                              <input  type="text" id="grid-search-input" class="form-control input-sm" placeholder="{{if settings.filterWords}}{{settings.filterWords}}{{else}}输入您想查询的关键词{{/if}}">
                              <a id="grid-search-btn" class="btn btn-sm btn-default input-group-addon" href="javascript:;">查询</a>
                            </div>
                       </div>
                    </div>
                  </div>
               {{/if}}
            </div>
          {{/if}}
		    </div>
   </div>
  {{/if}}
   <!-- 表头部分 -->
   <div class="oas-grid-thead">
   </div>
   <!-- 表体部分 -->
   <div class="oas-grid-tbody">
   </div>
   <!-- 滚动条部分 -->
   <div class="oas-grid-scroll-h"><div></div></div>
</div>