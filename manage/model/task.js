var Sequelize = require('sequelize');
var sequelize = require('../../config/sequelizeObj');
//定义任务表的模型
var Task = sequelize.define('t_task', {
    tid:{ //自增长id,主键,整形 任务id
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    uid:{ //所属用户
        type:Sequelize.STRING(6)  
    },
    pid:{ //所属项目
        type:Sequelize.INTEGER  
    },
    taskCont: { //任务名称
        type: Sequelize.STRING(256)
    },
    taskTime: { //任务时长
        type: Sequelize.FLOAT(6)
    },
    sTime: { //开始时间
        type: Sequelize.DATE()
    },
    eTime: { //结束时间
        type: Sequelize.DATE()
    },
    taskType: { //任务类型
        type: Sequelize.STRING(6)
    },
},{
    'timestamps':true, //时间戳 自动添加createdAt 和updatedAt两个字段，创建时间和修改时间
    'underscored':false, //使用下划线  createdAt 在表里为created_at
    'freezeTableName':false,//默认表名后面不加s
    'tableName':'t_task',//
    'charset':'utf8',//
    'collate':'utf8_general_ci',//
    'name':'t_task'
});
/*Task.sync();*/ //创建表

module.exports = Task;