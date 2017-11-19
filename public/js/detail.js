define(['template',
	'/js/lib/lodash.js',
	'text!viewTpl/tpl/monthTpl.tpl',
	'text!viewTpl/tpl/sidebarTpl.tpl',
	'text!viewTpl/tpl/taskPop.tpl',
	'text!viewTpl/tpl/add_pro.tpl',
	'text!viewTpl/tpl/generateReport.tpl',
	'text!viewTpl/tpl/generateGroup.tpl',
	'oasDialog',
	'oasPopover',
	'oasEventAction',
	'/js/baseModel.js',
	'/js/moment.min.js',
	'/js/commonTool.js',
	'oasCalendar',
	'/js/lib/FileSaver.min.js'
	
],function(template, _, monthTpl,sidebarTpl,taskPopTpl, addProTpl, generateReportTpl, generateGroupTpl, dialog, popover,eventAction, model, moment, commonTool){
	console.log(_)
	var dateArr = [31,28,31,30,31,30,31,31,30,31,30,31]; // 一年中每月天数
	var curr = moment().format('YYYY-MM-DD'); // 存放当天日期
	var isAdmin = false; // 标记当前用户是否为管理员

	var g_data = {}; // 存放每个用户每天的任务列表

	var app = {
		init: function(){
			this.getUserInfo(); // 获取用户信息
			this.renderMonthView();
			this.event();
			// this.others();
		},
		getUserInfo: function() {
			model.getLoginUser().then(function(res) {
				if(res.meta.status == 0) {
					if($.isEmptyObject(res.data)) {
						$('#userName').html('游客');
						$('.edit-work').attr('data-action','noAuth');
						return;
					}

					if(res.data.isAdmin) {
						isAdmin = true;
						$('.generate-report').show();
					}
					localStorage.pq_uid = res.data.uid; // 当前登陆用户id
					localStorage.pq_rname = res.data.rname; // 当前登陆用户姓名
					$('#userName').html(res.data.rname);

				} else {
					dialog(res.meta.message, {icon: 11});
				} 
			})
		},
		// 计算wrap容器总宽度
		calContentWrapWidth: function(){
			var totalWidth = 20;
			var $month = $('.date-wrap .month');
			$month.each(function(i){
				totalWidth += $month[i].offsetWidth;
			});

			$('.content-wrap').width(totalWidth);
		},

		renderMonthView: function(data){
			var d = new Date();
			var currentYear = d.getFullYear(); // 当前年
			var currentMonth = d.getMonth() + 1; // 当前月
			var date = d.getDate(); // 当前天

			var monthArr = [currentMonth, (currentMonth+1)%12, (currentMonth+2)%12];
			var dateNumArr = []; // 当前月天数
			var yearArr = [currentYear, currentYear, currentYear];

			// 判断当前月份是否为10月及以后
			monthArr.forEach(function(i){
				if(monthArr[i] == 0){
					monthArr[i] = 12;
				}
				if(monthArr[i] == 12 && i==0){
					yearArr[i+1] += 1;
					yearArr[i+2] += 1;
				}else if(monthArr[i] == 12 && i==1){
					yearArr[i+1] += 1;
				}
			});
			// 闰年判断
			for(var i=0;i<3;i++){
				dateNumArr[i] = dateArr[monthArr[i]-1];
				if (monthArr[i] == 2) {
					if(((yearArr[i]%4 == 0) && (yearArr[i]%100 != 0)) || (yearArr[i]%400 == 0)) {
						dateNumArr[i] = 29;
					}
				}
			}

			var dataInit = {
				"month": monthArr,
				"year": yearArr,
				"dateNum": dateNumArr
			};
			if(!data){
				data = dataInit;
			}

			var sTime = data.year[0] + '-' + data.month[0] + '-01';
			var eTime = data.year[2] + '-' + data.month[2] + '-' + data.dateNum[2];

			model.getAllTask({sTime: sTime, eTime: eTime}).then(function(res) {
				console.log(res.data);
				data.tasks = res.data;
				$.each(data.tasks,function(i,v) {
					g_data[v.uid] = {
						uid : v.uid,
						uname: v.name,
						tasks : {}
					};
				})
				if(localStorage.pq_uid) {
					var thisUser = localStorage.pq_uid;
				}
				$('.sidebar-content').html(template.compile(sidebarTpl)({data: res.data, thisUser: localStorage.pq_uid})); // 渲染人员列表
				$('.content-wrap').html(template.compile(monthTpl)(data)); // 渲染排期列表
				$('.sidebar-content').scroll(function(e) { // 绑定scroll事件
					var top = $(this).scrollTop();
					$('.content .task-wrap').scrollTop(top);

				})
				$('.content .task-wrap').scroll(function(e) { // 绑定scroll事件
					var top = $(this).scrollTop();
					$('.sidebar-content').scrollTop(top);
					
				})

				var $monthArea = $('.date-wrap .month');
				for(var i=0;i<$monthArea.length;i++){
					var thisMonth = parseInt($monthArea.find('.month-header')[i].innerHTML.split('月')[0]);
					var thisYear = parseInt($monthArea.find('.month-header')[i].innerHTML.split('/')[1].trim());
					var $dateArea = $($monthArea[i]).find('.month-date ul');
					var dateNum = $dateArea.html();
					$dateArea.empty();
					for(var j=0;j<dateNum;j++){
						var thisDay = thisYear + '-' + thisMonth + '-' + (j+1);
						var $li_date = $('<li data-date="'+ thisDay +'">'+(j+1)+'</li>');
						if(moment(thisDay).isSame(curr)) {
							$li_date.addClass('isCurr');
						}
						// 标识周末
						if( new Date(thisDay).getDay() == 0 || new Date(thisDay).getDay() == 6) {
							$li_date.append('<i></i>').appendTo($dateArea);
						} else {
							$li_date.appendTo($dateArea);
						}
					}

					var datailArea = $('.task-wrap .month').eq(i).find('.person-details');
					var currMon = thisYear + '-' + thisMonth;

					// var currdata
					// console.log(data.tasks)
					for(var y=0;y< datailArea.length; y++){
						var currUid = datailArea.eq(y).data('uid');
						for(var x=0; x < dateNum; x++){
							// 遍历数组，将该日期下的task push
							var currDate = thisYear + '-' + thisMonth + '-' + (x+1);
							g_data[currUid].tasks[currDate] = [];
			
							// $.each(data.tasks,function(index,eachUser) {
							// 	if(eachUser.uid == currUid) {
							// 		var filled = false;
							// 		$.each(eachUser.task,function(i,v) {
							// 			if(v.taskType!= 'plan' && moment(currDate).isSameOrAfter(v.sTime.split('T')[0]) && moment(currDate).isBefore(v.eTime.split('T')[0])) {
							// 				g_data[currUid].tasks[currDate].push(v);
							// 				filled = true;
							// 			} 
							// 		})
							
							var _task = data.tasks,_taskLen = data.tasks.length;
							for(var m = 0;m < _taskLen; m++) {
								if(_task[m].uid == currUid) {
									var filled = false;
									for(var n = 0; n < _task[m].task.length; n++) {

										// var taskDate = _task[m].task[n].sTime.split('T')[0];
										// console.log(taskDate, currDate)
										// var isIn = moment(currDate).isSame( _task[m].task[n].sTime.split('T')[0] );

										if(_task[m].task[n].taskType != 'plan' && moment(currDate).isSame( _task[m].task[n].sTime.split('T')[0])) {				
											g_data[currUid].tasks[currDate].push(_task[m].task[n]);
											filled = true;
										}
									}
						
									var $el,colorType;

									if(filled) {
										if(( moment(currDate).isSame(moment(curr)))) {
											colorType = "filled-isCurr";
										} else {
											colorType = "filled";
										}
										$el = $('<li class=' + colorType + ' data-uid='+ currUid +' data-date=' + currDate +'></li>' );
										$el.appendTo(datailArea[y]);
										// optionTools.initPopover($el);
									}else {
										if((moment(currDate).isSame(moment(curr)))) {
											$el = $('<li class="isCurr"></li>' );
										} else {
											$el = $('<li></li>');
										}
										$el.appendTo(datailArea[y]);
									}
									// break;
								}
								// 
								// break;
							}
						}
					}

				}
				app.calContentWrapWidth();
				console.log(g_data)
			})		
		},
		event: function(){
			$(document).on('click','.time-select .btn', function(){
				$(this).addClass('active').siblings().removeClass('active');
				var timeType = $(this).data('time-range');
				if(timeType == '-1') {
					$('.date-select').show();
				}
			})
			$('.content').scroll(function() {
				if($(this).scrollLeft() > 1) {
					$('.sidebar').addClass('shadow');
				}else {
					$('.sidebar').removeClass('shadow');
				}
			})
			$(document).on('mouseover','.content .month .month-details .person-details li', function() {
				
				var uid = $(this).data('uid'),
					date = $(this).data('date');

				if(!g_data[uid]) {
					return;
				}
				var taskArr = g_data[uid].tasks[date];
					
				var html = template.compile(taskPopTpl)(taskArr);

					$(this).oasPopover({
						container:$("body"),
						html: true,
						trigger: 'hover',
						placement: 'right',
						content: html,
						delay: 200
					}).oasPopover('show');
					
			})		
			eventAction.add({
				"noAuth": function() {
					dialog.msg('游客无法操作！请先激活账号', {icon:'0'});
				},
				"editWork": function(){
					if (localStorage.pq_uid) {
						window.location = 'edit_work.html?user=' + localStorage.pq_uid + '&rname=' + encodeURI(encodeURI(localStorage.pq_rname)); 
					} else {
						dialog.msg('未识别的用户！',{icon: 0});
					}
					
				},
				"editSbd": function() {
					if(isAdmin) {
						var uid = $(this).data('uid');
						var rname = $(this).data('rname');
						window.location = 'edit_work.html?user=' + uid + '&rname=' + encodeURI(encodeURI(rname)); 
					}else {
						return;
					}	
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
				"groupSelect": function() {
					var timeType = $(this).toggleClass('active');
				},
				"addProject": function() {
					dialog.open({
                        title: '添加项目',
                        type: 1,
                        area: ['400px', '280px'],
                        content: template.compile(addProTpl)(),
                        btn: ['确认', '取消'],
                        success: function() {
							model.getDepartments().then(function(res) {
								if(res.meta.status == 0) {
									var departArr = [];
									$.each(res.data,function(i, v) {
										var depart = {
											id: v.did,
											text: v.depName,
										}
										departArr.push(depart);
									})
									$('.select-depart').oasSelect({data: departArr, width: 230,height: 140});
								}
							}) 
                        },
                        btn1: function(){
							var data = {
								did: $('.select-depart').oasSelect('select').id,
								proName: $('#proName').val(),
								proMaster: $('#proMaster').val(),
							}
                        	model.addProject(data).then(function(res) {
								if(res.meta.status == 0) {
									dialog.msg('项目添加成功', {icon: 1})
								}
							}) 
                        },
                        btn2: function(){
                            return;
                        },
                    });  
				},
				'linkToPlan': function() {
					window.open('schedule.html');
				},
				'generateReport': function() {
					// if(isAdmin) {

					// }
					dialog.open({
                        title: '生成组周报',
                        type: 1,
                        area: ['430px', '250px'],
                        content: template.compile(generateGroupTpl)(),
                        btn: ['确认生成', '取消'],
                        success: function() {
                        	$("#range").oasCalendar({
								type: 'range',
								isShowTime: false
							});
							$('.time-select .btn.active').trigger('click');
                        },
                        btn1: function(){

                        	// 获取选中日期
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

							// 获取选中的组
                        	var groupArr = [];
                        	$('.group-select.active').each(function() {
                        		groupArr.push($(this).data('group'));
                        	})
                        	time.group = groupArr.join(',');

							$.ajax({
		                        url: '/api/v1/schedule/tasks/timeSlot',
		                        type: 'GET',
		                        dataType: 'json',
		                        data: time,
		                    }).then(function(res) {
								var data = res.data;		
								var output = optionTools.dataToXlsFormat(time,data);
								optionTools.downloadTxt(time, output); // 生成txt格式周报
								// optionTools.downloadExcle(output); // 生成excle格式周报
		                    })
                        },
                        btn2: function(){
                            return;
                        },
                    });   
                },
			})
			// 详细信息视图，day点击事件
			$('.person-details li').live('mouseover',function(){
				var monthIndex = $(this).closest('.month').index();
				var dateIndex = $(this).index() - 1;
				$('.month-date li').removeClass('selected');
				$(this).closest('.content-wrap').find('.date-wrap .month').eq(monthIndex)
						.find('.month-date li').eq(dateIndex).addClass('selected');
			});
			// 对每一行设置hover效果
			$('.person-details').live('mouseover',function(){
				$($('.sidebar-content li')[$(this).index()]).css('backgroundColor','#fff2df')
				.siblings().css('backgroundColor','#fff');
			}).live('mouseout',function(){
				$($('.sidebar-content li')[$(this).index()]).css('backgroundColor','#fff');
			});

			$('.sidebar-content li').live('mouseover',function(){
				$(this).css('backgroundColor','#fff2df');
			}).live('mouseout',function(){
				$(this).css('backgroundColor','#fff');
			});

			// 点击左键切换到前三个月
			var prevYear = false;
			$('.toggle-left').live('click',function(){
				var originMonth = parseInt($('.month-header')[0].innerHTML.split('月')[0]);
				var originYear = parseInt($('.month-header')[2].innerHTML.split('/')[1].trim());
				var startMonth = (originMonth - 1) % 12;
				var monthArr = [startMonth, (startMonth+1)%12, (startMonth+2)%12];
				var dateNumArr = [];
				var yearArr = [originYear,originYear,originYear];

				if(prevYear){
					yearArr = [originYear-1,originYear-1,originYear-1];
					prevYear = false;
				}

				for(var i=0;i<3;i++){
					if((monthArr)[i] == 0){
						monthArr[i] += 12;
					}
					if(monthArr[i] == 1 && i==2){
						yearArr[i-1] = originYear - 1;
						yearArr[i-2] = originYear - 1;
						prevYear = true;
					}else if(monthArr[i] == 1 && i==1){
						yearArr[i-1] = originYear - 1;
					}
				}

				for(var i=0;i<$('.month').length;i++){
					dateNumArr[i] = dateArr[monthArr[i]-1];
					if (monthArr[i] == 2) {
						if(((yearArr[i]%4 == 0) && (yearArr[i]%100 != 0)) || (yearArr[i]%400 == 0)) {
							dateNumArr[i] = 29;
						}
					}
				}

				var prevData = {
					"month": monthArr,
					"year": yearArr,
					"dateNum": dateNumArr,
					tasks: []
				};
				// 后退一个月
				app.renderMonthView(prevData);
				
			});

			// 点击右键切换到后三个月
			var nextYear = false;
			$('.toggle-right').live('click',function(){
				var originMonth = parseInt($('.month-header')[0].innerHTML.split('月')[0]);
				var originYear = parseInt($('.month-header')[0].innerHTML.split('/')[1].trim());
				var startMonth = (originMonth + 1) % 12;
				var monthArr = [startMonth, (startMonth+1)%12, (startMonth+2)%12];
				var dateNumArr = [];
				var yearArr = [originYear,originYear,originYear];

				if(nextYear){
					yearArr = [originYear+1,originYear+1,originYear+1];
					nextYear = false;
				}

				for(var i=0;i<3;i++){
					if(monthArr[i] == 0){
						monthArr[i] = 12;
					}
					if(monthArr[i] == 12 && i==0){
						yearArr[i+1] = originYear + 1;
						yearArr[i+2] = originYear + 1;
						nextYear = true;
					}else if(monthArr[i] == 12 && i==1){
						yearArr[i+1] = originYear + 1;
					}
				}

				for(var i=0;i<$('.month').length;i++){
					dateNumArr[i] = dateArr[monthArr[i]-1];
					// 闰年处理
					if (monthArr[i] == 2) {
						if(((yearArr[i]%4 == 0) && (yearArr[i]%100 != 0)) || (yearArr[i]%400 == 0)) {
							dateNumArr[i] = 29;
						}
					}
				}
				var nextData = {
					"month": monthArr,
					"year": yearArr,
					"dateNum": dateNumArr,
					"tasks": []
				};
				app.renderMonthView(nextData);
			});
		},
	};

	var optionTools = {
		// initPopover: function($el) {
		// 	var uid = $el.data('uid'),
		// 	date = $el.data('date'),
		// 	taskArr = g_data[uid].tasks[date],
			
		// 	html = template.compile(taskPopTpl)(taskArr);

		// 	$el.oasPopover({
		// 	    container:$("body"),
		// 	    html: true,
		// 	    trigger: 'hover',
		// 	    placement: 'right',
		// 	    content: html,
		// 	    delay: 200
		// 	})
		// },
		compare: function(prop) {
			return function(a, b) {
				var v1 = a[prop];
				var v2 = b[prop];
				return v1.localeCompare(v2);
			}
		},
		downloadExcle: function(retData,type) {
            new JsonToExcle(retData,type);           
		},
		getGroup: function(v) {
			switch(v) {
				case '1': return '前端'; break;
				case '2': return '视觉'; break;
				case '3': return '交互'; break;
			}
		},
        getGroupExcelName: function(time) {
        	var groupName = '';
        	if(time.group) {
        		var groupArr = time.group.split(',');
        		var newGroupArr = [];
        		$.each(groupArr,function(i, v) {
        			newGroupArr.push(optionTools.getGroup(v));
        		})
        		groupName = newGroupArr.join(' · ');
        	} else {
        		groupName = '前端,视觉,交互';
        	}
        	return groupName;
        },
        dataToXlsFormat: function(time,data) {
			console.log(data)
        	var excelName = this.getGroupExcelName(time) + ' - ' + time.sTime + ' - ' + time.eTime + ' 任务表';
        	var ret = {
				excleName: excelName, 
        		excleData: []
        	};
        	for(var i in data) {
				console.log(data[i])
        		var proObj = { 
					"sheetName" : data[i][0].proName, 
					"masterName": data[i][0].proMaster, 
					"depName": data[i][0].depName, 
        			"sheetTitle":{
			            "rname":"姓名",
			            // "proName":"项目",
			            // "depName":"部门",
						// "proMaster":"项目经理",
						
			            "taskCont":"任务明细",
			            "taskTime":"耗时（人/天）",
			            // "sTime":"起始日期",
			            // "eTime":"终止日期",
			        },
        			sheetData: data[i]
				};
				
        		// $.each(data[i],function(i, v) {
                //     v.sTime = moment(v.sTime).format('YYYY-MM-DD');
                //     v.eTime = moment(v.eTime).add(-1,'days').format('YYYY-MM-DD');
        		// 	proObj.sheetData.push(v);
        		// })
				// proObj.sheetData.sort(optionTools.compare('rname'));
				
				// 数据合并
				var map = {}, dest = [];
				for(var k = 0; k< proObj.sheetData.length; k++) {
					if(!map[proObj.sheetData[k].rname]){
						dest.push({
							"rname": proObj.sheetData[k].rname,
							"group": proObj.sheetData[k].group,
							"taskCont": proObj.sheetData[k].taskCont,
							"taskTime": proObj.sheetData[k].taskTime,
							"sTime": moment(proObj.sheetData[k].sTime),
							"eTime": moment(proObj.sheetData[k].eTime).add(-1,'days')
						})
						map[proObj.sheetData[k].rname] = proObj.sheetData[k].rname;
					} else {
						for(var p = 0; p < dest.length; p++) {
							if(dest[p].rname === proObj.sheetData[k].rname) {
								if(dest[p].taskCont.indexOf(proObj.sheetData[k].taskCont) < 0) {
									dest[p].taskCont += '、' + proObj.sheetData[k].taskCont;	
								}								
								dest[p].taskTime += proObj.sheetData[k].taskTime;
								if(moment(proObj.sheetData[k].sTime).isBefore(moment(dest[p].sTime))) {
									dest[p].sTime = moment(proObj.sheetData[k].sTime);
								}
								if(moment(proObj.sheetData[k].sTime).isAfter(moment(dest[p].eTime))) {
									dest[p].eTime = moment(proObj.sheetData[k].sTime);
								}
								break;
							}
						}
					}
				}

				$.each(dest, function(i,v){
					v.taskTime = (v.taskTime/7.5).toFixed(1);
					v.sTime = moment(v.sTime).format('MM.DD');
					v.eTime = moment(v.eTime).format('MM.DD');
				})

				proObj.sheetData = dest;
        		ret.excleData.push(proObj);
			}
        	return ret;
		},
		downloadTxt: function(time, ret) {
			var txt = '';
			for(var i in ret.excleData) {
				var eachPro = ret.excleData[i];
				txt += eachPro.sheetName + ' ('+ eachPro.masterName + ') ' + ' - ' + eachPro.depName + '\n';
				$.each(eachPro.sheetData, function(i, v) {
					txt += (i + 1) + ' - ' + optionTools.getGroup(v.group) + ' - ' + v.rname + ' ' +  v.sTime + '-' + v.eTime + ' - 使用人力 ' + '(' + v.taskTime + '人/天） ' + v.taskCont + '\n';
				})
				txt +='\n';
			}
			var blob = new Blob([txt], {
				type: "text/plain;charset=utf-8"
			})

			var txtName = this.getGroupExcelName(time) + ' - ' + time.sTime + ' - ' + time.eTime + ' 任务表';
			saveAs(blob, txtName);
		}
	}
	return app;
});