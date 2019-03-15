if (!nstc)
	var nstc = {};
if (!nstc.sf)
	nstc.sf = {};

//二维数组：存储所有下拉筛选表格数据源信息，[0]:元素id，例如：'demo_gelt_02_01_el_2'，[1]:表格数据
var SmartPage_DropTextTable={};                        
SmartPage_DropTextTable.DropDivItemHeight = 20;
SmartPage_DropTextTable.MaxHeight = 200;           //弹出块最大高度
SmartPage_DropTextTable.MaxWidth = 400;            //弹出块最大宽度
SmartPage_DropTextTable.Width = 0;                 //弹出块宽度（动态计算）
SmartPage_DropTextTable.Height = 0;                //弹出块高度（动态计算）
SmartPage_DropTextTable.FixedWidth = 200;          //弹出块默认宽度
SmartPage_DropTextTable.FixedHeight = 200;         //弹出块默认高度
SmartPage_DropTextTable.DropDivId = 'nstc.sf.DropTextTableDivEle';      //弹出块id
SmartPage_DropTextTable.TextName = 'nstc.sf.DropTextTableInputText';    //输入框名称（存储显示值）
SmartPage_DropTextTable.CurrentText;                                      //当前输入框（存储显示值）
SmartPage_DropTextTable.CurrentSelDiv;                                    //当前活跃元素块
SmartPage_DropTextTable.CKName = "nstc.sf.DropTextTableCK";             //隐藏框名称（存储实际值）
//过滤表格数据
nstc.sf.filterDropTextTable=function (value){
	var clickObj = event.srcElement ? event.srcElement : event.target;
	var divEle = document.getElementById(SmartPage_DropTextTable.DropDivId);
	var selectors = "";
	value = $.trim(value);
	if(value !=null && value !=""){
		var value_array=value.split(",");
		for(var i =0; $.trim(value_array[i]) !="" && i<value_array.length; i++){
			selectors += (":contains('"+$.trim(value_array[i])+"'),");
		}
		if(selectors.length >0){
			selectors=selectors.substring(0,selectors.length-1);
			$(divEle).find("table tbody tr").hide().filter(selectors).show(); 
		}				
	}
	//$(divEle).find("table tbody tr").hide().filter(":contains('"+value+"')").show(); 	
//	nstc.sf.dropTextTableClear(clickObj);//根据输入框中的内容反向选择下拉checkbox 

	if(SmartPage_DropTextTable !=null && SmartPage_DropTextTable.CurrentSelDiv !=null){
		var data=SmartPage_DropTextTable[SmartPage_DropTextTable.CurrentSelDiv.id];

		var muti_select=data !=null ? data.muti_select :"";
		if("1" != muti_select ){
			
			var v_event =window.event;
			if(v_event.keyCode == 13){
				var trs = $(divEle).find("table tbody tr:visible");
				if(trs !=null && trs.length >0){
					trs[0].fireEvent("onclick");	
				}

			}
		}
	}
	
}

