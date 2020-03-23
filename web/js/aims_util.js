
/**
 * 设置为文本
 * @param $obj
 * @returns
 */
function showAsText($obj) {
	if ($obj == null) {
		return;
	}
	if ($obj.get(0).tagName == 'select' || $obj.get(0).tagName == 'SELECT') {
		$obj.hide();
		//删除显示的原来的标签
		$obj.parent().find("[id$='showAsText']").remove();

		var value = $obj.find("option:selected").text();
		$obj.parent().find("[id$='showAsText']").remove();
		$obj.before("<span id='showAsText'>" + value + "</span>");
	}
	else if($obj.attr("type")=='radio' || $obj.attr("type") == 'checkbox') {
		$obj.attr("disabled",true);
	}
	else {
		$obj.hide();
		//删除显示的原来的标签
		$obj.parent().find("[id$='showAsText']").remove();
		var value = $obj.val();
		$obj.parent().find("[id$='showAsText']").remove();
		$obj.before("<span id='showAsText'>" + value + "</span>");
	}
}

//恢复showAsText
function moveShowAsText($obj) {
	if ($obj == null) {
		return;
	}
	if($obj.attr("type")=='radio' || $obj.attr("type") == 'checkbox') {
		$obj.attr("disabled",true);
	}else{
		$obj.show();
		$obj.parent().find("[id$='showAsText']").remove();
	}
}


/**
 * 隐藏元素和标签
 */
function hideTdAndLab(oinput) {
	var otd = oinput.parent().parent();
	var otdBefore = otd.prev();
	otd.hide();
	oinput.attr("disabled", "disabled");
	otdBefore.hide();
	var otr = otd.parent();
	var needHide = true;
	otr.find("label:visible").each(function () {
		if ($(this).text() != "") {
			needHide = false;
		}
	});
	if (needHide) {
		otr.hide();
	}
}

/**
 * 显示元素和标签
 */
function showTdAndLab(oinput) {
	var otd = oinput.parent().parent();
	var otdBefore = otd.prev();
	var otr = otd.parent();
	otr.show();
	otd.show();
	otdBefore.show();
	oinput.removeAttr("disabled");
}
/**
 * 隐藏元素和标签和整行
 */
function hideTrAndLab(oinput) {
	var otd = oinput.parent().parent();
	var otdBefore = otd.prev();
	otd.hide();
	oinput.attr("disabled", "disabled");
	otdBefore.hide();
	var otr = otd.parent();
	otr.hide();
	
}

/**
 * 显示元素和标签
 */
function showTrAndLab(oinput) {
	var otd = oinput.parent().parent();
	var otdBefore = otd.prev();
	var otr = otd.parent();
	otr.show();
	otd.show();
	otdBefore.show();
	oinput.removeAttr("disabled");
}

//置灰且不可更改
function makeReadonly(obj) {
	obj.attr("class", "readonly");
	obj.removeAttr("onclick");
	obj.removeAttr("onfocus");
	obj.attr("readonly", true);
}

//时间格式化
function formatDate(now) {
	var now = new Date(now);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var date = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	return year + "-" + fixZero(month, 2) + "-" + fixZero(date, 2);
}
//字符串转时间类型
function strToDate(str) {
	var d = new Date(Date.parse(str));
	if (isNaN(d)) {
		var arys = str.split('-');
		d = new Date(arys[0], arys[1] - 1, arys[2]);
	}
	return d;
}

//用span隐藏元素
function warpSpanAndHide(obj) {
	if (obj.parent()[0].tagName == 'SPAN') {
		obj.parent().hide();
	} else {
		obj.wrap("<span style='display:none'></span>");
	}
}

//显示被span隐藏的元素
function warpSpanAndShow(obj) {
	if (obj.parent()[0].tagName == 'SPAN') {
		obj.parent().children().unwrap();
	}
}

/**
 * 检查obj的value是否为空，如果为空给出提示
 * @param obj
 * @returns
 */
function checkNotEmpty(obj, name) {
	if (obj) {
		var alt = name ? name : $(obj).attr("alt") + "不能为空！";
		var value = $(obj).attr("value");
		if (value == null || value == '') {
			alert(alt);
			return false;
		}
	} else {
		alert("校验不通过！");
		return false;
	}
	return true;
}


