define(['template',
	'text!viewTpl/tpl/monthTpl.tpl',
	'text!viewTpl/tpl/sidebarTpl.tpl',
	'text!viewTpl/tpl/taskPop.tpl',
	'text!viewTpl/tpl/generateReport.tpl',
	'text!viewTpl/tpl/generateGroup.tpl',
	'oasDialog',
	'oasPopover',
	'oasEventAction',
	'/js/baseModel.js',
	'/js/moment.min.js',
	'/js/commonTool.js',
	'oasCalendar',
	
],function(template,monthTpl,sidebarTpl,taskPopTpl,generateReportTpl, generateGroupTpl, dialog, popover,eventAction, model, moment, commonTool){
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

					for(var y=0;y< datailArea.length; y++){
						var currUid = datailArea.eq(y).data('uid');
						for(var x=0; x < dateNum; x++){
							// 遍历数组，将该日期下的task push
							var currDate = thisYear + '-' + thisMonth + '-' + (x+1);
							g_data[currUid].tasks[currDate] = [];
							$.each(data.tasks,function(index,eachUser) {
								if(eachUser.uid == currUid) {
									var filled = false;
									$.each(eachUser.task,function(i,v) {
										if(v.taskType=='plan' && moment(currDate).isSameOrAfter(v.sTime.split('T')[0]) && moment(currDate).isBefore(v.eTime.split('T')[0])) {
											g_data[currUid].tasks[currDate].push(v);
											filled = true;
										} 
									})

									var $el,colorType;

									if(filled) {
										if(( moment(currDate).isSame(moment(curr)))) {
											colorType = "filled-isCurr";
										} else {
											colorType = "filled";
										}
										$el = $('<li class=' + colorType + ' data-uid='+ currUid +' data-date=' + currDate +'></li>' );
										$el.appendTo(datailArea[y]);
										optionTools.initPopover($el);
									}else {
										if((moment(currDate).isSame(moment(curr)))) {
											$el = $('<li class="isCurr"></li>' );
										} else {
											$el = $('<li></li>');
										}
										$el.appendTo(datailArea[y]);
									}
								}
							})
						}
					}
				}
				app.calContentWrapWidth();
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
				// 'generateReport': function() {
				// 	// if(isAdmin) {

				// 	// }
				// 	dialog.open({
                //         title: '生成组周报',
                //         type: 1,
                //         area: ['430px', '250px'],
                //         content: template.compile(generateGroupTpl)(),
                //         btn: ['确认生成', '取消'],
                //         success: function() {
                //         	$("#range").oasCalendar({
				// 				type: 'range',
				// 				isShowTime: true
				// 			});
				// 			$('.time-select .btn.active').trigger('click');
                //         },
                //         btn1: function(){

                //         	// 获取选中日期
                //         	var timeType = $('.time-select .btn.active').data('time-range');
                //         	var time = {eTime: moment().format('YYYY-MM-DD')};
                //         	if($('#range:hidden').length) {
				// 				time.sTime = moment().add(-(timeType),'days').format('YYYY-MM-DD');
				// 			} else {
				// 				if($('#range #startTimeChose').val()) {
				// 					time.sTime = $('#range #startTimeChose').val().split(' ')[0];
				// 				} else {
				// 					dialog.msg('日期选择必须输入起始时间！',{icon:0});
				// 					return false;
				// 				}
				// 				if($('#range #endTimeChose').val()) {
				// 					time.eTime = $('#range #endTimeChose').val().split(' ')[0];
				// 				}
				// 			}

				// 			// 获取选中的组
                //         	var groupArr = [];
                //         	$('.group-select.active').each(function() {
                //         		groupArr.push($(this).data('group'));
                //         	})
                //         	time.group = groupArr.join(',');

				// 			$.ajax({
		        //                 url: '/api/v1/schedule/tasks/timeSlot',
		        //                 type: 'GET',
		        //                 dataType: 'json',
		        //                 data: time,
		        //             }).then(function(res) {
		        //             	var data = res.data;
		        //         		var output = optionTools.dataToXlsFormat(time,data);
		        //         		optionTools.downloadExcle(output);
		                		

		        //             })
                //         },
                //         btn2: function(){
                //             return;
                //         },
                //     });   
                // },
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
		initPopover: function($el) {
			var uid = $el.data('uid'),
			date = $el.data('date'),
			taskArr = g_data[uid].tasks[date],
			
			html = template.compile(taskPopTpl)(taskArr);

			$el.oasPopover({
			    container:$("body"),
			    html: true,
			    trigger: 'hover',
			    placement: 'right',
			    content: html,
			    delay: 200
			})
		},
		downloadExcle: function(retData,type) {
            new JsonToExcle(retData,type);           
        },
        getGroupExcelName: function(time) {
        	var groupName = '';
        	if(time.group) {
        		var groupArr = time.group.split(',');
        		$.each(groupArr,function(i, v) {
        			switch(v) {
        				case '1': v = '前端';break;
        				case '2': v =  '视觉';break;
        				case '3': v =  '交互';break;
        			}
        		})
        		groupName = groupArr.join(',');
        	} else {
        		groupName = '前端,视觉,交互';
        	}
        	return groupName;
        },
        dataToXlsFormat: function(time,data) {
        	var excelName = this.getGroupExcelName(time) + ' - ' + time.sTime + ' - ' + time.eTime + ' 任务表';
        	var ret = {
        		excleName: excelName, 
        		excleData: []
        	};
        	for(var i in data) {
        		console.log(data[i])
        		var proObj = { 
        			"sheetName" : data[i][0].proName, 
        			"sheetTitle":{
			            "rname":"姓名",
			            "proName":"项目",
			            "depName":"部门",
			            "proMaster":"项目经理",
			            "taskCont":"任务",
			            "taskTime":"耗时",
			            "sTime":"起始日期",
			            "eTime":"终止日期",
			        },
        			sheetData: [] 
        		};
        		$.each(data[i],function(i, v) {
                    v.sTime = moment(v.sTime).format('YYYY-MM-DD');
                    v.eTime = moment(v.eTime).add(-1,'days').format('YYYY-MM-DD');
        			proObj.sheetData.push(v);
        		})
        		ret.excleData.push(proObj);
        	}
        	return ret;
        }

	}
	return app;
});