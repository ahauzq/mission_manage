(function() {
	/*document.write('<script src="jsonToExcle/xlsx.full.min.js"></script>');*/
	console.log(document.currentScript.src);
	var url=document.currentScript.src;
	var index=url.lastIndexOf('\/');
	url=url.substring(0,index)+"/xlsx.full.min.js";
	document.write('<script src="'+url+'"></script>');
	if (typeof Object.assign != 'function') {
		Object.assign = function(target) {
			'use strict';
			if (target == null) {
				throw new TypeError('Cannot convert undefined or null to object');
			}

			target = Object(target);
			for (var index = 1; index < arguments.length; index++) {
				var source = arguments[index];
				if (source != null) {
					for (var key in source) {
						if (Object.prototype.hasOwnProperty.call(source, key)) {
							target[key] = source[key];
						}
					}
				}
			}
			return target;
		};
	}
})();
var JsonToExcle=function(retData, type){
	/*for (var i = 0; i < 10000; i++) {
		var data ={ id: '1',
                    name: 'test1',
                    age: '30',
                    country: 'China',
                    remark: 'hello' 
                }
		retData.excleData[0].sheetData.push(data);
	}*/
	this.init(retData, type);
}
JsonToExcle.prototype={
	init:function(retData, type){
			var that=this;
			var _headers = [],
				_data = [],
				tmpDown, tmpWB, temp, headers, output, outputPos;
			if (retData.excleData.length > 0) {
				tmpWB = { //最终导出的excle表结构
					SheetNames: [],
					Sheets: {}
				};
				for (var i = 0; i < retData.excleData.length; i++) {
					tmpWB.SheetNames.push(retData.excleData[i].sheetName); //sheet页名称
					var keyData = [],
						valueData = [];
					for (var key in retData.excleData[i].sheetTitle) {
						keyData.push(key);
						valueData.push(retData.excleData[i].sheetTitle[key]);
					}
					_headers = keyData;
					_data = retData.excleData[i].sheetData;
					temp = valueData.map(function(v, i) {
						return Object.assign({}, {
							v: v,
							position: String.fromCharCode(65 + i) + 1
						});
					});
					headers = temp.reduce(function(prev, next) {
						var key = next.position,
							value = next.v,
							obj = {};
						obj[key] = {
							v: value
						};
						return Object.assign({}, prev, obj);
					}, {});


					var data = _data.map(function(v, i) {
						return _headers.map(function(k, j) {
							return Object.assign({}, {
								v: v[k],
								position: String.fromCharCode(65 + j) + (i + 2)
							});
						});
					}).reduce(function(prev, next) {
						return prev.concat(next);
					})/*.reduce(function(prev, next) {
						var key = next.position,
							value = next.v,
							obj = {};
						obj[key] = {
							v: value
						};
						return Object.assign({}, prev, obj);
					}, {});*/
					var data1={}
					data.forEach(function(item,i){
						data1[item.position]={v:item.v};
					});

					output = Object.assign({}, headers, data1);
					outputPos = Object.keys(output);
					tmpWB.Sheets[retData.excleData[i].sheetName] = Object.assign({}, output, //内容
						{
							'!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
						});
				}
			} else {
				_headers = [];
				_data = [];
				alert('数据格式错误');
				return;
			}
			tmpDown = new Blob([that.s2ab(XLSX.write(tmpWB, {
					bookType: (type == undefined ? 'xlsx' : type),
					bookSST: false,
					type: 'binary'
				} //这里的数据是用来定义导出的格式类型
			))], {
				type: ""
			}); //创建二进制对象写入转换好的字节流
			
			//创建a标签
			var a = document.createElement("a");
			//href="" id="oasExcle" download="导出的文件.xlsx"
			a.setAttribute("id","oasExcle");
			a.setAttribute("style","display:none");
			a.setAttribute("download",retData.excleName+"."+(type == 'xls' ? 'xls' : "xlsx"));
			document.body.appendChild(a);
			var href = URL.createObjectURL(tmpDown); //创建对象超链接
			document.getElementById("oasExcle").href = href; //绑定a标签
			document.getElementById("oasExcle").click(); //模拟点击实现下载
			setTimeout(function() { //延时释放
				URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
			}, 100);
			//销毁a标签
			var el=document.getElementById("oasExcle");
			el.parentNode.removeChild(el);
			
	},
	s2ab:function(s){
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
			return buf;
	}
}