//显示下拉表格
nstc.sf.showDropTextTable=function (ele){
	
	var elementDiv = ele.parentNode;
	if (!window.dropTextTableDiv) {
		window.dropTextTableDiv = document.createElement("div");
		dropTextTableDiv.id = SmartPage_DropTextTable.DropDivId;
		document.body.appendChild(dropTextTableDiv);
		//dropTextTableDiv.style.position = 'absolute';		
		dropTextTableDiv.className = 'DropTextTableDIV';
		//dropTextTableDiv.style.overflow="auto";
		document.attachEvent('onclick', nstc.sf.hideDropTextTable);
	}
	dropTextTableDiv.style.display = 'block';	
	
	SmartPage_DropTextTable.CurrentSelDiv = elementDiv;		
	
	SmartPage_DropTextTable.CurrentText = ele;
        $(dropTextTableDiv).empty();
	
	var data=SmartPage_DropTextTable[elementDiv.id];
	nstc.sf.renderDropTextTable(data);
	nstc.sf.computeDropTextTableXY(elementDiv, dropTextTableDiv);
}
//显示下拉表格
nstc.sf.showDropTextTable2=function (ele){
	
	var elementDiv = ele.parentNode;
	if (!window.dropTextTableDiv) {
		window.dropTextTableDiv = document.createElement("div");
		dropTextTableDiv.id = SmartPage_DropTextTable.DropDivId;
		document.body.appendChild(dropTextTableDiv);
		//dropTextTableDiv.style.position = 'absolute';		
		dropTextTableDiv.className = 'DropTextTableDIV';
		//dropTextTableDiv.style.overflow="auto";
		document.attachEvent('onclick', nstc.sf.hideDropTextTable);
	}
	dropTextTableDiv.style.display = 'block';	
	
	SmartPage_DropTextTable.CurrentSelDiv = elementDiv;		
	
	SmartPage_DropTextTable.CurrentText = ele;
        $(dropTextTableDiv).empty();
	
	var data=SmartPage_DropTextTable[elementDiv.id];
//	nstc.sf.renderDropTextTable(data);
//	nstc.sf.computeDropTextTableXY(elementDiv, dropTextTableDiv);
}
//隐藏下拉表格
nstc.sf.hideDropTextTable=function hide_table(){
	var clickObj = event.srcElement ? event.srcElement : event.target;
	if (nstc.sf.notDealDropTextTable(clickObj)) {
		return;
	}
	var divEle = document.getElementById(SmartPage_DropTextTable.DropDivId);
	if (divEle) {
		divEle.style.display = 'none';
	}			
}
//向input元素填充数据
nstc.sf.fillDropTextTableText=function (text){
	
	var data=SmartPage_DropTextTable[SmartPage_DropTextTable.CurrentSelDiv.id];
	var muti_select=data !=null ? data.muti_select :"";
	if(muti_select !=null && "1" == muti_select){//复选处理逻辑
		var divEle = document.getElementById(SmartPage_DropTextTable.DropDivId);
		var texts="",values="";
		$(divEle).find("table tbody tr input:checked").each(function(i,ele){
			var temp=ele.value.split("@@");
			if(temp !=null && temp.length >0){
				texts += (temp[0]+",");
				values += (((temp.length==2) ? temp[1] : "")+",");
			}			
		});
		texts = texts.length >0 ? texts.substring(0,texts.length - 1) : "";
		values = values.length >0 ? values.substring(0,values.length - 1) : "";
		SmartPage_DropTextTable.CurrentText.value=texts;
	}else{//单选处理逻辑
		SmartPage_DropTextTable.CurrentText.value=text;
	}
	nstc.sf.changeFlag(SmartPage_DropTextTable.CurrentText,'modified');
	
}		
//渲染下拉表格主函数
nstc.sf.renderDropTextTable=function (data){
	var table="<table class=\"GridUnitTable\" cellSpacing=0 cellPadding=0 width=\"100%\" border=0>"
	          //+(SmartPage_DropTextTable[SmartPage_DropTextTable.CurrentSelDiv.id].head || nstc.sf.getDropTextTableHead(data))
		  +nstc.sf.getDropTextTableHead(data)
		  +nstc.sf.getDropTextTableBody(data)
	          +"</table>";
	$(dropTextTableDiv).append(table);
}

