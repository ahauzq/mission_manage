var Utils={
	"responseJSON":{
		success:function(data,page){
			console.log(data);
        	var res={
        		meta:{
        			"status":0,
        			"message":"执行成功"
        		},
        		data:data?data:[]
        	}
			if(page){
				res.page=page;
			}
        return res;
		},
		error:function(data){
			console.log(data);
        	var res={
        		meta:{
        			"status":1,
        			"message":data
        		},
        		data:[]
        	}
        return res;
		}
	}
}

module.exports = Utils;