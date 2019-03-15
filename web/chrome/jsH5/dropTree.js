if (!nstc)
	var nstc = {};
if (!nstc.sf)
	nstc.sf = {};

//二维数组：存储所有下拉筛选表格数据源信息，[0]:元素id，例如：'demo_gelt_02_01_el_2'，[1]:表格数据
var SmartPage_DropTree={};                        
var SmartPage_DropTree_DropDivItemHeight = 20;
var SmartPage_DropTree_MaxHeight = 200;           //弹出块最大高度
var SmartPage_DropTree_MaxWidth = 400;            //弹出块最大宽度
var SmartPage_DropTree_Width = 0;                 //弹出块宽度
var SmartPage_DropTree_Height = 0;                //弹出块高度
var SmartPage_DropTree_FixedWidth = 200;          //弹出块默认宽度
var SmartPage_DropTree_FixedHeight = 200;         //弹出块默认高度
var SmartPage_DropTree_TextName = 'nstc.sf.DropTreeInputText';    //输入框名称（存储显示值）
var SmartPage_DropTree_ImgName = 'nstc.sf.DropTreeImg';           //下拉图标图片名称
var SmartPage_DropTree_ValNames = "nstc.sf.DropTreeValNames";     //隐藏框名称（存储实际值）
var SmartPage_DropTree_CurrentText;                                      //当前输入框（存储显示值）
var SmartPage_DropTree_CurrentSelVal;                                    //当前隐藏框（存储实际值）
var SmartPage_DropTree_CurrentSelData;                                   //当前隐藏框（存储全部值）
var SmartPage_DropTree_CurrentSelDiv;                                    //当前活跃元素块
var SmartPage_DropTree_CKName = "nstc.sf.DropTreeCK";             //隐藏框名称（存储实际值）



//显示下拉表格
nstc.sf.showDropTree=function (ele){	
	
	//var ele = document.getElementById(textInputId);
	ele.blur();
	var elementDiv = ele.parentNode;
	if (!window.dropTreeDiv) {
		//document.attachEvent('onclick', nstc.sf.hideDropTree);	//SMP1.4.7 事件注册兼容性修改
		smartForm_addEvent(document, 'click', nstc.sf.hideDropTree);
	}
	window.dropTreeDiv = document.getElementById($(elementDiv).find("div")[1].id);
	window.multiTree = window.SmartPage_DropTree[elementDiv.id];
	SmartPage_DropTree_CurrentSelDiv = elementDiv;	
	SmartPage_DropTree_CurrentText = $(elementDiv).find("input[name='"+SmartPage_DropTree_TextName+"']")[0];
	SmartPage_DropTree_CurrentSelVal = $(elementDiv).find("input:hidden[name!='"+SmartPage_DropTree_ValNames+"']")[0];
	SmartPage_DropTree_Height = $(elementDiv).find("input[name='"+SmartPage_DropTree_ValNames+"']")[0].getAttribute("alt");
	SmartPage_DropTree_Height = SmartPage_DropTree_Height || SmartPage_DropTree_FixedHeight;
	if (dropTreeDiv.style.display == 'block'
			&& SmartPage_DropTree_CurrentSelDiv
			&& SmartPage_DropTree_CurrentSelDiv == elementDiv) {
		dropTreeDiv.style.display = 'none';
		return;
	} else if(dropTreeDiv.style.display == 'none'
		&& SmartPage_DropTree_CurrentSelDiv
		&& SmartPage_DropTree_CurrentSelDiv == elementDiv){
		dropTreeDiv.style.display = 'block';		
		nstc.sf.computeDropTreeXY(elementDiv, dropTreeDiv);
		return ;
	} else{
		dropTreeDiv.style.display = 'block';	
	}			
	dropTreeDiv.focus();
	
	nstc.sf.computeDropTreeXY(elementDiv, dropTreeDiv);
}
//隐藏下拉表格
nstc.sf.hideDropTree=function (){
	//SMP1.4.7 兼容性优化
	var theEvent = window.event || arguments[0];
	var clickObj = theEvent.srcElement || theEvent.target;
	if (nstc.sf.notDealDropTree(clickObj)) {
		return;
	}
	var divEle = window.dropTreeDiv;
	if (divEle) {
		divEle.style.display = 'none';
	}			
}
//向input元素填充数据
nstc.sf.fillDropTreeText=function (text,value){
	
	var data=SmartPage_DropTree[SmartPage_DropTree_CurrentSelDiv.id];
	var muti_select=data !=null ? data.muti_select :"";
	if(muti_select !=null && "1" == muti_select){//复选处理逻辑
		var divEle = document.getElementById(SmartPage_DropTree_DropDivId);
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
		SmartPage_DropTree_CurrentText.value=texts;
		SmartPage_DropTree_CurrentSelVal.value=values;		
	}else{//单选处理逻辑
		SmartPage_DropTree_CurrentText.value=text;
		SmartPage_DropTree_CurrentSelVal.value=value;
	}
}		

