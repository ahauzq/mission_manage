var Sequelize = require('sequelize');
var sequelize = require('../../config/sequelizeObj');

//定义表的模型
var Message = sequelize.define('t_message', {
    mid:{ //自增长id,主键,整形
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    username: { //谁留的言
        type: Sequelize.STRING(30)
    },
    content: { //留言的内容
        type: Sequelize.TEXT
    }
},{
    'timestamps':true, //时间戳 自动添加createdAt 和updatedAt两个字段，创建时间和修改时间
    'underscored':false, //使用下划线  createdAt 在表里为created_at
    'freezeTableName':false,//默认表名后面不加s
    'tableName':'t_message',//
    'charset':'utf8',//
    'collate':'utf8_general_ci',//
});
/*Message.sync();*/ //创建表

module.exports = Message;