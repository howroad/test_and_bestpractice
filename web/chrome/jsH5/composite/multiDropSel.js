if (!nstc)
	var nstc = {};
if (!nstc.sf)
	nstc.sf = {};
var SmartPage_MultiDrop_DropDivItemHieght = 20;
var SmartPage_MultiDrop_Maxieght = 500;
var SmartPage_MultiDrop_DropDivId = 'nstc.sf.multiDropDivEle';
var SmartPage_MultiDrop_TextName = 'nstc.sf.multiInputText';
var SmartPage_MultiDrop_ImgName = 'nstc.sf.multiDropImg';
var SmartPage_MultiDrop_ValNames = "nstc.sf.multiValNames";
var SmartPage_MultiDrop_CurrentText;
var SmartPage_MultiDrop_CurrentSelVal;
var SmartPage_MultiDrop_CurrentSelDiv;
var multiDropChkDiv = null;
nstc.sf.isEleInArray = function(ele, array) {
	for ( var i = 0; i < array.length; i++) {
		if (array[i] == ele) {
			return true;
		}
	}
	return false;
};
nstc.sf.hidMultiDropChkDiv = function() {
	var clickObj = event.srcElement ? event.srcElement : event.target;
	if (nstc.sf.notDeal(clickObj)) {
		return;
	}
	var divEle = document.getElementById(SmartPage_MultiDrop_DropDivId);
	if (divEle) {
		divEle.style.display = 'none';
	}
};
nstc.sf.showSelectArea = function(ele) {
	var selDiv = ele.parentNode;
	var selDivHieght = selDiv.offsetHeight;
	var selDivWidth = selDiv.offsetWidth;
	var winH = document.body.offsetHeight;
	var selDivY = nstc.sf.getEleTop(selDiv);
	var selDivX = nstc.sf.getEleLeft(selDiv);
	if (null == multiDropChkDiv) {
		multiDropChkDiv = document.createElement("div");
		multiDropChkDiv.id = SmartPage_MultiDrop_DropDivId;
		multiDropChkDiv.style.position = 'absolute';
		multiDropChkDiv.className = 'MultiDropCheckBoxDIV';
		multiDropChkDiv.style.top = "0px";
		document.body.appendChild(multiDropChkDiv);
		document.attachEvent('onclick', nstc.sf.hidMultiDropChkDiv);
	}
	multiDropChkDiv.style.left = selDivX;
	if (multiDropChkDiv.style.display == 'block'
			&& SmartPage_MultiDrop_CurrentSelDiv
			&& SmartPage_MultiDrop_CurrentSelDiv == selDiv) {
		multiDropChkDiv.style.display = 'none';
		return;
	}
	multiDropChkDiv.style.display = 'block';
	SmartPage_MultiDrop_CurrentSelDiv = selDiv;
	var subChks = multiDropChkDiv.childNodes;
	while (subChks.length > 0) {
		multiDropChkDiv.removeChild(subChks[0]);
	}
	var eles = selDiv.childNodes;
	var vals;
	var valAndNames;
	var currentText;
	var divHeight;
	for ( var i = 0; i < eles.length; i++) {
		var node = eles[i];
		try {
			var name = node.getAttribute('name');
			if (!name || null == name || '' == name) {
				continue;
			}
			if (name == SmartPage_MultiDrop_ValNames) {
				valAndNames = node.value;
				divHeight = node.getAttribute('alt');
			} else if (name == SmartPage_MultiDrop_TextName) {
				SmartPage_MultiDrop_CurrentText = node;
			} else if (name != SmartPage_MultiDrop_ImgName) {
				vals = node.value;
				SmartPage_MultiDrop_CurrentSelVal = node;
			}
		} catch (e) {
		}
	}
	var valArray = vals.split(',');
	var valAndNameArray = valAndNames.split(';');
	for ( var i = 0; i < valAndNameArray.length; i++) {
		var valAndName = valAndNameArray[i];
		var chkVal = valAndName.split(',')[0];
		var chkName = valAndName.split(',')[1];
		var subDiv = document.createElement("div");
		subDiv.className = 'MultiDropCheckBoxSubDIV';
		var chkEle = document.createElement("input");
		chkEle.type = 'checkbox';
		chkEle.value = chkVal;
		subDiv.appendChild(chkEle);
		var spanEle = document.createElement("span");
		spanEle.innerHTML = chkName;
		subDiv.appendChild(spanEle);
		subDiv.value = chkName;
		chkEle.attachEvent("onclick", nstc.sf.changeVal);
		if (chkVal == '-1' && chkName == '全部') {
			chkEle.attachEvent("onclick", nstc.sf.selectAllEle);
		}
		if (nstc.sf.isEleInArray(chkVal, valArray)) {
			chkEle.checked = true;
		}
		multiDropChkDiv.appendChild(subDiv);
	}
	if (winH < document.body.scrollHeight) {
		winH = document.body.scrollHeight;
	}
	multiDropChkDiv.style.width = selDivWidth;
	var multiDropChkDivHeight = valAndNameArray.length
			* SmartPage_MultiDrop_DropDivItemHieght + 5;
	if (divHeight != 0 && divHeight != '0') {
		multiDropChkDivHeight = divHeight;
	}
	if (multiDropChkDivHeight > SmartPage_MultiDrop_Maxieght) {
		multiDropChkDivHeight = SmartPage_MultiDrop_Maxieght;
	}
	multiDropChkDiv.style.height = multiDropChkDivHeight + 'px';
	if (selDivY + parseInt(multiDropChkDivHeight) + selDivHieght + 5 > winH) {
		var temp = selDivY - multiDropChkDivHeight;
		if (temp < 0) {
			temp = 0;
		}
		multiDropChkDiv.style.top = temp + 'px';
	} else {
		multiDropChkDiv.style.top = (selDivY + selDivHieght) + 'px';
	}
};

