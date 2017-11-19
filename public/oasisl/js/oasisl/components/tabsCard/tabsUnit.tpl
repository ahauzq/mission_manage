{{if data.label}}
  <div class="oas-tabsCard-top">
   <span class="tab-img {{data.label.imageClass}}"/></span>
   {{if data.label.statusClass}}
      <span class="tab-ramark {{data.label.statusClass}}"></span>
   {{/if}}
   {{if data.label.text || data.label.subText }}
     <ul class="tab-texts">
       {{if data.label.text}}
        <li class="tab-text">
          {{if data.label.text.key}}
            <span class="text-key">{{data.label.text.key}}：</span>
          {{/if}}
          {{if data.label.text.value}}
            <span class="text-value">{{data.label.text.value}}</span>
          {{/if}}
        </li>
       {{/if}}
       {{if data.label.subText}}
        <li class="tab-subtext">
          {{if data.label.subText.key}}
            <span class="text-key">{{data.label.subText.key}}：</span>
          {{/if}}
          {{if data.label.subText.value}}
            <span class="text-value">{{data.label.subText.value}}</span>
          {{/if}}
        </li>
       {{/if}}
     </ul>
   {{/if}}
  </div>
{{/if}}
{{if data.content}}
<div class="oas-tabsCard-main">{{#data.content}}</div>
{{/if}}