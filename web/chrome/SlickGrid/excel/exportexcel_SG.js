//通过dom方式导出，传入到后台的数据未前台table的html
function exportExcel_dom_SG(tb,name){
	var grid_xxxxxxxxxxx = window['grid_' +tb];
	if(isNullOrUndefined_SG(grid_xxxxxxxxxxx) || isNullOrUndefined_SG( grid_xxxxxxxxxxx.slickGridVersion )) {
		alert("找不到待导出的表"+grid_xxxxxxxxxxx);
		return;
	}

	var dataLength = grid_xxxxxxxxxxx.getDataLength();
	if(dataLength < 1){
		alert("没有可导出的信息");
		return;
	}

	var ss = [];
	ss.push("<TABLE>");
	ss.push("<TBODY>");

	ss.push("<TR>");
	var columns = grid_xxxxxxxxxxx.getColumns();
	for (var i=0; i<columns.length; i++) {
		if(columns[i].id === grid_xxxxxxxxxxx.checkbox_columnId ){
			continue;
		}
		ss.push("<TH>");
		ss.push(columns[i].name);
		ss.push("</TH>");
	}
	ss.push("</TR>");

	for (var i=0; i<dataLength; i++) {
		var rowData = grid_xxxxxxxxxxx.getDataItem(i);
		ss.push("<TR>");
		for (var j=0; j<columns.length; j++) {
			if(columns[j].id === grid_xxxxxxxxxxx.checkbox_columnId ){
				continue;
			}
			var fd = columns[j].field;
			ss.push("<TD>");
			ss.push(rowData[fd]);
			ss.push("</TD>");
		}
		ss.push("</TR>");
	}

	ss.push("</TBODY>");
	ss.push("</TABLE>");
	var htmlStr = ss.join("");

	var frm=document.getElementById("_ExcelForm_");
	if(frm==null){
		frm=document.createElement("<form style='display:none;' id='_ExcelForm_' name='_ExcelForm_' method='post' action='SmartFormRes/SlickGrid/excel/export_excel_SG.jsp?name="+name+"' target='_self' ></form>");
		frm.innerHTML="<input  name='_ExcelText_' type='hidden' id='_ExcelText_' />";
		document.body.appendChild(frm);
	}

	$("#_ExcelText_").val(htmlStr);
	frm.submit();

}


//通过json方式导出，导出当前页
function exportExcel_json_SG(tb1,name){
	var tb = tb1;
	if(!isString_SG(tb)){
		try {
			var unitId = tb1.id.split(".")[0];
			tb = unitId;
		} catch (e) {}
	}
	var grid_xxxxxxxxxxx = window['grid_' +tb];
	if(isNullOrUndefined_SG(grid_xxxxxxxxxxx) || isNullOrUndefined_SG( grid_xxxxxxxxxxx.slickGridVersion )) {
		alert("找不到待导出的表"+grid_xxxxxxxxxxx);
	}

	var dataLength = grid_xxxxxxxxxxx.getDataLength();
	if(dataLength < 1){
		alert("没有可导出的信息");
		return;
	}

	var js1 = {};

	var js_hm = {}
	var js_hm_dim = [];
	js1.headerMapper = js_hm;
	js_hm.dataIndexMapping = js_hm_dim;

	var js_records = get_all_data_sg(grid_xxxxxxxxxxx);
	js1.records = js_records;


	var columns = grid_xxxxxxxxxxx.getColumns();
	for (var i=0; i<columns.length; i++) {
		if(columns[i].id === grid_xxxxxxxxxxx.checkbox_columnId ){
			continue;
		}
		var cm = {};
		cm.dataIndex = columns[i].field;
		cm.value = columns[i].name;
		cm.dataType = columns[i].dataType==null?'':columns[i].dataType;
		js_hm_dim.push(cm);
	}

	var htmlStr = JSON.stringify(js1);

	var frm=document.getElementById("_ExcelForm_");
	if(frm==null){
		frm=document.createElement("<form style='display:none;' id='_ExcelForm_' name='_ExcelForm_' method='post' action='SMB_ExportExcel4JsonDataAction.sf' target='_self' ></form>");
		frm.innerHTML="<input name='_exportContent_' type='hidden' id='_exportContent_' /><input name='_outFileName_' type='hidden' id='_outFileName_' />";
		document.body.appendChild(frm);
	}

	$("#_exportContent_").val(htmlStr);
	$("#_outFileName_").val(name);
	frm.submit();

}

