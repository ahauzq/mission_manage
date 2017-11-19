<form class="form-horizontal" role="form">
	<div class="form-group">
	    <label for="projectName" class="col-sm-3 control-label"><span class="text-danger">*</span>项目名称：</label>
	    <div class="col-sm-offset-3">
	    	<div class="select-project"></div>
	    </div>
	</div>
	<div class="form-group">
		<label for="projectCont" class="col-sm-3 control-label"><span class="text-danger">*</span>任务内容：</label>
	    <div class="col-sm-offset-3">
	      <textarea class="form-control" name="projectCont" id="projectCont" ></textarea>
	    </div>
	</div>
	<div class="form-group">
		<label for="taskTime" class="col-sm-3 control-label"><span class="text-danger">*</span>任务类型：</label>
	    <div class="col-sm-offset-3">
	     	<a class="btn btn-default TaskType-select real"  tasktype="real" data-action="selectTaskType">实际任务</a>
        	<a class="btn btn-default TaskType-select plan"  tasktype="plan" data-action="selectTaskType">计划任务</a>
	    </div>
	</div>
	<div class="form-group">
		<label for="taskTime" class="col-sm-3 control-label"><span class="text-danger">*</span>任务耗时：</label>
	    <div class="col-sm-offset-3">
	      <input type="text" name="taskTime" class="form-control" id="taskTime" placeholder="请输入工时">
	      <i class="oasicon oasicon-help" data-oaspopover-placement="left" data-oaspopover-content="实际任务满额工时7.5/天，计划工时无限制" data-oaspopover-trigger="hover"></i>
	    </div>
	</div>
</form>