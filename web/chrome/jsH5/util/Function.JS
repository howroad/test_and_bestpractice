//-------------------------------------------------------------------
// CheckBox对象处理部分	(1-20)
//-------------------------------------------------------------------

/*****************************************************************
 1   Name		getSelectedCheckBox
     Purpose		取选择的checkBox对象，并将该值保存到数组中，返回该数组
     Author		ZHH
     Date		2004-1-17
     Modify     	2004-2-2
     Param		items  checkBox对象名称
     Return		Array
 *****************************************************************/
 function getSelectedCheckBox(itemName){
    var items = document.getElementsByName(itemName) ;
	var values = new Array();
	if(items != null)
		for(var i = 0 ; i < items.length ; i++)
			if(isCheckBox(items[i]) && items[i].checked)
				values.push(items[i].value);
	return values;
 }

 function getSelected(itemName){
	return getSelectedCheckBox(itemName);
 }

/*****************************************************************
 2   Name			hasSelected
     Purpose		判断是否有选择的checkBox对象
     Author			ZHH
     Date			2004-1-17
     Modify     	2004-2-2
     Param			objCheckName   checkBox对象名称
     Return			Boolean
 *****************************************************************/
 function hasSelected(objCheckName){
    var has = getSelectedCheckBox(objCheckName) ;
    return has.length > 0 ;
 }


/*****************************************************************
 3   Name			setChecked
     Purpose		设置的CheckBox对象checked属性
     Author			ZHH
     Date			2004-1-17
     Modify     	2004-2-2
     Param			items		checkBox对象数组
					checked		是否选中
     Return			Number      处理的CheckBox对象数量
 *****************************************************************/
 function setChecked(items , checked){
	var count = 0 ;
	if(items != null)
		for(var i = 0 ; i < items.length ; i++)
			if(isCheckBox(items[i]) && items[i].checked != checked){
				items[i].checked = checked;
				count++;
			}
	return count;
 }

/*****************************************************************
 4   Name		setCheckedByName
     Purpose		按名称设置CheckBox的checked属性
     Author		ZHH
     Date		2004-3-29
     Param		objName	String	CheckBox对象名称
			checked			Boolean		是否选中
     Return		Number			设置的CheckBox对象数量
 *****************************************************************/
 function setCheckedByName(objName , checked){
	var items = document.getElementsByName(objName);
	return setChecked(items , checked);
 }


/*****************************************************************
 5   Name		selectAll
     Purpose		按名称设置CheckBox的checked属性为true
     Author		ZHH
     Date		2004-3-29
     Param		objName	String	checkBox对象名称
     Return		Number			设置的CheckBox对象数量
 *****************************************************************/
 function selectAll(objName){
	return setCheckedByName(objName , true);
 }

/*****************************************************************
 6   Name		selectNone
     Purpose		按名称设置CheckBox的checked属性为false
     Author		ZHH
     Date		2004-3-29
     Param		objName	String	checkBox对象名称
     Return		Number			设置的CheckBox对象数量
 *****************************************************************/
 function selectNone(objName){
	return setCheckedByName(objName , false);
 }

/**********************************************************
 7   Name		selectReverse
     Purpose		按名称反选checkBox对象的checked属性
     Author		ZHH
     Date		2004-2-2
     Param		objName   CheckBox对象名称
     Return		Number
 **********************************************************/
 function selectReverse(objName){
	 var items = document.getElementsByName(objName);
	 if(items != null)
		 for(var i = 0 ; i < items.length ; i++)
			if(isCheckBox(items[i])) items[i].checked = !items[i].checked;
 }


/**********************************************************
 8   Name		getAllCheckBox
     Purpose		取页面里所有的CheckBox对象
     Author		ZHH
     Date		2004-2-2
     Return		Array
 **********************************************************/
 function getAllCheckBox(){
    var items = new Array();
	var a = document.getElementsByTagName("INPUT");
	if(a != null)
		for(var i = 0 ; i < a.length ; i++){
			if(isCheckBox(a[i])) items.push(a[i]);
		}
	return items
 }

