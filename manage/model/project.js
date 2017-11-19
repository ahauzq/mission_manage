var Sequelize = require('sequelize');
var sequelize = require('../../config/sequelizeObj');

//定义项目表的模型
var Project = sequelize.define('t_project', {
    pid:{ //自增长id,主键,整形 项目id
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    did:{
        type:Sequelize.INTEGER,
    },
    proName: { //项目名称
        type: Sequelize.STRING(30)
    },
    proMaster: { //项目经理名称
        type: Sequelize.STRING(30)
    },
    sTime: { //开始时间
        type: Sequelize.DATE()
    },
    eTime: { //结束时间
        type: Sequelize.DATE()
    }
},{
    'timestamps':true, //时间戳 自动添加createdAt 和updatedAt两个字段，创建时间和修改时间
    'underscored':false, //使用下划线  createdAt 在表里为created_at
    'freezeTableName':false,//默认表名后面不加s
    'tableName':'t_project',//
    'charset':'utf8',//
    'collate':'utf8_general_ci',//
    'name':'t_project'
});

/*Project.sync();*/ //创建表

module.exports = Project;