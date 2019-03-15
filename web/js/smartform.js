var rowOver_backGroundColor = {};
var rowBackGroundColor1 = {};
var rowBackGroundColor2 = {};
var rowClick_backGroundColor = undefined;
var t1;
var mOrder = '';
var allDataGridDiv;
// 固定表头对象
var fixTableObj = null;
document.onreadystatechange = function(){
    if(document.readyState=="complete"){
        try{
            t1 = new Date().getTime();
            smartPage_changeAppNo();
            smartPage_clearFirst();
        }catch(e){}
    }
};

function tempFunction(){	//开发设置iframe高度函数
    showTabDiv = function (index, flag) {
        var tab = null;
        var table = null;
        switch(index){
            case(0):{
                tab = document.getElementById('div.crm_BasicInfoQueryList_List');
                table = document.getElementById('crm_BasicInfoQueryList_List');
                break;
            }
            case(1):{
                tab = document.getElementById('div.crm_custContInfoCheck_List');
                table = document.getElementById('crm_custContInfoCheck_List');
                break;
            }
            case(2):{
                tab = document.getElementById('div.crm_custOSStructure_List');
                table = document.getElementById('crm_custOSStructure_List');
                break;
            }
            case(3):{
                tab = document.getElementById('div.crm_custFinanceInfoCheck_List');
                table = document.getElementById('crm_custFinanceInfoCheck_List');
                break;
            }
            case(4):{
                tab = document.getElementById('div.crm_coopRelationCheck_List');
                table = document.getElementById('crm_coopRelationCheck_List');
                break;
            }
            case(5):{
                tab = document.getElementById('div.crm_bigEventCheck_List');
                table = document.getElementById('crm_bigEventCheck_List');
                break;
            }
            case(6):{
                tab = document.getElementById('div.crm_custVideoMaintCheck_List');
                table = document.getElementById('crm_custVideoMaintCheck_List');
                break;
            }
        }
        if(tab!=null){
            if(flag){
                tab.style.display = "inline";
                //根据div中table的行数来计算iframe显示的高度
                if(table!=null){
                    var iframe = parent.document.getElementById('crm_custBasicInfoCheck_iframe');
                    var rowsize = table.getElementsByTagName('tr').length;
                    iframe.style.height = rowsize*30+50;
                    if(index==6){//影像辅助资料上传列表显示的宽度需要根据显示的内容宽度来展示，内容过长时需要显示横向滚动条
                        iframe.style.width = table.offsetWidth;
                        iframe.scrolling = "yes";
                    }else{
                        iframe.style.width = "100%";
                        iframe.scrolling = "no";
                    }
                }
            }else{
                tab.style.display = "none";
            }
        }
    }
}

$(document).ready(function(){
    // 页面卡片分组时，去除GridUnitDiv样式中的position
    /*var $cardGrpTable = $("table.fixedtable[iscardgrp=1]");
     if($cardGrpTable.size()>0) {
     $cardGrpTable.each(function() {
     var $gridUnitDiv = $(this).find("div.GridUnitDiv");
     $gridUnitDiv.removeClass("GridUnitDiv");
     $gridUnitDiv.css({"width":"100%","height":"100%","border":"solid,1px"});
     });
     }*/
    tempFunction();
    if (typeof _$ == "undefined") {
        _$ = window.$;
    }
    /*
     * 如果不是弹框或IFRAME中的页面，则添加左边距
     * */
    try {
        if (self.name == "content") {
            if (window.attachEvent) {	//SMP1.4.7 兼容内边距问题
                document.getElementById("form-main-table").style.paddingLeft = "5px";
                document.getElementById("form-main-table").style.paddingTop = "5px";
            } else {
                document.getElementById("form-main-table").getElementsByTagName("table")[0].style.paddingLeft = "5px";
                document.getElementById("form-main-table").getElementsByTagName("table")[0].style.paddingTop = "5px";
            }
        }
    } catch (e) {}
    /*
     * 设置文本框、密码框、多行文本框，在焦点和非焦点状态的边框样式
     * */
    $("input[type='text'],input[type='password'],textarea").live("focus",function (e) {
        this.style.borderColor = "#2CA8F4";
    }).live("blur",function (e) {
        this.style.borderColor = "#E5E5E5";
    });
    try {	// 解决内部没有table的form占用空间问题
        $.each($("form"), function (n, value) {
            if ($(value).find("table").length == 0) {
                $(value).css("height", "0px");
            }
        })
    } catch(e) {}
    try{
        //没有固定表头表格，去掉fixedtable样式
        if(  $("div.fix_title").size() == 0 ){
            $(".GridUnitTable").find("td.autoWrap").removeAttr("noWrap");
            $("table.fixedtable").removeClass('fixedtable');
        }
        if ($("table.GridUnitTable") && $("table.GridUnitTable").css("border-collapse") == "collapse") {
            $("table.GridUnitTable").find("th.fixedHeaderCol").css("border-right","1px solid silver").css("border-left","0px solid silver");
        }
    }catch(e){
    }

    try{
        var frameId = window.frameElement && window.frameElement.id || '';
        if(window.parent != window)
            window.parent.smartForm_iFrameHeight && window.parent.smartForm_iFrameHeight(frameId);
    }catch(e){

    }
    //固定表头、排序
    try{
        var autoAry = ["adminWFSAFEPOLICYShoQ.el", "sdm_vchsort_iframe._vchSortPage", "sis_DimClassDetailFrame.dimclassframe", "crm_custBasicInfoCheck_iframe", "ocs_loanApply_input.loanApplyTbl", "AIMS_DWMTYPE_IFrame.AIMS_DWMTYPE_IFrame", "AIMS_DWMDATA_IFrame.AIMS_DWMDATA_IFrame", "PTMS_NSCLient_IFRAME.PTMS_NSCLient_IFRAME", "PTMS_BUDGET_IFRAME.PTMS_BUDGET_IFRAME"];
        if (self.name == "content" || self.name.indexOf('iframe') == 0)	// 主页面和弹出框提前设置form-main-table的高度
        {
        } else if (self.name && equalToArray(self.name, autoAry)){
            $(".form-main-table").css({"height":"auto"});
        }

        /*$("body.BODY_SCR_AUTO").children("div:eq(0)").css("height", "100%");*/
        fixTableObj = fixTable();
        if(fixTableObj.fixSize+fixTableObj.fixTopColsSize>0) {
            // 窗口大小改变时触发固定表头重置
            var resizeTimer = null;
            $(window).resize(function() {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    //fixTableObj.getLatestStack().actDiv.parents('div')[1].style.height = "";
                    //fixTableObj.getLatestStack().actDiv.parents('div')[0].style.height = "";
                    var scrollTop = fixTableObj.getScrollTop();
                    var scrollLeft = fixTableObj.getScrollLeft();
                    var scrollObj = {"top": scrollTop, "left": scrollLeft};
                    fixTableObj.reset();
                    fixTableObj.fix(scrollObj);
                    try {
                        dragColumns();
                        dropColumns();
                        resizableColumns();
                    } catch(e) {

                    }

                }, 10);
            });
            //$(window).resize();		// 771,解决数据展示不全的问题
        }
    }catch(e){
    }
    /* 初始化单选按钮和复选框的样式 */
    window.setTimeout(function () {
        $("input[type='checkbox']").each(function (n, value) {
            if ($(value).css("display") == "none") {
                return true;
            }
            change_checkbox_img(value);
        });
        change_radio_img($("input[type='radio']"));	/*SMP1.4.7 修改单选按钮初始化方式*/
        /*$("input[type='radio']").each(function (n, value) {
            change_radio_img(value);
        });*/
        $("span.select-span").each(function (n, value) {
            refreshSelectStyle(value);
        });
        $("span.checkbox_bg").each(function (n, value) {
            refreshCheckboxStyle(value);
        });
        $.each($(".GridUnitDiv"), function (n, value) {	//解决有些隐藏代码对布局的影响
            if (value.className == "GridUnitDiv FIXHEAD" && $(value).css("display") == "none") {
                nstc.sf.findParent(value, "tr").style.display = "none";
            }
        });
        try {
            $(".buttonD2, .buttonD3, .buttonD4, .buttonD5, .buttonD6, .buttonD7").css("height", "22px");
            $.each($("input[name='UMRelCorpList.relCorpNo']"), function (n, value) {
                if (value.style.width == "95%") {
                    $(value).css("width","90%");
                }
            });
        } catch(e) {}
    }, 100);
    /* 阻止按钮的点击事件对标题栏收缩功能的影响 */
    $(".button").bind('click', function (e) {
        if (this.parentNode.tagName.toLowerCase() == "a") {
            this.parentNode.click();
        }
        e.stopPropagation();
    });
    /* 创建页面导航 */
    new Navigation();
});