/*****************************************************************
 9   Name		markCheckByName
     Purpose		根据名称前缀标记checkBox选中或不选
     Author		ZHH
     Date		2004-1-17
     Param		chars    名称的前缀
			selected 是否选中

     Return		void
 *****************************************************************/
 function markCheckByName(chars , selected){
     var a = document.getElementsByTagName("INPUT");
	  for (var i = 0; i < a.length; i++)
	    if (isCheckBox(a[i]) && a[i].name.startWith(chars)){
			 if(a[i].checked != selected)
				 a[i].checked = selected;
		}
 }

 
/*****************************************************************
 10  Name		getSelectedByNamePrefix
     Purpose	????checkBox??????????????selected?null????
     Author		ZHH
     Date		2004-1-17
     Param		prefix    ?????
					selected ????

     Return		void
 *****************************************************************/
 function getSelectedByNamePrefix(prefix , selected){
	//if(selected == null) selected = true;
	var items = new Array();
	var a = document.getElementsByTagName("INPUT");
	if(a != null)
		for(var i = 0 ; i < a.length ; i++){
			if(isCheckBox(a[i]) && a[i].name.startWith(prefix)){
				if(selected == null)
					items.push(a[i]);
				else if (a[i].checked == selected){
					items.push(a[i]);
				}
			}
		}
	return items
 }


//----------------------------------------------------------------
// 按键处理部分 (21-50)
//----------------------------------------------------------------

/*****************************************************************
 21  Name		Tab
     Purpose		按回车时相当于按了TAB键转移焦点
     Author		ZHH
     Date		2004-1-17
     Return		void
 *****************************************************************/
 function Tab(){
   if ( event.keyCode == 13 ) event.keyCode = 9;
 }


/*****************************************************************
 22  Name		pressNumber
     Purpose		限制文本框只能输入数字。
     Author		ZHH
     Date		2004-1-17
     Param		allowMinus	是否允许输入负号
			objCheck   	指定CheckBox对象名称,如果输入数字将检查框设置为真
     Return		void
 *****************************************************************/
 function pressNumber(allowMinus , objCheck){
   if(allowMinus == null) allowMinus = false;
   if((allowMinus  && event.keyCode == 45) || event.keyCode < 48 || event.keyCode > 57){
      event.returnValue=false;
      return ;
   }
   if(objCheck != null)  objCheck.checked = true;
 }


/*****************************************************************
 23  Name		pressNumberDot
     Purpose		限制文本框只能输入数字和“.”
     Author		ZHH
     Date		2004-1-17
     Param		allowMinus	是否允许输入负号
			objCheck  	如果指定CheckBox对象名称,输入时将检查框设置为真
     Return		void
 *****************************************************************/
 function pressNumberDot(allowMinus , objCheck){
   if(allowMinus == null) allowMinus = false;
   if(!(event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode==46 || allowMinus  && event.keyCode == 45)){
      event.returnValue=false;
      return ;
   }
   if(objCheck != null)  objCheck.checked = true;

 }

/*****************************************************************
 24  Name		pressNumberDotComma
     Purpose		限制文本框只能输入数字和“.”和“,”
     Author		ZHH
     Date		2004-1-17
     Param		allowMinus 	是否允许输入负号
			objCheck   	如果指定CheckBox对象名称,输入时将检查框设置为真
     Return		void
 *****************************************************************/
 function pressNumberDotComma(allowMinus , objCheck){
   /*if(allowMinus == null) allowMinus = false;
   if(!(event.keyCode>=48 && event.keyCode<=57 || event.keyCode==46 || event.keyCode==44 || allowMinus  && event.keyCode == 45)){
      event.returnValue=false;
      return ;
   }
   if(objCheck != null) objCheck.checked = true ;*/

    if(allowMinus == null) allowMinus = false;
    if(window.navigator.userAgent.toUpperCase().indexOf('FIREFOX')!=-1){
        var event = arguments.callee.caller.arguments[0];
        if(!(event.charCode>=48 && event.charCode<=57 || event.charCode==46 || event.charCode==44 || allowMinus && event.keyCode == 45)){
            event.preventDefault();
            return ;
        }
    }else{
        var event = window.event;
        if(!(event.keyCode>=48 && event.keyCode<=57 || event.keyCode==46 || event.keyCode==44 || allowMinus && event.keyCode == 45)){
            event.returnValue=false;
            return ;
        }
    }
    if(objCheck != null) objCheck.checked = true ;
}


