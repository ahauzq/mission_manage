

<div class="time-select form-group clearfix">
    <label class="col-sm-2 control-label" style="">时段选择：</label>
    <div class="col-sm-10 clearfix">
        <a class="btn btn-default active"  data-time-range="7" data-action="timeSelect">近一周</a>
        <a class="btn btn-default"  data-time-range="30" data-action="timeSelect">近一月</a>
        <a class="btn btn-default"  data-time-range="90" data-action="timeSelect">近三月</a>
        <a class="btn btn-default"  data-time-range="-1" data-action="timeSelect">自定义</a>
    </div>
</div>
<div class="date-select form-group clearfix">
    <label class="col-sm-2 control-label" style="padding-left：0!important">日期选择：</label>
    <div class="col-sm-10 ">
    	<div id="range" class="" style="display: none"> 
			<input type="text" id="startTimeChose" readonly="readonly"> -&nbsp; 
			<input type="text" id="endTimeChose" readonly="readonly">
		</div>
        <div id="timeDis" class=""> 
        </div>
    </div>
</div>