function fixTable() {
    fixTableObj = new nstc.FixedTable();
    fixTableObj.keetDefault();
    fixTableObj.fix();
    return fixTableObj;
}

function equalToArray(string, ary) {
    for (var i=0; i<ary.length; i++) {
        if (string == ary[i]) {
            return true;
        }
    }
    return false;
}
function smartPage_adjustHeight(table){
    var table_unitOuter = $(table).parents('table.GridUnitOuterTable');
    var table_page = $(table).parents('table.fixedtable');
    var form_table = $(table).parents('table.FormUnitTable');
    //适用于卡片模式分组情况下，表单单元table内嵌列表单元table
    if(form_table.length > 0){
        table_unitOuter.css('table-layout','auto');
        table_page.css('table-layout','auto');
        table_page.height('1%');
        $('td.GridUnitTableTD').height('1%');
        return;
    }

    var div_unit = $(table).parent();
    var table_unit = $(table);
    var	td_unit = div_unit.parent();
    if(div_unit.height() < table_unit.height() + 3 || td_unit.height() < div_unit.height() + 2){
        var h_page = table_page.height() ;
        var h_adjust = table_unit.height() + 3 - div_unit.height() ;
        if(h_adjust <  div_unit.height() + 2 - td_unit.height())
            h_adjust =  div_unit.height() + 2 - td_unit.height();
        table_unitOuter.height( table_unitOuter.height() + h_adjust + (div_unit.width()< table_unit.width()? 17:0) + 'px');
        table_page.height( h_page + h_adjust + 'px');

    }else if( $(document).height() > $(window).height()) {
        var h_adjust =  div_unit.height() - table_unit.height() - 3 -(div_unit.width()< table_unit.width()? 17:0);
        var h_page = table_page.height() - h_adjust ;
        table_unitOuter.height( table_unitOuter.height() - h_adjust + 'px');
        table_page.height( (h_page > $(window).height() ? h_page: $(window).height()) + 'px' );
    }
}

function smarPage_adjustPageHeight(tr){
    var div_unit = $(tr).parents('div.unit_content_list');
    var table_unit = $(tr).parents('table.GridUnitTable');
    if(div_unit.height() < table_unit.height() + 2){
        var h_adjust = table_unit.height() + 2 - div_unit.height();
        var table_unitOuter = $(tr).parents('table.GridUnitOuterTable');
        var table_page = $(tr).parents('table.fixedtable');
        table_unitOuter.height( table_unitOuter.height() + h_adjust + 'px');
        table_page.height( table_page.height() + h_adjust + 'px');
    }
}

/**
 * 用于解决select的全选和请选择显示与不显示的控制
 */
function smartPage_clearFirst(ids){
    var filterStr = null == ids ? "clearFirst=true" : "id='"+ids+"'";
    var selects = $("select["+filterStr+"]");
    if(selects == null) return;

    var len = selects.length;
    for(var i=0; i < len; i++){
        var slt = selects[i];
        try{
            if(slt.options[0].text=="请选择" || slt.options[0].text=="全选" || slt.options[0].text==""){
                slt.options.remove(0);
            }
        }catch(e){}
    }
}

/**
 * 用于解决PageContextParamRender.java里写错的appNo隐藏元素的name属性
 */
function smartPage_changeAppNo(){
    var smartpage_appno_obj = document.getElementById("appNo");
    if(null!=smartpage_appno_obj && "pageCode"==smartpage_appno_obj.name)
        smartpage_appno_obj.name = "appNo";
}

/***
 * 限制文本输入框的长度（包含中文）
 */
function smartPage_checkLength(obj,length){
    if(obj.value.getStrLength()<=length){
        return ;
    }
    alert(obj.getAttribute('alt')+"输入不能超过"+length+"字符(一个中文为两个字符)");	/*SMP1.4.7 兼容obj.alt*/
    obj.value = obj.value.subCHString(0,length)
}

/**
 * 重置表单成页面加载时的状态
 * @param {} obj
 */
