/**
 * @description 校验表单输入项
 * @depJs dynamicForm.js
 */
/*--------- 命名空间 ---------*/
if (!nstc)
	var nstc = {};
if (!nstc.sf)
	nstc.sf = {};

/**
 * 查找指定事件对象所在的表单，校验表单所有输入项。
 * 目前只检验<input>,<textarea>和<select>。通过增加IF判断可以增加增加检查项。
 * 入参为待校验表单内的某一个元素。
 *
 */
nstc.sf.validateForm = function(th) {
	var form = nstc.sf.findParent(th, "FORM");
	var id = "div\\."+th.id.split(".")[0];
	// input
	if(!nstc.sf.validateAllInputs(form,"input")){
		return false ;
	}
	// select 
	if(!nstc.sf.validateAllInputs(form,"select")){
		return false;
	}
	// textarea
	if(!nstc.sf.validateAllInputs(form,"textarea")){
		return false;
	}
	// 钩子，nstc.sf.validate 共业务程序中使用，添加校验逻辑。传入表单的ID
	// nstc.sf.validate 返回true则通过验证，不返回或者返回false不通过验证
	if(nstc.sf.validate && !nstc.sf.validate(id)){
		return false;
	}
	return true;
}
/**验证执行所有指定元素。
 * 如入参是("form1","select")，则验证form1下所有select的值。
 * 如id为空，则检查页面所有指定tagName的值。
 */
nstc.sf.validateAllInputs = function(frm,tagName){
	inStr = tagName+":visible[validate$='|']";
	var vinputs = $(frm).find(inStr);
	for ( var i = 0; i < vinputs.length; i++) {
		var input = vinputs[i];
		if(!nstc.sf.validateValue(input)){
			return false;
		}
	}
	return true;
}

/**验证执行所有指定元素。
 * 如入参是("form1","select")，则验证form1下所有select的值。
 * 如id为空，则检查页面所有指定tagName的值。
 */
nstc.sf.validateInputs = function(id,tagName){
	var inStr = "";
	if(id){
		inStr="#"+id+" ";
	}
	inStr = inStr + tagName+":visible[validate$='|']";
	var vinputs = $(inStr);
	for ( var i = 0; i < vinputs.length; i++) {
		var input = vinputs[i];
		if(!nstc.sf.validateValue(input)){
			return false;
		}
	}
	return true;
}
//根据规则验证指定输入项，如入参是([object]select)，则验证该select的值
nstc.sf.validateValue =  function(input){
	var types = $(input).attr("validate");
	if(!types){
		return true;
	}
	var typeArray = types.split("|");
	if(typeArray.length > 0){
		for(var j=0;j<typeArray.length-1;j++){
			// 验证非空
			if (typeArray[j] == 'require') {
				var hint = nstc.sf.validateEmpty_Ext(input);
				if(!hint){
					return false;
				}
			}
			// 验证数字
			if (typeArray[j] == 'number') {
				var hint2 = nstc.sf.validateNumber(input);
				if(!hint2){
					return false;
				}
			}
			// 验证日期格式
			if (typeArray[j] == 'date') {
				var hint3 = nstc.sf.validateDate(input);
				if(!hint3){
					return false;
				}
			}
			// 钩子。比如给元素添加了一个validate='execute|'的校验属性，则可以实现方法nstc.sf.validateExecute(input)对该输入框进行验证。
			// input 即待校验的元素(自定义validate='execute|'了的元素)。
			if(typeArray[j] && nstc.sf['validate'+nstc.sf.firstLetterUpcase(typeArray[j])]){
				var hint = nstc.sf['validate'+nstc.sf.firstLetterUpcase(typeArray[j])](input);
				if(!hint){
					return false;
				}
			}
		}
	}
	return true;
}

//验证非空
nstc.sf.validateEmpty = function(input){
	var s = $.trim(input.value);
	if (s == "" || s.length == 0) {
		var hint = $(input).attr("alt");
		hint = hint||"必填项";
		alert(hint+"不能为空");
		//nstc.sf.warningFormAlert(hint+"不能为空");
		return false;
	} else {
		return true;
	}
}
//验证数字
nstc.sf.validateNumber = function(input){
	var s = $.trim(input.value);
	var regNum = new RegExp("^([+-]?)\\d*\\.?\\d+$");
	if (regNum.test(s)) {
		return true;
	} else {
		var hint = $(input).attr("alt");
		hint = hint||"编号";
		alert(hint+"只能是数字");
		//nstc.sf.warningFormAlert(hint+'只能是数字');
		return false;
	}
}
//验证日期格式
nstc.sf.validateDate = function(input){
	var regDate = new RegExp("^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$");
	if (regDate.test(input.value)) {
		return true;
	} else {
		var hint = $(input).attr("alt");
		hint = hint||"日期项";
		alert(hint+"请输入正确的日期格式");
		//nstc.sf.warningFormAlert(hint+'请输入正确的日期格式');
		return false;
	}
}