/*****************************************************************
 25  Name		pressNumberChar
     Purpose		限制文本框只能输入数字和“-”
     Author		ZHH
     Date		2004-1-17
     Param		objCheck   如果指定CheckBox对象名称,输入时将检查框设置为真
     Return		void
 *****************************************************************/
 function pressNumberChar(objCheck){
   if((event.keyCode<48 || event.keyCode>57) && (event.keyCode != 45)){
      event.returnValue=false;
      return ;
   }
   if(objCheck != null) objCheck.checked = true ;
 }



//----------------------------------------------------------------
// 对象检查部分 (51-80)
//----------------------------------------------------------------

/*****************************************************************
 51  Name		isObjectTaged
     Purpose		检查对象是否是指定标签的对象
     Author		ZHH
     Date		2004-3-29
     Param		object		对象
			tagName		指定标签名称
     Return		Boolean
 *****************************************************************/
 function isObjectTaged(object , tagName){
	return object.type == tagName;
 }

/*****************************************************************
 52  Name		isTextObject
     Purpose		检查对象是否Text对象
     Author		ZHH
     Date		2004-1-17
     Param		object   如果指定Text对象名称
     Return		Boolean
 *****************************************************************/
 function isTextObject(object){
   return isObjectTaged(object , "text") ;
 }


/*****************************************************************
 53  Name		isCheckBox
     Purpose		检查对象是否CheckBox对象
     Author		ZHH
     Date		2004-2-2
     Param		object   如果指定CheckBox对象名称
     Return		Boolean
 *****************************************************************/
 function isCheckBox(object){
   return isObjectTaged(object , "checkbox") ;
 }




//----------------------------------------------------------------
// 其它 (101...)
//----------------------------------------------------------------


/*****************************************************************
 101 Name		setBGColor
     Purpose		设置对象背景色
     Author		ZHH
     Date		2004-2-2
     Param		object 对象
			color  颜色
     Return		void
 *****************************************************************/
 function setBGColor(object , color){
   if(object == null) return ;
   rowColor = color == null ? "#EEEEEE" : color ;
   object.style.background = rowColor ;
 }


/*****************************************************************
 102 Name		resetBGColor
     Purpose		取消对象背景色
     Author		ZHH
     Date		2004-2-2
     Param		object 对象
     Return		void
 *****************************************************************/
 function resetBGColor(object){
   if (object != null)
      object.style.background = "" ;
 }


/*****************************************************************
 103 Name		doPressESC
     Purpose		按ESC键时，关闭当前窗口
     Author		ZHH
     Date		2004-2-2
     Return		void
 *****************************************************************/
 function doPressESC(){
	if(event.keyCode == 27)
		window.close();
 }
 /*****************************************************************
  	 Name		pressNumber
     Purpose	限制文本框只能输入数字。
 *****************************************************************/
 function pressNumberLimit(){
	 if((event.keyCode>=48 && event.keyCode<=57) || (event.keyCode>=96 && event.keyCode<=105) || (event.keyCode == 46) ||  (event.keyCode == 8)){
		 return true;
	 }
	 event.returnValue=false;
	 return false;
 }
 
 /**
  * 限制只能输入固定个数数字（不包括逗号）
  * @returns {Boolean}
  */
 function pressNumberLenLimitExpDot(obj, length){
	 pressNumberDotComma(false);
	 var value = obj.value;
	 if(value !=null && value.replace(/,/g,"").getStrLength()>=length){		 
		 event.returnValue=false;
		 return false;
	 }
 }
 