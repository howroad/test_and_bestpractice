	/*--------- 命名空间 ---------*/
	if (!nstc)
		var nstc = {};
	if (!nstc.sf)
		nstc.sf = {};
	/**
	 *  判断当前页面IE版本(适用于X-UA-Compatible)：
	 *  如果是IE9及以下则返回IE版本号如IE8则返回8；
	 *  如果是IE10及以上或非IE浏览器则返回false;
	 *  来自JQuery2.0源码
	 */
	var _IE = (function () {
        var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]
        );
        return v > 4 ? v : false;
	} ());
	
	/**
	 * 隐藏 btn 所在的单元表格内所选择的行数据。
	 * 对于新增的行，则直接删除；
	 * 对于已有行，则 隐藏 
	 */
	nstc.sf.hideSelectedRow = function(btn){
		nstc.sf.deleteAddRow(btn.id.split(".")[0]);
		var index = $("#"+btn.id.split(".")[0]+" tbody td input:checked:visible");
		$.each(index, function(i, n) {
			nstc.sf.delCurrRow(n,true);
		});
		try{
			if(window.parent != window){
				var frameId = window.frameElement && window.frameElement.id || '';
				window.parent.smartForm_iFrameHeight(frameId);
			}
		}catch(e){} 
	}
	
	/**
	 * 删除obj所在的行。
	 * 如果setHide为true，则不直接删除改行，而是只隐藏改行。
	 * 调用：nstc.sf.deleteCurrentRow(obj) 删除obj所在的行
	 * 		 nstc.sf.deleteCurrentRow(obj,true) 隐藏obj所在的行，不删除
	 */
	nstc.sf.delCurrRow = function(obj){
		var table = nstc.sf.findParent(obj, "TABLE");
		var tr = nstc.sf.findParent(obj, "TR");
		if(tr){
			if(arguments[1] === true){
				nstc.sf.changeFlag(obj,'delete');
				$(tr).hide();
			}else{
				table.deleteRow(tr.rowIndex);
			}
			//增加iframe自动刷新
			try{
				// 如果当前页面被iframe加载，自适应计算iframe的高度，跨域不适用。
				if(window.parent!=window) {
				var frameId = window.frameElement && window.frameElement.id || '';
					window.parent.smartForm_iFrameHeight(frameId);
				}
			}catch(e){}
		}
	}
	
	nstc.sf.clickCheckbox = function(obj){
		nstc.sf.changeFlag(obj,'modified');
		var acnt = $(nstc.sf.findParent(obj,"TR")).find("[alt=_selRowFlag]")[0];
		var value = obj.value||"_nstc_check_yes";
		if(obj.checked){
			acnt.value=value;
		}else{
			acnt.value="_nstc_check_no";
		}
		checkbox_propertyChange(obj);	//SMP1.4.7 修改非点击触发复选框值的变化时，不能改变样式的问题。CTM-1722
	}
	// 改变标志位的值
	// f为行为。可选值：add-新增；delete-删除；modified-修改；selected-选中
	nstc.sf.changeFlag=function(obj,f){
		var tr = nstc.sf.findParent(obj, "TR");
		if(tr !=null && tr.lastChild !=null){
			var input = tr.lastChild.getElementsByTagName('input')[0];
			if(input && input.name.match(/.*rowType/)){
				if(input.value!= f && input.value != "add" && input.value!='delete'&& input.value!='template'){
					input.value=f;
				}
				//$(tr).addClass("selectRow");
			}
		}		
	}
		
	// 删除时调用
	nstc.sf.doDeleteSubmit = function (url,formId, gridUnitCode){
		var tableId = url.substring(url.indexOf('@') + 1,url.indexOf("."));
		if(gridUnitCode !=null){
			tableId = gridUnitCode;
		}
		var form = document.getElementById(formId);
		var $table = $("#"+formId+" table[id]");
		nstc.sf.deleteRows(tableId);
		form.action=url;
		form.submit();
	}

	//利用模板新增一行
	//nstc.sf.count=1;
	nstc.sf.addRow = function(tableId, templateId) {
		var table = document.getElementById(tableId);
		var template = nstc.sf.markNewRow(templateId,tableId);
		if (!table || !template) {
			return;
		}
		var trNo = new Date().getTime() + (String(Math.random()).slice(-8)); // 加标记，用于标示新增的行
		template = template.replace(/<tr/i,"<tr appIndex_="+trNo);
		for (var i=table.rows.length-1;i>=1;i--){
			if(table.rows[i].id.indexOf("tableSubTotal_") < 0 && table.rows[i].id.indexOf("tableTotal_") < 0){
				if(table.rows[i].pagingRow && table.rows[i].pagingRow == '1'){  
					//存在分页时，新增行加上分页行上方
					continue;
				}
				$(table.rows[i]).after(template);
				break;
			}
		}
		//$(table).find("tbody").append(template);
		try{
			// 如果当前页面被iframe加载，自适应计算iframe的高度，跨域不适用。
			if(window.parent!=window) {
			var frameId = window.frameElement && window.frameElement.id || '';
				window.parent.smartForm_iFrameHeight(frameId);
			}
		}catch(e){}
		return $("tr[appIndex_="+trNo+"]")[0];
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
		if(/*explorer.indexOf("Chrome")>=0*/window.attachEvent){
			html=html.replace("name="+check.name+" ","name=_$newRow_ ").replace(" name="+check.name+">"," name=_$newRow_ >").replace('<input name="addPageList.rowType" value="template"','<input name="addPageList.rowType" value="add"');
		}else{
			html=html.replace("name="+check.name+" ","name=_$newRow_ ").replace(" name="+check.name+">"," name=_$newRow_ >").replace('<input name="'+tableId+'.rowType" value="template"','<input name="'+tableId+'.rowType" value="add"');
		}
		try{
			$(tc).remove();
		}catch(e){
		}
		return html;
	}
	
	
	/**
	 * 填充行tr模板
	 * param row_tpt   : tr模板，需要填充的地方用__@{xxx}, xxx:元素编号
	 * param row_jsObj : 行json对象
	 */
	nstc.sf.addRow.fillTpt = function(row_tpt, row_jsObj){		
		
		var regExp = /__@{(\w+)}/g;
		
		return row_tpt.replace(regExp, function(matcher, key){
			
			return row_jsObj[key];
		});		
	}
	
	/**
	 * 动态填充table
	 * param tableId :   需要填充的tableId
	 * param html    :   tr字符串
	 */
	nstc.sf.addRow.fillTable = function(tableId, html){
		$(document.getElementById(tableId)).find("tbody").append(html);
		
		fixTableObj.reset();
		fixTableObj.fix();
	}
	
	// 修复IE9及以下cloneNode的BUG:无法克隆SELECT的默认OPTION
	nstc.sf.fixSelected = function(t,tc){
		var _ts = t.getElementsByTagName("SELECT");
		var _tcs= tc.getElementsByTagName("SELECT");
		if(_ts.length != _tcs.length){
			return;
		}
		for(var i in _ts){
			_tcs[i].value=_ts[i].value;
		}
	}

	// 删除选中的行
	nstc.sf.deleteRows = function(tableId) {
		nstc.sf.deleteAddRow(tableId);
		var rows = document.getElementById(tableId).rows;
		for(var i=0;i<rows.length;i++ ){
			var obj = nstc.sf.getCheckObject(rows[i],0);
			if(obj && obj.checked){
				//$(obj).css("border",'1px solid #ee0000');
				nstc.sf.changeFlag(obj,'delete');
			}
		}
		
		try{
			if(window.parent != window){
				var frameId = window.frameElement && window.frameElement.id || '';
				window.parent.smartForm_iFrameHeight(frameId);
			}
		}catch(e){}
	}

	// 删除选中的新增行 
	nstc.sf.deleteAddRow = function(tableId) {
		var index = $("#"+tableId+" td input:checked:visible[name='" + "_$newRow_" + "']");
		$.each(index, function(i, n) {
			var row = nstc.sf.findParent(n,"TR");
			if (!row || row == null) {
				return;
			}
			nstc.sf.findParent(row, 'TABLE').deleteRow(row.rowIndex);
		});
		
		try{
			if(window.parent != window){
				var frameId = window.frameElement && window.frameElement.id || '';
				window.parent.smartForm_iFrameHeight(frameId);
			}
		}catch(e){}
	}

	// 获取row中第index列下的checkbox或者radio
	nstc.sf.getCheckObject = function(row, index) {
		if (row.tagName.toLocaleUpperCase() != "TR")
			return null;
		var elements = $(row).children("td").first().find("input");
		var obj = null;
		for(var n=0; n<elements.length; n++){
			if (elements[n].type == 'checkbox' || elements[n].type == 'radio') {
				obj = elements[n];
				break;
			}
		}
		return obj;
	}

	//寻找一个对象的父元素。
	nstc.sf.findParent = function(object, tag) {
		if (object == null || typeof (object) != "object")
			return null;
		var node = object.parentElement;
		if (node == null)
			return null;
		if (node.tagName.toLocaleUpperCase() == tag.toLocaleUpperCase())
			return node;
		else
			return nstc.sf.findParent(node, tag);
	}
	// template add delete none 
	nstc.sf.NTable = function(t){
		this.table = t;
		this.initAllRows =function(){
			var html ='';
			//$.each($(t).find("tbody tr:visible"),function(i,n){
			var trs = $(t).find("tbody tr:visible");
			if($(t).is(":hidden")){        //此处解决table初始就是隐藏状态，无法生成隐藏Td问题
				trs = $(t).find("tbody tr:not([id^='tableCopy_'])");
			}
			$.each(trs,function(i,n){
				if(n.id != null && (n.id.indexOf("tableSubTotal_") != -1 || n.id.indexOf("tableTotal_")!=-1)){
					
				} else {
					var index = n.rowIndex;
					var rowType = n.getAttribute("rowType") || 'none';
					if("add" == rowType && $(n).find("td:first :checkbox").length > 0){//新增加状态首列恢复操作前状态
						var tp_first_col=$(n).siblings("[id^='tableCopy_'] td:first");
						$(n).find("td:first").html(tp_first_col.html());						
					}
					var cell =  "<td style='display:none;' id=' _$row_"+ index +"'><input name='"+t.id+".rowType' value='"+rowType+"'/><input name='"+t.id+"._selRowFlag' alt='_selRowFlag' value='_nstc_check_no'/></td>";
					$(n).append(cell);
				}
				//rt.push(new NRow(n));
			});

		};
	}
	// dom加载完成之后立即执行
	// 初始化动态表单
var t4;
	$(function(){
		var t4_1 = new Date().getTime();
		var tables = $("table[isDymanic='true']");
		$.each(tables,function(i,n){
			var t = new nstc.sf.NTable(n);
			t.initAllRows();
		});
		t4 = new Date().getTime() - t4_1;
	});
	//弹出新窗口
	nstc.sf.OpenPage = function(href,name,width,height){
		var sFeatures = "width="+width + ",height="+height+",top=200,left=400,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no";
		window.open(href,name,sFeatures);
	}
