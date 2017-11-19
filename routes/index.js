var express = require('express');
var router = express.Router();
//引入数据库Message模块
/*var Message = require('../model/message');*/
/*var Utils = require('../utils/utils');
var Page = require('../utils/page');*/
//查找所有数据
router.get('/findAll', function(req, res, next) {
    var page = new Page();
    page.pageNo=parseInt(req.query.pageNo);
    page.pageSize=parseInt(req.query.pageSize);  
    Message.findAndCountAll({
        where:{username:req.query.username},
        offset:(page.pageNo-1)*page.pageSize,
        limit:page.pageSize
    }).then(function(msgs) {
        console.log(msgs.count);
        page.setTotlRows(msgs.count);
        /*res.render('index', { messages: msgs.rows});*/
        res.json(Utils.responseJSON.success(msgs.rows,page));
    });
});

//删除一条数据
router.get('/del_msg', function(req, res, next) {
    //如果没有id字段,返回404
    if (req.query.id == undefined ||req.query.id == '') {
        res.render('404', {});
        return;
    }
    //先查找,再调用删除,最后返回首页
    Message.findOne({
        where:{
            id:req.query.id
        }
    }).then(function(msg){
        msg.destroy().then(function(){
            console.log('delete success !!');
            res.redirect('/findAll');
        });
    });
});

//添加一条数据
router.post('/add_msg', function(req, res, next) {
    console.log(page);
    //如果没有post数据或者数据为空,直接返回
    if (req.body.username == undefined ||req.body.username == ''
        || req.body.content == undefined || req.body.content == '') {
        res.render('404', {});
        return;
    }
    var message = {
        username: req.body.username,
        content: req.body.content
    };
    //创建一条记录,创建成功后跳转回首页
    Message.create(message).then(function(msg){
        console.log(msg);
        res.redirect('/findAll');
    });
});
//
router.get('/detail', function(req, res) {
    res.render('detail', {});
});
module.exports = router;