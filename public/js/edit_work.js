define([
		'template',
		'oasEventAction',
		'oasDialog',
        'oasCalendar',
        '/js/baseModel.js',
        '/js/commonTool.js',  // 公用工具
        'text!viewTpl/tpl/add_misson.tpl', // 添加任务 模板
        'text!viewTpl/tpl/generateReport.tpl',
        '/js/moment.min.js',  // 日期处理插件
        // '/js/jquery-ui.min.js',
        '/js/fullcalendar.min.js'
          
],function( template, eventAction, dialog, calendar, model, commonTool, addMissonTpl, generateReportTpl, moment){
    var g_uid = commonTool.getSearchParam().user; // 当前被编辑的uid
    var g_rname = decodeURI(commonTool.getSearchParam().rname); // 当前被编辑的人员姓名
    var g_lastMON = moment().day( 1 - 7 ); // 记录上周一的时间
    var g_currDate = moment().format('YYYY-MM-DD'); // 记录当天日期

    var g_maxTime = {};
	var app = {
		init: function() {
            $('#userName').text(g_rname);
			this._initFullCalendar();
            this._event();
		},
		_initFullCalendar: function() {
            // 获取当天日期
			$('#calendar').fullCalendar({
                header: {
                    left: '',
                    center: 'prev,title,next',
                    right: 'month,basicWeek,basicDay,listWeek'
                },
                titleFormat : 'MM月 / YYYY',
                monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                // dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                today: ["今天"],
                firstDay: 7,
                buttonText: {
                    today: '今天',
                    month: '月视图',
                    basicWeek: '周视图',
                    basicDay: '天视图',
                    listWeek: '本周工作列表',
                },
                
                eventRender: function(evt, el) {
                        el.html(evt.title);
                },
                viewRender: function(view) {
                    g_maxTime = {};
                    var viewStart = $.fullCalendar.formatDate(view.start, "YYYY-MM-DD"); // 视图起始日期
                    var viewEnd = $.fullCalendar.formatDate(view.end, "YYYY-MM-DD"); // 视图截止日期
                    $("#calendar").fullCalendar('removeEvents');
                    // 获取该视图起止日期所有任务
                    model.getTaskById({sTime: viewStart, eTime: viewEnd, uid: g_uid}).then(function(res) {
                        if(res.meta.status == 0) {
                            if(res.data && res.data.length) {
                                var tasks = res.data;
                                // taskType
                                // console.log(tasks);
                                if(tasks && tasks.length) {
                                    $.each(tasks, function (i, v) {
                                        v.start = moment(v.sTime).format('YYYY-MM-DD');
                                        v.end = moment(v.eTime).format('YYYY-MM-DD');
                                        v.id = v.tid; // 以taskid作为id唯一标识
                                        v.backgroundColor = (v.taskType == 'real') ? '#9ee2cb' : '#CBD4E7';
                                        v.title = '<span class="pname">' + v.t_project.proName + '</span>' + ' - ' + '<span class="dname">' + v.t_project.t_department.depName + '</span>' + ' - ' + '<span class="tname">' + v.taskCont + '</span>';
                                        $("#calendar").fullCalendar('renderEvent', v, true);

                                        if(v.taskType == 'real') {
                                             g_maxTime[v.start] =  g_maxTime[v.start] || 0;
                                            g_maxTime[v.start] += v.taskTime;
                                        }
                                    });
                                }
                                
                                for(var i in g_maxTime) {
                                    $('.fc-day-top[data-date=' + i + ']').append('<span class="total-hour">'+ g_maxTime[i] + '</span>');
                                }
                            }  
                        } else {
                            dialog.msg(res.meta.message,{icon: 11});
                        }
                    })
                    // 过期时间段样式处理
                    funcTools.renderBg();
                },
                select: function(start, end, jsEvent, view) {
                    // startTime 在两周内则可选中
                    if (start.isSameOrAfter( g_lastMON, "day" ) ) {
                        dialog.open({
                            title: '添加任务 ' + ' ( ' + moment(start).format('YYYY-MM-DD') + ' - ' + moment(end).add(-1,'days').format('YYYY-MM-DD') + ' )',
                            type: 1,
                            area: ['400px', '350px'],
                            content: template.compile(addMissonTpl)(),
                            btn: ['保存', '取消'],
                            success: function() {
                                // 获取项目列表
                                model.getProjects().then(function(res) {
                                    var projectArr = [];
                                    $.each(res.data,function(i, v) {
                                        var project = {
                                            id: v.pid,
                                            text: v.proName,
                                            dep: v.t_department.depName
                                        }
                                        projectArr.push(project);
                                    })
                                    $('.select-project').oasSelect({data:  projectArr,  width: 230});
                                    $('.form-group .oasicon.oasicon-help').oasPopover({});
                                })
                                // 增加默认工时
                                $('#taskTime').val(end.diff(start,'days')*7.5);
                                if(end.diff(start,'days') > 1) {
                                    $('.TaskType-select.real').hide();
                                    $('.TaskType-select.plan').addClass('active').siblings().removeClass('active');
                                } else {
                                    $('.TaskType-select.real').addClass('active').siblings().removeClass('active');
                                }                          
                            },
                            btn1: function(){
                                var valid = funcTools.validate(start, end, 0);
                                if(valid) {
                                    var pid =  $('.select-project').oasSelect('select').id,
                                        proName = $('.select-project').oasSelect('select').text,
                                        depName = $('.select-project').oasSelect('select').dep,
                                        taskCont = $('#projectCont').val(),
                                        taskTime = $('#taskTime').val() || 0,
                                        title = '<span class="pname">' + proName + '</span>' + ' - ' + '<span class="dname">' + depName + '</span>' + ' - ' + '<span class="tname">' + taskCont + '</span>';
                                        taskType = $('.TaskType-select.active').attr('tasktype'); 
                                        backgroundColor = (taskType == 'real') ? '#9ee2cb' : '#CBD4E7';

                                    var eventData = {
                                        start: moment(start).format('YYYY-MM-DD'),
                                        end: moment(end).format('YYYY-MM-DD'),
                                        taskTime: taskTime, 
                                        pid: pid,
                                        taskCont: taskCont,
                                        uid: g_uid,
                                        title: title,
                                        taskType: taskType,
                                        backgroundColor: backgroundColor
                                    };
                                    // 后台注册任务返回id
                                    model.addTask(eventData).then(function(res) {
                                        eventData.id = res.data.tid;
                                        eventData.tid = res.data.tid;
                                        $('#calendar').fullCalendar('renderEvent', eventData, true);

                                        if(taskType == 'real') {
                                            var currTime = moment(start).format('YYYY-MM-DD');
                                                g_maxTime[currTime] += parseFloat(taskTime);
                                            var $currHourWrap = $('.fc-day-top[data-date=' + currTime + ']');
                                            if($currHourWrap.find('.total-hour').length>0) {
                                                $currHourWrap.find('.total-hour').text(g_maxTime[currTime]);
                                            } else {
                                                $currHourWrap.append('<span class="total-hour">' + g_maxTime[currTime] + '</span>');
                                            }
                                        }
                                    })
                                } else {
                                    // dialog.msg('请正确录入任务信息',{icon: 11});
                                    return false;
                                }
                                
                            },
                        });
                    } else {
                       dialog.msg('已超出任务录入日期范围', {icon:0, delay: 200});
                    }   
                },
                eventClick: function( event ) {
                    var selectdateStart = $.fullCalendar.formatDate(event.start, "YYYY-MM-DD");
                    var selectdateEnd = $.fullCalendar.formatDate(event.end, "YYYY-MM-DD");
                    if(event.start.isSameOrAfter( g_lastMON, "day" )) {
                        funcTools.popupTask( event );
                    } else {
                        dialog.msg('已超出任务修改日期范围', {icon:0, delay: 200});
                    }   
                },
                eventDrop: function(evt, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
                   var diffDays = dayDelta._days;
                   var updateData = {
                        sTime: moment(evt.sTime).add(diffDays,'days').format('YYYY-MM-DD'),
                        eTime: moment(evt.eTime).add(diffDays,'days').format('YYYY-MM-DD'),
                        uid: g_uid,
                        tid: evt.tid
                    }
                    model.updateTask(updateData).then(function(res) {
                    }) 
                },
                // weekMode:'liquid',
                defaultDate: g_currDate,
                aspectRatio: 2.25,
                // height: 870,
                navLinks: true, // 可切换周视图与日视图
                editable: true,
                dragable: true,
                eventLimit: true, // 允许查看更多
                selectable: true,
                selectHelper: true,
                loading: function(bool) {
                    $('#loading').toggle(bool);
                }
            });
		},
        _event: function() {
            $('.header2 .oasicon.oasicon-help').oasPopover({html: true});
            $(document).on('click','.time-select .btn',function(){
                $(this).addClass('active').siblings().removeClass('active');
                var timeType = $(this).data('time-range');
                if(timeType == '-1') {
                    $('.date-select').show();
                }
            })
            eventAction.add({
                "quitSystem": function() {
                    window.location = "detail.html";
                },
                "timeSelect": function() {
                    var timeType = parseInt($(this).data('time-range'));
                    var time = {eTime: moment().format('YYYY-MM-DD')};
                    if(timeType === -1 ) {
                        $('#range').show().siblings('#timeDis').hide();
                    } else {
                        $('#timeDis').show().siblings('#range').hide();
                        time.sTime = moment().add(-(timeType),'days').format('YYYY-MM-DD');
                        $('#timeDis').text(time.sTime + ' - ' + time.eTime);
                    }
                },
                "selectTaskType": function() {
                    $(this).addClass('active').siblings().removeClass('active');
                },
                'generateReport': function() {
                    dialog.open({
                        title: '生成周报',
                        type: 1,
                        area: ['430px', '200px'],
                        content: template.compile(generateReportTpl)(),
                        btn: ['确认生成', '取消'],
                        success: function() {
                            $("#range").oasCalendar({
                                type: 'range',
                                isShowTime: false
                            });
                            $('.time-select .btn.active').trigger('click');
                        },
                        btn1: function(){
                            var timeType = $('.time-select .btn.active').data('time-range');
                            var time = {eTime: moment().format('YYYY-MM-DD')};
                            if($('#range:hidden').length) {
                                time.sTime = moment().add(-(timeType),'days').format('YYYY-MM-DD');
                            } else {
                                if($('#range #startTimeChose').val()) {
                                    time.sTime = $('#range #startTimeChose').val();
                                } else {
                                    dialog.msg('日期选择必须输入起始时间！',{icon:0});
                                    return false;
                                }
                                if($('#range #endTimeChose').val()) {
                                    time.eTime = $('#range #endTimeChose').val();
                                }
                            }

                            var excelData = {
                                "title":[
                                    {"value":"项目名称", "type":"ROW_PRONAME_HEADER", "datatype":"string"},
                                    {"value":"部门名称", "type":"ROW_DEPNAME_HEADER", "datatype":"string"},
                                    {"value":"项目经理", "type":"ROW_HEADER_HEADER", "datatype":"string"},
                                    {"value":"工作内容", "type":"ROW_HEADER_HEADER", "datatype":"string"},
                                    {"value":"工时", "type":"ROW_HEADER_HEADER", "datatype":"string"},
                                    {"value":"起始日期", "type":"ROW_HEADER_HEADER", "datatype":"string"},
                                    {"value":"终止日期", "type":"ROW_HEADER_HEADER", "datatype":"string"}
                                ],
                                "taskArr":[]
                            };
                            time.uid = g_uid;
                            model.getTaskById(time).then(function(res) {
                                console.log(res.data)
                                var data = res.data;
                                if(data && data.length) {
                                    $.each(data,function(i, v) {
                                        if(v.taskType != 'plan') {
                                            v.sTime = moment(v.sTime).format('YYYY-MM-DD');
                                            v.eTime = moment(v.eTime).format('YYYY-MM-DD');

                                            var eachTask = [];
                                            eachTask.push({"value": v.t_project.proName});
                                            eachTask.push({"value": v.t_project.t_department.depName});
                                            eachTask.push({"value": v.t_project.proMaster});
                                            eachTask.push({"value": v.taskCont});
                                            eachTask.push({"value": v.taskTime});
                                            eachTask.push({"value": moment(v.sTime).format('YYYY-MM-DD')});
                                            eachTask.push({"value": moment(v.eTime).add(-1,'days').format('YYYY-MM-DD')});
                                            
                                            excelData.taskArr.push(eachTask);
                                        }
                                        // 起止日期处理
                                        // if(moment(v.sTime).isSameOrBefore(moment(time.sTime))){
                                        //     v.sTime = moment(time.sTime).format('YYYY-MM-DD');
                                        //     v.taskTime = v.taskTime - moment(time.sTime).diff(moment(v.sTime));
                                        // } else {
                                        //      v.sTime = moment(v.sTime).format('YYYY-MM-DD');
                                        // }

                                        // if(moment(v.eTime).isSameOrAfter(moment(time.eTime))){
                                        //     v.eTime = moment(time.eTime).format('YYYY-MM-DD');
                                        //     v.taskTime = v.taskTime - moment(v.eTime).diff(moment(time.eTime));
                                        // } else {
                                        //      v.eTime = moment(v.eTime).format('YYYY-MM-DD');
                                        // }
                                        
                                    })
                                    commonTool.JSONToExcelConvertor(excelData.taskArr, g_rname + " " + time.sTime + " - " + time.eTime + "任务表", excelData.title);
                                }  
                            })
                        },
                        btn2: function(){
                            return;
                        },
                    });   
                },
            })
        },
	}

    var funcTools = {
        popupTask: function ( evt ) {
            dialog.open({
                title: '修改任务' + ' ( ' + moment(evt.start).format('YYYY-MM-DD') + ' - ' + moment(evt.end).add(-1,'days').format('YYYY-MM-DD') + ' )',
                type: 1,
                area: ['400px', '350px'],
                content: template.compile(addMissonTpl)(),
                btn: ['删除','保存', '取消'],
                success: function() {
                    // 展示所选任务明细
                    model.getProjects().then(function(res) {
                        if(res.meta.status == 0) {
                            var projectArr = [];
                            $.each(res.data,function(i, v) {
                                var project = {
                                    id: v.pid,
                                    text: v.proName,
                                    dep: v.t_department.depName
                                }
                                projectArr.push(project);
                            })
                            $('.select-project').oasSelect({data: projectArr, width: 230});
                            $('.select-project').oasSelect('select', {id: evt.pid});
                            $('#projectCont').val(evt.taskCont);
                            $('#taskTime').val(evt.taskTime);
                            $(".TaskType-select[tasktype=" + evt.taskType + "]").addClass('active').siblings().hide();
                            $('.form-group .oasicon.oasicon-help').oasPopover({});
                        }
                    })         
                },
                // 任务删除
                btn1: function(){
                    dialog.open( {
                        title: '删除任务',
                        type: 1,
                        area: ['200px', '150px'],
                        content: '确定删除该任务？',
                        btn: ['确定', '取消'],
                        delay: 200,
                        btn1: function() {
                            model.delTask({tid: evt.tid, uid: evt.uid}).then(function(res) {
                                $('#calendar').fullCalendar('removeEvents', evt.tid);
                                if(evt.taskType == 'real') {
                                    var currTime = evt.start.format('YYYY-MM-DD');
                                    g_maxTime[currTime] -= parseFloat(evt.taskTime);
                                    $('.fc-day-top[data-date=' + currTime + ']').find('.total-hour').text(g_maxTime[currTime]);
                                    if(!g_maxTime[currTime]) {
                                        $('.fc-day-top[data-date=' + currTime + ']').find('.total-hour').remove();
                                    }
                                }   
                            })
                        }
                    });
                },
                // 任务修改
                btn2: function(){
                    var valid = funcTools.validate(evt.start, evt.end, evt.taskTime);
                    if(valid) {
                        if(evt.taskType == 'real') {
                            var currTime = evt.start.format('YYYY-MM-DD');
                            g_maxTime[currTime] += ($('#taskTime').val() - evt.taskTime);
                            $('.fc-day-top[data-date=' + currTime + ']').find('.total-hour').text(g_maxTime[currTime]);
                        } 
                        var selectedPro = $('.select-project').oasSelect('select');
                        evt.proName = selectedPro.text,  // 修改任务 项目名称
                        evt.depName = selectedPro.dep,
                        evt.pid = selectedPro.id;
                        evt.taskCont = $('#projectCont').val(),   // 修改任务 内容
                        evt.taskTime = $('#taskTime').val(),      // 修改任务 占用工时
                        evt.taskType = $('.TaskType-select.active').attr('tasktype'),
                        evt.backgroundColor = (evt.taskType == 'real') ? '#9ee2cb' : '#CBD4E7',
                        evt.title = '<span class="pname">' + evt.proName + '</span>' + ' - ' + '<span class="dname">' + evt.depName + '</span>' + ' - ' + '<span class="tname">' + evt.taskCont + '</span>';
                        // 直接传evt会导致浏览器内存溢出
                        // 修改任务 
                        var updateData = {
                            taskCont: evt.taskCont,
                            taskTime: evt.taskTime,
                            pid: evt.pid,
                            uid: g_uid,
                            tid: evt.tid,
                            taskType: evt.taskType
                        }
                        model.updateTask(updateData).then(function(res) {
                            $('#calendar').fullCalendar('renderEvent', evt, true);
                            
                        }) 
                    } else {
                        // dialog.msg('请正确录入任务信息',{icon: 11});
                        return false;
                    }
                },
            });
            $( ".dialog-ft a:first" ).css( "float", "left" ); //删除按钮左移
        },
        // 任务录入超时样式处理
        renderBg: function () {
            $( ".fc-bg .fc-past" ).each( function() {
                var day = moment( $( this ).attr( "data-date" ) );
                if ( day.isBefore( g_lastMON, "day" ) ) {
                    $( this ).attr("title","已过任务录入时间");
                    $( this ).css( "background-color", "#eee" );
                }
            });
        },
        // 任务录入校验
        validate: function(start, end, taskTime) {
            g_maxTime[start.format('YYYY-MM-DD')] = g_maxTime[start.format('YYYY-MM-DD')] || 0;
            if(!$('.select-project').oasSelect('select').text) {
                $('.select-project .select-hd').css('border-color','red');
                dialog.msg('请选择项目！', {icon: 11});
                return false;
            }
            if(!$.trim($('#projectCont').val())) {
                $('#projectCont').css('border-color','red');
                dialog.msg('请录入任务内容！', {icon: 11});
                return false;
            }
            if(!$('.TaskType-select.active').length) {
                dialog.msg('请选择任务类型！', {icon: 11});
                return false;
            }

            var numreg = /^\d{n}$/, tTimeBool = false;
            if(parseFloat($.trim($('#taskTime').val())) == $.trim($('#taskTime').val())) {
                var tTimeBool = true;
            }
            if(!tTimeBool) {
                $('#taskTime').css('border-color','red');
                dialog.msg('请正确输入工时！', {icon: 11});
                return false;
            }
            if(parseFloat($.trim($('#taskTime').val())) <= 0) {
                $('#taskTime').css('border-color','red');
                dialog.msg('一天工时不可小于0！', {icon: 11});
                return false;
            }
            if($('.TaskType-select.active').attr('tasktype') == 'real' && (parseFloat($.trim($('#taskTime').val())) - taskTime + g_maxTime[start.format('YYYY-MM-DD')]) > 24) {
                $('#taskTime').css('border-color','red');
                dialog.msg('一天工时不可大于24小时！', {icon: 11});
                return false;
            }
            return true;
        }
    }
    app.init();
	return app;
});