//通过json方式导出，导出选择行数据，不选中默认全部
function exportExcel_json_checked_SG(tb1,name){
	var tb = tb1;
	if(!isString_SG(tb)){
		try {
			var unitId = tb1.id.split(".")[0];
			tb = unitId;
		} catch (e) {}
	}
	var grid_xxxxxxxxxxx = window['grid_' +tb];
	if(isNullOrUndefined_SG(grid_xxxxxxxxxxx) || isNullOrUndefined_SG( grid_xxxxxxxxxxx.slickGridVersion )) {
		alert("找不到待导出的表"+grid_xxxxxxxxxxx);
	}

	var dataLength = grid_xxxxxxxxxxx.getDataLength();
	if(dataLength < 1){
		alert("没有可导出的信息");
		return;
	}

	var js1 = {};

	var js_hm = {}
	var js_hm_dim = [];
	js1.headerMapper = js_hm;
	js_hm.dataIndexMapping = js_hm_dim;

	var js_records = [];


	var columns = grid_xxxxxxxxxxx.getColumns();
	for (var i=0; i<columns.length; i++) {
		if(columns[i].id === grid_xxxxxxxxxxx.checkbox_columnId ){
			continue;
		}
		var cm = {};
		cm.dataIndex = columns[i].field;
		cm.value = columns[i].name;
		cm.dataType = columns[i].dataType==null?'':columns[i].dataType;
		js_hm_dim.push(cm);
	}

	var rows = grid_xxxxxxxxxxx.getSelectedRows();

	if(rows.length==0){
		js_records = get_all_data_sg(grid_xxxxxxxxxxx);
	}else{
		js_records = get_selected_data_sg(grid_xxxxxxxxxxx);
	}
	js1.records = js_records;

	var htmlStr = JSON.stringify(js1);

	var frm=document.getElementById("_ExcelForm_");
	if(frm==null){
		frm=document.createElement("<form style='display:none;' id='_ExcelForm_' name='_ExcelForm_' method='post' action='SMB_ExportExcel4JsonDataAction.sf' target='_self' ></form>");
		frm.innerHTML="<input name='_exportContent_' type='hidden' id='_exportContent_' /><input name='_outFileName_' type='hidden' id='_outFileName_' />";
		document.body.appendChild(frm);
	}

	$("#_exportContent_").val(htmlStr);
	$("#_outFileName_").val(name);
	frm.submit();

}

function copy_record_sg(js_records){
	//var new_records = $.extend(true,{},js_records);
	var new_records = js_records;
	$.each(new_records,function(key,value){
		if(isNullOrUndefined_SG(value)){
			new_records[key] = '';
		}
	});
	return new_records;
}






/////////////////////////////////////////////////////////////////////////

function get_all_data_sg(grid_xxxxxxxxxxx){
	var js_records = [];

	if(isNullOrUndefined_SG(grid_xxxxxxxxxxx)
		|| isNullOrUndefined_SG( grid_xxxxxxxxxxx.slickGridVersion ) ) {
		return js_records;
	}
	var selectedRowsMap = {};
	$.each(grid_xxxxxxxxxxx.getSelectedRows(), function(ii_rows_index, ii_rows_value){
		var rowData = grid_xxxxxxxxxxx.getDataItem(ii_rows_value);
		selectedRowsMap[rowData.slickCnt] = rowData.slickCnt;
	});

	var dataLength = grid_xxxxxxxxxxx.getDataLength();
	for (var i=0; i<dataLength; i++) {
		var rowData = grid_xxxxxxxxxxx.getDataItem(i);
		rowData = copy_record_sg(rowData);
		if(isNullOrUndefined_SG(selectedRowsMap[rowData.slickCnt])){
			rowData["_selRowFlag"]="_nstc_check_no";
		}else{
			rowData["_selRowFlag"]="";
		}
		js_records.push(rowData);
	}
	return js_records;
}

function get_selected_data_sg(grid_xxxxxxxxxxx){
	var rows = grid_xxxxxxxxxxx.getSelectedRows();
	rows = rows.sort(function(a,b){
		return a-b;
	});
	var js_records = [];
	$.each(rows, function(ii_rows_index, ii_rows_value){
		var rowData = grid_xxxxxxxxxxx.getDataItem(ii_rows_value);
		rowData = copy_record_sg(rowData);
		rowData["_selRowFlag"]="";
		js_records.push(rowData);
	});


	return js_records;
}

function build_FormValue_SlickGrid_Unit_Data(iFormDom){
	var slickgridHiddens = $("#"+iFormDom.id+" :hidden[name=SlickGrid_Unit]");
	$.each(slickgridHiddens,function(i,n){
		var unit_id = $(n).val();
		var grid_xxxxxxxxxxx = window['grid_' +unit_id];



		var js_records = get_all_data_sg(grid_xxxxxxxxxxx);
		var jsonStr = JSON.stringify(js_records);
		$("#"+iFormDom.id+" :hidden[name="+unit_id+".SlickGrid_Unit_Data]").val(jsonStr);
	});
}