nstc.sf.selectAllEle = function() {
	var ele = event.srcElement ? event.srcElement : event.target;
	var grandEle = ele.parentNode.parentNode;
	var eles = grandEle.childNodes;
	for ( var i = 0; i < eles.length; i++) {
		var node = eles[i];
		if ('DIV' == node.tagName) {
			var divChildNodes = node.childNodes;
			for ( var j = 0; j < divChildNodes.length; j++) {
				var divChildNode = divChildNodes[j];
				if (divChildNode.type && 'checkbox' == divChildNode.type) {
					divChildNode.checked = ele.checked;
				}
			}
		}
	}
};
nstc.sf.changeVal = function() {
	var ele = event.srcElement ? event.srcElement : event.target;
	var selectValues = '';
	var selectTexts = '';
	var grandEle = ele.parentNode.parentNode;
	var eles = grandEle.childNodes;
	var hiddenEle = null;
	for ( var i = 0; i < eles.length; i++) {
		var node = eles[i];
		if ('DIV' == node.tagName) {
			var divChildNodes = node.childNodes;
			for ( var j = 0; j < divChildNodes.length; j++) {
				var divChildNode = divChildNodes[j];
				if (divChildNode.type && 'checkbox' == divChildNode.type
						&& divChildNode.value != '-1' && node.value != '全部'
						&& divChildNode.checked) {
					selectValues += divChildNode.value + ',';
					selectTexts += node.value + ',';
				}
			}
		}
	}
	if ('' != selectValues) {
		selectValues = selectValues.substring(0, selectValues.length - 1);
		selectTexts = selectTexts.substring(0, selectTexts.length - 1);
	}
	SmartPage_MultiDrop_CurrentSelVal.value = selectValues;
	SmartPage_MultiDrop_CurrentText.value = selectTexts;
	var parentEle = SmartPage_MultiDrop_CurrentSelVal.parentNode;
	nstc.sf.changeFlag(parentEle, 'modified');
};
nstc.sf.getEleTop = function(e) {
	if ($("div.fix_title").size() > 0) {
		return event.clientY - event.offsetY;
	}
	return nstc.sf.getEleTopNoFixTable(e);
};
nstc.sf.getEleTopNoFixTable = function(e) {
	var offset = e.offsetTop;
	if (e.offsetParent != null)
		offset += nstc.sf.getEleTopNoFixTable(e.offsetParent);
	return offset;
};
nstc.sf.getEleLeft = function(e) {
	var offset = e.offsetLeft;
	if (e.offsetParent != null)
		offset += nstc.sf.getEleLeft(e.offsetParent);
	return offset;
};
nstc.sf.notDeal = function(clickObj) {
	try {
		if ((clickObj && clickObj.id == SmartPage_MultiDrop_DropDivId)
				|| (clickObj.parentNode && clickObj.parentNode.id == SmartPage_MultiDrop_DropDivId)
				|| (clickObj.parentNode && clickObj.parentNode.parentNode && clickObj.parentNode.parentNode.id == SmartPage_MultiDrop_DropDivId)
				|| (clickObj && clickObj.getAttribute('name') == SmartPage_MultiDrop_ImgName)
				|| (clickObj && clickObj.getAttribute('name') == Smartpage_MultiDrop_TextName)) {
			return true;
		}
	} catch (e) {
		return false;
	}
	return false;
};