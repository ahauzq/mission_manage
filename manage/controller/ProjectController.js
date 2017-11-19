var Page = require('../utils/page');
var Utils = require('../utils/utils');
var Project = require('../model/project');
//引入部门模块
var Department = require('../model/department');
var ProjectController = {
	/**
	 * 获取我的任务
	 */
	"getProjects": function(req, res, next) {
		var page = new Page();
    	page.setPageNo(req.query.pageNo);
    	page.setPageSize(req.query.pageSize);
		if (page.pageNo == 0 || page.pageSize) {
			Project.findAndCountAll({'include':[{model:Department,as:'t_department'}]}).then(function(msgs) {
				console.log(msgs.count);
				page.setTotlRows(msgs.count);
				res.json(Utils.responseJSON.success(msgs.rows, page));
			});
		} else {
			Project.findAndCountAll({
            	'include':[{model:Department,as:'t_department'}],
            	offset:(page.pageNo-1)*page.pageSize,
            	limit:page.pageSize
            }).then(function(msgs) {
				console.log(msgs.count);
				page.setTotlRows(msgs.count);
               res.json(Utils.responseJSON.success(msgs.rows, page));
			});
		}
	},

	"addProjects":function(req, res, next){
		var project = {
    		did:req.body.did,
			proName: req.body.proName,
			proMaster: req.body.proMaster,
		};    			
		Project.create(project).then(function(msg){
			res.json(Utils.responseJSON.success({"pid":msg.dataValues.pid}));
		});				
	},

}

module.exports = ProjectController;