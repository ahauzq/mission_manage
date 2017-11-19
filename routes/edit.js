var express = require('express');
var router = express.Router();
//引入数据库Message模块
/*var Message = require('../model/message');*/
/*var Utils = require('../utils/utils');
var Page = require('../utils/page');*/
//查找一条数据
router.get('/find_one', function(req, res, next) {
    //如果没有id或者id为空,直接返回
    if (req.query.id == undefined || req.query.id == '') {
        res.render('404', {});
        return;
    }
    Message.findOne({
            where:{
                id:req.query.id
            }
    }).then(function(msg){
        res.json(Utils.responseJSON.success(msg));
        /*res.render('edit', { message: msg });*/
    });
});

//更新一条数据
router.post('/update_msg', function(req, res, next) {
    //如果没有post数据或者数据为空,直接返回
    if (req.body.username == undefined ||req.body.username == ''
        || req.body.content == undefined || req.body.content == ''
        || req.body.id == undefined || req.body.id == '') {
        res.render('404', {});
        return;
    }
    var message = {
        username: req.body.username,
        content: req.body.content,
    };
    //创建一条记录,创建成功后跳转回首页
    Message.update(message,{
        where:{
            id:req.body.id
        }
    }).then(function(msg){
        console.log(msg);
        res.redirect('/findAll');
    });
});

module.exports = router;