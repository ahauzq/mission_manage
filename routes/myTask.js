var express = require('express');
var router = express.Router();
var Utils = require('../utils/utils');

var TaskController=require('../manage/controller/TaskController');
var ProjectController=require('../manage/controller/ProjectController');
var DepartmentController=require('../manage/controller/DepartmentController');
var UserController=require('../manage/controller/UserController');

var baseURI=Utils.baseUri

//查找所有项目/api/v1/schedule
router.get(baseURI+'/projects', function(req, res, next) {
  ProjectController.getProjects(req, res, next);
});
//查找所有部门/api/v1/schedule
router.get(baseURI+'/departments', function(req, res, next) {
     DepartmentController.getDepartments(req, res, next);    
});

//查找当前ip用户
router.get(baseURI+'/user', function(req, res, next) {
     UserController.getUser(req, res, next);    
});
//查找所有用户
router.get(baseURI+'/users', function(req, res, next) {
     UserController.getUsers(req, res, next);    
});

//查找与我相关的任务/api/v1/schedule
router.get(baseURI+'/tasks', function(req, res, next) { 
        TaskController.getTasks(req, res, next);  
});

//管理员添加项目
router.post(baseURI+'/projects/add', function(req, res, next) { 
        ProjectController.addProjects(req, res, next);  
});

//添加我的任务
router.post(baseURI+'/tasks/add', function(req, res, next) { 
        TaskController.addTasks(req, res, next);  
});
//修改任务
router.post(baseURI+'/task/update', function(req, res, next) { 
        TaskController.updateTasks(req, res, next);  
});
//删除任务
router.get(baseURI+'/task/delete', function(req, res, next) { 
        TaskController.deleteTasks(req, res, next);  
});


//查询所有用户在时间段内的所有任务
router.get(baseURI+'/tasks/all', function(req, res, next) { 
        TaskController.getAllTasksByCondition(req, res, next);  
});
//查询时间段内的任务
router.get(baseURI+'/tasks/timeSlot', function(req, res, next) { 
        TaskController.getAllTasksByTimeSlot(req, res, next);
});
module.exports = router;