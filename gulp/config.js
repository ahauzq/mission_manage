module.exports = {

	"font": {
		"version": "1.0.5",
		"className": "gwicon",
		"fontName": "godway-icon"
	},

	server_config: {
		// test: {
		// 	host: '172.16.5.107',
  // 			port: 22,
  // 			username: 'root',
  // 			password: 'godway'
		// }
		test: {
            host: '172.16.1.108',
            port: 22,
            username: 'root',
            password: '117117test'
        }
    },

    build: {
        cname:'全息检索',                                              /*模块中文名称，必填*/
        name:'Aiss',                                                   /*模块名称，唯一，必填，不能含有中文,用于打包使用*/
        packagename: 'aiss',                                            /*模块包名，用与获取模块私有代码*/
        version: '1.0.1',                                               /*版本，必填，如 1.0.0*/
        date: '' + new Date().toJSON().substring(0, 10).replace(/-/g, ''),
        release_note: "",// +
                      // "\n\t1. XXXXXXXXX" +
                      // "\n\t2. XXXXXXXXXXXXXXXXXX",
        release_name: 'GodWay_Web_' + this.name + '-frontend-install-runtime' + this.version + '-allsystem-' + this.date
    }

}