function smartPage_doReset(obj){
    var form = nstc.sf.findParent(obj, "FORM");
    var rowTypes = $("#"+form.id+" [name$=.rowType]");
    for(var i=0;i<rowTypes.length;i++){
        rowTypes[i].exValue=rowTypes[i].value;
    }

    var tid = obj.id.split(".")[0];
    $("#"+tid)[0].reset();

    for(var i=0;i<rowTypes.length;i++){
        rowTypes[i].value=rowTypes[i].exValue;
    }
}

/**
 * 表单提交（有验证）。 提交obj所在的表单得到
 *
 * @param obj
 */
function smartForm_doSubmit(obj) {
    var form = nstc.sf.findParent(obj, "FORM");
    form.action = $('#appNo').val() + '@' + obj.id + ".sf";
    var flag = nstc.sf.validateForm(obj);
    if (true == flag){
        form.submit();
    }
}

/**
 * 表单提交（无验证）。 提交obj所在的表单得到
 *
 * @param obj
 */
function smartForm_doRefresh(obj) {
    check_simple_page_invoke(arguments.callee);               //检测当前方法是否通过分页方法触发，如果不是，重置当前页号为1
    var form = nstc.sf.findParent(obj, "FORM");
    form.action = $('#appNo').val() + '@' + obj.id + ".sf";
    if(!this.disable){
        this.disable = true;
        form.submit();
    }
}

/**
 * 以流的形式提交表单。
 *
 * @param obj
 */
function smartForm_doUploadSubmit(obj) {
    var form = nstc.sf.findParent(obj, "FORM");
    form.action = $('#appNo').val() + '@' + obj.id + ".sf";
    obj.disabled=true;
    form.encoding = "multipart/form-data";
    var flag = nstc.sf.validateForm(obj);
    if (true == flag){
        form.submit();
    }
}

/**
 * 表单保存。 保存obj所在的表单
 *
 * @param obj
 */
function smartForm_doSave(obj) {
    var form = nstc.sf.findParent(obj, "FORM");
    form.action = $('#appNo').val() + '@' + obj.id + ".sf";
    var flag = nstc.sf.validateForm(obj);
    if (true == flag){
        obj.disabled=true;
        form.submit();
    }

}

/**
 * 表单删除。 删除obj所在的表单
 *
 * @param obj
 * @param gridUnitCode 表格单元编号（可以为空，默认obj所在单元编号）
 */
function smartForm_doDelete(obj, gridUnitCode) {
    var form = nstc.sf.findParent(obj, "FORM");
    nstc.sf.doDeleteSubmit($('#appNo').val() + '@' + obj.id + ".sf", form.id, gridUnitCode);
    // form.action = obj.id + ".sf";
    // form.submit();
}

/**
 * 表单重置。 调用表单的重置方法将obj所在的表单重置到页面加载时的状态。
 *
 * @param obj

 function smartForm_doReset(obj) {
	var form = nstc.sf.findParent(obj, "FORM");
	form.reset();
	window.setTimeout(function () {
		smartForm_doReset_h5(form);
	},100);
	return false;
}
 */
function smartForm_doReset(obj) {
    var form = nstc.sf.findParent(obj, "FORM");
    form.reset();
    //SMP1.4.7 解决重置后，复选框没有执行onchange的问题
    var chkAry = $("input[type=checkbox]");
    for (var i=0; i<chkAry.length; i++) {
        chkAry[i].onchange();
    }

    //重置时，专门针对上传做清空处理
    var fileTypes = $("input[type=file]");
    for (var j=0; j<fileTypes.length; j++) {
        var t_flie = fileTypes[j];
        var clone_obj = $(t_flie).clone();
        $(t_flie).after($(clone_obj).val(""));
        $(t_flie).remove();
    }
    window.setTimeout(function () {
        smartForm_doReset_h5(form);
    },100);
    return false;
}
/*
 *
 **/
function smartForm_doReset_h5(form) {
    try {
        var radioEle = $(form).find("input[type='radio']");
        change_radio_img(radioEle);
        var checkboxEle = $(form).find("input[type='checkbox']");
        for (var j=0; j<checkboxEle.length; j++) {
            change_checkbox_img(checkboxEle[j]);
        }
    } catch (e) {}
}
/**
 * 表单重置。
 * [简陋实现]将obj所在表单的可见(visible)输入项(包括：input,text,textarea,select,checkbox,radio)
 * 重置成未填写(value置为"",select值置为第一个)状态。
 *
 * @param obj

 function smartForm_doClear(obj) {
	var form = nstc.sf.findParent(obj, "FORM");
	// text,textarea
	var texts = $(form).find(
		":text:visible,:input:visible[type='textarea'],:password:visible");
	$.each(texts, function(i, n) {
		n.setAttribute("value", "");
	});
	// checkbox,radio
	var checks = $(form).find(":checked:visible");
	$.each(checks, function(i, n) {
		n.setAttribute("checked", false);
	});
	// select
	var selects = $(form).find("select:visible");
	$.each(selects, function(i, n) {
		n.selectedIndex = 0;
	});
	return false;
}
 优化后的函数
 */
function smartForm_doClear(obj) {
    var form = nstc.sf.findParent(obj, "FORM");
    // text,textarea
    var texts = $(form).find(
        "input[type=text],textarea,input[type=password]");
    $.each(texts, function(i, n) {
        if(n.style.display != "none"){
            n.setAttribute("value", "");
        }
    });
    // checkbox,radio
    var checks = $(form).find("input[type=checkbox],input[type=radio]");
    $.each(checks, function(i, n) {
        if(n.style.display != "none" && true == n.checked){
            n.setAttribute("checked", false);
        }
    });
    // select
    var selects = $(form).find("select");
    $.each(selects, function(i, n) {
        if( n.style.display != "none"){
            n.selectedIndex = 0;
        }
    });

    return false;
}

/**
 * 警告信息提示
 *
 * @param msg

 function smartForm_confirm(msg) {
	var bool = confirm(msg);
	try {
		if (true == bool) {
			smartForm_confirm_true();
		} else {
			smartForm_confirm_false();
		}
	} catch (e) {
		alert("缺少JS函数定义，请定义smartForm_confirm_true()和smartForm_confirm_false()!");
	}
}
 由于以前的很多页面对smartForm_confirm方法进行了重写，所以不能禁止调用
 */
function smartForm_confirm(msg) {
    nstc.sf.warningAlert(msg);
}

/**
 * grid全选
 *
 * @param obj
 */
