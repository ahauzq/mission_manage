{{if isStatic!=true}}
<div class="oas-calendar oas-calendar-id{{time}}">
{{/if}}
	<div class="oas-calendar-wrap">
		<div class="oas-calendar-hd month-type clearfix">
			<div class="oas-calendar-pre">
				<span class="oasicon oasicon-arrow-left"></span>
			</div>
			<div class="oas-calendar-year-month">
				<span class="oas-calendar-month-wrap">
					<span class="oas-calendar-month-number">{{month}}</span>
					月</span>
				<span class="oas-calendar-year-wrap">
					<span class="oas-calendar-year-number">{{year}}</span>
					年</span>
				<span class="oas-calendar-ten-year-wrap">
					<span class="oas-calendar-start-year-number">{{startYear}}</span>
					-
					<span class="oas-calendar-end-year-number">{{endYear}}</span>
				</span>
			</div>
			<div class="oas-calendar-next">
				<span class="oasicon oasicon-arrow-right"></span>
			</div>
		</div>
		<div class="oas-calendar-bd">
			<div class="oas-calendar-select-table"></div>
			{{if isShowTime===true}}
			<div class="oas-calendar-time-select">
				<ul class="oas-calendar-time-wrap clearfix">
					<li class="oas-calendar-time-item">
						<input class="oas-calendar-time-item-hour" type="text" maxlength="2" data-max-number="23">
						<span class="oas-calendar-time-item-name">时</span>
					</li>
					<li class="oas-calendar-time-split">:</li>
					<li class="oas-calendar-time-item">
						<input class="oas-calendar-time-item-minute" type="text" maxlength="2" data-max-number="59">
						<span class="oas-calendar-time-item-name">分</span>
					</li>
					<li class="oas-calendar-time-split">:</li>
					<li class="oas-calendar-time-item">
						<input class="oas-calendar-time-item-second" type="text" maxlength="2" data-max-number="59">
						<span class="oas-calendar-time-item-name">秒</span>
					</li>
				</ul>
				<div class="oas-calendar-time-quick-select-wrap">
					<ul class="oas-calendar-time-quick-select oas-calendar-time-quick-select-hour clearfix"> 
						{{each hours as h index}}
						<li data-select-hour="{{index}}">
							<div>{{index}}</div>
						</li>
						{{/each}}
						<div class="arrow"></div>
					</ul>
				</div>
				<div class="oas-calendar-time-quick-select-wrap">
					<ul class="oas-calendar-time-quick-select oas-calendar-time-quick-select-minute clearfix">
						{{each minutes as m index}}
						<li data-select-minute="{{index*5}}">
							<div>{{index*5}}</div>
						</li>
						{{/each}}
						<div class="arrow"></div>
					</ul>
				</div>
				<div class="oas-calendar-time-quick-select-wrap">
					<ul class="oas-calendar-time-quick-select oas-calendar-time-quick-select-second clearfix">
						{{each seconds as s index}}
						<li data-select-second="{{index*5}}">
							<div>{{index*5}}</div>
						</li>
						{{/each}}
						<div class="arrow"></div>
					</ul>
				</div>
			</div>
			{{/if}}
		</div>
		{{if isStatic!=true}}
		<div class="oas-calendar-ft">
			<div class="oas-calendar-ft-wrap clearfix">
				<span class="oas-calendar-opt-clear">清空</span>
				<span class="oas-calendar-opt-today">当前</span>
				<span class="oas-calendar-opt-confirm">确定</span>
			</div>
		</div>
		{{/if}}
	</div>
{{if isStatic!=true}}
</div>
{{/if}}