//获取表头
nstc.sf.getDropTextTableHead=function (data){
	var thead = "<thead class=\"td_bgb\">";
	if(data !=null && data.cols !=null && data.cols.length >0 ){
		thead+="<tr>";
		var muti_select=data.muti_select;		
		if(muti_select !=null && "1" == muti_select){
			thead +=('<th><input type ="checkbox" onclick="nstc.sf.dropTextTableCkAll(this.checked)"/></th>');
		}
		SmartPage_DropTextTable.Width = 0;
		SmartPage_DropTextTable.Height = data.height || SmartPage_DropTextTable.FixedHeight;
		for(var i=0; i<data.cols.length;i++){	
			var obj=data.cols[i];
			if(obj !=null){
				thead+=( "<th width=\""+ (obj.width || "50") +"\" class=\"table_bg text-center\">"+(obj.title ||"")+"</th>");
				SmartPage_DropTextTable.Width+=(parseInt(obj.width) || 50);
			}						
		}	
		thead+="</tr>";		
	}
	thead +="</thead>";
	return thead;
	//SmartPage_DropTextTable[SmartPage_DropTextTable.CurrentSelDiv.id].head = head;
	//alert(title[0].title);
}
//获取表体
nstc.sf.getDropTextTableBody=function (data){
	
	var tbody="<tbody>";
	if(data !=null && data.datas !=null && data.datas.length >0){
		var dis_col=data.dis_col;
		var val_col=data.val_col;
		var muti_select=data.muti_select;
		for(var i=0; i<data.datas.length;i++){
			var obj=data.datas[i];
			if(obj !=null ){
				tbody += ("<tr onclick=\"nstc.sf.fillDropTextTableText('"+obj[val_col]+"');nstc.sf.dropTextTableTRClick(this)\" onmouseover=\"smartForm_tr_onmouseover(this,1)\" onmouseout=\"smartForm_tr_onmouseout(this,1)\""
			            +" class=\"rowCss"+(2-i%2)+" DropTextTableROW ");
				if(data.cols !=null && data.cols.length >0){
					if(muti_select !=null && "1" == muti_select ){
						var values=SmartPage_DropTextTable.CurrentText.value;
						var checked="";
						var regExp=new RegExp("(^|.*,)"+obj[val_col]+"(,.*|$)");
						checked=(values !=null && regExp.test(values)) ? " checked=checked " : "";
						tbody +=((values !=null && regExp.test(values)) ? " rowSelected " : "");//默认选中行变色功能
						tbody +="\">";
						tbody +=('<td><input type="checkbox" name="'+SmartPage_DropTextTable.CKName+'" value="'+obj[dis_col]+'@@'+obj[val_col]+'"'+checked+'/></td>');
					}else{
						tbody +="\">";
					}
					for(var j=0;j<data.cols.length;j++){
						var col=(data.cols[j] !=null) ? data.cols[j].field : "";
						tbody += ("<td>"+(obj[col] || "")+"</td>");
					}
				}
				tbody +="</tr>"
			}			
		}		
		
	}				
	tbody+="</tbody>"
	return tbody;
}
//
nstc.sf.notDealDropTextTable = function(clickObj) {
	try {
		if (clickObj && clickObj.getAttribute('name') == SmartPage_DropTextTable.TextName || clickObj == SmartPage_DropTextTable.CurrentText) {
			return true;
		}
		var divEle = document.getElementById(SmartPage_DropTextTable.DropDivId);
		var data=SmartPage_DropTextTable[SmartPage_DropTextTable.CurrentSelDiv.id];
		var muti_select=data !=null ? data.muti_select :"";
		
		var flag=$(clickObj).parents("div").filter($(divEle)).length>0?true : false;
		if(muti_select !=null && "1" == muti_select && flag){  //复选时不关闭弹出DIV
			return true;
		}
	} catch (e) {
		return false;
	}
	return false;
}

//计算弹出块坐标\宽度\高度
nstc.sf.computeDropTextTableXY = function (sourceDiv, popDiv){
	var srcDivHeight = sourceDiv.offsetHeight;
	var srcDivWidth = sourceDiv.offsetWidth;
	var winH = document.body.offsetHeight;
	var winW = document.body.offsetWidth;
	var srcDivY = nstc.sf.getEleTop2(sourceDiv);
	var srcDivX = nstc.sf.getEleLeft(sourceDiv);				
	
	if (winH < document.body.scrollHeight) {
		//winH = document.body.scrollHeight;
	}
	popDiv.style.width = (SmartPage_DropTextTable.Width || SmartPage_DropTextTable.FixedWidth)+"px";	
	popDiv.style.height = (SmartPage_DropTextTable.Height || SmartPage_DropTextTable.FixedHeight)+"px";
	var popDivWidth = popDiv.offsetWidth;
	/*
	if(popDivWidth > SmartPage_DropTextTable.MaxWidth){
		popDivWidth = SmartPage_DropTextTable.MaxWidth;
		popDiv.style.width=popDivWidth + 'px';
	}*/
	var popDivHeight=popDiv.offsetHeight;
	/*
	if (popDivHeight > SmartPage_DropTextTable.MaxHeight) {
		popDivHeight = SmartPage_DropTextTable.MaxHeight;
		popDiv.style.height=popDivHeight+'px';
	}*/
	
	
	if (srcDivY +  srcDivHeight +popDivHeight+ 5 > winH) {
		var temp = srcDivY - popDivHeight;
		//temp = temp<0 ? 0 : temp;
		if(temp <0){
			temp = 0;
			popDiv.style.height =srcDivY+"px";
		}
		popDiv.style.top = temp + 'px';
		
	} else {
		popDiv.style.top = (srcDivY + srcDivHeight) + 'px';
	}
	
	if(srcDivX + popDivWidth + 5 > winW){
		var temp = srcDivX + srcDivWidth - popDivWidth;
		temp = temp <0 ? 0 : temp;
		popDiv.style.left=temp + 'px';		
	}else{
		popDiv.style.left = srcDivX + 'px';
	}
}

