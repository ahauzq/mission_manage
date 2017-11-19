var Sequelize = require('sequelize');
var sequelize = require('../../config/sequelizeObj');
//定义用户表的模型
var User = sequelize.define('t_user', {
    uid:{ //自增长id,主键,整形 用户id
        type:Sequelize.STRING(6),
        primaryKey: true,
        /*autoIncrement:true*/
    },
    name: { //用户名
        type: Sequelize.STRING(30)
    },
    rname: { //真实
        type: Sequelize.STRING(30)
    },
    jobNumber:{//工号
        type: Sequelize.STRING(10)
    },
    pwd: { //密码
        type: Sequelize.STRING(30)
    },
    ip: { //id地址
        type: Sequelize.STRING(30)
    },
    mac: { //mac地址
        type: Sequelize.STRING(30)
    },
    group:{ //组
        type: Sequelize.STRING(50)
    },
    isAdmin: { //是否是管理员
        type: Sequelize.INTEGER
    },
},{
    'timestamps':true, //时间戳 自动添加createdAt 和updatedAt两个字段，创建时间和修改时间
    'underscored':false, //使用下划线  createdAt 在表里为created_at
    'freezeTableName':false,//默认表名后面不加s
    'tableName':'t_user',//
    'charset':'utf8',//
    'collate':'utf8_general_ci',//
    'name':'t_user'
});

var Task = require('../model/task');
var Project = require('../model/project');
var Department = require('../model/department');
var Message = require('../model/message');

User.hasMany(Task,{as:'t_task',foreignKey:'uid'});
Task.belongsTo(User,{as:'t_user',foreignKey:'uid'});

Task.belongsTo(Project,{as:'t_project',foreignKey:'pid'});
Project.hasMany(Task,{as:'t_task',foreignKey:'pid'});

Department.hasMany(Project,{as:'t_project',foreignKey:'did'});
Project.belongsTo(Department,{as:'t_department',foreignKey:'did'});

sequelize.sync(); //创建表
module.exports = User;