nstc.sf.firstLetterUpcase = function(str){
	return str.substr(0,1).toLocaleUpperCase()+str.substring(1);
}
//验证非空：补充 radio,checkbox
nstc.sf.validateEmpty_Ext = function(input){
	var s = $.trim(input.value);
	var hint = $(input).attr("alt");
	var type = $(input).attr("type") ? $(input).attr("type").toLowerCase() : '';/*SMP1.4.7 http://192.168.0.7:8089/browse/BCT-246 input是select时获取不到type*/
	var flag = false;
	hint = hint||"必填项";
	hint +="不能为空";
	if(type == "checkbox" || type == "radio"){
		var inputSiblings = document.getElementsByName(input.name);
		if(inputSiblings !=null){
			for(var i=0; i<inputSiblings.length; i++){
				if($(inputSiblings[i]).is(":checked")){
					flag = true;
					break;
				}
			}
		}
	}else if(s !="" && s !=null){
		flag = true;
	}
	if(!flag){
		alert(hint);
		//nstc.sf.warningFormAlert(hint);
	}
	return flag;
}

//验证正整数
nstc.sf.validatePositiveNumber_ = function(input){
	var s = $.trim(input.value);
	var regNum = new RegExp("^[1-9]\\d*$");
	if (regNum.test(s)) {
		return true;
	} else {
		var hint = $(input).attr("alt");
		hint = hint||"编号";
		alert(hint+'只能是正整数');
		//nstc.sf.warningFormAlert(hint+'只能是正整数');
		input.focus();
		return false;
	}
}
//验证正整数
nstc.sf.validatePositiveNumber_java= function(input){
	var s = $.trim(input.value);
	var regNum = new RegExp("^[1-9]\\d*$");
	if (regNum.test(s)) {
		var sInt = parseInt(s,10);
		if( sInt > 2147483647 ){
			var hint = $(input).attr("alt");
			hint = hint||"编号";
			alert(hint+'最大不能超过2147483647');
			//nstc.sf.warningFormAlert(hint+'最大不能超过2147483647');
			//input.focus();
			input.value = '';
			return false;
		}
		return true;
	} else {
		var hint = $(input).attr("alt");
		hint = hint||"编号";
		alert(hint+'只能是正整数');
		//nstc.sf.warningFormAlert(hint+'只能是正整数');
		//input.focus();
		input.value = '';
		return false;
	}
}
//弹出警告
nstc.sf.warningFormAlert=function(infoStr){
	/*alert(infoStr);*/
	var dialog=art.dialog({title:'提示',
	 content:infoStr,//提示信息
	 icon:'warning',//提示图标：警告,warning;成功,succeed;失败,error
	 lock:true,//是否弹出遮罩层
	 opacity:0.55,//遮罩层透明度
	 background:'#000',//遮罩层颜色
	 fllow:document.getElementById('SmartPage__Msg__')});//让对话框依附在指定元素附近。
}
//弹出成功提示
nstc.sf.scucceedAlert=function(infoStr){
	/*alert(infoStr);*/
	var dialog=art.dialog({title:'成功',
	 content:infoStr,//提示信息
	 icon:'succeed',//提示图标：警告,warning;成功,succeed;失败,error
	 lock:true,//是否弹出遮罩层
	 opacity:0.55,//遮罩层透明度
	 background:'#000',//遮罩层颜色
	 fllow:document.getElementById('SmartPage__Msg__')});//让对话框依附在指定元素附近。
}
//弹出错误提示
nstc.sf.errorAlert=function(infoStr){
	/*alert(infoStr);*/
	var dialog=art.dialog({title:'错误',
	 content:infoStr,//提示信息
	 icon:'error',//提示图标：警告,warning;成功,succeed;失败,error
	 lock:true,//是否弹出遮罩层
	 opacity:0.55,//遮罩层透明度
	 background:'#000',//遮罩层颜色
	 fllow:document.getElementById('SmartPage__Msg__')});//让对话框依附在指定元素附近。
}
//弹出警告
nstc.sf.warningAlert=function(infoStr){
	/*var res = confirm(infoStr);
	if (res)
	{
		try {
			smartForm_confirm_true();
		} catch (e) {
			if(document.getElementById('smb_is_dev'))// 开发模式下提示生效
				nstc.sf.errorAlert("缺少JS函数定义，请定义smartForm_confirm_true()!");
		}
	} else {
		try {
			smartForm_confirm_false();
		} catch (e) {
			if(document.getElementById('smb_is_dev'))// 开发模式下提示生效
				nstc.sf.errorAlert("缺少JS函数定义，请定义smartForm_confirm_false()!");
		}
	}*/
	var dialog=art.dialog({title:'警告',
	 content:infoStr,//提示信息
	 icon:'warning',//提示图标：警告,warning;成功,succeed;失败,error
	 lock:true,//是否弹出遮罩层
	 opacity:0.55,//遮罩层透明度
	 background:'#000',//遮罩层颜色
	 button: [
	 {
	 name: '确认',
	 callback: function () {
	 try {
	 smartForm_confirm_true();
	 } catch (e) {
	 if(document.getElementById('smb_is_dev'))// 开发模式下提示生效
	 nstc.sf.errorAlert("缺少JS函数定义，请定义smartForm_confirm_true()!");
	 }
	 },
	 focus: true
	 },
	 {
	 name: '取消',
	 callback: function () {
	 try {
	 smartForm_confirm_false();
	 } catch (e) {
	 if(document.getElementById('smb_is_dev'))// 开发模式下提示生效
	 nstc.sf.errorAlert("缺少JS函数定义，请定义smartForm_confirm_false()!");
	 }

	 }
	 }
	 ],
	 fllow:document.getElementById('SmartPage__Msg__')});//让对话框依附在指定元素附近。
}
