/*
     Purpose	去除一个字符串的前后空格
     Author		ZHH
     Return		string
 */
String.prototype.trim = function() {
     return this.replace(/(^\s*)|(\s*$)/g , '') ;
}

/*
     Purpose	检验字符串是否以指定字符开头。区分大小写
     Author		ZHH
     Param		chars 开头指定的字符
     Return		boolean
 */
String.prototype.startWith = function(chars){
     var matchString = new RegExp("^" + chars) ;
     return this.match(matchString) != null ;
}

/*
     Purpose	检验字符串是否以指定字符结尾。区分大小写
     Author		ZHH
     Param		chars 结尾指定的字符
     Return		boolean
 */
String.prototype.endWith = function(chars){
     var matchString = new RegExp(chars + "$") ;
     return this.match(matchString) != null ;
}
/*
     Purpose	去除字符串中所有非数字和逗点的字符
     Author		ZHH
     Date		2004-1-18

     Return		String
*/
String.prototype.excludeNotNumericDot = function(){
     return this.replace(/[^\d|.|-]/g , '') ;
}

/*****************************************************************
7   Name		getStrLength
    Purpose		判断字符串求长度(全角，中文及中文标点算2个字符) 
    Date		2004-1-17
    Return		boolean
*****************************************************************/
String.prototype.getStrLength = function() {
    var len = 0;
    for (var i = 0; i <this.length; i++) {
        if (this.charCodeAt(i) > 126 || this.charCodeAt(i) < 27) len += 2; else len ++;
    }
    return len;
}

/*****************************************************************
6   Name		nstc.sf.subCHString
    Purpose		对字符串进行截取
    Date		2004-1-17
*****************************************************************/
String.prototype.subCHString = function(start, end){
    var len = 0;
    var str = "";
    for (var i = 0; i < this.length; i++) {
        len += this.charAt(i).getStrLength();
        if (end < len)
            return str;
        else if (start <= len)
            str += this.charAt(i);
    }
    return str;
}
/*****************************************************************
6   Name		nstc.sf.subCHStr
    Purpose		对字符串进行截取
    Date		2004-1-17
*****************************************************************/
String.prototype.subCHStr = function(start,length){
	    return this.subCHString(start, start + length);
}

/*
     Name		shortDate
     Purpose	取日期类型的短格式  YYYY-MM-DD
     Author		ZHH
     Return		String
*/
 Date.prototype.shortDate = function(){
     return this.getFullYear() + "-" + (this.getMonth() + 1<10?"0"+(this.getMonth()+1):this.getMonth()+1) + "-" + this.getDate() ;
 }
 
 /**
  * 功能：比较两个日期	
  * 参数：sDate-开始日期，eDate-结束日期
  * 返回：如果 sDate < eDate 返回结果大于0
  * 		 如果 sDate = eDate 返回结果等于0
  * 		 如果 sDate > eDate 返回结果小于0
  */
 function compareDateById(sDateTextId,eDateTextId){
	return compareDate(document.getElementById(sDateTextId),document.getElementById(eDateTextId));
 }
/**
 * 功能：比较两个日期	
 * 参数：sDate-开始日期，eDate-结束日期,resultType-返回类型(d-日,w-星期,m-月,y-年  默认为毫秒)
 * 返回：如果 sDate < eDate 返回结果大于0
 * 		 如果 sDate = eDate 返回结果等于0
 * 		 如果 sDate > eDate 返回结果小于0
 */
function compareDate(sDate,eDate,resultType){
	if(typeof(sDate) == "object"){
		sDate = sDate.value;
	}
	if(typeof(eDate) == "object"){
		eDate = eDate.value;
	}
	var miStart = Date.parse(sDate.replace(/\-/g, '/'));
	var miEnd = Date.parse(eDate.replace(/\-/g, '/'));
	var radix=1;
	var divisor=1;
	if(resultType=="d")
		divisor=radix*1000 * 24 * 3600;
	else if(resultType=="w")
		divisor=radix*7*1000 * 24 * 3600;
	else if(resultType=="m")
		divisor=radix*30*1000 * 24 * 3600;
	else if(resultType=="y")
		divisor=radix*365*1000 * 24 * 3600;
	return (miEnd-miStart)/divisor;
}
 
/*
     Purpose	计算日期加上天数后的日期
     Author		ZHH
     Param 		days   天数
     Return		Date
*/
 Date.prototype.addDays = function(days){
     var interTimes = days * 24 * 60 * 60 * 1000 ;
     return new Date(Date.parse(this) + interTimes) ;
 } 