//全选按钮事件
nstc.sf.dropTextTableCkAll = function(checked){
	var divEle = document.getElementById(SmartPage_DropTextTable.DropDivId);
	
	$(divEle).find("table tbody tr:visible :checkbox").each(function(i,ele){
		ele.checked =checked;		
	});
	nstc.sf.fillDropTextTableText();
}

nstc.sf.dropTextTableTRClick= function(obj,idx){
	
	var clickObj = event.srcElement ? event.srcElement : event.target;
	if("input" == clickObj.tagName.toLowerCase() && "checkbox" == clickObj.type.toLowerCase()){
		$(obj).toggleClass("rowSelected");
	}    
}
//根据输入框中输入的值反向选中checkbox
nstc.sf.dropTextTableClear = function(obj){
	var curr_text=obj.value;
	var curr_texts=curr_text.split(",");
	var divEle = document.getElementById(SmartPage_DropTextTable.DropDivId);
	var values = "",texts="";
	var data=SmartPage_DropTextTable[SmartPage_DropTextTable.CurrentSelDiv.id];

	var muti_select=data !=null ? data.muti_select :"";
	if("1" == muti_select ){
	
		$(divEle).find("table tbody tr :checkbox").each(function(i,ele){
			var temp=ele.value.split("@@");
			if(temp !=null && temp.length ==2 ){
				var regExp = new RegExp("(^|.*,)("+temp[0]+"|"+temp[1]+")(,.*|$)");
				if(regExp.test(curr_text)){
					ele.checked = true;
					texts += (temp[0]+",");
					values += (temp[1]+",");
				}else{
					ele.checked = false;
				}
			}			
	
		});
	
		texts = texts.length >0 ? texts.substring(0,texts.length - 1) : "";
		values = values.length >0 ? values.substring(0,values.length - 1) : "";
		SmartPage_DropTextTable.CurrentText.value=texts;
		SmartPage_DropTextTable.CurrentSelVal.value=values;	
		nstc.sf.changeFlag(SmartPage_DropTextTable.CurrentText,'modified');
	}

}
//根据输入框中的内容到后台查询数据
nstc.sf.requestDropTextTable = function (ele, params){
	
	params.params = encodeURIComponent(params.params);
	nstc.sf.showDropTextTable2(ele);
	$.ajax({
		type:'POST',
	url:'DynamicQueryDropTableAction.sf',
	data :params,
	dataType : 'text',	
	success:function(text){

		try{
			var data = eval('('+text+')');			
			$(dropTextTableDiv).empty();
			nstc.sf.renderDropTextTable(data);	
			nstc.sf.computeDropTextTableXY(SmartPage_DropTextTable.CurrentSelDiv, dropTextTableDiv);
		}catch(e){
			
		}
	}
	});
}
/*
nstc.sf.requestDropTextTable_demo_gelt_02_01_el_8 = function(ele, params){
	var value = nstc.sf.getBrothersValueByName(ele,'demo_gelt_02_01.el_8');
	params.params = 'name='+value;
	nstc.sf.requestDropTextTable(ele, params);
}*/

nstc.sf.getEleTop2 = function(e) {
	
	return nstc.sf.getEleTopNoFixTable(e);
};
