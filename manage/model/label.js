var Sequelize = require('sequelize');
var sequelize = require('../../config/sequelizeObj');
//定义标签表的模型
var Task = sequelize.define('t_label', {
    lid:{ //自增长id,主键,整形 任务id
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    pid:{ //pid 项目id 外键
        type:Sequelize.INTEGER  
    },
    name: { //任务名称
        type: Sequelize.STRING(30)
    }/*,
    sTime: { //开始时间
        type: Sequelize.DATE()
    },
    eTime: { //结束时间
        type: Sequelize.DATE()
    }*/
},{
    'timestamps':true, //时间戳 自动添加createdAt 和updatedAt两个字段，创建时间和修改时间
    'underscored':false, //使用下划线  createdAt 在表里为created_at
    'freezeTableName':false,//默认表名后面不加s
    'tableName':'t_label',//
    'charset':'utf8',//
    'collate':'utf8_general_ci',//
});
/*Task.sync(); //创建表*/

module.exports = Task;