/*
     Purpose	格式化金额，三位一逗
     Author		ZHH
     Param		amount   数值
     Return		String
 */
  function FormatMoney0(amount , peci){
  	 return FormatMoney(amount,peci,true)
  }
  function FormatMoney(amount , peci,flag){
      var tmpPos = "000000";
      if (0 == amount) {return "0."+tmpPos.substr(0,peci);}
	var result,nTen;
	var data = new String(amount) ;
	var srcData = FormatNumber(data.excludeNotNumericDot(),peci,"0.00");
	if (Math.abs(srcData) < 0.001) return flag==true?"0.00":"";
	strLen = srcData.length;
	dotPos = srcData.indexOf("." , 0);
	if (dotPos <= 0)  dotPos = strLen;
	result = "" ;
	for(var i = dotPos - 1 ; i >= 0 ; i--) {
		result = srcData.charAt(i) + result ;
		if((dotPos - i) % 3 == 0 && i != 0)
			result = "," + result ;
	}
	if (peci > 0) peci = peci + 1;
	var rs = result + srcData.substr(dotPos , peci);
	if(rs.startWith("-,"))
		return "-"+rs.substr(2);
	return rs;
 }
 /*
     Purpose		判断文本框内容是否为空
     Author			ZHH
     Param			objText     文本框
					message     错误提示信息
					isFocus	    是否设置焦点（默认为true）
     Return			boolean
 */
 function isEmpty(objText , message , isFocus){
   if(objText.value==null||objText.value.trim() == ""){
		alert((message==null?"":message) + "必须填写！");
		if((isFocus != null||isFocus==true)&&objText.focus!=null) objText.focus();
		return true;
   }
   return false ;
 }
 
/*
     Purpose	将阿拉伯数字翻译成中文的大写数字
     Author		ZHH
     Param		amount
     Return		String
 */
 function ChineseNumber(amount) {
    if(!/^\d*(\.\d*)?$/.test(amount)){alert("Number is wrong!"); return "Number is wrong!";}
    var AA = new Array("零","壹","贰","叁","肆","伍","陆","柒","捌","玖");
    var BB = new Array("","拾","佰","仟","万","亿","点","");
    var a = (""+ amount).replace(/(^0*)/g, "").split("."), k = 0, re = "";
    for(var i=a[0].length-1; i>=0; i--) {
        switch(k) {
            case 0 : re = BB[7] + re; break;
            case 4 : if(!new RegExp("0{4}\\d{"+ (a[0].length-i-1) +"}$").test(a[0]))
                     re = BB[4] + re; break;
            case 8 : re = BB[5] + re; BB[7] = BB[5]; k = 0; break;
        }
        if(k%4 == 2 && a[0].charAt(i+2) != 0 && a[0].charAt(i+1) == 0) re = AA[0] + re;
        if(a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k%4] + re; k++;
    }
    if(a.length > 1) { //加上小数部分(如果有小数部分)
        re += BB[6];
        for(var i=0; i<a[1].length; i++) re += AA[a[1].charAt(i)];
    }
    return re;
}

/*
     Purpose	格式化数字
     Author		ZHH
     Param		amount   数值
	 peci       小数位数。如果不指定默认保留2位
	 nanResult  结果为NaN时的返回结果。如果不指定返回""
     Return		String
 */
 function FormatNumber(amount , peci ,nanResult){
    var nresult=(nanResult==null)?"":nanResult;
 	if(amount.trim()=="")
 		return nresult;
 	var result = new Number(amount);
    var pecision = 2 ;
    if(peci != null) pecision = peci ;
    return result.toFixed(pecision)=="NaN"?nresult:result.toFixed(pecision) ;
 }
 
 /*
 	 Purpose	格式化利率
     Param		amount   数值
	 peci       小数位数。如果不指定默认保留4位
     Return		String
 */
 function FormatRate(amount,peci,max){
 	if(amount=="")
 		return "";
 	var pecision=(peci==null?4:peci);
 	var num=FormatNumber(amount,pecision,"0.0000");
 	if(max!=null&&num>max)
 		return "";
 	return num;
 }
 
 /*
     Name		isDate
     Purpose		判断一个字符串(YYYY-MM-DD)日期是否有效
     Author		ZHH
     Param		date     字符串日期
			hasAlert 是否提示无效信息，默认为false

     Return		有效 true  无效  false
*/
 function isDate(date , hasAlert) {
    var give = false ;
    var message = "日期格式错误，正确的日期格式例如 2009-01-01" ;
    if (hasAlert != null) give = hasAlert ;
    var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if(result == null) {
       if(give)	alert(message) ;
       return false;
    }
    var newDate = new Date(result[1], result[3]-1, result[4]);
    var isRight = newDate.getFullYear()==result[1]&&(newDate.getMonth()+1)==result[3]&&newDate.getDate()==result[4] ;
    if(!isRight){
       if(give)	alert(message) ;
    }
    return isRight ;
 }
 
 /*
     Name		checkDate
     Purpose		检查输入的日期格式是否正确。正确的格式为YYYY-MM-DD
     Author		ZHH
     Param		objText  Text对象
           		message  错误提示信息
     Return		有效 true  无效  false
 */
 function checkDate(objText){
	if(!isDate(objText.value , true)){
	   objText.focus();
	   return false ;
 	}else
	   return true ;
 }
 