function smartForm_all_checkbox(obj, name) {
    try {
        var isCheck = false;
        if (obj.checked == true) {
            isCheck = true
        }
        var checkBoxs = document.getElementsByName(name);
        for ( var i = 0; i < checkBoxs.length; i++) {
            if(checkBoxs[i] == obj) continue ;
            //checkBoxs[i].checked = isCheck;	//SMP1.4.7 解决全选后，复选框没有触发onchange事件的问题
            if (checkBoxs[i].checked != isCheck) {
                checkBoxs[i].click();
            }
            //nstc.sf.changeFlag(checkBoxs[i],'modified')
            nstc.sf.clickCheckbox(checkBoxs[i]);
            change_checkbox_img(checkBoxs[i]);	//复选框样式切换
        }
    } catch (e) {

    }
}

/**
 * 增加GridUnit行
 *
 * @param obj
 */
function smartForm_add(obj) {
    try {
        // 无数据固定表头表格，第一次新增行时，单元格不对齐，需要重新调整
        var refix = false;
        if(fixTableObj.fixSize+fixTableObj.fixTopColsSize>0) {
            var $fixedDiv = $(nstc.sf.findParent(nstc.sf.findParent(obj, "TABLE"), "TABLE")).find("div.fix_title");
            var $childrenDiv = $fixedDiv.children("div");
            var $childDiv = $childrenDiv.filter(":eq(1)");
            var rowSize = $childDiv.find("tbody tr:visible").size();
            if(rowSize==0)
                refix = true;
        }

        var names = obj.name.split('.');
        var unitname = names[0];
        var tr = nstc.sf.addRow(unitname, "tableCopy_" + unitname);
        tr.className=(tr.sectionRowIndex+1)%2==0?"rowCss1":"rowCss2";
        if(tr.attachEvent){
            tr.attachEvent('onclick', function(){smartForm_tr_onclick(tr);});
        } else if(tr.addEventListener){
            tr.addEventListener('click', function(){smartForm_tr_onclick(tr);}, false);
        }

        tr.onmouseover=function(){
            smartForm_tr_onmouseover(this,1);
        }
        tr.onmouseout=function(){
            smartForm_tr_onmouseout(this,1);
        }

        // 固定表头表格重新调整布局
        if(refix) {
            fixTableObj.reset();
            fixTableObj.fix();
        }
    } catch (e) {

    }

    try{
        var frameId = window.frameElement && window.frameElement.id || '';
        if(window.parent != window)
            window.parent.smartForm_iFrameHeight(frameId);
    }catch(e){

    }

}

/**
 * 增加附件行
 *
 * @param obj

 function smartForm_addRow(obj) {
	try {
		var div = nstc.sf.findParent(obj, "TD");
		var str = div.innerHTML;
		var list = str.toLowerCase().split("<div id");
		var count = list.length;
		var baseStr = $(div).find("div[id=1]")[0].innerHTML;
		// 添加判断，如果第一行已有附件，则在copy时，把清空样式重新替换成上传样式
		if (baseStr.indexOf("class=fileInput_close") > 0) {
			baseStr = baseStr.replace(/class=fileInput_close/, "class=fileInput");
		}
		var define = "<div id='" + count + "'>" + baseStr;
		define = define
			+ " <input input_id='"
			+ count
			+ "' type='button' value='' onclick='smartForm_delRow(this)' onmouseover=\"this.className='button41 button button41_Over'\" onmouseout=\"this.className='button41 button'\" name='"
			+ count + "' class='button41 button'> " + "</div>";
		$(div).append(define);
		$(div).find("div[id=" + count +  "]:last").find("input[type=text]").val('');
		$(div).find("div[id=" + count +  "]:last").find(":button:first").remove();
	} catch (e) {

	}

	try{
		var frameId = window.frameElement && window.frameElement.id || '';
		if(window.parent != window)
			window.parent.smartForm_iFrameHeight(frameId);
	}catch(e){}
}
 */

/**
 * 增加附件行
 *
 * @param obj
 */
function smartForm_addRow(obj) {
    try {
        var div = nstc.sf.findParent(obj, "TD");
        var str = div.innerHTML;
        var list = str.toLowerCase().split("<div id");
        var count = list.length;

        // ---解决点击重置后, 后续添加的上传元素值和初始上传元素值相同的问题
        var temp = $(div).clone();
        $(temp).find('input').each( function() {
            this.value = '';
        });
        var baseStr = $(temp).find("div[id=1]")[0].innerHTML;

        /* 添加判断，如果第一行已有附件，则在copy时，把清空样式重新替换成上传样式 */
        if (baseStr.indexOf("class=fileInput_close") > 0) {
            baseStr = baseStr.replace(/class=fileInput_close/, "class=fileInput");
        } else if(baseStr.indexOf('class="fileInput_close"') > 0){/*SMP1.4.7 谷歌判断条件*/
            baseStr = baseStr.replace(/class="fileInput_close"/, "class=fileInput");
        }
        var define = "<div id='" + count + "'>" + baseStr;
        define = define
            + " <input input_id='"
            + count
            + "' type='button' value='' onclick='smartForm_delRow(this)' onmouseover=\"this.className='button41 button button41_Over'\" onmouseout=\"this.className='button41 button'\" name='"
            + count + "' class='button41 button'> " + "</div>";
        $(div).append(define);
        $(div).find("div[id=" + count +  "]:last").find("input[type=text]").val('');
        $(div).find("div[id=" + count +  "]:last").find(":button:first").remove();
    } catch (e) {

    }

    try{
        var frameId = window.frameElement && window.frameElement.id || '';
        if(window.parent != window)
            window.parent.smartForm_iFrameHeight(frameId);
    }catch(e){}
}

// 删除行
function smartForm_delRow(obj) {
    try {
        $("#" + obj.name).remove();

    } catch (e) {}
}

function smartForm_delUploadFile(obj){
    try{
        if(window.confirm("确定要删除附件？")){
            var tr = nstc.sf.findParent(obj, "tr");
            $(tr).remove();
            var delObj = document.getElementById(obj.hidName);
            if(delObj.value){
                delObj.value += ";"+obj.delPath;
            } else {
                delObj.value = obj.delPath;
            }
        }
    } catch(e){
    }
}


