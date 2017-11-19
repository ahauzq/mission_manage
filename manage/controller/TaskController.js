
var Page = require('../utils/page');
var Utils = require('../utils/utils');
//引入任务模块
var Task = require('../model/task');
//引入项目模块
var Project = require('../model/project');
//引入数据库User模块
var User = require('../model/user');
//引入部门模块
var Department = require('../model/department');

var fs = require('fs');

var TaskController = {
	/**
	 * 获取我的任务
	 */
	"getTasks": function(req, res, next) {
		var page = new Page();
    	page.setPageNo(req.query.pageNo);
    	page.setPageSize(req.query.pageSize);
			Task.findAndCountAll({
				'include': [{
					model: User,
					as: 't_user',
					where: {
						uid: req.query.uid
					}
				}, {
					model: Project,
					as: 't_project',
					'include': [{
						model: Department,
						as: 't_department',
					}]
				}],
				'where':{
					$or:[{
						$and:[{
							stime:{
							"$lte":req.query.sTime
							}
						},{
							etime:{
							"$gte":req.query.eTime,
							}
						}]	
						},{
						$or:[{
							stime:{
							"$lte":req.query.eTime,
							"$gte":req.query.sTime
							}
						},{
							etime:{
							"$lte":req.query.eTime,
							"$gte":req.query.sTime
							}
						},
					]
						}
					]
				}
			}).then(function(msgs) {
				console.log(msgs.count);
				page.setTotlRows(msgs.count);
				res.json(Utils.responseJSON.success(msgs.rows));
			});
	},
	"addTasks":function(req, res, next){
				var task = {
					uid:req.body.uid,
					pid:req.body.pid,
					taskTime:req.body.taskTime,
					taskCont:req.body.taskCont,
					sTime:req.body.start,
					eTime:req.body.end,
					taskType:req.body.taskType
    			};    			
				Task.create(task).then(function(msg){
					console.log(msg);
					res.json(Utils.responseJSON.success({"tid":msg.dataValues.tid}));
    			});				
	},
	"updateTasks":function(req, res, next){
				var task = {
					uid:req.body.uid,
					pid:req.body.pid,
					taskTime:req.body.taskTime,
					taskCont:req.body.taskCont,
					sTime:req.body.sTime,
					eTime:req.body.eTime,
					taskType:req.body.taskType
    				};
		 		Task.update(task,{
        			where:{
            		uid:req.body.uid,
					tid:req.body.tid
        			}
    			}).then(function(msg){
        			console.log(msg);
					res.json(Utils.responseJSON.success(msg));
    			});					
	},
	"deleteTasks":function(req, res, next){
				//先查找,再调用删除,最后返回首页

				Task.findOne({
					where:{
						uid:req.query.uid,
						tid:req.query.tid
					}
				}).then(function(msg){
					msg.destroy().then(function(msgs){
						console.log('delete success !!');
						res.json(Utils.responseJSON.success(msgs));
					});
				});						
	},
	"getAllTasksByCondition":function(req, res, next){
			var data={},retData=[];
			var p = new Promise(function(resolve, reject){
				User.findAll({
					'order':[['jobNumber','ASC']]
				}).then(function(msgs) {
						msgs.forEach(function(item,i){
						item.dataValues.task=[];
						data[item.jobNumber]=item.dataValues;
					});	
					resolve(msgs);					
				});
			})
			p.then(function(msgs){
				Task.findAll({
					'include': [{
						model: Project,
						as: 't_project',
						'include': [{
							model: Department,
							as: 't_department',
						}]
					}],
					'where':{
						$or:[{
						$and:[{
							stime:{
							"$lte":req.query.sTime
							}
						},{
							etime:{
							"$gte":req.query.eTime,
							}
						}]	
						},{
						$or:[{
							stime:{
							"$lte":req.query.eTime,
							"$gte":req.query.sTime
							}
						},{
							etime:{
							"$lte":req.query.eTime,
							"$gte":req.query.sTime
							}
						},
					]
						}
					]
					}
				}).then(function(msgs1) {
					msgs1.forEach(function(item){
						data[item.dataValues.uid].task.push(item.dataValues); //
					});
					for(var key in data){
						retData.push(data[key]); //返回界面数组
					}
					res.json(Utils.responseJSON.success(retData));
				});
			});
	},
	"getAllTasksByTimeSlot":function(req, res, next){
		var uidData=[]
		var param1={
			'order':[['jobNumber','ASC']],
			'where':{}
		}
		if(req.query.group){
			
			param1.where['group']=req.query.group.split(",");
		}
		var p = new Promise(function(resolve, reject){
			User.findAll(param1).then(function(msgs) {
				var uidArr=[];
				msgs.forEach(function(item,i){
					uidArr.push(item.dataValues.uid);
				});
				resolve(uidArr);
				});
		})			
		p.then(function(uidArr){
			Task.findAll({
				'where':{
					uid: uidArr,
					taskType: 'real',
					$or:[{
						$and:[{
							stime:{
							"$lte":req.query.sTime
							}
						},{
							etime:{
							"$gte":req.query.eTime,
							}
						}]	
						},{
						$or:[{
							stime:{
							"$lte":req.query.eTime,
							"$gte":req.query.sTime
							}
						},{
							etime:{
							"$lte":req.query.eTime,
							"$gte":req.query.sTime
							}
						},
					]
						}
					]
				},
				'include': [{
					model: User,
					as: 't_user',
				},{
					model: Project,
					as: 't_project',
					'include': [{
						model: Department,
						as: 't_department',
					}]
				}]
			}).then(function(msgs1) {
				
				var retData={};
				msgs1.forEach(function(item,i){
					var data={
						"rname": item.t_user.rname,
						"group": item.t_user.group,
						"proName": item.t_project.proName,
						"depName": item.t_project.t_department.depName,
						"proMaster": item.t_project.proMaster,
						"taskCont": item.taskCont,
						"taskTime": item.taskTime,
						"taskType": item.taskType,
						"sTime": item.sTime,
						"eTime": item.eTime
					}
					if(!retData[item.t_project.pid]){
						retData[item.t_project.pid]=[];
					}
					retData[item.t_project.pid].push(data);	
					
				});
				// fs.writeFile('./111111111111.txt',"hello",function(err) {
				// 	if(err) {
				// 		return console.log(err);
				// 	}
				// 	console.log("saved");
				// 	console.log(res.download)
				// 	res.download('./111111111111.txt','test.txt',function(err) {
				// 		if(err) {
				// 			console.log(err)
				// 		}else {
				// 			console.log('download success')
				// 		}
				// 	});
				// })
				
				res.json(Utils.responseJSON.success(retData));
				
			});
		});		
	}
}

module.exports = TaskController;