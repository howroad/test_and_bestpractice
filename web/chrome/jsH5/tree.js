/*--------- 命名空间 ---------*/
if (!nstc)
	var nstc = {};
if (!nstc.sf)
	nstc.sf = {};
var SmartPage_TreeShowText;
var SmartPage_TreeValEle;
var SmartPage_TreeDataEle;
var MULTI_TREE_CHK_NAME = "multiTreeChkName";
if(!nstc.sf.tree)
	nstc.sf.tree = {};
nstc.sf.tree.row_split = "__@@;";
nstc.sf.tree.col_split = "__@@,";

// 弹出窗口显示树，不再使用，如果判定没有被其他业务系统使用过应当删除本方法。
nstc.sf.showTreeWin = function(ele, treeDataEleId) {
	var brotherNodes = ele.parentNode.childNodes;
	for ( var i = 0; i < brotherNodes.length; i++) {
		if (!brotherNodes[i]) {
			continue;
		}
		try {
			var name = brotherNodes[i].getAttribute('alt');
			if ('showText' == name) {
				SmartPage_TreeShowText = brotherNodes[i];
			}
			if ('valEle' == name) {
				SmartPage_TreeValEle = brotherNodes[i];
			}
		} catch (e) {
		}
	}
	SmartPage_TreeDataEle = document.getElementById(treeDataEleId);
	nstc.sf.changeFlag(SmartPage_TreeValEle.parentNode, 'modified');
	var paramers = "dialogWidth:400px; dialogHeight:300px; status:no; help:no;scroll:yes;location=no";
	window.showModalDialog("SmartFormRes/js/composite/tree.html", window,
			paramers);

};
nstc.sf.rendTreeToEleById = function(eleId, treeDataId, selVal, withCheckBox, expandAll) {
	nstc.sf.rendTreeToEle(document.getElementById(eleId), 
						  document.getElementById(treeDataId).value, 
						  selVal, false, withCheckBox, expandAll);
};
nstc.sf.rendTreeToEle = function(ele, treeData, selVal, popWin, withCheckBox, expandAll) {
	window.multiTree = new MzTreeView("multiTree");
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
	var row_spl = nstc.sf.tree.row_split;
	var col_spl = nstc.sf.tree.col_split;
	with (multiTree) {
		//var treeEles = treeData.split(";");
		var treeEles = treeData.split(row_spl);
		for ( var i = 0; i < treeEles.length; i++) {
			var oneEle = treeEles[i];
			var oneEles = oneEle.split(col_spl);
			N[oneEles[0]] = '';
			// ctrl:sel;checked:1;
			if (withCheckBox) {
				N[oneEles[0]] += 'ctrl:' + MULTI_TREE_CHK_NAME
						+ ";checked:";
				//if (null != selValList	&& (nstc.sf.isEleInArray(oneEle.split(',')[0].split("_")[1], selValList) || oneEle.split(',')[3] == '1')) {
				if (null != oneEle	&& oneEles[3] == '1') {
					N[oneEles[0]] += '1';
				} else {
					N[oneEles[0]] += '0';
				}
				N[oneEles[0]] += ";"
			}
			N[oneEles[0]] += 'T:' + oneEles[1]
					+ ';C:nstc.sf.L(\'' + oneEles[2] + '\')'
					+ ';data:' + oneEles[2]
			        + ';isLeaf:' + oneEles[4]
			        + ';parent:' + oneEles[5];
		}
	}
	multiTree.wordLine = false;
	multiTree.readOnly = false;
	ele.innerHTML = multiTree.toString();
	//if (withCheckBox || expandAll) {
	if (expandAll == '1') {
		multiTree.expandAll();
	}
	if ('' != selVal && !withCheckBox) {
		multiTree.Click(selVal);
	}	
};
/**
 * 用于获取选中的树元素节点的值。
 * onlyLeaf：
 * 		true：仅显示没有子节点的选中项
 * 		false：显示所有选中项
 */ 