// 自适应计算iframe高度，用于iframe onLoad和dynamicForm.js增加行
function smartForm_iFrameHeight(iframeId) {
    try{
        var ifm = document.getElementById(iframeId);
        if('no' == ifm.scrolling && ifm.src !=""){
            var subWeb = document.frames ? document.frames[iframeId].document
                : ifm.contentDocument;
            if (ifm != null && subWeb != null) {
                //ifm.height = subWeb.body.scrollHeight;	//解决谷歌浏览器下，银企中框架高度展不开的问题。
                ifm.style.height = ifm.parentNode.scrollHeight;

                //ifm.style.height = ifm.parentNode.clientHeight+'px';	//775，为解决该问题，把上面一行代码打开，注释该行代码
                //ifm.style.height = '100%';
                //解决高度自适应在IE8失效问题
                var height = ifm.offsetHeight;
                //ifm.height = subWeb.body.scrollHeight;
                //解决高度自适应在IE8失效问题
                if(subWeb.body.scrollHeight > height){
                    //
                    ifm.style.height = subWeb.body.scrollHeight;
                }

            }
        } else if ('yes' == ifm.scrolling && ifm.src != "") {
            var subWeb = document.frames ? document.frames[iframeId].document
                : ifm.contentDocument;
            if (ifm != null && subWeb != null) {
                ifm.style.height = ($(ifm).parents("td.FormUnitTableTD")[0].clientHeight-8)+'px';//.parentNode.clientHeight+'px';
                var height = ifm.offsetHeight;
                if(subWeb.body.scrollHeight > height){
                    //
                    ifm.style.height = subWeb.body.scrollHeight;
                }

            }
        }
        //window.setTimeout('$(".form-main-table").css({"height":"100%"});',500);
    }catch(e){

    }
}

/**
 * 导出Excel_入口
 * @param {} obj 参数列表 {exportTableId:指定导出Table的Id;fileName:指定导出文件名称}
 */
function smartForm_doExport(obj) {
    try {
        var exportTableId = obj.id.split('.')[0];
        nstc.util.exportUtil.exportHtmlToExcel(exportTableId);
    } catch (e) {
        alert(e.message);
    }
}

/**
 * 导出Excel_入口（后台导出）
 * @param obj         :后台导出按钮对象
 *        def_tableId :需要导出的table id,如果为空，则def_tableId取obj.id
 */
function smartForm_doExport_bg(obj,def_tableId) {
    try {
        var exportTableId = def_tableId || obj.id.split('.')[0];
        var tableHeadDataId = "table_head_data";
        //var s_win=window.frames['data_export'].window;
        var table=document.getElementById(exportTableId);
        if(table !=null){
            var head = table.getElementsByTagName("THEAD")[0];
            var form = nstc.sf.findParent(obj, "FORM");
            //form.action = $('#appNo').val() + '@' + obj.id + ".sf";
            form.action = 'ExportExcelAction.sf?__eltId='+obj.id;
            if($(form).find("#"+tableHeadDataId).length ==0){
                $(form).append('<input type="hidden" id="'+tableHeadDataId+'" name="table_head_data"/>');
            }
            $("#"+tableHeadDataId).val(head.outerHTML);
            //form.target = "data_export";
            form.setAttribute("target", "_blank")
            var flag = nstc.sf.validateForm(obj);
            document.getElementById("WK_REQ_TIME_TOKEN").disabled = "disabled";
            if (true == flag){
                //obj.disabled=true;
                form.submit();
            }
            form.removeAttribute("target");
            document.getElementById("WK_REQ_TIME_TOKEN").removeAttribute("disabled");
            $("#"+tableHeadDataId).val('');

        }

    } catch (e) {
        alert(e.message);
    }
}

/**
 * 显示/隐藏SouthGroup/NorthGroup分组
 * @param obj
 */
function smartForm_showGroup(obj) {
    try {
        var table = nstc.sf.findParent(obj, "table");
        var trs = $(table).find("tr[id='"+obj.id+"']");
        for(var i = 0; i<trs.length; i++){
            if(trs[i].style.display == 'none'){
                $(trs[i]).find(".GridUnitDiv,.fix_title").css("display","block");//解决position:relative 不隐藏问题
                trs[i].style.display='block';
            }
            else{
                $(trs[i]).find(".GridUnitDiv,.fix_title").css("display","none");//解决position:relative 不隐藏问题
                trs[i].style.display='none';
            }
        }
    } catch (e) {

    }
}
function smartForm_showOneGroup(obj) {
    try {
        var table = nstc.sf.findParent(obj, "table");
        var trs = $(table).find("tr.table_one_grp");
        for(var i = 0; i<trs.length; i++){
            if(trs[i].id == obj.id){
                $(trs[i]).find(".GridUnitDiv,.fix_title").css("display","block");//解决position:relative 不隐藏问题
                trs[i].style.display='block';
            }
            else{
                $(trs[i]).find(".GridUnitDiv,.fix_title").css("display","none");//解决position:relative 不隐藏问题
                trs[i].style.display='none';
            }

        }
    } catch (e) {

    }
}
/**
 * TabGroup分组
 * @param obj
 */
function smartForm_showTabGroup(obj,unitcode){
    try {
        var ul = nstc.sf.findParent(obj, "ul");
        var li = $(ul).find("li");
        var table = $(document.getElementById(unitcode));
        var liNum = 0;
        for(var i = 0; i<li.length; i++){
            if(li[i].id == obj.id){
                liNum = i;
                var trs = table.find("tr[id='"+li[i].id+"']");
                for(var j = 0; j<trs.length; j++){
                    $(trs[j]).find(".GridUnitDiv,.fix_title").css("display","block");//解决position:relative 不隐藏问题
                    $(trs[j]).find("div.unit_title").css("display","block");//解决position:relative 不隐藏问题
                    $(trs[j]).find("div.FormUnitDiv").css("display","block");//解决图表 不隐藏问题
                    trs[j].style.display='table-row';	//SMP1.4.7 解决标签页中列表隐藏再显示后，宽度变小的问题
                    showTotalChart(trs[j]);
                }
                li[i].onclick=null;
                li[i].style.cursor='';
                li[i].style.cursor='pointer';
                li[i].className='currentBtn';
                if(fixTableObj.fixSize+fixTableObj.fixTopColsSize>0) {
                    fixTableObj.reset();
                    fixTableObj.fix();
                }
            } else {
                var trs = table.find("tr[id='"+li[i].id+"']");
                for(var j = 0; j<trs.length; j++){
                    $(trs[j]).find(".GridUnitDiv,.fix_title").css("display","none");//解决position:relative 不隐藏问题
                    $(trs[j]).find("div.unit_title").css("display","none");//解决position:relative 不隐藏问题
                    $(trs[j]).find("div.FormUnitDiv").css("display","none");//解决图表 不隐藏问题
                    trs[j].style.display='none';
                }
                li[i].onclick=function(){
                    smartForm_showTabGroup(this,unitcode);
                };

                li[i].style.cursor='hand';
                li[i].className='noBtn';
            }
        }
        liNum > 0 ? (li[(liNum-1)].className = "noBtnLeft") : (liNum == 0 ? (li[liNum].className = "currentBtnLeft") : '');
        liNum < (li.length - 1) ? (li[(liNum+1)].className = "noBtnRight") : (liNum == (li.length - 1) ? (li[liNum].className = "currentBtnRight") : '');
        if (liNum == 1) {
            li[0].className = "noBtnFirst1";
        } else if (liNum > 1) {
            li[0].className = "noBtnFirst2";
        }
    } catch (e) {

    }
}