nstc.sf.rendDropTreeToEleById = function(eleId, treeDataId, selVal, withCheckBox) {
	nstc.sf.rendDropTreeToEle(document.getElementById(eleId), 
						  document.getElementById(treeDataId).value, 
						  selVal, false, withCheckBox);
};

//渲染下拉树主函数
nstc.sf.rendDropTreeToEle = function(ele, treeData, selVal, popWin, withCheckBox) {
	var pDiv=ele.parentNode;
	window.SmartPage_DropTree[pDiv.id] = new MzTreeView("SmartPage_DropTree."+pDiv.id);
	var multiTree = window.SmartPage_DropTree[pDiv.id];
	multiTree.withCheckBox = withCheckBox;
	if (popWin) {
		multiTree.setIconPath("images/");
	} else {
		multiTree.setIconPath("SmartFormRes/jsH5/images/");
	}
	var selValList = null;
	if (withCheckBox && null != selVal && '' != selVal) {
		selValList = selVal.split(",");
	}
	with (multiTree) {
		var treeEles = treeData.split(";");
		for ( var i = 0; i < treeEles.length; i++) {
			var oneEle = treeEles[i];
			N[oneEle.split(',')[0]] = '';
			// ctrl:sel;checked:1;
			if (withCheckBox) {
				N[oneEle.split(',')[0]] += 'ctrl:' + SmartPage_DropTree_CKName
						+ ";checked:";
				if (null != selValList	&& nstc.sf.isEleInArray(oneEle.split(',')[0].split("_")[1], selValList)) {
					N[oneEle.split(',')[0]] += '1';
				} else {
					N[oneEle.split(',')[0]] += '0';
				}
				N[oneEle.split(',')[0]] += ";"
			}
			N[oneEle.split(',')[0]] += 'T:' + oneEle.split(',')[1]
					+ ';C:nstc.sf.L(\'' + oneEle.split(',')[2] + '\')'
					+ ';data:' + oneEle.split(',')[2];
		}
	}
	multiTree.wordLine = false;
	multiTree.readOnly = false;
	ele.innerHTML = multiTree.toString();
	if (withCheckBox) {
		multiTree.expandAll();
	}
	if ('' != selVal && !withCheckBox) {
		multiTree.Click(selVal);
	}
	if(multiTree.withCheckBox){
		multiTree.nodeClick=function(){}
		ele.onclick=nstc.sf.dropTreeClickHandler;
	}else{
		multiTree.nodeClick=nstc.sf.dropTreeClickHandler;
	}	
	
};

nstc.sf.dropTreeClickHandler = function(id){
	var values=nstc.sf.getDropTreeSelVal(true);
	var texts=nstc.sf.getTreeSelText(true);
	var value_id = SmartPage_DropTree_CurrentSelVal.id;
	var func = "getDropTreeSel_"+value_id.replace(/\./,"_"); 
	if(window[func] !=null){    //调用自定义方法
		window[func](nstc.sf.dropTreeSel);
	}else{
		var values=nstc.sf.getDropTreeSelVal(true);
		var texts=nstc.sf.getDropTreeSelText(true);
		SmartPage_DropTree_CurrentSelVal.value=values;
		SmartPage_DropTree_CurrentText.value=texts;
	}	
}

nstc.sf.dropTreeSel = function(onlyLeaf){
	var values=nstc.sf.getDropTreeSelVal(onlyLeaf);
	var texts=nstc.sf.getDropTreeSelText(onlyLeaf);
	SmartPage_DropTree_CurrentSelVal.value=values;
	SmartPage_DropTree_CurrentText.value=texts;
} 