nstc.sf.getTreeSelVal = function(onlyLeaf) {
	/*
	if (window.multiTree.withCheckBox) {
		var es = document.getElementsByName(MULTI_TREE_CHK_NAME);
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
	
	*/
	return nstc.sf.getTreeSelData(onlyLeaf);
};
nstc.sf.getNodeIdxByChk = function(chk) {
	var chkId = chk.id;
	return parseInt(chkId.replace(window.multiTree.name + '_checbox_', ''));
};
nstc.sf.isNodeLeaf = function(ndoeIdx) {
	var node = window.multiTree.node[ndoeIdx];
	if (node.hasChild) {
		return false;
	}
	return true;
};
nstc.sf.getTreeSelText = function(onlyLeaf) {
	if (window.multiTree.withCheckBox) {
		var es = document.getElementsByName(MULTI_TREE_CHK_NAME);
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
nstc.sf.getTreeSelData = function(onlyLeaf) {
	if (window.multiTree.withCheckBox) {
		
		var es = document.getElementsByName(MULTI_TREE_CHK_NAME);
		var out = "";
		/*for ( var i = 0; i < es.length; i++) {
			if (es[i].checked && '' != es[i].value) {
				var nodeIdx = nstc.sf.getNodeIdxByChk(es[i]);
				var node = window.multiTree.node[nodeIdx];
				var source = window.multiTree.N[node.sourceIndex];
				var data = window.multiTree.getAttribute(source, "data");
				if (!onlyLeaf) {
					out += data + ",";
				} else if (!node.hasChild) {
					out += data + ",";
				}
			}
		}*/	
		
		var nodes = window.multiTree.N;
		$.each(nodes,function(i,e){
			if(multiTree.getAttribute(e, "checked") == '1'){
				var data = multiTree.getAttribute(e, "data");
				if(!onlyLeaf){
					out +=(data+",");
				}else if(multiTree.getAttribute(e,"isLeaf") == '1'){
					out +=(data+",");
				}
			}			
		});
		if ('' != out) {
			out = out.substring(0, out.length - 1);
		}
		return out;
	}
	return window.multiTree.getAttribute(
			window.multiTree.N[window.multiTree.currentNode.sourceIndex],
			"data");
};
nstc.sf.selChkTreeByData = function(treeDatas, selParent) {
	if (window.multiTree.withCheckBox) {
		var es = document.getElementsByName(MULTI_TREE_CHK_NAME);
		var treeDataArray = treeDatas.split(',');
		/*for ( var i = 0; i < es.length; i++) {
			var nodeIdx = nstc.sf.getNodeIdxByChk(es[i]);
			var node = window.multiTree.node[nodeIdx];
			var source = window.multiTree.N[node.sourceIndex];
			var data = window.multiTree.getAttribute(source, "data");
			if (nstc.sf.isEleInArray(data, treeDataArray)) {
				es[i].checked = true;
				if (selParent) {
					nstc.sf.selParentChk(node.parentId);
				}
			} else {
				es[i].checked = false;
			}
		}*/
		var nodes = window.multiTree.N;
		var multiTree = window.multiTree;
		$.each(nodes,function(i,e){
			var data = multiTree.getAttribute(e, "data");
			
			if (nstc.sf.isEleInArray(data, treeDataArray)) {
				var nodes = window.multiTree.N;
				var idx = multiTree.getAttribute(e, "index");
				nodes[i] = nodes[i].replace(/;checked:.;/i,';checked:1;');   //同步数据状态
				if(window.multiTree.node[idx] !=null){
					document.getElementById(window.multiTree.name+"_checbox_"+idx).checked = true;
				}
				if(selParent){
					var parent = nodes[multiTree.getAttribute(e, "parent")];
					i = multiTree.getAttribute(e, "parent");
					e = nodes[i];
					nstc.sf.selParentChk2(i,e);
				}					
			}
		});		
	}
};
nstc.sf.selParentChk = function(parentId) {
	var tcn = window.multiTree.node[parentId];
	if (!tcn) {
		return;
	}
	if (tcn.parentId) {
		document.getElementById(window.multiTree.name + '_checbox_' + parentId).checked = true;
		nstc.sf.selParentChk(tcn.parentId);
	}
};

nstc.sf.selParentChk2 = function(i ,e) {
	if(e !=null && i !=null){
		var nodes = window.multiTree.N;
		var idx = multiTree.getAttribute(e, "index");
		nodes[i] = nodes[i].replace(/;checked:.;/i,';checked:1;');   //同步数据状态
		if(window.multiTree.node[idx] !=null){
			document.getElementById(window.multiTree.name+"_checbox_"+idx).checked = true;
		}
		var parent = nodes[multiTree.getAttribute(e, "parent")];
		//if(multiTree.getAttribute(parent, "checked") !=1){
			i = multiTree.getAttribute(e, "parent");
			e = nodes[i];
			nstc.sf.selParentChk2(i,e);
		//}
	}
	
};

nstc.sf.selParentChk = function(parentId) {
	var tcn = window.multiTree.node[parentId];
	if (!tcn) {
		return;
	}
	if (tcn.parentId) {
		document.getElementById(window.multiTree.name + '_checbox_' + parentId).checked = true;
		nstc.sf.selParentChk(tcn.parentId);
	}
};

nstc.sf.L = function(url) {
	if (window.nodeClick && typeof (window.nodeClick) == 'function') {
		nodeClick(url);
	} else {
//		alert('nodeClick(url)函数没有定义！')
	}
};


