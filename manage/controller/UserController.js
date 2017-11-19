var Page = require('../utils/page');
var Utils = require('../utils/utils');
var User = require('../model/user');
var UserController = {
	/**
	 * 获取当前ip用户信息
	 */
	"getUser":function(req, res, next){
		User.findOne({
				where: {
					ip: req.ip
				}
			}).then(function(msgs) {
				res.json(Utils.responseJSON.success(msgs));
			});
	},
	/**
	 * 获取用户信息
	 */
	"getUsers":function(req, res, next){
		User.findAll().then(function(msgs) {
			res.json(Utils.responseJSON.success(msgs));
		});
	},
}

module.exports = UserController;