/**
 * Gridunit行的鼠标移动事件，用于添加修改行颜色
 * @param obj
 */
function smartForm_tr_onmouseover(obj){
    if (typeof obj == 'undefined') return;
    var tabIdx = getCurrentTableIndex(obj);
    if(tabIdx==-1) return;
    if(obj.x!="1"){
        if(typeof(rowBackGroundColor1[tabIdx]) == "undefined" && (obj.sectionRowIndex)%2==0) {
            //rowBackGroundColor1[tabIdx] = obj.currentStyle["backgroundColor"];
            rowBackGroundColor1[tabIdx] = getStyle(obj, "backgroundColor");
        } else if(typeof(rowBackGroundColor2[tabIdx]) == "undefined" && (obj.sectionRowIndex)%2==1) {
            rowBackGroundColor2[tabIdx] = getStyle(obj, "backgroundColor");
        }
        obj.style.cursor = "pointer";
        if(typeof(rowOver_backGroundColor[tabIdx]) == "undefined"){
            if(!isAlternat(obj)) {
                rowBackGroundColor1[tabIdx] = getStyle(obj, "backgroundColor");
                rowBackGroundColor2[tabIdx] = rowBackGroundColor1[tabIdx];
            }
            obj.className="rowOver";
            rowOver_backGroundColor[tabIdx] = getStyle(obj, "backgroundColor");
        }else{
            obj.style.backgroundColor=rowOver_backGroundColor[tabIdx];
        }
    }
}

/**
 * SMP1.4.7 兼容IE的currentStyle
 * @param obj
 * @param attr
 */
function getStyle(obj, attr) {
    if(obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj,false)[attr];
    }
}

/**
 * Gridunit行的鼠标移动事件，用于添加修改行颜色
 * @param obj
 */
function smartForm_tr_onmouseout(obj,idx){
    var tabIdx = getCurrentTableIndex(obj)
    if(tabIdx==-1) return;
    if(obj.x!="1"){
        obj.style.backgroundColor = (obj.sectionRowIndex+idx)%2==0?rowBackGroundColor1[tabIdx]:rowBackGroundColor2[tabIdx];
    }
}

function smartForm_bt_onmouseover(obj){
    obj.style.cursor='hand';
    if (obj.className == "buttonD6 button") {
        obj.style.backgroundPosition='left -22px';
    } else {
        obj.style.backgroundPosition='left -24px';
    }
    obj.style.color = '#3074C1';
}
function smartForm_bt_onmouseout(obj){
    obj.style.backgroundPosition='';
    obj.style.color = '#6682B2';
}

/**
 * Gridunit行的鼠标点击事件，用于添加修改行颜色
 * @param obj
 * @param idx
 * @param single_selected :是否只能选中一行
 */
function smartForm_tr_onclick(obj,idx,single_selected){
    var tabIdx = getCurrentTableIndex(obj)
    if(tabIdx==-1) return;
    if(obj.x!="1"){
        //选中当前行
        obj.style.cursor = "pointer";
        if(typeof(rowBackGroundColor1[tabIdx]) == "undefined" && (obj.sectionRowIndex)%2==0) {
            rowBackGroundColor1[tabIdx] = getStyle(obj, "backgroundColor");
        } else if(typeof(rowBackGroundColor2[tabIdx]) == "undefined" && (obj.sectionRowIndex)%2==1) {
            rowBackGroundColor2[tabIdx] = getStyle(obj, "backgroundColor");
        }
        if(typeof(rowClick_backGroundColor) == "undefined"){
            /*if(!isAlternat(obj)) {	//解决点击第一行后，背景色不能取消的问题
                rowBackGroundColor1[tabIdx] = getStyle(obj, "backgroundColor");
                rowBackGroundColor2[tabIdx] = rowBackGroundColor1[tabIdx];
            }
            obj.className="rowSelected";*/
            rowClick_backGroundColor = getStyle(obj, "backgroundColor");
        }else{
            if(single_selected !=null && "1" == single_selected){
                //只能选中一行情况（清除其它行上的'rowSelected'样式）
                //$(obj).parent().find("tr").removeClass("rowSelected");
                var trs = $(obj).parent().find("tr");
                var bkColor,curColor;
                for(var i=0; i<trs.length;i++){
                    bkColor = i%2==0?rowBackGroundColor1[i]:rowBackGroundColor2[i];
                    //curColor = trs[i].currentStyle["backgroundColor"];	/*SMP1.4.7 兼容currentStyle*/
                    curColor = getStyle(trs[i], "backgroundColor");
                    if(curColor != bkColor){
                        trs[i].style.backgroundColor = bkColor;
                        trs[i].x ="0";
                    }
                }
            }
            obj.style.backgroundColor=rowClick_backGroundColor;
        }
        obj.x="1";
    }else{
        //取消当前行的选中状态
        obj.x="0";
        obj.style.backgroundColor = (obj.sectionRowIndex+idx)%2==0?rowBackGroundColor1[tabIdx]:rowBackGroundColor2[tabIdx];
    }
}


/**
 * 判断表格是否支持交替行样式
 */
function isAlternat(obj) {
    // 判断是否支持交替行样式
    var table = nstc.sf.findParent(obj, "TABLE");
    return table.getAttribute('isalternat')=="1"||table.getAttribute('isAlternat')=="1"?true:false;
}

/**
 * 判断当前行位于当前页面第几个数据表格(父级div的class="unit_content"或"unit_contenyt_list_fix_right")
 */
function getCurrentTableIndex(obj) {
    return $(obj).index();
    /* //SMP1.4.7 修改交替行样式不生效的问题
    var idx = -1;
    var div = $(obj).parents("div.unit_content_list,div.unit_content_list_fix_right,div.unit_content_list_fix_left");

    // 缓存所有的数据表格
    if(typeof(allDataGridDiv)=='undefined')
        allDataGridDiv = $("div.unit_content_list,div.unit_content_list_fix_right,div.unit_content_list_fix_left");
    // 查询当前行所在表格索引
    allDataGridDiv.each(function(i, e) {
        if(div[0]==e) {
            idx = i;
            return;
        }
    });
    return idx;*/
}

