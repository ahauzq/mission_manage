
<!-- 左边固定列部分 -->
{{if checkbox === true || (headFront.length>0)}}
   <div class="grid-front-fixed">
      <table>
         <colgroup>
          {{if checkbox === true }}
              <col width="40px">
          {{/if}}
	      {{each headFront}}	          
              <col width="{{$value.width}}">
	      {{/each}}
         </colgroup>
         <thead>
            <tr>
               {{if checkbox === true }}
                    <th class="oas-grid-checkbox"><div class="oas-grid-th"><input type="checkbox" /></div></th>
               {{/if}}
               {{each headFront}}
                    <th{{if $value.title}} title="{{$value.title}}"{{/if}}{{if $value.name}} name="{{$value.name}}"{{/if}}>
						<div class="oas-grid-th">
						      {{#$value.label}}
						      {{if $value.sort}}
						            <a class="sort-icon oasicon oasicon-{{$value.sort}}" href="javascript:;"></a>
						      {{/if}}
						</div>
				    </th>
				{{/each}}
			</tr>
		 </thead>
	  </table>
	</div>
{{/if}}
<!-- 中间表格部分 -->
<div class="grid-main">
   <table>
      <colgroup>
	      {{each headCenter}}	          
              <col width="{{if $value.minWidth}}*{{else}}{{$value.width}}{{/if}}">
	      {{/each}}
       </colgroup>
	  <thead>
		 <tr>
			 {{each headCenter}}
					<th{{if $value.title}} title="{{$value.title}}"{{/if}}{{if   
					    $value.name}} name="{{$value.name}}"{{/if}}>
						<div class="oas-grid-th"><span class="oas-col-line"></span>{{#$value.label}}{{if $value.sort}}<a class="sort-icon oasicon oasicon-{{$value.sort}}" href="javascript:;"></a>{{/if}}</div>
					</th>
			 {{/each}}
		  </tr>
	  </thead>
   </table>
</div>
<!-- 右边固定列部分 -->
{{if colOpts.data || (headFinale.length>0)}}
	<div class="grid-finale-fixed">
		<table>
		    <colgroup>
		      {{each headFinale}}	          
	              <col width="{{$value.width}}">
		      {{/each}}
		      {{if colOpts.data }}
	              <col width="{{colOptsWidth}}">
	          {{/if}}
            </colgroup>
			<thead>
				<tr>
				  {{each headFinale}}
					<th{{if $value.title}} title="{{$value.title}}"{{/if}}{{if 
					    $value.name}} name="{{$value.name}}"{{/if}}>
						<div class="oas-grid-th">{{#$value.label}}{{if $value.sort}}<a class="sort-icon oasicon oasicon-{{$value.sort}}" href="javascript:;"></a>{{/if}}</div>
					</th>
				  {{/each}}
				  {{if colOpts.data }}
					<th class="oas-grid-operator oas-grid-operator-{{colOpts.type}}">
						<div class="oas-grid-th">操作</div>
					</th>
				  {{/if}}
				</tr>
			</thead>
		</table>
	</div>
{{/if}}