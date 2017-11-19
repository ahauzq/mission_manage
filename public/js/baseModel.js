/**
 * 排期接口
 * LQBai 2017.6.29
 */
define([],function(){

     var model = {
        baseUri: '/api/v1/schedule/',
        getTaskById: function(data) {
            return $.ajax({
                url: this.baseUri + 'tasks',
                type: 'GET',
                dataType: 'json',
                data: data
            })
        },
        getProjects: function() {
            return $.ajax({
                url: this.baseUri + 'projects',
                type: 'GET',
                dataType: 'json'
            })
        },
        getDepartments:function() {
            return $.ajax({
                url: this.baseUri + 'departments',
                type: 'GET',
                dataType: 'json'
            })
        },
        addProject: function(data) {
            return $.ajax({
                url: '/api/v1/schedule/projects/add',
                type: 'POST',
                dataType: 'json',
                data: data
            })
        },
        addTask: function(data) {
            return $.ajax({
                url: '/api/v1/schedule/tasks/add',
                type: 'POST',
                dataType: 'json',
                data: data
            })
        },
        delTask: function(data) {
            return $.ajax({
                url: '/api/v1/schedule/task/delete',
                type: 'GET',
                dataType: 'json',
                data: data
            })
        },
        updateTask: function(data) {
            return $.ajax({
                url: '/api/v1/schedule/task/update',
                type: 'POST',
                dataType: 'json',
                data: data
            })
        },
        // 获取登陆用户信息
        getLoginUser: function() {
            return $.ajax({
                url: '/api/v1/schedule/user',
                type: 'GET',
                dataType: 'json',
            })
        },
        getAllTask: function(data) {
            return $.ajax({
                url: '/api/v1/schedule/tasks/all',
                type: 'GET',
                dataType: 'json',
                data: data,
            })
        }
    };
    return model;

});