/*
 20  Name		validMoney
     Purpose	检验金额数字是否正确
     Author		ZHH
     Param		objText          文本框对象
				errMoneyFormat   金额格式不正确的提示信息
				errMoneyLength   金额数据太大的提示信息
     Return		Boolean
 */
 function validMoney(objText , mlength , errMoneyFormat , errMoneyLength){
    var data = objText.value ;
	 if(data == "" || data == "0.00") return false;
    var result,nTen;
    var temp = data.excludeNotNumericDot();
    var srcData = FormatNumber(temp);
    var msg ;
    if(isNaN(srcData)){
		if(errMoneyFormat == null || errMoneyFormat == "")
	  		msg = "您输入的金额格式不正确！" ;
		else
			msg = errMoneyFormat ;
		alert(msg);
		objText.focus();     // 设置焦点
		return false;
    }
    strLen = srcData.length ;
    dotPos = srcData.indexOf(".",0) ;
	var m_length = 16;
	if(mlength != null) m_length = mlength;
    if(strLen > m_length){
		if(errMoneyLength == null || errMoneyLength == "")
		   msg = "您输入的金额位数过大！" ;
		else
		   msg = errMoneyLength ;
		alert(msg);
		objText.focus();     // 设置焦点
		return false;
    }
    return true ;
 }

/*
     Purpose		按回车时相当于按了TAB键转移焦点
     Author		ZHH
     Return		void
 */
 function Tab(){
   if ( event.keyCode == 13 ) event.keyCode = 9;
 }

 // 打开新窗口
function openwin(url, name, width, height) {
	if (height == null)height = screen.availHeight-150;
	if (width == null)width = screen.availWidth-30;
	if(name==null)name="_blank"
	var winObj = window.open(url, name, "height=" + height + ", width=" + width + ", toolbar=no, " + "menubar=no, scrollbars=yes , resizable=yes," + "location=no, status=no");
	resetToCenter(winObj, width, height);
	winObj.opener = window;
	return winObj;
}
/*
 * 打开窗口，居中显示
 * 参数：widthX 窗口宽度  hightY 窗口高度
 */
function resetToCenter(wObject, width, height) {
	if(!top.Layer){
		var xx = (window.screen.width - width) / 2;
		var yy = (window.screen.height - height) / 2;
		wObject.moveTo(xx, yy);
	}	
}
function sprint(frmName, tbName){
	var oFrom = $(frmName);
	if(oFrom == null){
		alert("表单:" + frmName + "不存在");
		return;
	}
	var oTb = $(tbName);
	if(oTb == null){
		alert("表格:" + tbName + "不存在");
		return;
	}
	var oExcelTarget = oFrom.all("text");
	if(oExcelTarget == null){
		alert("无法提交数据");
		return;
	}
	oExcelTarget.value = oTb.outerHTML;
	oFrom.action = "sprint.jsp";
	oFrom.target = "sprintPDF";
	winScroll("", "sprintPDF", 750, 500);
	oFrom.submit();
}

/**
 * 查找同一个父类下的指定名称元素。
 * 如查找和自己同一个TR下的名称为acntNo的元素：nstc.sf.findInSameParent(this,"TR","acntNo",false);
 * 如查找和自己同一个TD下的名称为xxxxx.acntNo的元素：nstc.sf.findInSameParent(this,"TR","acntNo");
 * @param obj 参照元素
 * @param parentTagName 限制查找范围的父元素
 * @param name 目标元素的名称
 * @param isShortName 给出的 目标元素的名称 是否是后缀缩写。默认true
 */
nstc.sf.findInSameParent=function(obj,parentTagName,name,isShortName){
	var parnt = nstc.sf.findParent(obj,parentTagName);
	if(parent==null) return null;
	if(isShortName == null) isShortName= true;
	if(isShortName) return  jQuery(parnt).find("[name$=."+name+"]");
	return jQuery(parnt).find("[name="+name+"]");
}

/**
 * 设置在查看模式下，指定名称元素/对象的值：
 * 如设置acntNo的显示值为225：nstc.sf.setViewText("acntNo","225",false)
 * 如设置xxx.acntNo的显示值为225：nstc.sf.setViewText("acntNo","225")
 * 也可以直接设置某个对象的显示值：
 * 如设置xxx.acntNo的显示值为225：
 * var obj = $("[name$=acntNo]")[0];
 * nstc.sf.setViewText(obj,"225")
 * @param param 待设置元素的名称或对象
 * @param value 值
 * @param isShortName 如果param是元素的名称时，明确给出的名称是否是后缀缩写。默认true
 */
nstc.sf.setViewText=function(param,value,isShortName){
	var ele = param;
	if(typeof param == 'string'){
		if(isShortName == null) isShortName= true;
		if(isShortName)  
			ele = $("[name$=."+param+"]")[0];
		else 
			ele = $("[name="+param+"]")[0];
	}
	ele.value=value;
	nstc.sf.findParent(ele,"SPAN").innerHTML = value+ele.outerHTML;
}

nstc.sf.openEditWindow=function(code){
	window.open('../bench/page/spxForCust.jsp?code='+code,'编辑','fullscreen=1');
}