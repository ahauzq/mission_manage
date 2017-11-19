var Sequelize = require('sequelize');
var sequelize = require('../../config/sequelizeObj');
//定义部门表的模型
var Department = sequelize.define('t_department', {
    did:{ //自增长id,主键,整形 部门id
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    depName: { //部门名称
        type: Sequelize.STRING(30)
    }
},{
    'timestamps':true, //时间戳 自动添加createdAt 和updatedAt两个字段，创建时间和修改时间
    'underscored':false, //使用下划线  createdAt 在表里为created_at
    'freezeTableName':false,//默认表名后面不加s
    'tableName':'t_department',//
    'charset':'utf8',//
    'collate':'utf8_general_ci',//
    'name':'t_department'

});

/*Department.sync();*/ //创建表
module.exports = Department;