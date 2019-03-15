if (!nstc)
	var nstc = {};
if (!nstc.sf)
	nstc.sf = {};
var SmartPage_MultiDrop_DropDivItemHieght = 24;
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
	var eventEle = arguments[0] || event;
	var clickObj = eventEle.srcElement ? eventEle.srcElement : eventEle.target;
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
		smartForm_addEvent(document, 'click', nstc.sf.hidMultiDropChkDiv);
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
		var spanImg = document.createElement("span");
		spanImg.className = 'checkbox_bg';
		spanImg.onclick = (function (val, name) {
			return function () {
				click_checkbox(this);
				if (val == '-1' && name == '全部') {
					var parent = this.parentNode.parentNode;
					var child = parent.childNodes;
					var subSpan = "",
						inputID = "",
						checkStatus = false;
					for (var i=0; i<child.length; i++) {
						subSpan = child[i].childNodes;
						for (var j=0; j<subSpan.length; j++) {
							if (subSpan[j].tagName.toLowerCase() == 'input' && subSpan[j].getAttribute("type") == 'checkbox') {
								change_checkbox_img(subSpan[j]);
								/*inputID = subSpan[j].getAttribute("data-id");
								checkStatus = document.getElementById(inputID).checked;
								checkStatus ? subSpan[j].className='checkbox_bg_f' : subSpan[j].className='checkbox_bg';*/
							}
						}
					}
				}
			};
		})(chkVal, chkName);
		var dataId = new Date().getTime() + (String(Math.random()).slice(-8));
		spanImg.setAttribute('data-id',dataId);
		var chkEle = document.createElement("input");
		chkEle.id = dataId;
		chkEle.className = 'checkbox';
		chkEle.type = 'checkbox';
		chkEle.value = chkVal;
		subDiv.appendChild(chkEle);
		subDiv.appendChild(spanImg);
		var spanEle = document.createElement("span");
		spanEle.innerHTML = chkName;
		subDiv.appendChild(spanEle);
		subDiv.value = chkName;
		smartForm_addEvent(chkEle, 'click', nstc.sf.changeVal);
		if (chkVal == '-1' && chkName == '全部') {
			smartForm_addEvent(chkEle, 'click', nstc.sf.selectAllEle);
		}
		if (nstc.sf.isEleInArray(chkVal, valArray)) {
			chkEle.checked = true;
			spanImg.className = "checkbox_bg_f";
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
		multiDropChkDiv.style.top = (selDivY + selDivHieght - 1) + 'px';
	}
};

nstc.sf.selectAllEle = function() {
	var eventEle = arguments[0] || event;
	var ele = eventEle.srcElement ? eventEle.srcElement : eventEle.target;
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
	nstc.sf.changeVal(eventEle);	/*SMP1.4.7 兼容谷歌不能及时显示全选数据的问题*/
};

nstc.sf.changeVal = function(eventEle) {
	var eventEle = eventEle || arguments[0] || event;
	var ele = eventEle.srcElement ? eventEle.srcElement : eventEle.target;
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