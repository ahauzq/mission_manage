
<div class="task-wrap">
	<h1>任务：</h1>
	{{each $data}}
	<p>{{$index+1}}.
		<span class="proName">{{$value.t_project.proName}}</span>&nbsp;-&nbsp;
		<span class="depName">{{$value.t_project.t_department.depName}}</span>&nbsp;-&nbsp;
		<span class="taskCont">{{$value.taskCont}}</span>&nbsp;-&nbsp;
		<span class="taskTime">{{$value.taskTime}}</span>
		</p>
	{{/each}}
</div>

