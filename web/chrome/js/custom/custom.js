function linkOnClick(url) {
	location.href = url;
}
function smartForm_confirm_true() {
	var form = document.forms[0];
	form.action = "wst_acc_101.sf?m=e";
	var flag = nstc.sf.validateForm();
	if (true == flag)
		form.submit();
}
function smartForm_confirm_false(){
	if($("a[class=aui_close]")){
		$("a[class=aui_close]").click();
	}
}
function excel() {
	if (jQuery(".GridUnitTable") == null)
		alert("找不到待导出的表");
	var frm = document.getElementById("_ExcelForm_");
	if (frm) {
		var oTable=jQuery(".GridUnitTable").clone().find("td,th").each(function(){
			jQuery(this).text(this.outerText);
			if(jQuery(this).html()==""){
				jQuery(this).remove();
			}
			if(jQuery(this).text()=="请选择"){
				jQuery(this).remove();
			}
			//jQuery(this).removeAttr("onclick").removeAttr("STYLE").removeAttr("title").removeAttr("noWrap");
			jQuery(this).removeAttr("onclick").removeAttr("class").removeAttr("style").removeAttr("STYLE").removeAttr("title").removeAttr("noWrap");
		});
		document.getElementById("_ExcelText_").value= oTable.end().get(0).outerHTML;
	} else {
		frm = document.createElement("<form style='display:none;' id='_ExcelForm_' name='_ExcelForm_' method='post' action='page/excelEXCEl.jsp' target='message' ></form>");
		frm.innerHTML = "<input id='_ExcelText_' name='_ExcelText_' type='hidden'/>";
		document.body.appendChild(frm);
		//document.getElementById("_ExcelText_").value = jQuery(".GridUnitTable")[0].outerHTML;
		var oTable=jQuery(".GridUnitTable").clone().find("td,th").each(function(){
			jQuery(this).text(this.outerText);
			if(jQuery(this).html()==""){
				jQuery(this).remove();
			}
			if(jQuery(this).text()=="请选择"){
				jQuery(this).remove();
			}
			//jQuery(this).removeAttr("onclick").removeAttr("STYLE").removeAttr("title");
			jQuery(this).removeAttr("sizset").removeAttr("vAlign").removeAttr("align").removeAttr("sizcache").removeAttr("onclick").removeAttr("class").removeAttr("style").removeAttr("STYLE").removeAttr("title").removeAttr("noWrap");
		});
		document.getElementById("_ExcelText_").value= oTable.end().get(0).outerHTML;
	}
	//alert(frm.outerHTML);
	frm.submit();
}