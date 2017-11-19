
   {{if data.tabsCardHead}}
   <div class="oas-tabsCard-title">
       {{if data.tabsCardHead.isCloseBtn}}<a href="javascript:;" class="oasicon oasicon-delete title-btn delete-btn"></a>{{/if}}
       {{if data.tabsCardHead.isCopyBtn}}<a href="javascript:;" class="oasicon oasicon-copy title-btn copy-btn"></a>{{/if}}
       <h3>{{data.tabsCardHead.title}}</h3>
   </div>
   {{/if}}
   <div class="oas-tabsCard-content">
   {{if data.tabsCardBody}}
      {{if data.tabsCardBody.content}}
          {{#data.tabsCardBody.content}}
      {{else if data.tabsCardBody.tabs}}
       <div class="oas-tabsCard-tabs">
           <div class="oas-tabs-hd">
              <ul>
                {{each data.tabsCardBody.tabs}} 
                   <li><a href="javascript:;">{{$value.title}}</a></li>
                 {{/each}} 
              </ul>
           </div>
           <div class="oas-tabs-bd">
               <!-- 这里放置tab-bd -->
           </div>
       </div>
      {{/if}}
   {{else}}
      <div class="tabsCard-loading"></div>
   {{/if}}
   </div>
   {{if data.tabsCardFooter}}
   <div class="oas-tabsCard-footer">
       {{each data.tabsCardFooter.btns}}
            <button class="btn {{if $value.recommend}}btn-primary{{else}}btn-default{{/if}} btn-sm {{if $value.disable}}disabled{{/if}}">{{if $value.icon}}<i class="{{$value.icon}}"></i>{{/if}}{{if $value.text}}<span>{{$value.text}}</span>{{/if}}</button>
       {{/each}}
   </div>
   {{/if}}