//数据导出专用iframe
$(document).ready(function(){
    $(document.body).append('<iframe name="data_export" src="" style="display:none;"></iframe>')
});
//解决只读输入框/上传文件框/选窗 等控件：键盘回退时，页面地址变化问题
$(document).ready(function(){
    $(":input[readOnly]").keydown(function(event){
        if(8 == event.keyCode){
            event.returnValue = false;
            return false;
        }
        return true;
    });

});

//分页简单实例
function smart_page_simple_page(objId,currPage,query_func) {
    document.getElementById(objId).value = currPage;
    try{
        var td = nstc.sf.findParent(document.getElementById(objId), "TD");
        if(!td.disabled){
            if(window[query_func] !=null){    //执行自定义页面刷新方法
                window[query_func](objId, currPage);
            }else{                           //执行默认页面刷新
                var unit_code = objId.substring(0,objId.indexOf("."));
                $(":button[id$='refresh']").click();
            }
        }

        td.disabled = true;

    }catch(e){

    }
}
//检测是否通过分页调用按钮的刷新事件,如果不是：把当前页号置为1
/**
 function check_simple_page_invoke(func){
	var flag = false;
	var pageKey = "_curPageNum";
	if($(":hidden[id$='"+pageKey+"']").length > 0){
		while(func){
			if(func == window["smart_page_simple_page"]){
				flag = true;
				break;
			}else{
				func = func && func.caller;
			}
		}
		if(!flag){
			$(":hidden[id$='"+pageKey+"']").val("1");
		}
	}
}
 优化后的函数
 **/
function check_simple_page_invoke(func){
    var flag = false;
    var pageKey = "_curPageNum";
    var page = $("input[id$='"+pageKey+"'][type=hidden]");
    if(page.length > 0){
        while(func){
            if(func == window["smart_page_simple_page"]){
                flag = true;
                break;
            }else{
                func = func && func.caller;
            }
        }
        if(!flag){
            page.val("1");
        }
    }
}

//通过超链接清空选窗文本框值
function smartForm_clearValueByLink(obj){
    var def_func = $(obj).attr("def_clear_func");
    if( def_func !=null){
        //如果存在自定义清空方法，则优先执行自定义方法
        try{
            eval("("+def_func+")");
        }catch(e){

        }
    }else{
        //清空文本结点
        $(obj).val("");
    }
}
function smartForm_ShowUCon(obj){
    var btnId=$(obj).attr("id");
    var tempStr=btnId.split(".");
    var code=tempStr[0]+".content";
    var bo=tempStr[0]+".bo";
    var destObj= document.getElementById(code);
    var boObj=document.getElementById(bo);
    var frontVal=$(destObj).css("display");
    if(frontVal=="none"){
        $(destObj).css("display","")
        $(boObj).css("display","")
        obj.value="收起∧"
    }else{
        $(destObj).css("display","none");
        $(boObj).css("display","none");
        obj.value="展开∨"

    }
}
//--------2016/8/18--add----------------------
/*
 function smartForm_ShowUImg_old(obj){
 var btnId=$(obj).attr("id");
 var tempStr=btnId.split(".");
 var code=tempStr[0]+".content";
 var bo=tempStr[0]+".bo";
 var destObj= document.getElementById(code);
 var boObj=document.getElementById(bo);
 var frontVal=$(destObj).css("display");
 var img =document.getElementById(btnId);
 if(frontVal=="none"){
 $(destObj).css("display","")
 $(boObj).css("display","")
 //obj.value="收起∧"
 if(img){
 img.src="./SmartFormRes/js/skin/default/retract.png";
 }
 }else{
 $(destObj).css("display","none");
 $(boObj).css("display","none");
 // obj.value="展开∨"
 if(img){
 img.src="./SmartFormRes/js/skin/default/spread.png";
 }
 }
 }
 */

function smartForm_ShowUImg(obj){
    var btnId=$(obj).attr("id");
    var tempStr=btnId.split(".");
    var code=tempStr[0]+".content";
    var bo=tempStr[0]+".bo";
    var destObj= document.getElementById(code);
    var boObj=document.getElementById(bo);
    var frontVal=$(destObj).css("display");
    if(frontVal=="none"){
        $(destObj).css("display","")
        $(boObj).css("display","")
        //obj.value="收起∧"
    }else{
        $(destObj).css("display","none");
        $(boObj).css("display","none");
        // obj.value="展开∨"
    }
}

function smartForm_ShowUImg_over(obj) {
    $(obj.getElementsByClassName("DefaultTitleBar")[0]).css({"background-color":"#cde8f6","cursor":"pointer"});
}

function smartForm_ShowUImg_out(obj) {
    $(obj.getElementsByClassName("DefaultTitleBar")[0]).css({"background-color":"#E8F1FC"});
}


function smartForm_scsbt_onmouseover(obj){
    //obj.style.background="#65E075";
    //obj.style.color="white";
    obj.style.cursor="hand";
}
function smartForm_scsbt_onmouseout(obj){
    //obj.style.background="transparent";
    //obj.style.color="black";
    obj.style.cursor="";
}
/**
 *解决页签下的统计图渲染问题
 * @param obj
 */
function showTotalChart(obj){
    var idVal=$(obj).find("[name='totalChartID']").val();
    var dataVal=$(obj).find("[name='totalChartData']").val();
    if("undefined" == typeof idVal||"undefined" == typeof dataVal){
        return;
    }
    var myChart = echarts.init(document.getElementById(idVal));
    var option;
    eval(dataVal);
    myChart.setOption(option);
}
/*
 * 获取单元格在本行中的位置序号
 * */
function getCellIndex(o) {
    for (var i=0,obj=o.parentNode.childNodes; i<obj.length; i++) {
        if (o == obj[i]) return i;
    }
}

/*
 * 复选框点击处理
 * */
function click_checkbox(ele) {
    /*var id = ele.getAttribute('data-id');
     var chkBox = document.getElementById(id);*/
    var chkBox = ele.parentNode.getElementsByTagName("input").item(0);
    chkBox.click();
    window.setTimeout(function () {change_checkbox_img(chkBox);},200);	/*SMP1.4.7 解决复选框不可选时，真实选中状态和表现不一致的问题*/
}

