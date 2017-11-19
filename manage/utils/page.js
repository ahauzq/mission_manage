var Page=function(){
	this.pageNo=1;
        this.pageSize=10;
        this.totlRows=0;
        this.totlPage=0;
        this.setTotlRows=function(totlRows){
                this.totlRows = totlRows?totlRows:0;
                this.totlPage = Math.ceil(totlRows/this.pageSize)?Math.ceil(totlRows/this.pageSize):0;
        };
        this.setPageNo=function(pageNo){
                this.pageNo = pageNo?pageNo:0;
        };
        this.setPageSize=function(pageSize){
                this.pageSize = pageSize?pageSize:0;
        };
}
module.exports = Page;