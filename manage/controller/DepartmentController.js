var Page = require('../utils/page');
var Utils = require('../utils/utils');
var Department = require('../model/department');
var DepartmentController = {
	/**
	 * 
	 */
	"getDepartments": function(req, res, next) {
		var page = new Page();
    	page.setPageNo(req.query.pageNo);
    	page.setPageSize(req.query.pageSize);
		if (page.pageNo == 0 || page.pageSize) {
			Department.findAndCountAll().then(function(msgs) {
				console.log(msgs.count);
				page.setTotlRows(msgs.count);
				res.json(Utils.responseJSON.success(msgs.rows, page));
			});
		} else {
			Department.findAndCountAll({
            	offset:(page.pageNo-1)*page.pageSize,
            	limit:page.pageSize}).then(function(msgs) {
				console.log(msgs.count);
				page.setTotlRows(msgs.count);
               res.json(Utils.responseJSON.success(msgs.rows, page));
			});
		}
	},
}

module.exports = DepartmentController;