/*
 * 复选框样式切换
 * */
function change_checkbox_img(obj) {
    try {
        var objSpan = getSpanByNext(obj);
        if (obj.disabled) {
            obj.checked ? objSpan.className='checkbox_bg_disabled_f' : objSpan.className='checkbox_bg_disabled';
        } else {
            obj.checked ? objSpan.className='checkbox_bg_f' : objSpan.className='checkbox_bg';
        }
    } catch (e) {}
}

/*
 * 获取复选框下的样式SPAN标签
 * */
function getSpanByNext(obj) {
    if (obj.nextSibling.tagName.toLowerCase() != "span") {
        getSpanByNext(obj.nextSibling);
    } else {
        return obj.nextSibling;
    }
}

/*
 * 单选按钮样式切换
 * */
function change_radio_img(ary) {
    try {
        for (var i=0; i<ary.length; i++) {
            if (ary[i].disabled) {
                ary[i].checked ? ary[i].nextSibling.className='radioStyle_disabled_f' : ary[i].nextSibling.className='radioStyle_disabled';
            } else {
                ary[i].checked ? ary[i].nextSibling.className='radioStyle_f' : ary[i].nextSibling.className='radioStyle';
            }
        }
    } catch (e) {}
}

/*
 * 单选按钮点击处理
 * */
function click_radio(ele) {
    /*var radioID = ele.getAttribute("data-id");
     document.getElementById(radioID).click();
     var name = document.getElementById(radioID).getAttribute("name");
     var radioID = ele.parentNode.getElementsByTagName("input").item(0);*/
    var radioID = ele.previousSibling;
    radioID.click();
    var name = radioID.getAttribute("name");
    var ary = document.getElementsByName(name);
    window.setTimeout(function() {change_radio_img(ary);}, 100);	/*SMP1.4.7 解决单选框不可选时，真实选中状态和表现不一致的问题*/
}

/*
 * 上传按钮点击处理
 * */
function click_file(ele) {
    var val = ele.getElementsByTagName("input").item(0).value;
    if (val.length > 0) {
        ele.getElementsByTagName("input").item(0).outerHTML = ele.getElementsByTagName("input").item(0).outerHTML;
        $(ele).prev().val("");
        $(ele).attr("class", "fileInput");
    } else {
        ele.getElementsByTagName("input").item(0).click();
    }
}

var tableTimer = null;
function change_table(obj) {
    window.clearTimeout(tableTimer);
    var self = obj;
    tableTimer = window.setTimeout(function () {change_table_fn(self)}, 10);

}

function change_table_fn(obj) {
    var checkboxEle = $(obj).find(".checkbox");
    $.each(checkboxEle, function (n, value) {
        if (value.style.display == "none") {
            return true;
        } else if (!value.nextSibling || value.nextSibling.tagName.toLowerCase() != "span") {
            $(value).after('<span class="checkbox_bg" onclick="click_checkbox(this)"></span>');
            if (!$(value).attr("onpropertychange")) {
                $(value).bind("propertychange", function (e) {
                    checkbox_propertyChange(this);
                })
            }
            change_checkbox_img(value);
        }
    });
}
/*
 * 修改下拉列表属性时，触发事件处理
 * */
function propertyChange(obj) {
    window.setTimeout(function () {propertyChangeFn(obj)},10);
}
function propertyChangeFn(obj) {
    try {
        if (obj.style.display == "none") {
            obj.parentNode.style.border = "0px";
            obj.parentNode.setAttribute("width",obj.parentNode.style.width);
            obj.parentNode.style.width = "";
            $(obj.parentNode).find(".select-tag-click").css("width","0px");
            if (!obj.nextSibling.nextSibling && !obj.previousSibling) {
                obj.parentNode.style.display = "none";
            } else {
                obj.parentNode.style.display = "";
            }
        } else {
            if ($(obj).parent().css("display") == "none" && obj.name == "TSS_NSBRANCH_SET_LIST.kmlist") {	//兼容开发的代码
                return;
            }
            obj.parentNode.style.border = "1px solid #E0E0DA";
            var wid = (obj.getAttribute("old_width") && obj.getAttribute("old_width").split(":")[1]) || obj.parentNode.getAttribute("width") || obj.style.WIDTH || obj.style.width || "";
            obj.parentNode.style.width = wid;
            obj.parentNode.style.display = "";
            $(obj.parentNode).find(".select-tag-click").css("width","2px");
        }
    } catch (e) {}
}

/*
 * 页面打开时，判断下拉列表是否被动态删除
 * */
function refreshSelectStyle(obj) {
    try {
        if ($(obj).find("select").length == 0) {
            obj.className = "";
        }
        propertyChange($(obj).find("select")[0]);
    } catch (e) {}
}

/*
 * 页面打开时，判断复选框是否被动态删除
 * */
function refreshCheckboxStyle(obj) {
    if (obj.previousSibling && obj.previousSibling.type == "checkbox") {

    } else {
        obj.className = "";
    }
}
/*
 * 修改复选框属性时，触发事件处理
 * */
function checkbox_propertyChange(obj) {
    if (!$(obj).attr("selfname")) {
        if (obj.style.display == "none") {
            obj.nextSibling.style.display = "none";
        } else {
            obj.nextSibling.style.display = "inline-block";
        }
    }
    change_checkbox_img(obj);
}

/*
 * 修改单选按钮属性时，触发事件处理
 * */
function radio_propertyChange(obj) {
    change_radio_img(obj);
}
/**
 * nstc.sf.requestDropFilterTable_单元名称_元素名称
 * 下拉表格框的实现
 */

nstc.sf.requestDropFilterTable_D1_biaoxuan = function(ele, params){
    var inputVal = document.getElementsByName("nstc.sf.DropFilterTableInputText")[0].value;
    inputVal = inputVal.replace(/\s/g,"%");
    params.params = "username="+inputVal //sql参数username
    nstc.sf.requestDropFilterTable(ele, params, "my_function");
}
//选中结果处理
function my_function(value){
//alert(value);
}

//SMP1.4.7 浏览器添加事件兼容
function smartForm_addEvent(obj, type, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
    } else {
        obj.attachEvent('on'+type, fn);
    }
}

//SMP1.4.7 上传元素增加onchange事件
function smartForm_file(obj) {
    $(obj.parentNode).prev().val(obj.value);
    $(obj.parentNode).attr('class','fileInput_close');
    if(obj.value.length>0){
        obj.style.display='none'
    }
}