function showAsTextWhileHasValue(obj) {
	if (!obj || !obj.val()) {
		return;
	}
	var value = String(obj.val());
	if (value.length > 0) {
		showAsText(obj);
	}
}

/**
 * 设置map对象中的input对象
 * 如果有值就变成readonly格式，如果没有值则不做改变
 * @param map
 */
function showAsTextWhileHasValueByMap(map) {
	var inputList = map.find("textarea[value!='']:visible,input[type='text'][value!='']:visible");
	for (var i = 0; i < inputList.length; i++) {
		var inputobj = inputList.eq(i);
		showAsText(inputobj);
	}
}
function showAsTextAllInput(map){
	var inputList = map.find("textarea[value!='']:visible,input[type='text']:visible");
	for (var i = 0; i < inputList.length; i++) {
		var inputobj = inputList.eq(i);
		showAsText(inputobj);
	}
}


function showAsTextAllRadioAndCheckbox(){
	$("input[type='radio'],[type='checkbox']:visible").each(function (index,ele) {
		showAsText($(ele));
	});
}

function getCheckSize(checklist){
	var num = 0;
	for(var i = 0 ; i < checklist.length ; i++){
		if(checklist.get(i).checked){
			num++;
		}
	}
	return num;
}

/**
 * 隐藏某一列
 * @param oTable 表格dom对象
 * @param iCol 列号
 */
function hideColByIndex(oTable, iCol) {
	for (i = 0; i < oTable.rows.length; i++) {
		//用jquery的hide()效果更好
		//oTable.rows[i].cells[iCol].style.display = oTable.rows[i].cells[iCol].style.display == "none" ? "block" : "none";
		$(oTable.rows[i].cells[iCol]).hide(); //注意IE下调用hide方法会改变表结构，不能正确获得cellIndex，所以应该从后向前隐藏
	}
}

/**
 * 隐藏某一列
 * @param oTable 表格dom对象
 * @param colName 列名
 */
function hideColByObj(obj) {
	var otd = nstc.sf.findParent(obj, "TH");
	var cellIndex = otd.cellIndex;
	var otable = nstc.sf.findParent(otd, "TABLE");
	hideColByIndex(otable, cellIndex);
}

/**
 * 判断按照正则判断
 * @param str
 */
function validateReg(str,reg){
	return str && !reg.test(str)
}

/**
 * 处理控制时间区间选择控件先后 即：最小日期选定后，最大日期控件不能选择比最小日期更小的日期；反之亦然。
 *
 * @param startFlag
 * @param endFlag
 */
function dealDate(startFlag, endFlag) {
	var dateArr = $("input[name$='" + startFlag + "'],[name$='" + endFlag + "']");
	for ( var i = 0; i < dateArr.length; i++) {
		/** 两两配对处理 * */
		if (i % 2 == 1)
			continue;
		/** 如果没有配对元素，说明该控件不是符合条件数据 * */
		if (dateArr[i + 1] == undefined)
			continue;

		dateArr[i].idx = i + 1;
		dateArr[i + 1].idx = i;
		regitWDatePicker(dateArr[i], "maxDate", dateArr);
		regitWDatePicker(dateArr[i + 1], "minDate", dateArr);

	}

}

/**
 * 时间控件控制其最大/最小日期限制
 *
 * @param obj
 * @param type
 * @param objArr
 */
function regitWDatePicker(obj, type, objArr) {
	obj.onclick = function() {
		var idx = this.idx;
		regitWDatePickerFun(idx, obj, type, objArr);
	};
	obj.onfocus = function() {
		var idx = this.idx;
		regitWDatePickerFun(idx, obj, type, objArr);
	};
}

function regitWDatePickerFun(idx, obj, type, objArr) {
	if (idx != undefined) {
		if (type == "maxDate") {
			WdatePicker({
				maxDate : '#F{$dp.$D(\'' + objArr[idx].id + '\')}'
			});

		} else {
			WdatePicker({
				minDate : '#F{$dp.$D(\'' + objArr[idx].id + '\')}'
			});
		}
	}
}