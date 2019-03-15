if (nstc == null) var nstc = {};
/*
  表格排序 author 孙钰佳 2008/02/24
  09.03.22 重构，优化性能 支持<th onsort="函数名"> 回调比较
  动态构建的table同样可以排序,只需指定TD的sortObject属性指向待取值的对象(例如input控件)的引用 例cell.sortObject=动态构建出的input对象
  在页面加载时执行如下脚本即可
	var sorter=new syj.Sort('mainTable');
	sorter.bindCell(0,'NUMBER');
	sorter.bindCell(1,'STRING_EN',false);如果列表已经有序指定顺序false正序
	sorter.bindCell(2,'STRING_CH');
	sorter.bindCell(3,'DATE');
*/
//tbName待排序的表名start起始tr下标默认1,end结束tr下标默认0
nstc.Sort=function(tb,ftb,isFixed,iStart,iEnd){//定义表格排序函数,此函数用于模拟表格排序类
    this.oTable=tb;//一个排序类对象仅对应一个表，实际表
    this.iStart=iStart==null?1:iStart;//表头不需要排序的前n行
    this.iEnd=iEnd==null?0:iEnd;//表尾不需要排序的后n行
    this.orderMap={};//存放每列排序状态的Map容器
    this.compareFuncMap={};//存放每列排序函数的Map容器

	this.heads=this.oTable.rows[0].cells;
	if(ftb!=null) {
		this.oFixedTable=ftb;//固定表头表
		this.fixedHeads=this.oFixedTable.rows[0].cells;
	}
	this.spanSrc=document.createElement("span");
	//this.spanSrc.innerHTML="▼";//占位用/
	this.spanSrc.style["text-align"]="center";
	this.spanSrc.style["vertical-align"]="middle";
	this.spanSrc.innerHTML='<img style="vertical-align:middle" src="./SmartFormRes/js/skin/default/desc.png" />';
	this.isFixed = isFixed;//是否为固定表头的场景
}
//指定待排序的列cellIdx列号下标,desc如果列表已经有序true为倒序false为正序,null为无序,type类型支持类型有DATE,NUMBER,STRING_EN,STRING_CH
nstc.Sort.prototype.bindCell=function(cellIdx,type,desc){	
	if(typeof(this.oFixedTable)!='undefined') {
		this.setPlaceHolder("fixed",cellIdx,type,desc);
	}else{
		//
		this.setPlaceHolder("actual",cellIdx,type,desc);
	}
}
nstc.Sort.prototype.setPlaceHolder=function(tableType,cellIdx,type,desc){
	var c=(tableType=='fixed'?this.fixedHeads[cellIdx]:this.heads[cellIdx]),o=this;
	c.style.cursor='pointer';
	
	var thisType=type;//转成局部变量，使用入参变量，不能够利用闭包特性。
	var thisTableType = tableType;
	c.onclick=function(){
		cellIdx = this.cellIndex;
		/*if (this.getAttribute("sortType") == "desc") {
			instance.orderMap[this.cellIndex] = "asc";
		} else {
			instance.orderMap[this.cellIndex] = "desc";
		}*/
		instance.orderMap[this.cellIndex] = this.getAttribute("sortType");
		if(o.isFixed) {
			/*if(thisTableType!='fixed') {
				o.sort(this,thisType);//使用闭包逻辑
			} else {
				o.switchOrder(this.cellIndex);//改变当前列的排序状态标识
			}*/
			o.sort(this,thisType);//使用闭包逻辑
			o.switchOrder(this.cellIndex);//改变当前列的排序状态标识
		} else {
			o.sort(this,thisType);//使用闭包逻辑
		}

		if(instance.orderMap[this.cellIndex]=='desc') {
			this.getElementsByTagName("span")[0].innerHTML='<img style="vertical-align:middle"  src="./SmartFormRes/js/skin/default/desc.png"  />';
			this.setAttribute("sortType","desc");
		} else {
			this.getElementsByTagName("span")[0].innerHTML='<img style="vertical-align:middle" src="./SmartFormRes/js/skin/default/asc.png"  />';
			this.setAttribute("sortType","asc");
		}
		this.getElementsByTagName("span")[0].style.visibility='visible';
		//this.updateSymbol();
		if(o.onclickExt!=null)o.onclickExt(this);//执行扩展的onclickExt事件
		this.style.cursor='pointer';
	}
	
	var f=this.spanSrc.cloneNode(true);
	f.style.visibility='hidden';
	f.style["text-align"]="center";
	f.style["vertical-align"]="middle";
	f.sortType = "";
	var instance=this;
	c.updateSymbol=function(){
		//if(instance.orderMap[cellIdx]=='desc') f.innerHTML="▼";else f.innerHTML="▲";
		if(instance.orderMap[this.cellIndex]=='desc') {
			f.innerHTML='<img style="vertical-align:middle"  src="./SmartFormRes/js/skin/default/desc.png"  />';
		} else {
			f.innerHTML='<img style="vertical-align:middle" src="./SmartFormRes/js/skin/default/asc.png"  />';
		}

		f.style.visibility='visible';
	}
	if(desc!=null)this.orderMap[this.cellIndex]=desc==true?'desc':'asc';
	if(this.orderMap[this.cellIndex]!=null)c.updateSymbol();
	c.onmouseover=function(){
		if(this.getAttribute("sortType")) {
			this.getElementsByTagName("span")[0].style.visibility='visible';
		}
	}
	c.onmouseout=function(){this.getElementsByTagName("span")[0].style.visibility='hidden';}
	if (c.getElementsByTagName("span").length == 0) {
		c.appendChild(f);
	}
	c.style.textIndent=f.offsetWidth;
}
nstc.Sort.prototype.sort=function(triger,type){//定义表格排序类的排序方法
    var oTbody=this.oTable.tBodies[0];
    var oRows=this.oTable.rows;//全部的rows(行)对象
    var aRowsList=[];//存放待排序的rows
    var aEndRowsList=[];//存放表尾不需要排序的rows
    var iLength=oRows.length;//表总行数
    if(this.iStart+this.iEnd>=iLength) return ;//表中无数据
    var oDocFrag=document.createDocumentFragment();//创建一个临时用的dom对象
    for(var i =this.iStart;i<iLength-this.iEnd;i++) {//向数组中添加待排序的row对象
    	if(oRows[i].style.display!="none" && "0" != oRows[i].getAttribute("isSort")) {
    		aRowsList.push(oRows[i]);
    	} else {
    		aEndRowsList.push(oRows[i]);
    	}
    }
    aRowsList.sort(this.generateCompareFunc(triger,type));//利用数组的sort方法对数组进行排序
    for(var i =iLength-this.iEnd;i<iLength;i++)//添加表尾不参与排序的row对象
        aEndRowsList.push(oRows[i]);
	//if(this.orderMap[triger.cellIndex]==(this.isFixed?'desc':'asc')){
	if(this.orderMap[triger.cellIndex]=='asc'){
        for(var i=aRowsList.length-1;i>=0;i=i-1)//反向append
            oDocFrag.appendChild(aRowsList[i]);
    }else{
        for(var i=0,iRowLength=aRowsList.length;i<iRowLength;i++)//正向append
            oDocFrag.appendChild(aRowsList[i]);
    }
    for(var i=0,iRowLength=aEndRowsList.length;i<iRowLength;i++)//追加表尾没参与排序的rows
        oDocFrag.appendChild(aEndRowsList[i]);
    oTbody.appendChild(oDocFrag);//把临时dom对象(其中存放了排序后的rows)挂到表上
	if(!this.isFixed) {
		this.switchOrder(triger.cellIndex);//改变当前列的排序状态标识
	}
    oTbody=null,oRows=null,aRowsList=null,aEndRowsList=null,iLength=null,oDocFrag=null;
}
nstc.Sort.prototype.switchOrder=function(idx){
    var order=this.orderMap[idx];
    order=(order==null||order=='desc')?'asc':'desc';
    this.orderMap[idx]=order;
}
nstc.Sort.prototype.toDate=function(ds){//字符串转成日期类型 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
    var d = new Date(Date.parse(ds));
    if (isNaN(d)){
        var arys= ds.split('-');
        d = new Date(arys[0],arys[1]-1,arys[2]);
    }
    return d;
}
nstc.Sort.prototype.getCellValue=function(cell,func){//取cell的值
	if(cell.sortObject!=null) {
		return cell.sortObject.value!=null?cell.sortObject.value:cell.sortObject.innerText;
	}
	else {
		var val = cell.getElementsByTagName("input") ? cell.getElementsByTagName("input").item(0).value : cell.innerText;
		return !func?val:func(cell);//默认取td中的文字,如果指定了onsort则执行onsort中的函数取值
	}
}
nstc.Sort.prototype.generateCompareFunc=function(triger,type){//生存排序函数
    //var idx=triger.cellIndex;//列的下标
	var idx = getCellIndex(triger);
	var func=this.compareFuncMap[idx];//先在map中找,找不到再新建
    if(func!=null) return func;
    var instance=this;//闭包引用层次太深了,需要此引用
    var onsortFunc=window[triger.onsort];//利用反射取得onsort定义的函数
    if(type=="STRING"||type=="STRING_EN"||type=="STRING_CH"){
        func=function compare(a,b){
            var x=instance.getCellValue(a.cells[idx],onsortFunc);
            var y=instance.getCellValue(b.cells[idx],onsortFunc);
            x=x==null?'':x;
            y=y==null?'':y;
            return x.localeCompare(y);//调用本地的比较函数,汉字按首字拼音排序
        }
    }else if(type=="NUMBER"){
        func=function compare(a,b){
            var x=instance.getCellValue(a.cells[idx],onsortFunc);
            var y=instance.getCellValue(b.cells[idx],onsortFunc);
			if((x==null || x=='') && y !=null && y !='')
				return -1
			else if(x!=null && x!='' && (y==null || y==''))
				return 1;	
			else{	
				x=x==null?1:x;
				y=y==null?1:y;
				x=x.replace(/[^\d|.|-]/g,"");//去掉除-.以外的其他字符
				y=y.replace(/[^\d|.|-]/g,"");
				return x*1000-y*1000;//考虑浮点运算
			}
        }
    }else if(type=="DATE"){
        func=function compare(a,b){
            var x=instance.getCellValue(a.cells[idx],onsortFunc);
            var y=instance.getCellValue(b.cells[idx],onsortFunc);
            var d='1900-01-01';
            var x=instance.toDate(x==''?d:x);
            var y=instance.toDate(y==''?d:y);
            var z=x-y;
            return z;
        }
    }
    //this.compareFuncMap[idx]=func;	// 不使用缓存，保证在拖拽列后，排序依然正确
    return func;
}