/**
 * 用于获取选中的树元素节点的值。
 * onlyLeaf：
 * 		true：仅显示没有子节点的选中项
 * 		false：显示所有选中项
 */ 
nstc.sf.getDropTreeSelVal = function(onlyLeaf) {    
	
	if (window.multiTree.withCheckBox) {
		var es = $(dropTreeDiv).find(":checkbox");     
		var out = "";
		for ( var i = 0; i < es.length; i++) {
			if (es[i].checked && '' != es[i].value) {
				if (false==onlyLeaf || 'false'==onlyLeaf) {
					out += es[i].value + ",";
				} else if (nstc.sf.isNodeLeaf(nstc.sf.getNodeIdxByChk(es[i]))) {
					out += es[i].value + ",";
				}
			}
		}
		if ('' != out) {
			out = out.substring(0, out.length - 1);
		}
		return out;
	}
	return window.multiTree.currentNode.sourceIndex.split("_")[1];
};

nstc.sf.getDropTreeSelText = function(onlyLeaf) {     //UNDO
	if (window.multiTree.withCheckBox) {
		var es = $(dropTreeDiv).find(":checkbox");
		var out = "";
		for ( var i = 0; i < es.length; i++) {
			if (es[i].checked && '' != es[i].value) {
				if (!onlyLeaf) {
					out += es[i].alt + ",";
				} else if (nstc.sf.isNodeLeaf(nstc.sf.getNodeIdxByChk(es[i]))) {
					out += es[i].alt + ",";
				}
			}
		}
		if ('' != out) {
			out = out.substring(0, out.length - 1);
		}
		return out;
	}
	return window.multiTree.currentNode.T;
};
//
nstc.sf.notDealDropTree = function(clickObj) {
	try {
		if ((clickObj && clickObj.getAttribute('name') == SmartPage_DropTree_TextName)
				|| (clickObj && clickObj.getAttribute('name') == SmartPage_DropTree_ImgName)) {
			return true;
		}
		var tree=SmartPage_DropTree[SmartPage_DropTree_CurrentSelDiv.id];
		var withCheckbox=tree !=null ? tree.withCheckBox :"";
		
		var flag=$(clickObj).parents("div").filter($(window.dropTreeDiv)).length>0?true : false;
		if(withCheckbox !=null &&  flag){  //复选时不关闭弹出DIV
			return true;
		}
	} catch (e) {
		return false;
	}
	return false;
}

//计算弹出块坐标\宽度\高度
nstc.sf.computeDropTreeXY = function (sourceDiv, popDiv){
	var srcDivHeight = sourceDiv.offsetHeight;
	var srcDivWidth = sourceDiv.offsetWidth;
	var winH = document.body.offsetHeight;
	var winW = document.body.offsetWidth;
	var srcDivY = nstc.sf.getEleTop(sourceDiv);
	var srcDivX = nstc.sf.getEleLeft(sourceDiv);				

	try {
		var navStatus = document.getElementById("top-bar");
		if (navStatus.style.display != "none") {
			srcDivY -= 47;
		}
	} catch (e) {}
	if (winH < document.body.scrollHeight) {
		//winH = document.body.scrollHeight;
	}
	SmartPage_DropTree_Width = srcDivWidth;
	popDiv.style.width = (SmartPage_DropTree_Width || SmartPage_DropTree_FixedWidth)+"px";	
	popDiv.style.height = (SmartPage_DropTree_FixedHeight)+"px";
	var popDivWidth = popDiv.offsetWidth;
	/*if(popDivWidth > SmartPage_DropFilterTable_MaxWidth){
		popDivWidth = SmartPage_DropFilterTable_MaxWidth;
		popDiv.style.width=popDivWidth + 'px';
	}*/
	var popDivHeight=popDiv.offsetHeight;
	/*if (popDivHeight > SmartPage_DropFilterTable_MaxHeight) {
		popDivHeight = SmartPage_DropFilterTable_MaxHeight;
		popDiv.style.height=popDivHeight+'px';
	}*/
	
	if (srcDivY +  srcDivHeight +popDivHeight+ 5 > winH) {
		var temp = srcDivY - popDivHeight;
		temp = temp<0 ? 0 : temp;
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

function ck_a(obj){
	var handler = obj.onclick;
	var a=obj;
}