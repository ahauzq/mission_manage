var Sequelize = require('sequelize');
var sequelizeObj = new Sequelize(
    'message_board',    //数据库名
    'root',             //用户名
    'root',             //密码
    {
        'dialect': 'mysql',
        'host': 'localhost',
        'port': 3306,
        'define':{
            'timestamps':false,
            'freezeTableName':false
        }
    }
);


module.exports = sequelizeObj;
