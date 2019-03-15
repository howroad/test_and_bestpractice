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
/*
 * 复选框点击处理
 * */
function click_checkbox(ele) {
    var chkBox = ele.parentNode.getElementsByTagName("input").item(0);
    $(chkBox).click();
    change_checkbox_img(chkBox);
    //window.setTimeout(function () {change_checkbox_img(chkBox);},200);	/*SMP1.4.7 解决复选框不可选时，真实选中状态和表现不一致的问题,jsp页面中好像没有不可选的状态*/
}

/*
 * 复选框样式切换
 * */
function change_checkbox_img(obj) {
    var objSpan = getSpanByNext(obj);
    if (obj.disabled) {
        obj.checked ? objSpan.className='checkbox_bg_disabled_f' : objSpan.className='checkbox_bg_disabled';
    } else {
        obj.checked ? objSpan.className='checkbox_bg_f' : objSpan.className='checkbox_bg';
    }
}

/*
 * 获取复选框下的样式SPAN标签
 * */
function getSpanByNext(obj) {
    var sblings = $(obj).siblings();
    for(var i = 0 ; i < sblings.length ; i++){
        var tName = sblings[i].tagName + "";
        if(tName.toUpperCase() == "SPAN"){
            return sblings[i];
        }
    }
}

/**
 * 重写smartPage全选（disabled不能选中）
 *
 * @param obj
 * @param name
 */
function smartForm_all_checkbox(obj, name) {
    var isCheck = false;
    if (obj.checked == true) {
        isCheck = true
    }
    var checkBoxs = document.getElementsByName(name);
    for ( var i = 0; i < checkBoxs.length; i++) {
        checkBoxs[i].checked = isCheck;
        if (checkBoxs[i].disabled == true) {
            checkBoxs[i].checked = false;
        }
        nstc.sf.clickCheckbox(checkBoxs[i]);
    }
}


//新增合同项
function addContractAmount(obj) {
    var tr_row = smartForm_add(obj);
    var tr = $(tr_row);
    var rateAdjustTypeObj = tr.find("select[id$='.rateAdjustType']");
    var payInterestTypeObj = tr.find("select[id$='.payInterestType']");

    var bussVar = $("[id$='bussVariety']").val();
    if(bussVar == "CLMS07" ) {//银团时复制第一行信息
        var amountList = $("select[id$='_amount.currencyNo']:visible");
        if (amountList.length > 1) {
            var firstAmountTr = amountList.eq(0).parents("tr").first();
        }
    }
    rateAdjustTypeObj.change();
    payInterestTypeObj.change();
}

/**
 * 增加GridUnit行
 *
 * @param obj
 */
function smartForm_add(obj) {
    var names = obj.name.split('.');
    var unitname = names[0];
    var tr = nstc.sf.addRow(unitname, "tableCopy_" + unitname);
    $(tr).show();
    return tr;
    var frameId = window.frameElement && window.frameElement.id || '';
    if(window.parent != window)
        window.parent.smartForm_iFrameHeight(frameId);

}

// 处理新增行
nstc.sf.markNewRow = function(tid,tableId) {
    var t = document.getElementById(tid);
    if($(t).find("td[row]").length<=0){
        $(t).html($(t).html()+"<td style='display:none;' row=' _$row_'><input name='"+tableId+".rowType' value='template'/><input name='"+tableId+"._selRowFlag' alt='_selRowFlag' value='_nstc_check_no'/></td>");
    }
    var tc = t.cloneNode(true);
    if(_IE && _IE < 10){//IE9及以下cloneNode的BUG甚多，这里修复：无法克隆SELECT的默认OPTION
        nstc.sf.fixSelected(t,tc);
    }
    var check = nstc.sf.getCheckObject(tc, 0);
    $(tc.lastChild.getElementsByTagName('input')[0]).attr('value','add');
    $(tc).attr("style","display:;");
    var html = tc.outerHTML;
    var explorer =navigator.userAgent;
    if(check != null){
        if(/*explorer.indexOf("Chrome")>=0*/window.attachEvent){
            html=html.replace("name="+check.name+" ","name=_$newRow_ ").replace(" name="+check.name+">"," name=_$newRow_ >").replace('<input name="addPageList.rowType" value="template"','<input name="addPageList.rowType" value="add"');
        }else{
            html=html.replace("name="+check.name+" ","name=_$newRow_ ").replace(" name="+check.name+">"," name=_$newRow_ >").replace('<input name="'+tableId+'.rowType" value="template"','<input name="'+tableId+'.rowType" value="add"');
        }
    }

    try{
        $(tc).remove();
    }catch(e){
    }
    return html;
}